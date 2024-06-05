import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EnterNameView from './EnterNameView';
import LeaderBoardView from './LeaderBoardView';

const GameStatus = (props) => {
    if (props.gameComplete) {
        return (
            <div className="game-status">
                <div>
                    <b>GAME COMPLETE!</b>
                </div>
                <div>You used {props.moves} moves</div>
                {props.highScorePosition > 0 && !props.highScoreListSaved && (
                    <EnterNameView />
                )}
                {props.highScorePosition > 0 && props.highScoreListSaved && (
                    <LeaderBoardView
                        highScoreList={props.highScoreList}
                        userId={props.userId}
                    />
                )}
            </div>
        );
    } else {
        return (
            <div className="game-status">
                Moves: <b>{props.moves}</b>
                <div className="game-instructions">
                    <div>Click on the tile that should be moved</div>
                </div>
            </div>
        );
    }
};

GameStatus.propTypes = {
    moves: PropTypes.number,
    gameComplete: PropTypes.bool,
    highScorePosition: PropTypes.number,
    highScoreListSaved: PropTypes.bool,
    highScoreList: PropTypes.object,
    userId: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        moves: state.tileGame.moves,
        gameComplete: state.tileGame.gameComplete,
        highScorePosition: state.tileGame.highScorePosition,
        highScoreListSaved: state.tileGame.highScoreListSaved,
        highScoreList: state.tileGame.highScoreList,
        userId: state.tileGame.userId
    };
};

const GameStatusView = connect(mapStateToProps)(GameStatus);

export default GameStatusView;
