new Vue({
  el: '#app',
  data: {
    cartas: [],
    isMobile: window.innerWidth < 768,
    categoria: '',
    selectedCarta: null
  },
  created() {
    this.iniciar();
  },
  methods: {
    iniciar() {
      console.log(this.categoria)
      if(this.isMobile) {
        this.criarCartasMobile(78);
      } else {
        this.criarCartas(2);
        this.buscarCartasServidor();
        console.log(this.cartas)
      }
      
    },
    criarCartas(numCartas) {
      // Cria as cartas dinamicamente
      const numBaralhos = 1; // Número de baralhos
      const cartasPorBaralho = Math.ceil(numCartas / numBaralhos); // Quantidade de cartas por baralho
      const cartas = [];
      const offsetX = -20; // Distância entre colunas
      const offsetY = 20; // Distância entre linhas

      for (let i = 1; i <= numCartas; i++) {
          const baralhoIndex = Math.floor((i - 1) / cartasPorBaralho); // Índice do baralho
          const posInBaralho = (i - 1) % cartasPorBaralho; // Posição dentro do baralho

          // Calcula as posições
          const bottom = baralhoIndex * offsetX; // Posição horizontal
          const left = 200 + (posInBaralho * offsetY); // Posição vertical

          cartas.push({ id: i, left: left, bottom: bottom, msg: '', img: '', idReal: '', titulo: ''});
      }

      this.cartas = cartas;

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
      this.categoria = '';
      this.cartas = [];
    },
    buscarCartasServidor() {

      fetch("tarot.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            acao: 'buscaCartas'
          })
      })
      .then(response => {
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }
          return response.json();
      })
      .then(data => {
          if(data.status) {
            console.log(data)
            let cartas = data.data;

            // Embaralhar as frases
            const cartasEmbaralhadas = this.embaralharArray(cartas.slice());

            // Atribui as cartas às cartas existentes
            for (let i = 0; i < this.cartas.length; i++) {
              if (i < cartasEmbaralhadas.length) {
                this.cartas[i].idReal += cartasEmbaralhadas[i].idReal;
                this.cartas[i].titulo += cartasEmbaralhadas[i].titulo;
                this.cartas[i].img += cartasEmbaralhadas[i].img;
                this.cartas[i].msg += cartasEmbaralhadas[i].msg;
              }
            }

            console.log(this.cartas)

          } else {
            console.group("erro")
          }
          
      })
      .catch(error => {
          alert("Erro ao processar a requisição. Por favor, tente novamente.");
      });

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
    },
    embaralharArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório
        // Troca os elementos
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    virarCarta(id) {
      console.log(id)
      this.selectedCarta = id;

      // Remove a carta o baralho
      let div = document.getElementById(id)
      if (div) {
        div.remove();
      }
    },
    closeModal() {
      this.selectedCarta = null; // Fecha o modal
    },
    getCartaImage(id) {
      const carta = this.cartas.find(c => c.id === id);
      return carta ? "cartas/"+carta.img : ''; // Retorna a imagem ou uma string vazia
    },

  }
});
