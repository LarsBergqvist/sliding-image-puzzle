import { generateTileSet, getIndexInHighScoreList, tileIsValidForMovement, allTilesAreAligned, swapTilesInSet } from './tileset-functions';

test('Generate unshuffled tile set', () => {
    expect(generateTileSet(3, false)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
});

test('Tile is valid for movement', () => {
    const tiles = [1, 2, 3, 4, 0, 5, 6, 7, 8];
    expect(tileIsValidForMovement(-1, 3, tiles)).toBeFalsy();
    expect(tileIsValidForMovement(0, 3, tiles)).toBeFalsy();
    expect(tileIsValidForMovement(1, 3, tiles)).toBeFalsy();
    expect(tileIsValidForMovement(2, 3, tiles)).toBeTruthy();
    expect(tileIsValidForMovement(3, 3, tiles)).toBeFalsy();
    expect(tileIsValidForMovement(4, 3, tiles)).toBeTruthy();
    expect(tileIsValidForMovement(5, 3, tiles)).toBeTruthy();
    expect(tileIsValidForMovement(6, 3, tiles)).toBeFalsy();
    expect(tileIsValidForMovement(7, 3, tiles)).toBeTruthy();
    expect(tileIsValidForMovement(8, 3, tiles)).toBeFalsy();
    expect(tileIsValidForMovement(9, 3, tiles)).toBeFalsy();
});

test('All tiles are algined', () => {
    expect(allTilesAreAligned([1, 2, 3, 4, 5, 6, 7, 8, 0])).toBeTruthy();
    expect(allTilesAreAligned([1, 2, 3, 4, 5, 6, 7, 0, 8])).toBeFalsy();
});

test('swapTilesInSet', () => {
    expect(swapTilesInSet([1, 2, 3], 1, 3)).toStrictEqual([3, 2, 1]);
});

test('Highscore position comparing without dates', () => {
    const highScoreList = {
        maxSize: 10,
        results: [
            { id: 'user1', score: 2 },
            { id: 'user2', score: 3 }
        ]
    }

    expect(getIndexInHighScoreList('user3', undefined, 1, highScoreList)).toBe(0);
    expect(getIndexInHighScoreList('user3', undefined, 4, highScoreList)).toBe(2);
});

test('Highscore position outside max size', () => {
    const highScoreList = {
        maxSize: 2,
        results: [
            { id: 'user1', score: 2 },
            { id: 'user2', score: 3 }
        ]
    }

    expect(getIndexInHighScoreList('user3', undefined, 4, highScoreList)).toBe(-1);
});

test('Highscore position comparing with dates', () => {
    const highScoreList = {
        maxSize: 10,
        results: [
            { id: 'user1', score: 2, utcDateTime: '2010-01-01' },
            { id: 'user2', score: 3, utcDateTime: '2010-01-02' }
        ]
    }

    // Same score as user2 but newer Date. Place before user2.
    expect(getIndexInHighScoreList('user3', (new Date(2010, 2, 2)).getTime(), 3, highScoreList)).toBe(1);

    // Same score as user2 older Date. Place after user2.
    expect(getIndexInHighScoreList('user3', (new Date(2009, 1, 2)).getTime(), 3, highScoreList)).toBe(2);
});

test('Highscore position when old results have no dates', () => {
    const highScoreList = {
        maxSize: 10,
        results: [
            { id: 'user1', score: 2 },
            { id: 'user2', score: 3 }
        ]
    }

    // Same score as user2 but user3 has Date. Place before user2.
    expect(getIndexInHighScoreList('user3', (new Date(2010, 2, 2)).getTime(), 3, highScoreList)).toBe(1);
});
