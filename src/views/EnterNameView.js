
import React from 'react';
import { connect } from 'react-redux'
import { nameChanged } from '../reducers/actions';
import { updateHighScoreList } from '../reducers/thunks';
import PropTypes from 'prop-types';

class EnterName extends React.Component {

    constructor(props) {
        super(props);
        this.state = { userName: '' };
    }

    render() {
        return <>
            <div>
                YOU MADE IT TO #{this.props.highScorePosition} on the leaderboard!
            </div>
            Enter your name:
            <input
                type='text'
                onChange={(event) => { this.setState({ userName: event.target.value }); this.props.onNameChanged(event.target.value); }}
            />
            <div>
                <button className='game-button' onClick={() => this.props.onSubmitNameToHighScore(this.state.userName)}>Submit</button>
            </div>
        </>;
    }
}

EnterName.propTypes = {
    highScorePosition: PropTypes.number,
    onNameChanged: PropTypes.func,
    onSubmitNameToHighScore: PropTypes.func
};

const mapStateToProps = state => {
    return {
        highScorePosition: state.highScorePosition,
        highScoreList: state.highScoreList,
    };
};


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
