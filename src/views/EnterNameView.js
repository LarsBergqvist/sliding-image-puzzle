
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { nameChanged } from '../reducers/actions';
import { updateHighScoreList } from '../reducers/thunks';
import PropTypes from 'prop-types';

const EnterName = props => {

    const [userName, setUserName] = useState('');

    return <>
        <div>
            YOU MADE IT TO #{props.highScorePosition} on the leaderboard!
        </div>
        Enter your name:
        <input
            type='text'
            minLength='3' maxLength='25'
            required
            onChange={(event) => {
                setUserName(event.target.value);
                props.onNameChanged(event.target.value);
            }}
            disabled={props.nameSubmitted}
        />
        <div>
            {userName.length >= 3 && userName.length <= 25 &&
                <button className='game-button' onClick={() => props.onSubmitNameToHighScore(userName)}
                    disabled={props.nameSubmitted}>
                    Submit
                </button>
            }
        </div>
    </>;
}

EnterName.propTypes = {
    highScorePosition: PropTypes.number,
    onNameChanged: PropTypes.func,
    onSubmitNameToHighScore: PropTypes.func,
    nameSubmitted: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        highScorePosition: state.highScorePosition,
        highScoreList: state.highScoreList,
        nameSubmitted: state.nameSubmitted
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
