<?php
namespace Controller;
class Tarot{

    public function __construct(){

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
                'msg' => $e->getMessage()
            ];
        }
    }

    /**
     * Busca as 22 cartas de tarot
     * @return array
     */
    public function buscaCartas() {
        $response = [
            'status' => true,
            'data' => [
                ['idReal' => 1, 'titulo' => 'O louco', 'img' => 'o-louco.jpg', 'msg' => 'mensagem do louco'],
                ['idReal' => 2, 'titulo' => 'O mago', 'img' => 'o-mago.jpg', 'msg' => 'mensagem do mago'],
                ['idReal' => 3, 'titulo' => 'A Sacerdotisa', 'img' => 'a-sacerdotisa.jpg', 'msg' => 'mensagem da sacedotisa'],
            ]
        ];   

        echo json_encode($response);
    }
}

// Crie uma instância do controlador e manuseie a requisição
$controller = new Tarot();
$controller->handleRequest();

?>