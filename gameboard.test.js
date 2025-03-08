const Gameboard = require("./gameboard"); // Adjust path as needed
const Ship = require("./ship"); // Assuming you have a Ship class

describe("Gameboard.placeShip()", () => {
    let board;
    
    beforeEach(() => {
        board = new Gameboard();
    });

    test("Places ship correctly (horizontal)", () => {
        const ship = new Ship(3);
        const result = board.placeShip("B3", ship, false);
        expect(result).toBe(true);
        expect(board.board[1][2]).toBe(ship); // "B3" -> (1,2)
        expect(board.board[1][3]).toBe(ship);
        expect(board.board[1][4]).toBe(ship);
    });

    test("Places ship correctly (vertical)", () => {
        const ship = new Ship(4);
        const result = board.placeShip("D5", ship, true);
        expect(result).toBe(true);
        expect(board.board[3][4]).toBe(ship); // "D5" -> (3,4)
        expect(board.board[4][4]).toBe(ship);
        expect(board.board[5][4]).toBe(ship);
        expect(board.board[6][4]).toBe(ship);
    });

    test("Prevents placement out of bounds (horizontal)", () => {
        const ship = new Ship(5);
        const result = board.placeShip("J7", ship, false); // "J7" (9,6), goes past index 9
        expect(result).toBe(false);
    });

    test("Prevents placement out of bounds (vertical)", () => {
        const ship = new Ship(4);
        const result = board.placeShip("H5", ship, true); // "H5" (7,4), goes past index 9
        expect(result).toBe(false);
    });

    test("Prevents overlapping ships", () => {
        const ship1 = new Ship(3);
        const ship2 = new Ship(3);
        board.placeShip("B3", ship1, false);
        const result = board.placeShip("B4", ship2, false); // Overlaps with ship1
        expect(result).toBe(false);
    });
});