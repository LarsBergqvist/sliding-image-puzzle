import {
    INIT_GAME,
    MOVE_TILE,
    HIGHSCORE_LIST_LOADED,
    NAME_CHANGED,
    HIGHSCORE_LIST_SAVED
} from './actions';
import {
    DefaultSize
} from './constants';
import {
    generateTileSet,
    swapTilesInSet,
    allTilesAreAligned,
    hasEmptyTileOnSides
} from './tileSetFunctions';
import { gameConfigs } from './game-configs';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    moves: 0,
    gameComplete: false,
    imageNumber: 1,
    tiles: [],
    size: DefaultSize,
    gameId: undefined,
    gameName: undefined,
    highScoreList: undefined,
    highScorePosition: undefined,
    userName: undefined,
    userId: undefined,
    highScoreListSaved: false
};


// The reducer for the game
// state is an object with game state and an array of tiles
function tileGame(state = initialState, action) {
    switch (action.type) {
        case INIT_GAME:
            return Object.assign({}, initialState, {
                gameId: action.gameId,
                size: gameConfigs[action.gameId].size,
                gameName: gameConfigs[action.gameId].name,
                imageNumber: action.imageNumber,
                highScoreListId: gameConfigs[action.gameId].highscorelistid,
                tiles: generateTileSet(gameConfigs[action.gameId].size, action.doShuffling)
            });

        case MOVE_TILE:
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
                    resultsCopy.sort((a, b) => a.score > b.score);

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

export async function fetchHighScoreList(dispatch, getState) {
    let url = `${process.env.REACT_APP_APIURL}/highscore-lists/${getState().highScoreListId}`;

    fetch(url, {
        headers: {
            ApiKey: `${process.env.REACT_APP_APIKEY}`
        }
    })
        .then(response => {
            if (!response.ok) {
                console.error('Network request failed');
                throw Error('Network request failed');
            }
            return response;
        })
        .then(d => d.json())
        .then(d => {
            dispatch({
                type: HIGHSCORE_LIST_LOADED,
                highScoreList: d
            });
        }, () => { })
}

export async function updateHighScoreList(dispatch, getState) {
    let url = `${process.env.REACT_APP_APIURL}/highscore-lists/${getState().highScoreListId}/game-results`;

    var state = getState();

    if (!state.userName || state.userName.length === 0) {
        return;
    }

    let body = {
        userName: state.userName,
        score: state.moves,
        id: state.userId
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ApiKey: `${process.env.REACT_APP_APIKEY}`
        },
        body: JSON.stringify(body),
    })
        .then(response => {
            if (!response.ok) {
                console.error('Network request failed');
                throw Error('Network request failed');
            }
            return response;
        })
        .then(() => {
            let url = `${process.env.REACT_APP_APIURL}/highscore-lists/${getState().highScoreListId}`;
            fetch(url, {
                headers: {
                    ApiKey: `${process.env.REACT_APP_APIKEY}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        console.error('Network request failed');
                        throw Error('Network request failed');
                    }
                    return response;
                })
                .then(d => d.json())
                .then(d => {
                    dispatch({
                        type: HIGHSCORE_LIST_SAVED, highScoreList: d
                    });
                })
        });
}

export default tileGame;