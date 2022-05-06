import {
    generateTileSet,
    swapTilesInSet,
    allTilesAreAligned,
    hasEmptyTileOnSides,
    getIndexInHighScoreList
} from './tileset-functions';
import { gameConfigs } from '../game-configs';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit'

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
    nameSubmitted: false
};

const gameSlice = createSlice({
    name: 'tileGame',
    // The state is an object with game state and an array of tiles
    // A tile is a number 1-N and the blank tile is represented by 0
    initialState: initialState,

    reducers: {
        INIT_GAME(_, action) {
            const payload = action.payload;
            return Object.assign({}, initialState, {
                gameId: payload.gameId,
                size: gameConfigs[payload.gameId].size,
                gameName: gameConfigs[payload.gameId].name,
                imageNumber: payload.imageNumber,
                highScoreListId: gameConfigs[payload.gameId].highscorelistid,
                tiles: generateTileSet(gameConfigs[payload.gameId].size, payload.doShuffling),
                nameSubmitted: false
            });
        },

        MOVE_TILE(state, action) {
            const id = action.payload.id;
            if (id === 0) {
                // selected blank tile
                return state;
            }
            if (state.gameComplete) {
                return state;
            }
            if (id < 0 || id > (state.size * state.size - 1)) {
                return state;
            }

            if (!hasEmptyTileOnSides(state.size, id, state.tiles)) {
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
                const newUserId = uuidv4();
                const time = Date.now();
                const idxInHighScoreList = getIndexInHighScoreList(newUserId, time, state.moves + 1, state.highScoreList);
                if (idxInHighScoreList > -1) {
                    // User made it into the leaderboard
                    return Object.assign({}, state, {
                        highScorePosition: idxInHighScoreList + 1,
                        gameComplete: gameComplete,
                        moves: state.moves + 1,
                        userId: newUserId,
                        tiles: setWithSwappedTiles
                    });
                } else {
                    // User dit not make it into the leaderboard
                    return Object.assign({}, state, {
                        highScorePosition: idxInHighScoreList + 1,
                        gameComplete: gameComplete,
                        moves: state.moves + 1,
                        tiles: setWithSwappedTiles
                    });
                }
            }
            return Object.assign({}, state, {
                gameComplete,
                moves: state.moves + 1,
                tiles: setWithSwappedTiles
            });
        },

        HIGHSCORE_LIST_LOADED(state, action) {
            return Object.assign({}, state, {
                highScoreList: action.payload.highScoreList
            });
        },

        NAME_CHANGED(state, action) {
            return Object.assign({}, state, {
                userName: action.payload.name
            });
        },

        HIGHSCORE_LIST_SAVED(state, action) {
            return Object.assign({}, state, {
                highScoreListSaved: true,
                highScoreList: action.payload.highScoreList
            });
        },

        NAME_SUBMITTED(state) {
            return Object.assign({}, state,
                { nameSubmitted: true }
            );
        }
    }
});


export const { INIT_GAME, MOVE_TILE, HIGHSCORE_LIST_LOADED, NAME_CHANGED, HIGHSCORE_LIST_SAVED, NAME_SUBMITTED } = gameSlice.actions
export default gameSlice.reducer
