
import React from "react";
import { connect } from 'react-redux'
import LeaderBoardView from './LeaderBoardView';
import EnterNameView from './EnterNameView';

const GameStatus = (props) => {
    if (props.gameComplete) {
        return <div className='game-status'>
            <div><b>GAME COMPLETE!</b></div>
            <div>You used {props.moves} moves</div>
            {props.highScorePosition && !props.highScoreListSaved &&
                <EnterNameView />
            }
            {props.highScorePosition && props.highScoreListSaved &&
                <LeaderBoardView
                    highScoreList={props.highScoreList}
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

const mapStateToProps = state => {
    return {
        moves: state.moves,
        gameComplete: state.gameComplete,
        highScorePosition: state.highScorePosition,
        highScoreListSaved: state.highScoreListSaved,
        highScoreList: state.highScoreList,
    }
}

const GameStatusView = connect(
    mapStateToProps
)(GameStatus)

export default GameStatusView;
