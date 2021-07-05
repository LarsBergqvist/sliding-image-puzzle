
import React from "react";
import { connect } from 'react-redux'
import LeaderBoardView from './LeaderBoardView';
import EnterNameView from './EnterNameView';

const GameStatus = (props) => {
    // todo: turn -1 = moves

    if (props.highScorePosition) {
        if (!props.highScoreListSaved && props.gameComplete) {
            return <EnterNameView />
        } else {
            return <>
                <LeaderBoardView
                    highScoreList={props.highScoreList}
                />
            </>;
        }
    } else if (props.gameComplete) {
        return <>
            <div><b>GAME COMPLETE!</b></div>
            <div>You used {props.turnNo - 1} moves</div>
        </>;
    } else {
        return <>
            <div>
                Moves: <b>{props.turnNo - 1}</b>
                <div className='game-instructions'>
                    <div>
                        Click on the tile that should be moved
                    </div>
                </div>
            </div>
        </>;
    }
}

const mapStateToProps = state => {
    return {
        turnNo: state.turnNo,
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
