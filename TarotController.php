<?php
namespace Controller;

require_once 'Tarot.php';

use Model\Tarot;

class TarotController{

    public $tarotModel;

    public function __construct(){
        $this->tarotModel = new Tarot;
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

    public function buscaCartas($data) {
        
        $categoria = $data['categoria'];

        $data = $this->tarotModel->buscarCartas();
        $response = [
            'status' => true,
            'data'   => $data
        ];

        echo json_encode($response);
    }
}

// Crie uma instância do controlador e manuseie a requisição
$controller = new TarotController();
$controller->handleRequest();

?>