import Game from './game.js';
console.log("Battleship Game Loaded!");

const newGame = new Game;

function createGrid(elementId) {
    const grid = document.getElementById(elementId);
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        grid.appendChild(cell);
    }
}

function logMessage(message) {
    document.getElementById("log").innerText = message;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        logMessage("Processing move...");
        setTimeout(() => logMessage("Attack registered!"), 1000);
    }
});

createGrid("player-grid");
createGrid("cpu-grid");

newGame.start();