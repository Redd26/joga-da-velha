// Variaveis Tabuleiro
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const strike = document.getElementById("strike");

// Variaveis Tela Final
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButtonElement = document.querySelectorAll('[data-restart-button]');

// Variaveis Pontuação
const playerTurnIndicator = document.getElementById("slider");
const xColor = "rgba(255, 60, 172, 1)";
const circleColor = "rgba(43, 134, 197, 1)";
const xScore = document.querySelector('[data-x-score]');
let xScorePoints = 0;
const circleScore = document.querySelector('[data-circle-score]');
let circleScorePoints = 0;

const hideElement = document.querySelectorAll('[data-hide-element]');

// Variaveis Menu
const burgerContainer = document.getElementById("burger-container");
const burgerMenu = document.getElementById("checkbox-menu");
const menuItens = document.getElementById("menuItens");
const header = document.getElementById("myHeader");
const sobreButton = document.querySelector('[data-sobre]');

let isCircleTurn;

const winningCombinations = [
    // HORIZONTAL
    { combo: [0, 1, 2], strikeClass: "strike-l1" },
    { combo: [3, 4, 5], strikeClass: "strike-l2" },
    { combo: [6, 7, 8], strikeClass: "strike-l3" },

    // VERTICAL
    { combo: [0, 3, 6], strikeClass: "strike-c1" },
    { combo: [1, 4, 7], strikeClass: "strike-c2" },
    { combo: [2, 5, 8], strikeClass: "strike-c3" },

    // DIAGONAL
    { combo: [0, 4, 8], strikeClass: "strike-d1" },
    { combo: [2, 4, 6],strikeClass: "strike-d2" }
];

const combos = winningCombinations.map(e => e.combo);
const strikeClasses = winningCombinations.map(c => c.strikeClass);

const startGame = () => {
    isCircleTurn = false;
    changePlayerIndicator(isCircleTurn);

    for (const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('X');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener("click", handleClick, { once: true});
    }

    setupScore();
    setBoardHoverPlayer();
    hideElement.forEach(hideElement =>
        hideElement.classList.remove('hide-element'));
    winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = 'EMPATE';
    } else {
        if (isCircleTurn) {
            winningMessageTextElement.innerText = 'O Venceu';
        } else {
            winningMessageTextElement.innerText = 'X Venceu';
        }
    }

    hideElement.forEach(hideElement =>
        hideElement.classList.add('hide-element'));
    winningMessage.classList.add('show-winning-message');
};

const checkForWin = (currentPlayer) => {
    return combos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('circle');
    });
};

const setupScore = () => {
    xScore.innerText = xScorePoints;
    circleScore.innerText = circleScorePoints;
};

const changePlayerIndicator = (isCircleTurn) => {
    if (isCircleTurn) {
        playerTurnIndicator.style.left = "50%";
        playerTurnIndicator.style.background = circleColor;
    } else {
        playerTurnIndicator.style.left = "0";
        playerTurnIndicator.style.background = xColor;
    }
};

const addScore = (currentPlayer) => {
    if (currentPlayer === 'circle') {
        circleScorePoints++;
    } else {
        xScorePoints++;
    }
};

const placeMark = (cell, playerToAdd) => {
    cell.classList.add(playerToAdd);
};

const setBoardHoverPlayer = () => {
    board.classList.remove('circle');
    board.classList.remove('X');

    if (isCircleTurn) {
        board.classList.add('circle');

    } else {
        board.classList.add('X');

    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverPlayer();
    changePlayerIndicator(isCircleTurn);
};

const handleClick = (e) => {
    // Coloca a marca X ou O
    const cell = e.target;
    const playerToAdd = isCircleTurn ? 'circle' : 'X';

    placeMark(cell, playerToAdd);

    // Verifica por empate
    const isDraw = checkForDraw();

    // Verifica por vitória
    const isWin = checkForWin(playerToAdd);

    if (isWin) {
        endGame(false);
        addScore(playerToAdd);
    } 
    else if (isDraw) {
        endGame(true);
    } else {
        // Muda de turno 
        swapTurns();
    }
};

const showBurgerMenu = () => {
    burgerMenu.checked = true;
    menuItens.style.display = "block";
    header.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
};

const hideBurgerMenu = () => {
    burgerMenu.checked = false;
    menuItens.style.display = "none";
    header.style.backgroundColor = "transparent";
};

const redirectPage = (button, page) => {
    button.addEventListener("click", () => {
        window.location.replace(page);
    });
};

startGame();
restartButtonElement.forEach(restartButton =>
    restartButton.addEventListener("click", startGame));

burgerContainer.addEventListener("mouseover", showBurgerMenu);
header.addEventListener("mouseleave", hideBurgerMenu);
redirectPage(sobreButton, "sobre.html");
