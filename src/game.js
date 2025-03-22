import { HumanPlayer, Cpu } from './player.js';

class Game {
    constructor () {
        this.player = new HumanPlayer();
        this.cpu = new Cpu();
    }

    loadBoards () {
        this.cpu.randomlyPlaceShips();
        console.log('Please choose where to place your fleet.');
        this.player.placeShipOnBoard();
    }

    playRound () {
        console.log('Player’s turn! Select a coordinate for attack.')
        this.player.attack(this.cpu.board);
        console.log('Now it’s the CPU’s turn.');
        this.cpu.attack(this.player.board);
        this.showBoards();
    }

    isGameOver () {
        return this.player.allShipsSunk() || this.cpu.allShipsSunk();
    }

    start () {
        this.loadBoards();
        console.log("Starting next phase...");
        while (!this.isGameOver()) {
            this.playRound();
        }
        console.log('The game has ended!');
    }

    showBoards () {
        console.log(this.player.board);
        console.log(this.cpu.board);
    }
}

export default Game;