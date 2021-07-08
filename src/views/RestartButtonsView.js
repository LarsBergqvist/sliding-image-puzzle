import React from 'react';
import './Game.css';
import { GameId_3x3, GameId_4x4, GameId_5x5 } from '../constants';
import PropTypes from 'prop-types';

const RestartButtonsView = (props) =>
    <>
        <button className='game-button' onClick={() => props.onInitGame(GameId_3x3)}>Restart 3x3</button>
        <button className='game-button' onClick={() => props.onInitGame(GameId_4x4)}>Restart 4x4</button>
        <button className='game-button' onClick={() => props.onInitGame(GameId_5x5)}>Restart 5x5</button>
    </>;

RestartButtonsView.propTypes = {
    onInitGame: PropTypes.func
};

export default RestartButtonsView;
