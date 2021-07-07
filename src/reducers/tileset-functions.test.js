import { getIndexInHighScoreList } from './tileset-functions';

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
