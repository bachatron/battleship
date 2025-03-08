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

module.exports = Ship;