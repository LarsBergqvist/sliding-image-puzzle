import {
    INIT_GAME,
    MOVE_TILE,
    HIGHSCORE_LIST_LOADED,
    NAME_CHANGED,
    HIGHSCORE_LIST_SAVED
} from './actions';
import {
    generateTileSet,
    swapTilesInSet,
    allTilesAreAligned,
    hasEmptyTileOnSides
} from './tileset-functions';
import { gameConfigs } from '../game-configs';
import { v4 as uuidv4 } from 'uuid';

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


// The reducer for the game
// The state is an object with game state and an array of tiles
// A tile is a number 1-N
function tileGame(state = initialState, action) {
    switch (action.type) {
        case INIT_GAME: {
            return Object.assign({}, initialState, {
                gameId: action.gameId,
                size: gameConfigs[action.gameId].size,
                gameName: gameConfigs[action.gameId].name,
                imageNumber: action.imageNumber,
                highScoreListId: gameConfigs[action.gameId].highscorelistid,
                tiles: generateTileSet(gameConfigs[action.gameId].size, action.doShuffling)
            });
        }

        case MOVE_TILE: {
            if (action.id === 0) {
                // selected blank tile
                return state;
            }
            if (state.gameComplete) {
                return state;
            }

            if (hasEmptyTileOnSides(state.size, action.id, state.tiles)) {
                const newTiles = state.tiles.map(t => t);
                const setWithSwappedTiles = swapTilesInSet(newTiles, 0, action.id);

                //----

                let gameComplete = allTilesAreAligned(setWithSwappedTiles);
                if (gameComplete && state.highScoreList) {
                    let newUserId = uuidv4();
                    const resultsCopy = state.highScoreList.results.map(r => r);
                    resultsCopy.push({
                        id: newUserId,
                        score: state.moves
                    });
                    resultsCopy.sort((a, b) => (a.score - b.score) || (a.utcDateTime - b.utcDateTime));

                    let idxInHighScoreList = resultsCopy.findIndex(r => r.id === newUserId);
                    if (idxInHighScoreList > -1 && (idxInHighScoreList + 1 <= state.highScoreList.maxSize)) {
                        // HighScoreList exists and user made it into chart
                        return Object.assign({}, state, {
                            highScorePosition: idxInHighScoreList + 1,
                            gameComplete: gameComplete,
                            moves: state.moves + 1,
                            userId: newUserId,
                            tiles: setWithSwappedTiles
                        });
                    } else {
                        return Object.assign({}, state, {
                            highScorePosition: idxInHighScoreList + 1,
                            gameComplete: gameComplete,
                            moves: state.moves + 1,
                            tiles: setWithSwappedTiles
                        });
                    }
                }

                //----
                return Object.assign({}, state, {
                    gameComplete,
                    moves: state.moves + 1,
                    tiles: setWithSwappedTiles
                });

            } else {
                return state;
            }

        }

        case HIGHSCORE_LIST_LOADED: {
            return Object.assign({}, state, {
                highScoreList: action.highScoreList
            });
        }
        case NAME_CHANGED: {
            return Object.assign({}, state, {
                userName: action.name
            });
        }
        case HIGHSCORE_LIST_SAVED: {
            return Object.assign({}, state, {
                highScoreListSaved: true,
                highScoreList: action.highScoreList
            });
        }
        default:
            return state;
    }
}

export default tileGame;