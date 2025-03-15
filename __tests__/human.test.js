const { HumanPlayer } = require("../player.js");
const Gameboard = require("../gameboard.js");

const human = new HumanPlayer();
const enemyBoard = new Gameboard();

// Mock user input for testing
const mockInputs = ["B4", "H", "A1", "V"];
let inputIndex = 0;
human.testInput = () => mockInputs[inputIndex++];

// Test placing a ship
human.placeShipOnBoard();
console.log("Human placed ships successfully.");

// Test attacking
human.attack(enemyBoard);
console.log("Human attacked successfully.");