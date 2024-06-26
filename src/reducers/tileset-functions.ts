import shuffle from 'shuffle-array';
import { isSolvable } from './solvableChecker';

//
// The TileSet is an array of length size*size representing
// a size*size matrix with unique values [0...(size*size -1)]
// A tile value/id represents a slice of an image
// When array[i] === i+1, the tile is correctly positioned in the matrix
// The value 0 represents a blank tile
// In the unshuffled TileSet, the blank tile is positioned in the lower
// right corner
//

export function generateTileSet(size: number, doShuffling: boolean): number[] {
    let newTilesArray: number[] = [];
    for (let i = 0; i < size * size; i++) {
        newTilesArray[i] = i + 1;
    }
    const blankTileIdx = size * size - 1;
    newTilesArray[blankTileIdx] = 0;

    if (doShuffling) {
        let solvable = false;
        while (!solvable) {
            newTilesArray = shuffle(newTilesArray);
            solvable = isSolvable(size, newTilesArray);
        }
    }
    return newTilesArray;
}

export function swapTilesInSet(tiles: number[], sourceId: number, destId: number): number[] {
    let sourceIdx = tiles.findIndex((t) => t === sourceId);
    let source = tiles[sourceIdx];
    let destIdx = tiles.findIndex((t) => t === destId);
    let dest = tiles[destIdx];
    tiles[destIdx] = source;
    tiles[sourceIdx] = dest;
    return tiles;
}

export function allTilesAreAligned(tiles: number[]): boolean {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] !== 0 && tiles[i] !== i + 1) {
            return false;
        }
    }
    return true;
}

export function tileIsValidForMovement(id: number, size: number, tiles: number[]): boolean {
    if (id < 1 || id > size * size - 1) {
        return false;
    }
    return tileIsMovable(size, id, tiles);
}

export function tileIsMovable(size: number, id: number, tiles: number[]): boolean {
    const idx = tiles.findIndex((t) => t === id);
    const row = Math.floor(idx / size);
    if (row < size - 1) {
        // Check below
        if (tiles[idx + size] === 0) {
            return true;
        }
    }
    if (row > 0) {
        // Check above
        if (tiles[idx - size] === 0) {
            return true;
        }
    }
    const col = idx % size;

    if (col < size - 1) {
        // check to the right
        if (tiles[idx + 1] === 0) {
            return true;
        }
    }
    if (col > 0) {
        // check to the left
        if (tiles[idx - 1] === 0) {
            return true;
        }
    }

    return false;
}

export function getIndexInHighScoreList(newUserId: string, userTime: number, score: number, highScoreList: any): number {
    const resultsCopy = highScoreList.results.map((r:any) => {
        return {
            id: r.id,
            score: r.score,
            time: isNaN(Date.parse(r.utcDateTime)) ? 0 : Date.parse(r.utcDateTime)
        };
    });
    resultsCopy.push({
        id: newUserId,
        score,
        time: userTime
    });
    resultsCopy.sort((a:any, b:any) => a.score - b.score || b.time - a.time);

    let idxInHighScoreList = resultsCopy.findIndex((r:any) => r.id === newUserId);
    if (idxInHighScoreList > -1 && idxInHighScoreList + 1 <= highScoreList.maxSize) {
        return idxInHighScoreList;
    } else {
        return -1;
    }
}
