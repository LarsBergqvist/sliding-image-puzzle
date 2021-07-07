
import React from 'react';
import { connect } from 'react-redux'
import LeaderBoardView from './LeaderBoardView';
import EnterNameView from './EnterNameView';
import PropTypes from 'prop-types';

const GameStatus = (props) => {
    if (props.gameComplete) {
        return <div className='game-status'>
            <div><b>GAME COMPLETE!</b></div>
            <div>You used {props.moves} moves</div>
            {(props.highScorePosition > 0) && !props.highScoreListSaved &&
                <EnterNameView />
            }
            {(props.highScorePosition > 0) && props.highScoreListSaved &&
                <LeaderBoardView
                    highScoreList={props.highScoreList}
                    userId={props.userId}
                />
            }
        </div>;
    } else {
        return <div className='game-status'>
            Moves: <b>{props.moves}</b>
            <div className='game-instructions'>
                <div>
                    Click on the tile that should be moved
                </div>
            </div>
        </div>
    }
}

GameStatus.propTypes = {
    moves: PropTypes.number,
    gameComplete: PropTypes.bool,
    highScorePosition: PropTypes.number,
    highScoreListSaved: PropTypes.bool,
    highScoreList: PropTypes.object,
    userId: PropTypes.string
};

const mapStateToProps = state => {
    return {
        moves: state.moves,
        gameComplete: state.gameComplete,
        highScorePosition: state.highScorePosition,
        highScoreListSaved: state.highScoreListSaved,
        highScoreList: state.highScoreList,
        userId: state.userId
    }
}

const GameStatusView = connect(
    mapStateToProps
)(GameStatus)

export default GameStatusView;
