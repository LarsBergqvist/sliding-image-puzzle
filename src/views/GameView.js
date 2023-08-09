import './Game.css';
import { connect } from 'react-redux'
import GameStatusView from './GameStatusView';
import { NumImages } from '../constants';
import { fetchHighScoreList } from '../reducers/thunks';
import PuzzleView from './PuzzleView';
import FullImageView from './FullImageView';
import PropTypes from 'prop-types';
import LeaderBoardView from './LeaderBoardView';
import GameHeaderView from './GameHeaderView';
import RestartButtonsView from './RestartButtonsView';
import { initGame } from '../reducers/reducers';

const Game = (props) => {
    return (
        <div className='game'>
            <GameHeaderView gameName={props.gameName} />
            <GameStatusView />
            <PuzzleView />
            <RestartButtonsView onInitGame={props.onInitGame} />
            <FullImageView />
            {!props.gameComplete && <LeaderBoardView highScoreList={props.highScoreList} />}
        </div>
    );
};

Game.propTypes = {
    gameName: PropTypes.string,
    highScoreList: PropTypes.object,
    onInitGame: PropTypes.func,
    gameComplete: PropTypes.bool
};


const mapStateToProps = state => {
    return {
        gameName: state.tileGame.gameName,
        highScoreList: state.tileGame.highScoreList,
        gameComplete: state.tileGame.gameComplete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitGame: (gameId) => {
            dispatch(initGame({ gameId, imageNumber: Math.floor(Math.random() * NumImages) + 1, doShuffling: true }));
            dispatch(fetchHighScoreList);
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;
