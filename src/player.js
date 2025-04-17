import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import EventEmitter from "./eventEmitter.js";

export class Player {
    constructor () {
        this.fleet = {
            carrier: new Ship(5),
            battleship: new Ship(4),
            destroyer: new Ship(3),
            submarine: new Ship(3),
            patrol: new Ship(2),
        }
        this.board = new Gameboard()
        this.attackedCoordinates = new Set();
    }

    allShipsSunk () {
        return Object.values(this.fleet).every(ship => ship.isSunk());
    }
}

class HumanPlayer extends Player {
    constructor () {
        super();
    }

    getInput(message) {
        return new Promise((resolve) => {
            const inputField = document.getElementById("coordinateInput");
    
            EventEmitter.emit('log', message);
            inputField.focus();
    
            function handleInput(event) {
                if (event.key === "Enter") {
                    const value = inputField.value.trim().toUpperCase();
                    //console.log("handleInput: " + value);
                    if (value) {
                        //console.log(`User input received: ${value}`); // Debugging log
                        inputField.value = ""; // Clear input after submission
                        inputField.removeEventListener("keydown", handleInput);
                        resolve(value);
                    }
                }
            }
    
            inputField.addEventListener("keydown", handleInput);
        });
    }
    

    async getValidCoordinate(message) {
        while (true) {
            const coordinate = await this.getInput(message);

            if (!/^[A-J](10|[1-9])$/.test(coordinate)) {
                EventEmitter.emit('log', "Invalid coordinate! Must be a letter (A-J) and a number (1-10). Try again.");
            } else if (this.attackedCoordinates.has(coordinate)) {
                EventEmitter.emit('log', "You've already attacked that coordinate. Try a different one.");
            } else {
                return coordinate;
            }
        }
    }
    
    getOrientation() {
        let button = document.getElementById("orientationButton");
        let orientation = button.textContent === "Vertical" ? "Vertical" : "Horizontal";
        return orientation === "Vertical";
    };

        
    async placeShipOnBoard() {
        //console.log('placeShipOnBoard Started')
        for (const [key, value] of Object.entries(this.fleet)) {
            let success = false;
    
            //console.log(`Placing ${key}...`);
    
            while (!success) {
                let coordinate = await this.getValidCoordinate(`Enter coordinate for the ${key}`);
                //console.log(`User entered coordinate: ${coordinate}`);
    
                let isVertical = this.getOrientation();
                //console.log('Is vertical: ' + isVertical)
    
                success = this.board.placeShip(coordinate, value, isVertical);
                if (!success) {
                    //console.log("Invalid ship placement, retrying...");
                    EventEmitter.emit('log', "Invalid placement. Try again!");
                }
            }
            EventEmitter.emit("render");
            //console.log(`${key} placed successfully!`);
        }
    }
    
    async attack(opponentBoard) {
        let coordinate;
        do {
            coordinate = await this.getValidCoordinate("Enter attack coordinate (e.g., 'D7'):");
        } while (this.attackedCoordinates.has(coordinate));
    
        this.attackedCoordinates.add(coordinate);
        opponentBoard.receiveAttack(coordinate);
    }
}

export default HumanPlayer;



