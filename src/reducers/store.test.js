import { createStore } from 'redux'
import tileGame from './tile-game-reducer'
import { initGame, moveTile } from './actions';
import { GameId_3x3 } from '../constants';

//
// Use an unshuffled tile set for testing by sending doShuffling=false to initGame
//

test('InitGame should create correct state', () => {
    const store = createStore(tileGame);
    const size = 3;
    store.dispatch(initGame(GameId_3x3, 1, false));
    const state = store.getState();
    expect(state.tiles.length).toBe(size * size);
    expect(state.imageNumber).toBe(1);
    expect(state.gameComplete).toBeFalsy();
});


test('There should be one blank tile', () => {
    const size = 3;
    const N = size * size;
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_3x3, 1, false));

    const tiles = store.getState().tiles;
    let numBlanks = 0;
    for (let i = 0; i < N; i++) {
        if (tiles[i] === 0) {
            numBlanks++;
        }
    }
    expect(numBlanks).toBe(1);
});

test('Move tile right and left', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_3x3, 1, false));

    let tiles = store.getState().tiles;

    // The last tile should be the blank tile
    expect(tiles[8]).toBe(0);
    // The second but last tile should have id = N-1 as the tiles are unshuffled
    expect(tiles[7]).toBe(8);

    // Move the second but last tile to the right
    store.dispatch(moveTile(8));
    tiles = store.getState().tiles;
    // The tile should have switched position with the blank tile
    expect(tiles[8]).toBe(8);
    expect(tiles[7]).toBe(0);

    // Move the tile back to the left
    store.dispatch(moveTile(8));
    tiles = store.getState().tiles;
    // The tile should have switched position with the blank tile
    expect(tiles[8]).toBe(0);
    expect(tiles[7]).toBe(8);
});

test('Move tile down and up', () => {
    const store = createStore(tileGame);
    store.dispatch(initGame(GameId_3x3, 1, false));

    let tiles = store.getState().tiles;

    // The last tile should be the blank tile
    expect(tiles[8]).toBe(0);
    // The tile at idx should have id 6
    expect(tiles[5]).toBe(6);

    // Move the tile down
    store.dispatch(moveTile(6));
    tiles = store.getState().tiles;
    // The tile should have switched position with the blank tile
    expect(tiles[8]).toBe(6);
    expect(tiles[5]).toBe(0);

    // Move the tile up again
    store.dispatch(moveTile(6));
    tiles = store.getState().tiles;
    // The tile should have switched position with the blank tile
    expect(tiles[8]).toBe(0);
    expect(tiles[5]).toBe(6);
});
