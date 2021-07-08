import React from 'react';
import './Game.css';
import { connect } from 'react-redux'
import { initGame } from '../reducers/actions';
import GameStatusView from './GameStatusView';
import { NumImages } from '../constants';
import { fetchHighScoreList } from '../reducers/thunks';
import PuzzleView from './PuzzleView';
import FullImageView from './FullImageView';
import PropTypes from 'prop-types';
import LeaderBoardView from './LeaderBoardView';
import GameHeaderView from './GameHeaderView';
import RestartButtonsView from './RestartButtonsView';

const Game = (props) => {
    return (
        <div className='game'>
            <GameHeaderView gameName={props.gameName} />
            <GameStatusView />
            <PuzzleView />
            <RestartButtonsView onInitGame={props.onInitGame} />
            <FullImageView />
            <LeaderBoardView highScoreList={props.highScoreList} />
        </div>
    );
};

Game.propTypes = {
    gameName: PropTypes.string,
    highScoreList: PropTypes.object,
    onInitGame: PropTypes.func
};


const mapStateToProps = state => {
    return {
        gameName: state.gameName,
        highScoreList: state.highScoreList
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
