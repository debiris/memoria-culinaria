// Espera até que todo o conteúdo da página seja carregado antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona elementos HTML por ID
    const gameBoard = document.getElementById("game-board");
    const confirmButton = document.getElementById("confirm-selection");
    const resultMessage = document.getElementById("result-message");
    const newGameButton = document.getElementById("new-game");
    const showRecipeButton = document.getElementById("show-recipe");

    // Armazena as cartas selecionadas e o número de pares encontrados
    let selectedCards = [];
    let matchedPairs = 0;

    // Define os dados das cartas
    const cards = [
        { id: 1, pair: 1, imgSrc: 'images/imagem1.jpg' },
        { id: 2, pair: 1, imgSrc: 'images/imagem1.jpg' },
        { id: 3, pair: 2, imgSrc: 'images/imagem2.jpg' },
        { id: 4, pair: 2, imgSrc: 'images/imagem2.jpg' },
        { id: 5, pair: 3, imgSrc: 'images/imagem3.jpg' },
        { id: 6, pair: 3, imgSrc: 'images/imagem3.jpg' },
        { id: 7, pair: 4, imgSrc: 'images/imagem4.jpg' },
        { id: 8, pair: 4, imgSrc: 'images/imagem4.jpg' },
        { id: 9, pair: 5, imgSrc: 'images/imagem5.jpg' },
        { id: 10, pair: 5, imgSrc: 'images/imagem5.jpg' }
    ];

    // Função para embaralhar as cartas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Função para criar o tabuleiro de jogo
    function createBoard() {
        // Limpa o conteúdo atual do tabuleiro
        gameBoard.innerHTML = '';
        // Embaralha as cartas antes de adicioná-las ao tabuleiro
        shuffle(cards);
        // Cria elementos de cartas e adiciona ao tabuleiro
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;
            cardElement.dataset.pair = card.pair;

            const imgElement = document.createElement('img');
            imgElement.src = card.imgSrc;
            imgElement.alt = `Imagem do par ${card.pair}`;
            imgElement.style.display = 'none';

            cardElement.appendChild(imgElement);
            // Adiciona um evento de clique para selecionar a carta
            cardElement.addEventListener('click', () => selectCard(cardElement));
            // Adiciona a carta ao tabuleiro
            gameBoard.appendChild(cardElement);
        });
    }

    // Função para selecionar uma carta
    function selectCard(cardElement) {
        // Verifica se menos de duas cartas foram selecionadas e se a carta clicada não está na lista de selecionadas
        if (selectedCards.length < 2 && !selectedCards.includes(cardElement)) {
            cardElement.classList.add('selected');
            selectedCards.push(cardElement);
        }
    }

    // Função para revelar as cartas selecionadas
    function revealCards() {
        selectedCards.forEach(card => {
            card.classList.add('revealed');
            card.querySelector('img').style.display = 'block'; // Exibe a imagem da carta
        });
    }

    // Função para esconder as cartas que não foram pares
    function hideCards() {
        selectedCards.forEach(card => {
            card.classList.remove('selected');
            card.querySelector('img').style.display = 'none'; // Oculta a imagem da carta
            card.classList.add('orange'); // Adiciona a classe para alterar a aparência
        });
    }

    // Adiciona um evento de clique ao botão de confirmação
    confirmButton.addEventListener("click", () => {
        // Verifica se exatamente duas cartas foram selecionadas
        if (selectedCards.length === 2) {
            revealCards();
            // Verifica se as cartas selecionadas formam um par
            if (selectedCards[0].dataset.pair === selectedCards[1].dataset.pair) {
                matchedPairs++;
                setTimeout(() => {
                    selectedCards = [];
                    // Verifica se todos os pares foram encontrados
                    if (matchedPairs === cards.length / 2) {
                        resultMessage.classList.remove('hidden'); // Exibe a mensagem de resultado
                    }
                }, 1000); // Tempo para mostrar as cartas antes de limpar a seleção
            } else {
                setTimeout(() => {
                    hideCards(); // Esconde as cartas que não formam um par
                    selectedCards = [];
                }, 3000); // Tempo para mostrar as cartas antes de escondê-las
            }
        }
    });

    // Adiciona um evento de clique ao botão de novo jogo
    newGameButton.addEventListener("click", () => {
        matchedPairs = 0; // Reinicia o contador de pares encontrados
        createBoard(); // Cria um novo tabuleiro
        resultMessage.classList.add('hidden'); // Esconde a mensagem de resultado
    });

    // Adiciona um evento de clique ao botão de mostrar receita
    showRecipeButton.addEventListener("click", () => {
        // Seleciona uma receita aleatória da lista
        const randomRecipe = receitas[Math.floor(Math.random() * receitas.length)];
        // Abre a página de receita em uma nova aba
        window.open(`receitas.html?titulo=${encodeURIComponent(randomRecipe.titulo)}`, '_blank');
    });

    // Cria o tabuleiro quando a página é carregada
    createBoard();
});

