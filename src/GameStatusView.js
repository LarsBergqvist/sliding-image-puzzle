
import React from "react";
import { connect } from 'react-redux'
import { initGame, moveTile, nameChanged } from './actions';
import { fetchHighScoreList, updateHighScoreList } from './reducers';
import LeaderBoardView from './LeaderBoardView';

class GameStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '' };
    }

    myChangeHandler = (event) => {
        this.setState({ username: event.target.value });
        this.props.onNameChanged(event.target.value);
    }

    render() {
        // todo:                     <div><h2>{this.props.gameName}</h2></div>
        // todo: check complete
        // todo: turn -1 = moves

        if (this.props.highScorePosition) {
            if (!this.props.highScoreListSaved) {
                return <>
                    <div>
                        YOU MADE IT TO #{this.props.highScorePosition} on the leaderboard!
                    </div>
                    <p>Enter your name:</p>
                    <input
                        type='text'
                        onChange={this.myChangeHandler}
                    />
                    <button className='game-button' onClick={() => this.props.onSubmitNameToHighScore(this.state.username)}>Submit</button>
                </>;
            } else {
                return <>
                    <LeaderBoardView
                        highScoreList={this.props.highScoreList}
                    />
                </>;
            }
        } else if (this.props.gameComplete) {
            return <>
                <div><b>GAME COMPLETE!</b></div>
                <div>You used {this.props.turnNo - 1} moves</div>
            </>;
        } else {
            return <>
                <div>
                    Moves: <b>{this.props.turnNo - 1}</b>
                    <div className='game-instructions'>
                        <div>
                            Click on the tile that should be moved
                        </div>
                    </div>
                </div>
            </>;
        }
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

const mapDispatchToProps = dispatch => {
    return {
        onSubmitNameToHighScore: () => {
            dispatch(updateHighScoreList);
        },
        onNameChanged: (name) => {
            dispatch(nameChanged(name));
        }
    }
}

const GameStatusView = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameStatus)

export default GameStatusView;
