import React from 'react';
import './Game.css';
import PropTypes from 'prop-types';

const TileView = ({ id, size, tileWidth, isCorrectPos, imageNumber, onClick }) =>
    <div className='tile'
        style={getStyleForTile(id, size, tileWidth, isCorrectPos, imageNumber)}
        onClick={() => onClick(id)}
    />;

TileView.propTypes = {
    id: PropTypes.number,
    size: PropTypes.number,
    tileWidth: PropTypes.number,
    isCorrectPos: PropTypes.bool,
    imageNumber: PropTypes.number,
    onClick: PropTypes.func
};

const getStyleForTile = (id, size, tileWidth, isCorrectPos, imageNumber) => {
    //
    // Position a section of a background image in the tile
    // based on the id of the tile
    //
    if (id === 0) {
        // This is the blank tile
        // Show no image
        return {};
    }

    const idx = id - 1;
    const top = -(Math.floor(idx / size)) * tileWidth;
    const left = idx < size ? -idx * tileWidth : -(idx % size) * tileWidth;

    const imPath = `${window.location.href}/images/img${imageNumber}.jpg`;
    let style = {
        backgroundPosition: `left ${left}px top ${top}px`,
        backgroundImage: `url('${imPath}')`,
    }

    if (isCorrectPos) {
        // Use a special style as a hint on that the tile is on
        // the correct position
        style = {
            ...style,
            outline: '1px solid white',
            outlineOffset: '-10px',
        }
    }

    return style;
}

export default TileView;
