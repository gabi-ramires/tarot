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
        this.buscarCartasServidor();
        console.log(this.cartas)
      }
      
    },
    criarCartas(numCartas) {
      // Cria as cartas dinamicamente
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

          cartas.push({ id: i, left: left, bottom: bottom, msg: ''});
      }

      this.cartas = cartas;
      //console.log(this.cartas)
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

      const frases = [
        "Você irá ganhar muito dinheiro.",
        "A pessoa que você gosta não está interessada em você.",
        "Você terá uma grande oportunidade!",
        "Tudo vai dar certo!",
        "Uma surpresa inesperada está a caminho!",
        "Você encontrará a felicidade em breve.",
        "Um novo começo está próximo.",
        "O amor está no ar.",
        "Grandes mudanças estão chegando.",
        "Acredite em si mesmo sempre.",
        "As estrelas estão a seu favor.",
        "Uma jornada emocionante espera por você.",
        "Prepare-se para uma nova aventura.",
        "Seu trabalho árduo será recompensado.",
        "Você é mais forte do que imagina.",
        "Mantenha a fé, coisas boas virão.",
        "Alguém especial está prestes a entrar na sua vida.",
        "Você vai realizar um sonho antigo.",
        "Um convite inesperado pode mudar tudo.",
        "Seus esforços serão reconhecidos em breve.",
        "Você merece toda a felicidade do mundo.",
        "Um amigo leal estará ao seu lado.",
        "Uma mensagem importante está a caminho.",
        "A mudança trará novas oportunidades.",
        "Sua criatividade será sua melhor aliada.",
        "Você encontrará inspiração onde menos espera.",
        "O sucesso está mais próximo do que parece.",
        "Uma pausa pode trazer novas ideias.",
        "Novas amizades surgirão em breve.",
        "Você será a razão do sorriso de alguém.",
        "A gratidão atrai mais coisas boas.",
        "Este é o momento de arriscar.",
        "A vida está prestes a surpreendê-lo.",
        "Você receberá boas notícias em breve.",
        "Um projeto criativo lhe trará satisfação.",
        "Você é capaz de superar qualquer desafio.",
        "Uma viagem inesperada pode ocorrer.",
        "Seus planos estão prestes a dar certo.",
        "As mudanças são o começo de algo bom.",
        "Você terá um encontro memorável.",
        "Uma nova paixão pode surgir.",
        "Sua força interior brilhará mais do que nunca.",
        "Um sonho que você achava perdido voltará à tona.",
        "Você encontrará o equilíbrio que procura.",
        "A paciência trará frutos doces.",
        "A sua voz será ouvida.",
        "A vida lhe oferecerá novas perspectivas.",
        "Uma decisão corajosa será recompensada.",
        "Seu sorriso é a chave para novas conexões.",
        "Você inspirará aqueles ao seu redor.",
        "Alguém próximo precisa da sua ajuda.",
        "Um desafio se transformará em uma oportunidade.",
        "O amor próprio abrirá portas.",
        "A sua determinação é admirável.",
        "O universo conspira a seu favor.",
        "Um momento especial está prestes a acontecer.",
        "Sua intuição guiará seus passos.",
        "Você encontrará respostas que busca.",
        "O seu passado não define seu futuro.",
        "Uma lição importante será aprendida.",
        "Uma nova habilidade pode ser adquirida.",
        "Você fará uma escolha que mudará sua vida.",
        "Uma alegria inesperada surgirá em sua vida.",
        "Você será reconhecido por sua generosidade.",
        "Uma fase difícil está chegando ao fim.",
        "Você está no caminho certo.",
        "Sua resiliência será testada, mas você triunfará.",
        "Você encontrará beleza nas pequenas coisas.",
        "Um dia de descanso é bem-vindo.",
        "Um amigo distante pode se reaproximar.",
        "Você inspirará confiança em quem está ao seu redor.",
        "Suas ideias criativas serão valorizadas.",
        "Um antigo projeto pode ser revitalizado.",
        "Você terá uma visão clara de suas metas.",
        "A simplicidade trará alegria.",
        "Alguém estará orgulhoso de você.",
        "A vida é feita de momentos, aproveite cada um.",
        "Você é um farol de esperança para muitos."
      ];
    
      // Verifica se há frases suficientes
      if (frases.length < 78) {
        console.error('Você precisa de pelo menos 78 frases adicionais.');
        return;
      }

      // Embaralhar as frases
      const frasesEmbaralhadas = this.embaralharFrases(frases.slice());

      // Atribui as frases às cartas existentes
      for (let i = 0; i < this.cartas.length; i++) {
        if (i < frasesEmbaralhadas.length) {
            this.cartas[i].msg += frasesEmbaralhadas[i];
        }
      }

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
    embaralharFrases(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório
        // Troca os elementos
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
});
