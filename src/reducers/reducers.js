import {
    generateTileSet,
    swapTilesInSet,
    allTilesAreAligned,
    getIndexInHighScoreList,
    tileIsValidForMovement
} from './tileset-functions';
import { gameConfigs } from '../game-configs';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

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

const gameSlice = createSlice({
    name: 'tileGame',
    initialState: initialState,

    reducers: {
        initGame(_, action) {
            const payload = action.payload;
            return produce(initialState, draft => {
                draft.gameId = payload.gameId;
                draft.size = gameConfigs[payload.gameId].size;
                draft.gameName = gameConfigs[payload.gameId].name;
                draft.imageNumber = payload.imageNumber;
                draft.highScoreListId = gameConfigs[payload.gameId].highscorelistid;
                draft.tiles = generateTileSet(gameConfigs[payload.gameId].size, payload.doShuffling);
            });
        },

        moveTile(state, action) {
            const id = action.payload.id;
            if (state.gameComplete || !tileIsValidForMovement(id, state.size, state.tiles)) {
                return state;
            }

            //
            // Move the tile
            //
            const newTiles = state.tiles.map(t => t);
            const setWithSwappedTiles = swapTilesInSet(newTiles, 0, id);

            //
            // Check result
            //
            let gameComplete = allTilesAreAligned(setWithSwappedTiles);
            if (gameComplete && state.highScoreList) {
                // Highscore list is available
                const newUserId = uuidv4();
                const time = Date.now();
                const idxInHighScoreList = getIndexInHighScoreList(newUserId, time, state.moves + 1, state.highScoreList);
                if (idxInHighScoreList > -1) {
                    // User made it into the leaderboard
                    return produce(state, draft => {
                        draft.highScorePosition = idxInHighScoreList + 1;
                        draft.gameComplete = gameComplete;
                        draft.moves = state.moves + 1;
                        draft.userId = newUserId;
                        draft.tiles = setWithSwappedTiles;
                    });
                } else {
                    // User dit not make it into the leaderboard
                    return produce(state, draft => {
                        draft.highScorePosition = idxInHighScoreList + 1;
                        draft.gameComplete = gameComplete;
                        draft.moves = state.moves + 1;
                        draft.tiles = setWithSwappedTiles;
                    });
                }
            }
            return produce(state, draft => {
                draft.gameComplete = gameComplete;
                draft.moves = state.moves + 1;
                draft.tiles = setWithSwappedTiles;
            });
        },

        highScoreListLoaded(state, action) {
            return produce(state, draft => {
                draft.highScoreList = action.payload.highScoreList;
            });
        },

        nameChanged(state, action) {
            return produce(state, draft => {
                draft.userName = action.payload.name;
            });
        },

        highScoreListSaved(state, action) {
            return produce(state, draft => {
                draft.highScoreListSaved = true;
                draft.highScoreList = action.payload.highScoreList;
            });
        },

        nameSubmitted(state) {
            return produce(state, draft => {
                draft.nameSubmitted = true;
            });
        }
    }
});


export const { initGame: initGame, moveTile: moveTile, highScoreListLoaded, nameChanged, highScoreListSaved, nameSubmitted } = gameSlice.actions
export default gameSlice.reducer
