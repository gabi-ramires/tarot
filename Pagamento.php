<?php
namespace Model;

require_once 'database.php';

class Pagamento {

    private $dataBase;

    public function __construct() {

        $this->dataBase = new \Database();
    }

    /**
     * Gerar QR Code de pix
     * @return array
     */
    public function gerarPix($data)
    {   
        //var_dump($data); die();
        $sql = "INSERT INTO `pagamentos` (`id_pagamento`, `valor`, `status`, `qr_code_base64`) 
                VALUES ('{$data["id"]}', '{$data['transaction_amount']}', 'pendente', '{$data['qr_code_base64']}')";

        $res = $this->dataBase->insert($sql);

        return $res;
    }

    public function gerarPixMercadoPago($nome, $email, $cpf, $nomePlano, $valor)
    {
        $valor = floatval($valor);

        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://api.mercadopago.com/v1/payments',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS =>'      {
                "transaction_amount": '.$valor.',
                "payment_method_id": "pix",
                "payer": {
                    "email": "'.$email.'",
                    "first_name": "'.$nome.'",
                    "last_name": "",
                    "identification": {
                        "type": "CPF",
                        "number": "'.$cpf.'"
                    }
                },
                "description": "'.$nomePlano.'",
                "external_reference": "tarot",
                "notification_url": "https://cartas.free.nf/pagamento.php"
              }',
          CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer APP_USR-6943513644521036-030709-a192b307d562388941969106bca3e8be-247133647',
            'Content-Type: application/json'
          ),
        ));
        
        $response = curl_exec($curl);
        
        curl_close($curl);

        if ($response === false) {
            return ['error' => 'Erro ao se conectar com a API Mercado Pago'];
        }
    
        // Decodificar a resposta JSON
        $responseData = json_decode($response, true);

        if (isset($responseData['id'], $responseData['transaction_amount'], $responseData['point_of_interaction']['transaction_data']['qr_code_base64'])) {
            $id = $responseData['id'];
            $transaction_amount = $responseData['transaction_amount'];
            $qr_code_base64 = $responseData['point_of_interaction']['transaction_data']['qr_code_base64'];
        
            // Criar o array associativo para o resultado
            $result = [
                'id' => $id,
                'transaction_amount' => $transaction_amount,
                'qr_code_base64' => $qr_code_base64
            ];
            
            return ['status' => true, 'data' => $result];
        } else {
            return ['status' => false, 'error' => 'Dados necessários não encontrados na resposta da API'];
        }
    }

    public function buscaStatusPagamento($id_pagamento)
    {
        $sql = "SELECT * FROM `pagamentos` WHERE `id_pagamento` = '$id_pagamento'";
        $res = $this->dataBase->getRow($sql);

        return $res['status'];
    }

}

?>
