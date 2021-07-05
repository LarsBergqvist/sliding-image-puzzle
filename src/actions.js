export const INIT_GAME = 'INIT_GAME';
export const MOVE_TILE = 'MOVE_TILE';
export const HIGHSCORE_LIST_LOADED = 'HIGHSCORE_LIST_LOADED';
export const NAME_CHANGED = 'NAME_CHANGED';
export const HIGHSCORE_LIST_SAVED = 'HIGHSCORE_LIST_SAVED';

export function initGame(gameId, imageNumber, doShuffling) {
    return { type: INIT_GAME, gameId, imageNumber, doShuffling };
}

export function moveTile(id) {
    return { type: MOVE_TILE, id };
}

export function highScoreListLoaded(highScoreList) {
    return { type: HIGHSCORE_LIST_LOADED, highScoreList };
}

export function nameChanged(name) {
    return { type: NAME_CHANGED, name };
}

export function highScoreListSaved(highScoreList) {
    return { type: HIGHSCORE_LIST_SAVED, highScoreList };
}

