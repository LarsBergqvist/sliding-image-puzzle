import React from 'react';
import './Game.css';
import PropTypes from 'prop-types';

const GameHeaderView = (props) =>
    <>
        <header className='game-header'>
            <div className='game-title'>Sliding Image Puzzle</div>
        </header>
        <div><h2>{props.gameName}</h2></div>
    </>;

GameHeaderView.propTypes = {
    gameName: PropTypes.string,
};

export default GameHeaderView;
