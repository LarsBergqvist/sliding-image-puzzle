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
    nameSubmitted: false
};

const gameSlice = createSlice({
    name: 'tileGame',
    initialState: initialState,

    reducers: {
        initGame(_, action) {
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

        moveTile(state, action) {
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

        highScoreListLoaded(state, action) {
            return Object.assign({}, state, {
                highScoreList: action.payload.highScoreList
            });
        },

        nameChanged(state, action) {
            return Object.assign({}, state, {
                userName: action.payload.name
            });
        },

        highScoreListSaved(state, action) {
            return Object.assign({}, state, {
                highScoreListSaved: true,
                highScoreList: action.payload.highScoreList
            });
        },

        nameSubmitted(state) {
            return Object.assign({}, state,
                { nameSubmitted: true }
            );
        }
    }
});


export const { initGame: initGame, moveTile: moveTile, highScoreListLoaded, nameChanged, highScoreListSaved, nameSubmitted } = gameSlice.actions
export default gameSlice.reducer
