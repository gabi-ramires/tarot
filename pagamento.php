<?php
require_once 'vendor/autoload.php';

// Carrega as variáveis de ambiente do arquivo .env
$dotenv = Dotenv\Dotenv::createImmutable('./');
$dotenv->load();

// Defina o cabeçalho Content-Type como JSON para facilitar a leitura dos dados
header('Content-Type: application/json');

// Recebe os dados do Webhook (geralmente em formato JSON)
$rawData = file_get_contents('php://input');

// Decodifica o JSON recebido
$data = json_decode($rawData, true);

// Verifica se a decodificação foi bem-sucedida
if ($data === null) {
    // Se não for JSON válido, retorna um erro 400
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

$idPagamento = '';
if (isset($data['action']) && $data['action'] == 'payment.updated') {

    $idPagamento = $data['data']['id'];

    $status = buscaStatusPagamento($idPagamento);
    //var_dump($status['status']); die();

    if($status['status'] == 'approved') {
        $res = atualizarStatusPagamento($idPagamento);
        echo json_encode(['status' => 'Pagamento recebido!', 'id_pagamento' => $idPagamento]);
        die();
    }
    
}

function buscaStatusPagamento($idPagamento){
    $accessToken = 'APP_USR-6943513644521036-030709-a192b307d562388941969106bca3e8be-247133647';
    $paymentId = $idPagamento; // Coloque o ID do pagamento aqui
    
    $url = 'https://api.mercadopago.com/v1/payments/' . $paymentId;
    
    // Inicializar a sessão cURL
    $curl = curl_init();
    
    // Configurar as opções da requisição cURL
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken
        ],
    ]);
    
    // Executar a requisição cURL e obter a resposta
    $response = curl_exec($curl);
    
    // Verificar se houve algum erro na requisição cURL
    if (curl_errno($curl)) {
        echo 'Erro ao fazer a requisição cURL: ' . curl_error($curl);
    }
    
    // Fechar a sessão cURL
    curl_close($curl);

    $responseData = json_decode($response, true);
    
    // Exibir a resposta
    return $responseData;
    
}

function conectarBanco() {
    // Configurações do banco de dados
    $host = $_ENV['DB_HOST'];
    $user = $_ENV['DB_USERNAME'];
    $password = $_ENV['DB_PASSWORD'];
    $database = $_ENV['DB_DATABASE'];

    // Conexão com o banco de dados
    $conn = new mysqli($host, $user, $password, $database);

    // Verifica se a conexão foi bem-sucedida
    if ($conn->connect_error) {
        die('Erro na conexão: ' . $conn->connect_error);
    }

    return $conn; // Retorna a conexão
}

// Função para atualizar o status do pagamento
function atualizarStatusPagamento($id_pagamento) {
    // Conectar ao banco de dados
    $conn = conectarBanco();

    // Escapar o valor para evitar SQL Injection
    $id_pagamento = $conn->real_escape_string($id_pagamento);

    // Definir a consulta SQL para atualizar o status do pagamento
    $sql = "UPDATE `pagamentos` SET `status` = 'pago' WHERE `id_pagamento` = {$id_pagamento}";

    // Executar a consulta
    if ($conn->query($sql) === TRUE) {
        // Fechar a conexão
        $conn->close();
        return true; // Retorna verdadeiro se o UPDATE for bem-sucedido
    } else {
        // Fechar a conexão
        $conn->close();
        return false; // Retorna falso se ocorrer um erro
    }
}


// Retorna uma resposta HTTP 200 para confirmar que o webhook foi recebido corretamente
http_response_code(200);
echo json_encode(['status' => 'Recebido com sucesso', 'id_pagamento' => $idPagamento]);
?>
