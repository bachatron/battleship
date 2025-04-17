class Ship {
    constructor(length) {
        this.length = length;
        this._hitCount = 0;
        this.hitPositions = [];
    }

    get hitCount() {
        return this._hitCount;
    }

    hit(coordinate) {
        this._hitCount += 1;
        this.hitPositions.push(coordinate);
    }

    isSunk () {
        return this.length == this.hitCount;
    }
}

export default Ship;