import Player from "./player.js"
import {
    getRandomCoordinate,
    getAdjacentCoordinates,
    shuffle,
    isShipVertical,
    extendAttackLine,
    filterQueueByDirection,
} from "./cpuHelpers.js"

class Cpu extends Player {
    constructor () {
        super();
        this.successfulHits = [];
        this.attackQueue = [];
    }

    randomlyPlaceShips () {
        for (const [key, value] of Object.entries(this.fleet)) {
            
            let success = false

            while (!success) {
                const coordinate = getRandomCoordinate();
                const isVertical = Math.random() < 0.5;

                success = this.board.placeShip(coordinate, value, isVertical);
            }
        }
    }

    enqueueAdjacents(coord) {
        const newTargets = getAdjacentCoordinates(coord, this.attackedCoordinates);
        this.attackQueue.push(...shuffle(newTargets));
    }
  
    attack (opponentBoard) {
        let coordinate;

        // Choose coordinate from attackQueue or randomly
        if (this.attackQueue.length > 0) {
            // If we've already hit at least 2 cells, filter the queue to follow the likely direction
            if (this.successfulHits.length > 1) {
                const vertical = isShipVertical(this.successfulHits[0], this.successfulHits[1]);
        
                this.attackQueue = filterQueueByDirection(this.attackQueue, this.successfulHits, vertical);
            }
        
            // Pick the next coordinate from the queue
            coordinate = this.attackQueue.shift();
        } else {
            // Otherwise, choose a new random coordinate that hasn't been attacked yet
            do {
                coordinate = getRandomCoordinate();
            } while (this.attackedCoordinates.has(coordinate));
        }

        // Mark this coordinate as attacked
        this.attackedCoordinates.add(coordinate);

        // Perform the attack and get the result
        const result = opponentBoard.receiveAttack(coordinate);

        // If it was a hit:
        if (result?.hit) {
            this.successfulHits.push(coordinate);
        
            // If the ship was sunk, reset the hunt state
            if (result.sunk) {
                this.successfulHits = [];
                this.attackQueue = [];
                return;
            }
        
            // If we've hit multiple parts of a ship, try to extend the attack in that direction
            if (this.successfulHits.length > 1) {
                const vertical = isShipVertical(this.successfulHits[0], this.successfulHits[1]);
                const lineTargets = extendAttackLine(this.successfulHits, vertical, this.attackedCoordinates);
        
                // If we found viable extension targets, prioritize them
                if (lineTargets.length > 0) {
                    this.attackQueue = [...new Set([...lineTargets, ...this.attackQueue])];
                    return;
                }
            }
        
            // Otherwise, enqueue adjacent cells to continue the hunt
            this.enqueueAdjacents(coordinate);
        }
        
        // Debug output
        //console.log(this.successfulHits);
        //console.log(this.attackQueue);
    }
}

export default Cpu ;