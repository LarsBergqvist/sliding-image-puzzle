
import React from "react";

class GameStatusView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '' };
    }

    myChangeHandler = (event) => {
        this.setState({ username: event.target.value });
        this.props.onNameChanged(event.target.value);
    }

    render() {
        if (this.props.highScorePosition) {
            if (!this.props.highScoreListSaved) {
                return <>
                    <div><h2>{this.props.gameName}</h2></div>
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
                let pos = 1;
                let rows = this.props.highScoreList.results.map(r => {
                    let res = <tr key={pos}><td>#{pos}</td><td>{r.userName}</td><td>{r.score}</td></tr>;
                    pos++;
                    return res;
                });
                return <>
                    <div><h2>{this.props.gameName}</h2></div>
                    <div>
                        <h3>{this.props.highScoreList.name}</h3>
                        <table className="highscoretable">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>{this.props.highScoreList.unit}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </>;
            }
        } else if (this.props.gameComplete) {
            return <>
                <div><b>GAME COMPLETE!</b></div>
                <div>You used {this.props.turnNo - 1} moves</div>
            </>;
        } else {
            return <>
                <div><h2>{this.props.gameName}</h2></div>
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

export default GameStatusView;
