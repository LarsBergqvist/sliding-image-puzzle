import React from 'react';
import './Game.css';
import { connect } from 'react-redux'
import { initGame } from '../actions';
import GameStatusView from './GameStatusView';
import { NumImages } from '../constants';
import { fetchHighScoreList } from '../reducers';
import PuzzleView from './PuzzleView';
import FullImageView from './FullImageView';

const Game = (props) => {
    return (
        <div className='game'>
            <header className='game-header'>
                <div className='game-title'>Sliding Image Puzzle</div>
            </header>
            <div><h2>{props.gameName}</h2></div>
            <div className='game-status'>
                <GameStatusView />
            </div>
            <PuzzleView />
            <button className='game-button' onClick={() => props.onInitGame(0)}>Restart 3x3</button>
            <button className='game-button' onClick={() => props.onInitGame(1)}>Restart 4x4</button>
            <button className='game-button' onClick={() => props.onInitGame(2)}>Restart 5x5</button>
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
