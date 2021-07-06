import React from 'react';
import './Game.css';
import { connect } from 'react-redux'
import { initGame } from '../reducers/actions';
import GameStatusView from './GameStatusView';
import { GameId_3x3, GameId_4x4, GameId_5x5, NumImages } from '../constants';
import { fetchHighScoreList } from '../reducers/highscore-list-reducers';
import PuzzleView from './PuzzleView';
import FullImageView from './FullImageView';

const Game = (props) => {
    return (
        <div className='game'>
            <header className='game-header'>
                <div className='game-title'>Sliding Image Puzzle</div>
            </header>
            <div><h2>{props.gameName}</h2></div>
            <GameStatusView />
            <PuzzleView />
            <button className='game-button' onClick={() => props.onInitGame(GameId_3x3)}>Restart 3x3</button>
            <button className='game-button' onClick={() => props.onInitGame(GameId_4x4)}>Restart 4x4</button>
            <button className='game-button' onClick={() => props.onInitGame(GameId_5x5)}>Restart 5x5</button>
            <FullImageView />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        imageNumber: state.imageNumber,
        tiles: state.tiles,
        gameName: state.gameName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitGame: (gameId) => {
            dispatch(initGame(gameId, Math.floor(Math.random() * NumImages) + 1, true));
            dispatch(fetchHighScoreList);
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;
