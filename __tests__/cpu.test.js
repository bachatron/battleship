const { Cpu } = require("../player.js");
const Gameboard = require("../gameboard.js");

describe("CPU Player", () => {
    let cpu, enemyBoard;

    beforeEach(() => {
        cpu = new Cpu();
        enemyBoard = new Gameboard();
    });

    test("CPU should place all ships", () => {
        cpu.randomlyPlaceShips();

        // Count the number of placed ships on the board
        let shipCount = 0;
        for (let row of cpu.board.board) {
            for (let cell of row) {
                if (cell !== null) {
                    shipCount++;
                }
            }
        }

        expect(shipCount).toBeGreaterThan(0); // At least one ship must be placed
        expect(shipCount).toEqual(17); // All ships must be placed
    });

    test("CPU should attack without repeating coordinates", () => {
        cpu.attack(enemyBoard);
        cpu.attack(enemyBoard);
        cpu.attack(enemyBoard);

        expect(cpu.attackedCoordinates.size).toBe(3); // Three unique attacks should be registered
    });

    test("CPU should generate a valid coordinate", () => {
        const coordinate = cpu.getRandomCoordinate();
        expect(coordinate).toMatch(/^[A-J](10|[1-9])$/); // Should match a valid board coordinate
    });
});