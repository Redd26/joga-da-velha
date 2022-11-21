// Variaveis Tabuleiro
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');

// Variaveis Tela Final
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButtonElement = document.querySelectorAll('[data-restart-button]');

// Variaveis Pontuação
const xScore = document.querySelector('[data-x-score]');
let xScorePoints = 0;
xScore.innerText = xScorePoints;
const circleScore = document.querySelector('[data-circle-score]');
let circleScorePoints = 0;
circleScore.innerText = circleScorePoints;

const hideElement = document.querySelector('[data-hide-element]');

// Variaveis Menu
const burgerContainer = document.getElementById("burger-container");
const burgerMenu = document.getElementById("checkbox-menu");
const menuItens = document.getElementById("menuItens");
const header = document.getElementById("myHeader");
const sobreButton = document.querySelector('[data-sobre]');

let isCircleTurn;

const winningCombinations = [
    // HORIZONTAL
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // VERTICAL
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // DIAGONAL
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('X');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener("click", handleClick, { once: true});
    }

    setBoardHoverPlayer();
    hideElement.classList.remove('hide-element');
    winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = 'EMPATE';
    } else {
        if (isCircleTurn) {
            addScore(circleScore, circleScorePoints);
            winningMessageTextElement.innerText = 'O Venceu';
        } else {
            addScore(xScore, xScorePoints);
            winningMessageTextElement.innerText = 'X Venceu';
        }
    }

    hideElement.classList.add('hide-element');
    winningMessage.classList.add('show-winning-message');
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
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

const addScore = (scoreBoard, score) => {
    score++;
    scoreBoard.innerText = score;
}

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
