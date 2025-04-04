<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarot</title>
    <link rel="shortcut icon" href="ico/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <div class="inicio">
            <h3>Vamos começar! 🔮</h3>
            <p style="text-align: center;">Escolha uma categoria:</p>
            <div class='botoes-categorias'>
                <button 
                    id="familia"
                    @click="escolherCategoria('familia')" 
                    :class="['btn-opcao', { 'btn-opcao-active': categoria === 'familia' }]">
                    Família 👩‍👩‍👦
                </button>
                <button 
                id="trabalho"
                    @click="escolherCategoria('trabalho')" 
                    :class="['btn-opcao', { 'btn-opcao-active': categoria === 'trabalho' }]">
                    Trabalho 💼
                </button>
                <button
                    id="amor"
                    @click="escolherCategoria('amor')" 
                    :class="['btn-opcao', { 'btn-opcao-active': categoria === 'amor' }]">
                    Amor 💕
                </button>

                <button id='reiniciar' @click="reiniciar()" class="btn-reiniciar">Reiniciar</button> 
            </div>
            <p style="text-align: center;">Retire <span style="color: goldenrod">{{ numeroCartasRestantes }} </span> cartas:</p>
            <br>
        </div>

        <div class="cartas" >
            <transition-group name="fade" mode="out-in">
                <div
                    v-for="(carta) in cartas"
                    :id="carta.id"
                    :key="carta.id"
                    class="carta"
                    @click="virarCarta(carta.id)"
                    :style="{ left: carta.left + 'px' , bottom: carta.bottom + 'px'}"
                    >
                    🧙🏻‍♂️
                </div>
            </transition-group>

            <!-- Modal para exibir a imagem da carta -->
            <transition name="zoom">
                <div v-if="selectedCarta" class="modal" @click="closeModal()">
                    <div class="modal-content">
                        <div class="imagem-carta">
                            <img :src="getCartaImage(cartaSelecionadaDados)" alt="Carta" class="modal-imagem" />
                        </div>
    
                        <div class="descricao">
                            <div class="nome">
                                <h3>{{ cartaSelecionadaDados.nome }}</h3>
                            </div>
    
                            <div class="texto">
                                <p v-html="cartaSelecionadaDados.mensagem"></p>
                            </div>
                        </div>
                    </div>

                </div>
            </transition>

        </div>

        <img v-if="qrCodeSrc" :src="qrCodeSrc" alt="QR Code" style="z-index: 2; width: 250px"/>

    </div>

    <script src="vue.js"></script>
    <script src="script.js"></script>
</body>
</html>
