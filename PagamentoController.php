<?php
namespace Controller;

require_once 'Pagamento.php';

use Model\Pagamento;

class PagamentoController{

    public $pagamentoModel;

    public function __construct(){
        $this->pagamentoModel = new Pagamento;
    }

    public function handleRequest() {
        header('Content-Type: application/json');

        $response = [];

        try {
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            if (!isset($data['acao'])) {
                throw new Exception('Ação não especificada');
            }

            $action = $data['acao'];

            if (method_exists($this, $action)) {
                $this->$action($data);
            } else {
                throw new Exception('Ação inválida');
            }
        } catch (Exception $e) {
            $response = [
                'status' => false,
                'mensagem' => $e->getMessage()
            ];
        }
    }

    public function gerarPix($data) {
        $response = ['status' => false];

        // Cria QR via api Mercado Pago
        $return = $this->pagamentoModel->gerarPixMercadoPago('gabi', 'teste@teste.com', '85834440053', 'tarot', '0.01');
        if(!$return['status']) {
            $response = [
                'status' => false,
                'data'   => 'Erro ao criar qr via api'
            ];
        }

        /*
        $moka = array(
            "id" => 93704365980,
            "transaction_amount" => 0.01,
            "qr_code_base64" => "iVBORw0KGgoAAAANSUhEUgAABWQAAAVkAQAAAAB79iscAAAOGElEQVR4Xu3XS3bkuA5FUc+g5j/LmkG8V/jokgAUroaZFfI6txEpER9uuZdfrwfl76968slBey5ozwXtuaA9F7TngvZc0J4L2nNBey5ozwXtuaA9F7TngvZc0J4L2nNBey5ozwXtuaA9F7TngvZc0J4L2nNBey5ozwXtuaA9F7Tng"
        );
        */
        

        // Cria registro no banco
        $ress = $this->pagamentoModel->gerarPix($return['data']);
        if(!$ress) {
            $response = [
                'status' => false,
                'data'   => 'Erro ao criar qr no banco'
            ];
        }

        $response = [
            'status' => true,
            'data'   => $return['data']
        ];

        echo json_encode($response);
    }

    public function verificarStatusPagamento($data) {
        $response = ['status' => false];

        $id_pagamento = $data['idPagamento'];

        $status = $this->pagamentoModel->buscaStatusPagamento($id_pagamento);

        if($status == 'pago') {
            $response = [
                'status' => true
            ];
        }
        echo json_encode($response);
    }
}

// Crie uma instância do controlador e manuseie a requisição
$controller = new PagamentoController();
$controller->handleRequest();

?>