/***********************************************
 * VARIÁVEIS GLOBAIS E ESTADO DO JOGO
 ***********************************************/

// Armazena todos os números já sorteados para evitar repetição
let listaDeNumerosSorteados = []; 

// Define o valor máximo que o número secreto pode ter (1 a 10)
let numeroLimite = 10; 

// Armazena o número que o jogador deve adivinhar (gerado aleatoriamente)
let numeroSecreto = gerarNumeroAleatorio(); 

// Conta quantas tentativas o jogador já fez (inicia em 1)
let tentativas = 1; 

/***********************************************
 * FUNÇÕES DE INTERAÇÃO COM A INTERFACE (UI)
 ***********************************************/

/**
 * Atualiza o conteúdo de um elemento HTML e narra o texto.
 * @param {string} tag - Seletor CSS do elemento (ex: 'h1', '#id')
 * @param {string} texto - Conteúdo a ser exibido
 */
function exibirTextoNaTela(tag, texto) {
    // 1. Localiza o elemento no DOM usando o seletor
    let campo = document.querySelector(tag); 
    
    // 2. Insere o texto no elemento HTML
    campo.innerHTML = texto; 
    
    // 3. Usa biblioteca externa para sintetizar voz (text-to-speech)
    responsiveVoice.speak(
        texto, 
        'Brazilian Portuguese Female', // Voz em português
        { rate: 1.3 } // Velocidade 30% mais rápida
    );
}

/**
 * Exibe as mensagens iniciais do jogo no título e parágrafo.
 */
function exibirMensagemInicial() {
    // Exibe no <h1> o título do jogo
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    
    // Exibe no <p> as instruções iniciais
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// Executa a função de mensagem inicial assim que o jogo carrega
exibirMensagemInicial();

/***********************************************
 * LÓGICA PRINCIPAL DO JOGO
 ***********************************************/

/**
 * Função chamada quando o jogador submete um palpite.
 * Verifica se o chute está correto e dá feedback.
 */
function verificarChute() {
    // 1. Obtém o valor digitado pelo jogador (string)
    let chute = document.querySelector('input').value;
    
    // 2. Compara o chute com o número secreto (coerção para number)
    if (chute == numeroSecreto) { 
        // 3. Se acertou:
        exibirTextoNaTela('h1', 'Acertou!'); // Atualiza título
        
        // 4. Define plural/singular da mensagem
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        
        // 5. Cria mensagem personalizada com template string
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas); // Exibe no parágrafo
        
        // 6. Habilita o botão "Novo Jogo"
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // 7. Se errou:
        if (chute > numeroSecreto) {
            // Dica: número secreto é menor
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            // Dica: número secreto é maior
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        
        // 8. Incrementa o contador de tentativas
        tentativas++;
        
        // 9. Limpa o campo de input
        limparCampo();
    }
}

/***********************************************
 * FUNÇÕES AUXILIARES
 ***********************************************/

/**
 * Gera um número aleatório único entre 1 e numeroLimite que é 10.
 * @returns {number} Número não repetido
 */
function gerarNumeroAleatorio() {
    // 1. Gera número aleatório de 1 a 10 (ex: 0.7 * 10 = 7 → 7 + 1 = 8)
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    
    // 2. Verifica quantos números já foram sorteados
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    // 3. Se todos os números já foram usados (10 números), reseta a lista pois já encheu os 10 número do limite setado nas variáveis globais.
    if (quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = []; // Reinicia o histórico
    }
    
    // 4. Verifica se o número já existe na lista
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // 5. Se existe, chama a função novamente (recursão)
        return gerarNumeroAleatorio();
    } else {
        // 6. Se não existe:
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona à lista
        console.log('Números já sorteados:', listaDeNumerosSorteados); // Debug
        
        // 7. Retorna o novo número secreto
        return numeroEscolhido;
    }
}

/**
 * Limpa o conteúdo do campo de input
 */
function limparCampo() {
    // 1. Localiza o elemento input
    let chute = document.querySelector('input');
    
    // 2. Define o valor como string vazia
    chute.value = '';
}

/**
 * Reinicia todo o estado do jogo para os valores iniciais
 */
function reiniciarJogo() {
    // 1. Gera novo número secreto
    numeroSecreto = gerarNumeroAleatorio();
    
    // 2. Limpa o campo de input
    limparCampo();
    
    // 3. Reseta o contador de tentativas
    tentativas = 1;
    
    // 4. Exibe mensagens iniciais
    exibirMensagemInicial();
    
    // 5. Desabilita o botão "Novo Jogo"
    document.getElementById('reiniciar').setAttribute('disabled', true);
}