import EventEmitter from "./eventEmitter.js";

class Gameboard {
    constructor () {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    }

    convertCoordinate(coordinate) {
        const letterToIndex = {
            A: 0, B: 1, C: 2, D: 3, E: 4, 
            F: 5, G: 6, H: 7, I: 8, J: 9
        };        

        const letter = coordinate[0].toUpperCase();
        const number = parseInt(coordinate.slice(1)) - 1; 
    
        return [letterToIndex[letter], number];
    }

    receiveAttack(coordinate) {
        const [row, col] = this.convertCoordinate(coordinate);
        const miss = 'x';
        const cell = this.board[row][col];
    
        if (cell && cell !== miss) {
            cell.hit([row,col]); // Log hit position as string
            EventEmitter.emit('log', `Attack landed on ${coordinate}.`);
            
            if (cell.isSunk()) {
                EventEmitter.emit('log', `A ship has been sunk!`);
            };

            return {hit: true, sunk: cell.isSunk()};

        } else {
            this.board[row][col] = miss;
            EventEmitter.emit('log', `Missed attack at ${coordinate}.`);
            return {hit: false};
        }
    }
    

    placeShip (coordinate, ship, isVertical) {
        const [row, col] = this.convertCoordinate(coordinate);

        // Out-of-bounds check
        if (isVertical && row + ship.length > 10) {
            EventEmitter.emit('log',"Ship placement out of bounds!");
            return false;
        }
        if (!isVertical && col + ship.length > 10) {
            EventEmitter.emit('log',"Ship placement out of bounds!");
            return false;
        }

        // Check if space is already occupied
        for (let i = 0; i < ship.length; i++) {
            if (isVertical) {
                if (this.board[row + i][col] !== null) {
                    EventEmitter.emit('log',"Ship placement overlaps another ship!");
                    return false;
                }
            } else {
                if (this.board[row][col + i] !== null) {
                    EventEmitter.emit('log',"Ship placement overlaps another ship!");
                    return false;
                }
            }
        }

        // Place the ship
        for (let i = 0; i < ship.length; i++) {
            if (isVertical) {
                this.board[row + i][col] = ship;
            } else {
                this.board[row][col + i] = ship;
            }
        }

        return true; // Indicate success
    }

}

export default Gameboard;
