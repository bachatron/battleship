class Ship {
    constructor(length) {
        this.length = length;
        this._hitCount = 0; // Private-like variable (by convention)
    }

    get hitCount() {
        return this._hitCount;
    }

    hit() {
        this._hitCount += 1;
    }

    isSunk () {
        return this.length == this.hitCount;
    }
}


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

    receiveAttack (coordinate) {
        const [row, col] = this.convertCoordinate(coordinate)

        if (this.board[row][col]) {
            this.board[row][col].hit();
            this.board[row][col].isSunk();
        } else {
            this.board[row][col] = 'x';
        }
    }

}