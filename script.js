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
        this.board = {
    
            A: [null, null, null, null, null, null, null, null, null, null],
            B: [null, null, null, null, null, null, null, null, null, null],
            C: [null, null, null, null, null, null, null, null, null, null],
            D: [null, null, null, null, null, null, null, null, null, null],
            E: [null, null, null, null, null, null, null, null, null, null],
            F: [null, null, null, null, null, null, null, null, null, null],
            G: [null, null, null, null, null, null, null, null, null, null],
            H: [null, null, null, null, null, null, null, null, null, null],
            I: [null, null, null, null, null, null, null, null, null, null],
            J: [null, null, null, null, null, null, null, null, null, null],
        
        }
    }

    receiveAttack (coordinate) {
        const vCord = coordinate[0];
        const hCord = parseInt(coordinate.slice(1)) - 1;

        if (this.board[vCord][hCord]) {
            this.board[vCord][hCord].hit();
        } else {
            this.board[vCord][hCord] = 'x'
        };
    }

}