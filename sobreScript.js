const jogoVelhaButton = document.querySelector('[data-jogo-da-velha]');

// Variaveis Menu
const burgerContainer = document.getElementById("burger-container");
const burgerMenu = document.getElementById("checkbox-menu");
const menuItens = document.getElementById("menuItens");
const header = document.getElementById("myHeader");
const sobreButton = document.querySelector('[data-sobre]');


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

burgerContainer.addEventListener("mouseover", showBurgerMenu);
header.addEventListener("mouseleave", hideBurgerMenu);
redirectPage(jogoVelhaButton, "index.html");