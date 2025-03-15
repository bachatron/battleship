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

class HumanPlayer extends Player {
    constructor () {
        super();
    }

    getInput (message) {
        if (typeof this.testInput === "function") {
            return this.testInput(message);
        }
        return prompt(message).toUpperCase();
    }

    getValidCoordinate(message) {
        let coordinate;
        while (true) {
            coordinate = this.getInput(message);
            if (/^[A-J](10|[1-9])$/.test(coordinate)) break;
            alert("Invalid coordinate! Must be a letter (A-J) and a number (1-10). Try again.");
        }
        return coordinate;
    }

    placeShipOnBoard () {

        for (const [key, value] of Object.entries(this.fleet)) {

            let success = false

            while (!success) {

                let coordinate = this.getValidCoordinate(`Enter coordinate for the ${key} (e.g., "B4"):`);
                let isVertical;

                // Validate orientation input ("V" or "H")
                while (true) {
                    let input = this.getInput('Vertical (V) or Horizontal (H)?');
                    if (input === "V" || input === "H") {
                        isVertical = input === "V";
                        break;
                    }
                    alert("Invalid input! Enter 'V' for Vertical or 'H' for Horizontal.");
                }
                success = this.board.placeShip(coordinate, value, isVertical);
                if (!success) alert ("Invalid placement. Try again!")
            }

            
        }
    }
    
    attack(opponentBoard) {
        let coordinate = this.getValidCoordinate("Enter attack coordinate (e.g., 'D7'):");
        opponentBoard.receiveAttack(coordinate);
    }
}

class Cpu extends Player {
    constructor () {
        super();
        this. attackedCoordinates = new Set();
    }

    getRandomCoordinate () {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

        const v = letters[Math.floor(Math.random() * 10)];
        const h = Math.floor(Math.random() * 10) + 1;

        return `${v}${h}`
    }

    randomlyPlaceShips () {
        for (const [key, value] of Object.entries(this.fleet)) {
            
            let success = false

            while (!success) {
                const coordinate = this.getRandomCoordinate();
                const isVertical = Math.random() < 0.5;

                success = this.board.placeShip(coordinate, value, isVertical);
            }
        }
    }

    attack (opponentBoard) {
        let coordinate;
    
        // Keep generating random coordinates until a new one is found
        do {
            coordinate = this.getRandomCoordinate();
        } while (this.attackedCoordinates.has(coordinate)); 

        this.attackedCoordinates.add(coordinate); // Store attack
        opponentBoard.receiveAttack(coordinate);
    }
}

module.exports = { HumanPlayer, Cpu };