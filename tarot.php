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
                ['idReal' => 1, 'titulo' => 'O Louco', 'img' => 'o-louco.jpg', 'msg' => 'mensagem do louco'],
                ['idReal' => 2, 'titulo' => 'O mMgo', 'img' => 'o-mago.jpg', 'msg' => 'mensagem do mago'],
                ['idReal' => 3, 'titulo' => 'A Sacerdotisa', 'img' => 'a-sacerdotisa.jpg', 'msg' => 'mensagem da sacedotisa'],
                ['idReal' => 4, 'titulo' => 'A Imperatriz', 'img' => 'a-imperatriz.jpg', 'msg' => 'mensagem da imperatriz'],
                ['idReal' => 5, 'titulo' => 'O Imperador', 'img' => 'o-imperador.jpg', 'msg' => 'mensagem do imperador'],
                ['idReal' => 6, 'titulo' => 'O Papa', 'img' => 'o-papa.jpg', 'msg' => 'mensagem do papa'],
                ['idReal' => 7, 'titulo' => 'Os Enamorados', 'img' => 'os-enamorados.jpg', 'msg' => 'mensagem dos enamorados'],
                ['idReal' => 8, 'titulo' => 'O Carro', 'img' => 'o-carro.jpg', 'msg' => 'mensagem do carro'],
                ['idReal' => 9, 'titulo' => 'A força', 'img' => 'a-forca.jpg', 'msg' => 'mensagem da força'],
                ['idReal' => 10, 'titulo' => 'O Eremita', 'img' => 'o-eremita.jpg', 'msg' => 'mensagem do erimita'],
                ['idReal' => 11, 'titulo' => 'A Roda da Fortuna', 'img' => 'a-roda-da-fortuna.jpg', 'msg' => 'mensagem da roda da fortuna'],
                ['idReal' => 12, 'titulo' => 'A Justiça', 'img' => 'a-justica.jpg', 'msg' => 'mensagem da justiça'],
                ['idReal' => 12, 'titulo' => 'A Justiça', 'img' => 'a-justica.jpg', 'msg' => 'mensagem da justiça'],
                ['idReal' => 13, 'titulo' => 'O Enforcado', 'img' => 'o-enforcado.jpg', 'msg' => 'mensagem do enforcado'],
                ['idReal' => 14, 'titulo' => 'A Morte', 'img' => 'a-morte.jpg', 'msg' => 'mensagem da morte'],
                ['idReal' => 15, 'titulo' => 'A Temperança', 'img' => 'a-temperanca.jpg', 'msg' => 'mensagem da temperança'],
                ['idReal' => 16, 'titulo' => 'O Diabo', 'img' => 'o-diabo.jpg', 'msg' => 'mensagem do diabo'],
                ['idReal' => 17, 'titulo' => 'A Torre', 'img' => 'a-torre.jpg', 'msg' => 'mensagem da torre'],
                ['idReal' => 18, 'titulo' => 'A Estrela', 'img' => 'a-estrela.jpg', 'msg' => 'mensagem da estrela'],
                ['idReal' => 19, 'titulo' => 'A Lua', 'img' => 'a-lua.jpg', 'msg' => 'mensagem da lua'],
                ['idReal' => 20, 'titulo' => 'O Sol', 'img' => 'o-sol.jpg', 'msg' => 'mensagem do sol'],
                ['idReal' => 21, 'titulo' => 'O Julgamento', 'img' => 'o-julgamento.jpg', 'msg' => 'mensagem do julgamento'],
                ['idReal' => 22, 'titulo' => 'O Mundo', 'img' => 'o-mundo.jpg', 'msg' => 'mensagem do mundo']
            ]
        ];   

        echo json_encode($response);
    }
}

// Crie uma instância do controlador e manuseie a requisição
$controller = new Tarot();
$controller->handleRequest();

?>