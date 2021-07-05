import shuffle from 'shuffle-array';
import {
    PuzzleWidth
} from './constants';
import {
    isSolvable
} from './solvableChecker';

export function generateTileSet(size, doShuffling) {
    const tileWidth = PuzzleWidth / size;
    let newTilesArray = [];
    for (let i = 0; i < size * size; i++) {
        let newTile = {
            id: i + 1,
            top: -(Math.floor(i / size)) * tileWidth,
            left: i < size ? -i * tileWidth : -(i % size) * tileWidth,
            pos: i
        };
        newTilesArray.push(newTile);
    }
    const blankTileIdx = size * size - 1;
    newTilesArray[blankTileIdx].id = 0;

    if (doShuffling) {
        let solvable = false;
        while (!solvable) {
            newTilesArray = shuffleTileSet(size, newTilesArray);
            solvable = isSolvable(size, newTilesArray.map(t => t.id));
        }
    }
    return newTilesArray;
}

function shuffleTileSet(size, tiles) {
    const newTiles = shuffle(tiles);
    for (let i = 0; i < size * size; i++) {
        let tile = newTiles[i];
        tile.pos = i;
    }

    return newTiles;
}

export function swapTilesInSet(tiles, id1, id2) {
    let source = Object.assign({}, tiles.find(t => t.id === id1));
    let dest = Object.assign({}, tiles.find(t => t.id === id2));
    let sourcePos = source.pos;
    source.pos = dest.pos;
    tiles[source.pos] = source;
    dest.pos = sourcePos;
    tiles[dest.pos] = dest;
    return tiles;
}

export function allTilesAreAligned(tiles) {
    return (tiles.findIndex(t => (t.id !== (t.pos + 1)) && t.id !== 0) === -1);
}

export function hasEmptyTileOnSides(size, id, tiles) {
    const tile = tiles.find(t => t.id === id);
    const pos = tile.pos;
    const row = Math.floor(pos / size);
    if (row < (size - 1)) {
        // Check below
        if (tiles[pos + size].id === 0) {
            return true;
        }
    }
    if (row > 0) {
        // Check above
        if (tiles[pos - size].id === 0) {
            return true;
        }
    }
    const col = pos % size;

    if (col < (size - 1)) {
        // check to the right
        if (tiles[pos + 1].id === 0) {
            return true;
        }
    }
    if (col > 0) {
        // check to the left
        if (tiles[pos - 1].id === 0) {
            return true;
        }
    }

    return false;
}