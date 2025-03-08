const Gameboard = require("./gameboard.js");
const Ship = require("./ship.js");

class Player {
    constructor () {
        this.fleet = {
            carrier: new Ship(5),
            battleship: new Ship(4),
            destroyer: new Ship(3),
            submarine: new Ship(3),
            patrol: new Ship(2),
        }
        this.board = new Gameboard()
    }
}