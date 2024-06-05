import {
    generateTileSet,
    swapTilesInSet,
    allTilesAreAligned,
    getIndexInHighScoreList,
    tileIsValidForMovement
} from './tileset-functions.ts';
import { gameConfigs } from '../game-configs';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

// The state is an object with game state and an array of tiles
// A tile is a number 1-N and the blank tile is represented by 0

const initialState = {
    moves: 0,
    gameComplete: false,
    imageNumber: 1,
    tiles: [],
    size: undefined,
    gameId: undefined,
    gameName: undefined,
    highScoreList: undefined,
    highScorePosition: -1,
    userName: undefined,
    userId: undefined,
    highScoreListSaved: false,
    nameSubmitted: false,
    highScoreListId: -1
};

const emptyTileId = 0;

const gameSlice = createSlice({
    name: 'tileGame',
    initialState: initialState,

    //
    // Reducers use mutating syntax which is ok within createSlice
    // as immer is used internally
    //
    reducers: {
        initGame(state, action) {
            const payload = action.payload;
            Object.assign(state, initialState);
            state.imageNumber = payload.imageNumber;
            state.tiles = generateTileSet(gameConfigs[payload.gameId].size, payload.doShuffling);
            state.size = gameConfigs[payload.gameId].size;
            state.gameId = payload.gameId;
            state.gameName = gameConfigs[payload.gameId].name;
            state.highScoreListId = gameConfigs[payload.gameId].highscorelistid;
        },

        moveTile(state, action) {
            if (state.gameComplete || !tileIsValidForMovement(action.payload.id, state.size, state.tiles)) {
                return state;
            }

            //
            // Move the tile, i.e. change placement with the empty tile
            //
            state.moves = state.moves + 1;
            state.tiles = swapTilesInSet(state.tiles, emptyTileId, action.payload.id);
            state.gameComplete = allTilesAreAligned(state.tiles);

            //
            // Check result against highscore list
            //
            if (state.gameComplete && state.highScoreList) {
                // Highscore list is available
                const newUserId = uuidv4();
                const time = Date.now();
                const idxInHighScoreList = getIndexInHighScoreList(newUserId, time, state.moves, state.highScoreList);
                if (idxInHighScoreList > -1) {
                    // User made it into the leaderboard
                    state.highScorePosition = idxInHighScoreList + 1;
                    state.userId = newUserId;
                }
            }
        },

        highScoreListLoaded(state, action) {
            state.highScoreList = action.payload.highScoreList;
        },

        nameChanged(state, action) {
            state.userName = action.payload.name;
        },

        highScoreListSaved(state, action) {
            state.highScoreListSaved = true;
            state.highScoreList = action.payload.highScoreList;
        },

        nameSubmitted(state) {
            state.nameSubmitted = true;
        }
    }
});


export const { initGame, moveTile, highScoreListLoaded, nameChanged, highScoreListSaved, nameSubmitted } = gameSlice.actions
export default gameSlice.reducer
