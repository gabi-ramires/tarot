new Vue({
  el: '#app',
  data: {
    cartas: [],
    isMobile: window.innerWidth < 768,
    categoria: '',
    selectedCarta: null,
    cartaSelecionadaDados: null
  },
  mounted() {
    this.iniciar();
  },
  methods: {
    iniciar() {
      if(this.isMobile) {
        this.criarCartasMobile(22);
      } else {
        this.criarCartas(22);
      }
      this.buscarCartasServidor();
      
    },
    criarCartas(numCartas) {
      // Cria as cartas dinamicamente
      const numBaralhos = 1; // Número de baralhos
      const cartasPorBaralho = Math.ceil(numCartas / numBaralhos); // Quantidade de cartas por baralho
      const cartas = [];
      const offsetX = -20; // Distância entre colunas
      const offsetY = 45; // Distância entre linhas

      for (let i = 1; i <= numCartas; i++) {
          const baralhoIndex = Math.floor((i - 1) / cartasPorBaralho); // Índice do baralho
          const posInBaralho = (i - 1) % cartasPorBaralho; // Posição dentro do baralho

          // Calcula as posições
          const bottom = baralhoIndex * offsetX; // Posição horizontal
          const left = 0 + (posInBaralho * offsetY); // Posição vertical

          cartas.push({ id: i, left: left, bottom: bottom, mensagem: '', imagem: '', idReal: '', nome: ''});
      }

      this.cartas = cartas;

    },
    criarCartasMobile(numCartas) {
      // Cria as cartas dinamicamente
      const numBaralhos = 2; // Número de baralhos
      const cartasPorBaralho = Math.ceil(numCartas / numBaralhos); // Quantidade de cartas por baralho
      const cartas = [];
      const offsetX = -150; // Distância entre colunas
      const offsetY = 27; // Distância entre linhas

      for (let i = 1; i <= numCartas; i++) {
          const baralhoIndex = Math.floor((i - 1) / cartasPorBaralho); // Índice do baralho
          const posInBaralho = (i - 1) % cartasPorBaralho; // Posição dentro do baralho

          // Calcula as posições
          const bottom = 260 + (baralhoIndex * offsetX); // Posição horizontal
          const left = 50 + (posInBaralho * offsetY); // Posição vertical

          cartas.push({ id: i, left: left, bottom: bottom, mensagem: '', imagem: '', idReal: '', nome: ''});
      }

      this.cartas = cartas;
    },
    reiniciar() {
      this.categoria = '';
      this.cartas = [];
      this.selectedCarta = null;
      this.cartaSelecionadaDados = null;
      this.iniciar();
      this.escolherCategoria(false, true);

      console.log(this.carta)
    },
    buscarCartasServidor() {

      fetch("TarotController.php", {
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
            let cartas = data.data;
            console.log(cartas)

            // Embaralhar as frases
            const cartasEmbaralhadas = this.embaralharArray(cartas.slice());

            // Atribui as cartas às cartas existentes
            for (let i = 0; i < this.cartas.length; i++) {
              if (i < cartasEmbaralhadas.length) {
                console.log(cartasEmbaralhadas);
                this.cartas[i].idReal += cartasEmbaralhadas[i].idReal;
                this.cartas[i].nome += cartasEmbaralhadas[i].nome;
                this.cartas[i].imagem += cartasEmbaralhadas[i].imagem;
                this.cartas[i].mensagem += cartasEmbaralhadas[i].mensagem;
              }
            }

            this.cartasOriginais = this.cartas

          } else {
            console.error("erro")
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

      if(this.categoria == ''){
        alert("Escolha uma categoria.")
        return;
      }
      this.selectedCarta = id;
      let cartaSelecionadaDados = this.cartas.filter(carta => carta.id == id);
      this.cartaSelecionadaDados = cartaSelecionadaDados[0]
      console.log(this.cartaSelecionadaDados)

      // Remove a carta o baralho
      this.cartas = this.cartas.filter(carta => carta.id !== id);
    },
    closeModal() {
      this.selectedCarta = null; // Fecha o modal
    },
    getCartaImage(id) {
      const carta = this.cartasOriginais.find(c => c.id === id);
      return carta ? "cartas/"+carta.imagem : '';
    },
    escolherCategoria(categoria = false, reset = false) {
      this.categoria = categoria;
      let categorias = ['familia','trabalho','amor'];

      if(categoria) {
        categorias.forEach(cat => {
          if(cat != categoria) {
            document.getElementById(cat).style.display = 'none';
          }
        });
        
        document.getElementById('reiniciar').style.display = 'block';
      }

      if(reset) {
        categorias.forEach(cat => {
          document.getElementById(cat).style.display = 'block';
        });

        document.getElementById('reiniciar').style.display = 'none';
      }
      
 
    }


  }
});
