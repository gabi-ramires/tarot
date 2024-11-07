-            <div class='carta'>
<div class='titulo'>
<span>Titulo de exemplo</span>
</div>
<div class="'imagem">
imagem
</div>
<div class="texto">
<span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dicta molestias culpa inventore dolore ab sapiente cupiditate odit? Nostrum repellat rem explicabo quis natus iure ducimus, veniam deleniti totam amet?</span>
</div>
</div>


     * Busca as 22 cartas de tarot
     * @return array
     */
    public function buscaCartas() {
        $response = [
            'status' => true,
            'data' => [
                ['idReal' => 1, 'nome' => 'O Louco', 'imagem' => 'o-louco.jpg', 'mensagem' => 'mensagem do louco'],
                ['idReal' => 2, 'nome' => 'O mMgo', 'imagem' => 'o-mago.jpg', 'mensagem' => 'mensagem do mago'],
                ['idReal' => 3, 'nome' => 'A Sacerdotisa', 'imagem' => 'a-sacerdotisa.jpg', 'mensagem' => 'mensagem da sacedotisa'],
                ['idReal' => 4, 'nome' => 'A Imperatriz', 'imagem' => 'a-imperatriz.jpg', 'mensagem' => 'mensagem da imperatriz'],
                ['idReal' => 5, 'nome' => 'O Imperador', 'imagem' => 'o-imperador.jpg', 'mensagem' => 'mensagem do imperador'],
                ['idReal' => 6, 'nome' => 'O Papa', 'imagem' => 'o-papa.jpg', 'mensagem' => 'mensagem do papa'],
                ['idReal' => 7, 'nome' => 'Os Enamorados', 'imagem' => 'os-enamorados.jpg', 'mensagem' => 'mensagem dos enamorados'],
                ['idReal' => 8, 'nome' => 'O Carro', 'imagem' => 'o-carro.jpg', 'mensagem' => 'mensagem do carro'],
                ['idReal' => 9, 'nome' => 'A força', 'imagem' => 'a-forca.jpg', 'mensagem' => 'mensagem da força'],
                ['idReal' => 10, 'nome' => 'O Eremita', 'imagem' => 'o-eremita.jpg', 'mensagem' => 'mensagem do erimita'],
                ['idReal' => 11, 'nome' => 'A Roda da Fortuna', 'imagem' => 'a-roda-da-fortuna.jpg', 'mensagem' => 'mensagem da roda da fortuna'],
                ['idReal' => 12, 'nome' => 'A Justiça', 'imagem' => 'a-justica.jpg', 'mensagem' => 'mensagem da justiça'],
                ['idReal' => 12, 'nome' => 'A Justiça', 'imagem' => 'a-justica.jpg', 'mensagem' => 'mensagem da justiça'],
                ['idReal' => 13, 'nome' => 'O Enforcado', 'imagem' => 'o-enforcado.jpg', 'mensagem' => 'mensagem do enforcado'],
                ['idReal' => 14, 'nome' => 'A Morte', 'imagem' => 'a-morte.jpg', 'mensagem' => 'mensagem da morte'],
                ['idReal' => 15, 'nome' => 'A Temperança', 'imagem' => 'a-temperanca.jpg', 'mensagem' => 'mensagem da temperança'],
                ['idReal' => 16, 'nome' => 'O Diabo', 'imagem' => 'o-diabo.jpg', 'mensagem' => 'mensagem do diabo'],
                ['idReal' => 17, 'nome' => 'A Torre', 'imagem' => 'a-torre.jpg', 'mensagem' => 'mensagem da torre'],
                ['idReal' => 18, 'nome' => 'A Estrela', 'imagem' => 'a-estrela.jpg', 'mensagem' => 'mensagem da estrela'],
                ['idReal' => 19, 'nome' => 'A Lua', 'imagem' => 'a-lua.jpg', 'mensagem' => 'mensagem da lua'],
                ['idReal' => 20, 'nome' => 'O Sol', 'imagem' => 'o-sol.jpg', 'mensagem' => 'mensagem do sol'],
                ['idReal' => 21, 'nome' => 'O Julgamento', 'imagem' => 'o-julgamento.jpg', 'mensagem' => 'mensagem do julgamento'],
                ['idReal' => 22, 'nome' => 'O Mundo', 'imagem' => 'o-mundo.jpg', 'mensagem' => 'mensagem do mundo']
            ]
        ];   

        echo json_encode($response);
    }