import { jest } from "@jest/globals";
import { HumanPlayer } from "../player.js";
import Gameboard from "../gameboard.js";

// Mock the alert function (because it's not available in Jest)
global.alert = jest.fn();

describe("HumanPlayer", () => {
    let player;

    beforeEach(() => {
        player = new HumanPlayer();
    });

    test("should create a new HumanPlayer with a board and fleet", () => {
        expect(player.board).toBeInstanceOf(Gameboard);
        expect(Object.keys(player.fleet)).toEqual(["carrier", "battleship", "destroyer", "submarine", "patrol"]);
    });

    test("should return a valid coordinate", () => {
        // Mock user input for coordinate
        player.testInput = jest.fn()
            .mockReturnValueOnce("Z1") // Invalid input
            .mockReturnValueOnce("B5"); // Valid input

        expect(player.getValidCoordinate("Enter coordinate:")).toBe("B5");
        expect(player.testInput).toHaveBeenCalledTimes(2);
    });

    test("should attack opponent's board", () => {
        const mockBoard = { receiveAttack: jest.fn() };
        
        // Mock user input for attack coordinate
        player.testInput = jest.fn().mockReturnValue("C7");

        player.attack(mockBoard);
        
        expect(mockBoard.receiveAttack).toHaveBeenCalledWith("C7");
    });
});