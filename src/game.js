import HumanPlayer from './player.js';
import EventEmitter from './eventEmitter.js';
import Cpu from './cpu.js';

class Game {
    constructor () {
        this.player = new HumanPlayer();
        this.cpu = new Cpu();
    }

    async loadBoards () { // Make it async
        this.cpu.randomlyPlaceShips();
        EventEmitter.emit('log', 'Please choose where to place your fleet.');
        await this.player.placeShipOnBoard(); // Await user input
        //console.log('All ships placed succesfully')
    }

    async playRound() { 
        //console.log("Player's turn started");
        //EventEmitter.emit('log', "Player’s turn! Select a coordinate for attack.");
        
        await this.player.attack(this.cpu.board); // Wait for player input
        //console.log("Player's attack completed");
    
        if (this.isGameOver()) {
            //console.log("Game over after player's turn");
            return;
        }
    
        //console.log("CPU's turn started");
        EventEmitter.emit('log', "Now it’s the CPU’s turn.");
        
        this.cpu.attack(this.player.board); // CPU moves
        //console.log("CPU's attack completed");
    
        if (this.isGameOver()) {
            //console.log("Game over after CPU's turn");
            return;
        }
        //console.log("Round completed, next round starts");
    }
    

    isGameOver () {
        return this.player.allShipsSunk() || this.cpu.allShipsSunk();
    }

    async start () { // Make it async
        EventEmitter.emit("render");
        await this.loadBoards(); // Ensure ships are placed before continuing
        EventEmitter.emit('log', "Starting next phase...");

        while (!this.isGameOver()) {
            await this.playRound(); // Wait for player input before continuing
            EventEmitter.emit("render");
        }

        EventEmitter.emit('log', 'The game has ended!');
    }
}

export default Game;
