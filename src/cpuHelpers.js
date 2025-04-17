export function getRandomCoordinate () {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    const v = letters[Math.floor(Math.random() * 10)];
    const h = Math.floor(Math.random() * 10) + 1;

    return `${v}${h}`
}

export function getAdjacentCoordinates(coord, attackedCoordinates) {
    const letters = 'ABCDEFGHIJ';
    const row = letters.indexOf(coord[0]);
    const col = parseInt(coord.slice(1)) - 1;

    const adjacent = [];

    if (row > 0) adjacent.push(`${letters[row - 1]}${col + 1}`); // up
    if (row < 9) adjacent.push(`${letters[row + 1]}${col + 1}`); // down
    if (col > 0) adjacent.push(`${letters[row]}${col}`);         // left
    if (col < 9) adjacent.push(`${letters[row]}${col + 2}`);     // right

    return adjacent.filter(coord => !attackedCoordinates.has(coord));
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function isShipVertical(coordA, coordB) {
    return coordA[0] !== coordB[0];
}

function parseCoord(coord) {
    const row = coord[0];
    const col = parseInt(coord.slice(1));
    return { row, col };
}

export function extendAttackLine(hits, isVertical, attackedCoordinates) {
    const letters = 'ABCDEFGHIJ';
    const coords = hits.map(parseCoord);

    coords.sort((a, b) => isVertical
        ? letters.indexOf(a.row) - letters.indexOf(b.row)
        : a.col - b.col
    );

    const first = coords[0];
    const last = coords[coords.length - 1];

    const before = isVertical
        ? { row: letters[letters.indexOf(first.row) - 1], col: first.col }
        : { row: first.row, col: first.col - 1 };

    const after = isVertical
        ? { row: letters[letters.indexOf(last.row) + 1], col: last.col }
        : { row: last.row, col: last.col + 1 };

    const valid = ({ row, col }) =>
        letters.includes(row) && col >= 1 && col <= 10;

    const toStr = ({ row, col }) => `${row}${col}`;

    return [before, after]
        .filter(valid)
        .map(toStr)
        .filter(c => !attackedCoordinates.has(c));
}

export function filterQueueByDirection(queue, successfulHits, vertical) {
    const reference = parseCoord(successfulHits[0]);
    return queue.filter(coord => {
        const parsed = parseCoord(coord);
        return vertical
            ? parsed.col === reference.col
            : parsed.row === reference.row;
    });
}