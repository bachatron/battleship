const { HumanPlayer, Cpu } = require('./player');

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
        console.log('Players turn, proceed to select the coordinate for attack.')
        this.player.attack(this.cpu.board);
        console.log('Now its CPU turn.');
        this.cpu.attack(this.player.board);
    }

    cpu.randomlyPlaceShips();
    newPlayer.placeShipOnBoard()

    while ((Object.keys(newPlayer.fleet))){

    }




}

