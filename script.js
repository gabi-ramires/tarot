new Vue({
  el: '#app',
  data: {
    cartas: [],
    isMobile: window.innerWidth < 768,
    categoria: '',
    selectedCarta: null,
    cartaSelecionadaDados: null,
    cartasOriginais: '',
    numeroCartasRestantes: '3',

    // Pagamento
    idPagamento: '',
    statusPagamento: 'pending',
    qrCodeSrc: null
  },
  mounted() {
    this.iniciar();
  },
  methods: {
    iniciar() {
      this.buscarCartasServidor();

      if(this.isMobile) {
        this.criarCartasMobile(22);
      } else {
        this.criarCartas(22);
      }
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

          cartas.push({ id: i, left: left, bottom: bottom, mensagem: '', imagem: '', idReal: '', nome: '', categoria: ''});
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

          cartas.push({ id: i, left: left, bottom: bottom, mensagem: '', imagem: '', idReal: '', nome: '', categoria: ''});
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
      this.numeroCartasRestantes = '3'

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

            this.cartasOriginais = cartas

          } else {
            console.error("erro")
          }
          
      })
      .catch(error => {
        console.log("Erro ao processar a requisição. Por favor, tente novamente.");
      });

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

      if(this.numeroCartasRestantes < 1){
        alert("Fim de jogo!");
        return
      }
      this.selectedCarta = id;
      let cartaSelecionadaDados = this.cartas.filter(carta => carta.id == id);
      this.cartaSelecionadaDados = cartaSelecionadaDados[0]

      // Atualiza numero de cartas restantes
      this.numeroCartasRestantes -= 1

      // Remove a carta o baralho
      this.cartas = this.cartas.filter(carta => carta.id !== id);
    },
    closeModal() {
      this.selectedCarta = null; // Fecha o modal
    },
    getCartaImage(cartaSelecionadaDados) {
      return "cartas/"+cartaSelecionadaDados.imagem
    },
    escolherCategoria(categoria = false, reset = false) {
      this.categoria = categoria;
      this.atribuiCartaFront();
      let categorias = ['familia','trabalho','amor'];

      if(categoria) {
        if(categoria == 'amor') {
          //this.gerarQrCodePix();
        }
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
      
    },
    atribuiCartaFront(){
      let cartas = this.cartasOriginais

      for (let i = cartas.length - 1; i >= 0; i--) {
        if (cartas[i].categoria !== this.categoria) {
          cartas.splice(i, 1); // Remove o elemento no índice atual
        }
      }

      // Embaralhar as frases
      const cartasEmbaralhadas = this.embaralharArray(cartas.slice());

      // Atribui as cartas às cartas existentes
      for (let i = 0; i < cartasEmbaralhadas.length; i++) {
        if (i < cartasEmbaralhadas.length) {
          this.cartas[i].idReal += cartasEmbaralhadas[i].idReal;
          this.cartas[i].nome += cartasEmbaralhadas[i].nome;
          this.cartas[i].imagem += cartasEmbaralhadas[i].imagem;
          this.cartas[i].mensagem += cartasEmbaralhadas[i].mensagem;
          this.cartas[i].categoria += cartasEmbaralhadas[i].categoria;
        }
      }
    },
    gerarQrCodePix() {
      
      fetch('PagamentoController.php', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          acao: 'gerarPix',
          idPagamento: 'teste'
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
          // Gera um novo qr code
          this.idPagamento = data.data.id;
          this.statusPagamento = 'pending';
          this.qrCodeSrc = "data:image/png;base64,"+data.data.qr_code_base64;

          // Inicia o monitoramento para verificar o status do pagamento
          this.monitorarStatusPagamento();

        } else {
          console.error("erro ao gerar qr code")
        }
        
    })
    .catch(error => {
      console.log("Erro ao processar a requisição. Por favor, tente novamente.");
    });

    },
    monitorarStatusPagamento() {
      const intervalo = setInterval(async () => {
        try {
          const status = await this.verificarStatusPagamento();
          if (status === true) {
            this.qrCodeSrc = false;
            this.statusPagamento = 'pago';
            clearInterval(intervalo); // Para o monitoramento quando o pagamento for aprovado
            this.liberaAcesso();
          }
        } catch (error) {
          console.error("Erro ao verificar o status do pagamento:", error);
        }
      }, 5000); // Verifica a cada 5 segundos
    },
    
    async verificarStatusPagamento() {
      try {
        const response = await fetch('PagamentoController.php', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            acao: 'verificarStatusPagamento',
            idPagamento: this.idPagamento
          })
        });
    
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
    
        const data = await response.json();
    
        if (data.status) {
          console.log("oba! Foi pago.");
          return true;
        } else {
          console.log("Ainda não foi pago...");
          return false;
        }
      } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return false; // Retorna false em caso de erro para evitar bloqueios no monitoramento
      }
    },
    
    liberaAcesso() {
      alert("Pagamento aprovado! Libere o conteúdo ou ação.");
    }    

  }
});
