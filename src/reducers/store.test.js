import tileGame from './reducers';
import { initGame, moveTile } from './reducers';
import { GameId_3x3 } from '../constants';
import { configureStore } from '@reduxjs/toolkit'

//
// Use an unshuffled tile set for testing by sending doShuffling=false to initGame
//

const size = 3;
const N = size * size;

function createStoreWithDefaultTestGame() {
    const store = configureStore({ reducer: { tileGame } });
    store.dispatch(initGame({ gameId: GameId_3x3, imageNumber: 1, doShuffling: false }));
    return store;
}

test('InitGame should create correct state', () => {
    const store = createStoreWithDefaultTestGame();
    const state = store.getState();
    expect(state.tileGame.tiles.length).toBe(size * size);
    expect(state.tileGame.imageNumber).toBe(1);
    expect(state.tileGame.gameComplete).toBeFalsy();
});

test('There should be one blank tile', () => {
    const store = createStoreWithDefaultTestGame();

    const tiles = store.getState().tileGame.tiles;
    let numBlanks = 0;
    for (let i = 0; i < N; i++) {
        if (tiles[i] === 0) {
            numBlanks++;
        }
    }
    expect(numBlanks).toBe(1);
});

test('Selecting tile with id outside bounds should not affect state', () => {
    const store = createStoreWithDefaultTestGame();

    const startState = store.getState().tileGame;

    store.dispatch(moveTile(-1));
    expect(JSON.stringify(startState) === JSON.stringify(store.getState().tileGame)).toBeTruthy();

    store.dispatch(moveTile(N));
    expect(JSON.stringify(startState) === JSON.stringify(store.getState().tileGame)).toBeTruthy();
});

test('Move tile right and left', () => {
    const store = createStoreWithDefaultTestGame();

    let tiles = store.getState().tileGame.tiles;

    // The last tile should be the blank tile
    expect(tiles[8]).toBe(0);
    // The second but last tile should have id = N-1 as the tiles are unshuffled
    expect(tiles[7]).toBe(8);

    // Move the second but last tile to the right
    store.dispatch(moveTile({ id: 8 }));
    tiles = store.getState().tileGame.tiles;
    // The tile should have switched position with the blank tile
    expect(tiles[8]).toBe(8);
    expect(tiles[7]).toBe(0);

    // Move the tile back to the left
    store.dispatch(moveTile({ id: 8 }));
    tiles = store.getState().tileGame.tiles;
    // The tile should have switched position with the blank tile
    expect(tiles[8]).toBe(0);
    expect(tiles[7]).toBe(8);
});


test('Move tile down and up', () => {
    const store = createStoreWithDefaultTestGame();

    let tiles = store.getState().tileGame.tiles;

    // The last tile should be the blank tile
    expect(tiles[8]).toBe(0);
    // The tile at idx should have id 6
    expect(tiles[5]).toBe(6);

    // Move the tile down
    store.dispatch(moveTile({ id: 6 }));
    tiles = store.getState().tileGame.tiles;
    // The tile should have switched position with the blank tile
    expect(tiles[8]).toBe(6);
    expect(tiles[5]).toBe(0);

    // Move the tile up again
    store.dispatch(moveTile({ id: 6 }));
    tiles = store.getState().tileGame.tiles;
    // The tile should have switched position with the blank tile
    expect(tiles[8]).toBe(0);
    expect(tiles[5]).toBe(6);
});
