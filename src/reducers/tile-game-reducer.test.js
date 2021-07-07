import tileGame from './tile-game-reducer';
import { INIT_GAME, MOVE_TILE } from './actions';
import deepFreeze from 'deep-freeze';

test('InitGame should should work on immutable data', () => {
    const initialState = {
        moves: 0,
        gameComplete: false,
        imageNumber: 1,
        tiles: [],
        size: undefined,
        gameId: undefined,
        gameName: undefined,
        highScoreList: undefined,
        highScorePosition: undefined,
        userName: undefined,
        userId: undefined,
        highScoreListSaved: false
    };
    const action = { type: INIT_GAME, gameId: 0, imageNumber: 1, doShuffling: true };
    deepFreeze([initialState, action]);
    let newState = tileGame(initialState, action);
    expect(newState.size).toBe(3);
});

test('Moving final tile should complete the game', () => {
    const tiles = [1, 2, 3,
        4, 5, 6,
        7, 0, 8];
    const state = {
        tiles,
        size: 3
    };
    const action = { type: MOVE_TILE, id: 8 };
    deepFreeze([state, action]);
    let newState = tileGame(state, action);
    expect(newState.gameComplete).toBeTruthy();
});

test('User should make it into the high score list', () => {
    const tiles = [1, 2, 3,
        4, 5, 6,
        7, 0, 8];
    const state = {
        tiles,
        size: 3,
        moves: 0,
        highScoreList: {
            maxSize: 10,
            results: [
                { id: 'user1', score: 2 },
                { id: 'user3', score: 3 }
            ]
        }
    };
    const action = { type: MOVE_TILE, id: 8 };
    deepFreeze([state, action]);
    let newState = tileGame(state, action);

    expect(newState.gameComplete).toBeTruthy();
    expect(newState.highScorePosition).toBe(1);
});

test('Test that move sequence is immutable', () => {
    const tiles = [1, 2, 3,
        4, 5, 6,
        7, 8, 0];
    const inputState1 = {
        tiles,
        size: 3,
        moves: 0
    };

    // Move 6 down
    const action1 = { type: MOVE_TILE, id: 6 };
    deepFreeze([inputState1, action1]);
    const newState1 = tileGame(inputState1, action1);
    expect(newState1.tiles[8]).toBe(6);

    // Move 5 right
    const inputState2 = Object.assign({}, newState1);
    const action2 = { type: MOVE_TILE, id: 5 };
    deepFreeze([inputState2, action2]);
    const newState2 = tileGame(inputState2, action2);
    expect(newState2.tiles[5]).toBe(5);

    // Move 5 left
    const inputState3 = Object.assign({}, newState2);
    const action3 = { type: MOVE_TILE, id: 5 };
    deepFreeze([inputState3, action3]);
    const newState3 = tileGame(inputState3, action3);
    expect(newState3.tiles[4]).toBe(5);

    // Move 6 up
    const inputState4 = Object.assign({}, newState3);
    const action4 = { type: MOVE_TILE, id: 6 };
    deepFreeze([inputState4, action4]);
    const newState4 = tileGame(inputState4, action4);
    expect(newState4.tiles[5]).toBe(6);

    expect(newState4.moves).toBe(4);
    expect(newState4.gameComplete).toBeTruthy();
});
