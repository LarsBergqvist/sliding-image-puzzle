
import React from "react";
import { connect } from 'react-redux'
import { nameChanged } from '../actions';
import { updateHighScoreList } from '../reducers';

class EnterName extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '' };
    }

    myChangeHandler = (event) => {
        this.setState({ username: event.target.value });
        this.props.onNameChanged(event.target.value);
    }

    render() {
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
    }
}

const mapStateToProps = state => {
    return {
        highScorePosition: state.highScorePosition,
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

const EnterNameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterName)

export default EnterNameView;