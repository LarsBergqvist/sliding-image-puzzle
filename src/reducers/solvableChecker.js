//
// from https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
//

export function isSolvable(size, idArray) {
    //
    // Checks if an array of length size * size
    // representing an two-dimensional matrix with width and height size
    // is solvable as a sliding puzzle.
    // An item value of 0 represents the blank tile
    // The other items in the array are filled with distinct values
    // 1...size*size-1
    //
    let invCount = getInvCount(size, idArray);

    if (size & 1) {
        // If size is odd, puzzle is solvable if inversion
        // count is even.
        return !(invCount & 1);
    } else {
        // If size is even, the puzzle is solvable if
        //   - inversion count is odd and the blank tile appears on an even row counting from bottom
        //   - inversion count is even and the blank tile appears on an odd row counting from bottom
        let rowFromBottom = findBlankRowPositionFromBottom(size, idArray);
        if (rowFromBottom & 1)
            return !(invCount & 1);
        else
            return invCount & 1;
    }
}

function getInvCount(size, idArray) {
    //
    // Count number of inversions in the array,
    // i.e. how many pairs (array[i], array[j]) exist
    // for j > i where array[i] > array[j]
    //
    let invCount = 0;
    for (let i = 0; i < size * size - 1; i++) {
        for (let j = i + 1; j < size * size; j++) {
            if (idArray[j] && idArray[i] && (idArray[i] > idArray[j])) {
                invCount++;
            }
        }
    }
    return invCount;
}

function findBlankRowPositionFromBottom(size, idArray) {
    const blankTileIdx = idArray.findIndex(t => t === 0);
    const row = Math.floor(blankTileIdx / size);
    let rowFromBottom = size - row;
    return rowFromBottom;
}