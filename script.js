new Vue({
  el: '#app',
  data: {
    step: 'inicio',
    cartas: [],
    isMobile: window.innerWidth < 768,
    categoria: ''
  },
  created() {
    //this.embaralharCartas();
  },
  methods: {
      iniciar() {
        this.step = 'jogo';
        console.log(this.categoria)
        if(this.isMobile) {
          this.criarCartasMobile(78);
        } else {
          this.criarCartas(78);
        }
        
      },
      criarCartas(numCartas) {
        // Primeiro, busque as cartas do servidor
        this.buscarCartasServidor(); 

        const numBaralhos = 6; // Número de baralhos
        const cartasPorBaralho = Math.ceil(numCartas / numBaralhos); // Quantidade de cartas por baralho
        const cartas = [];
        const offsetX = 200; // Distância entre colunas
        const offsetY = 20; // Distância entre linhas

        for (let i = 1; i <= numCartas; i++) {
            const baralhoIndex = Math.floor((i - 1) / cartasPorBaralho); // Índice do baralho
            const posInBaralho = (i - 1) % cartasPorBaralho; // Posição dentro do baralho

            // Calcula as posições
            const left = baralhoIndex * offsetX; // Posição horizontal
            const bottom = 200 - (posInBaralho * offsetY); // Posição vertical

            // Verifica se há uma carta correspondente no servidor
            const cartaServidor = this.cartasServidores[i - 1]; // Acessa o índice correspondente
            cartas.push({ 
                id: i, 
                left: left, 
                bottom: bottom, 
                idReal: cartaServidor ? cartaServidor.idReal : null, // Adiciona idReal se existir
                msg: cartaServidor ? cartaServidor.msg : '' // Adiciona msg se existir, senão vazio
            });
        }

        this.cartas = cartas;
        console.log(this.cartas)
      },
      criarCartasMobile(numCartas) {
        // Cria as cartas dinamicamente
        const numBaralhos = 3; // Número de baralhos
        const cartasPorBaralho = Math.ceil(numCartas / numBaralhos); // Quantidade de cartas por baralho
        const cartas = [];
        const offsetX = 120; // Distância entre colunas
        const offsetY = 20; // Distância entre linhas

        for (let i = 1; i <= numCartas; i++) {
            const baralhoIndex = Math.floor((i - 1) / cartasPorBaralho); // Índice do baralho
            const posInBaralho = (i - 1) % cartasPorBaralho; // Posição dentro do baralho

            // Calcula as posições
            const left = baralhoIndex * offsetX +90 ; // Posição horizontal
            const bottom = 200 - (posInBaralho * offsetY); // Posição vertical

            cartas.push({ id: i, left: left, bottom: bottom });
        }

        this.cartas = cartas;
      },
      reiniciar() {
        this.step = 'inicio';
        this.categoria = '';
        this.cartas = [];
      },
      buscarCartasServidor() {

        this.cartasServidores = [
          {idReal: 1, msg: 'Você irá ganhar muito dinheiro.'},
          {idReal: 2, msg: 'A pessoa que você gosta não está interessada em você.'} 
        ]
      },
      embaralharCartas() {
        // Escolhe duas cartas aleatórias
        const idx1 = Math.floor(Math.random() * this.cartas.length);
        let idx2 = Math.floor(Math.random() * this.cartas.length);
        while (idx2 === idx1) {
            idx2 = Math.floor(Math.random() * this.cartas.length);
        }

        // Armazena as posições `left` das duas cartas
        const temp = this.cartas[idx1].left;
        this.$set(this.cartas, idx1, { ...this.cartas[idx1], left: this.cartas[idx2].left });
        this.$set(this.cartas, idx2, { ...this.cartas[idx2], left: temp });
      }
  }
});
