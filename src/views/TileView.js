import React from 'react';
import './Game.css';
import PropTypes from 'prop-types';

const TileView = (props) =>
    <div className='tile'
        style={getStyleForTile(props)}
        onClick={() => props.onClick(props.id)}
    />;

TileView.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.number
};

const getStyleForTile = props => {
    //
    // Position a section of a background image in the tile
    // based on the id of the tile
    //
    if (props.id === 0) {
        // This is the blank tile
        // Show no image
        return {};
    }

    const i = props.id - 1;
    const top = -(Math.floor(i / props.size)) * props.tileWidth;
    const left = i < props.size ? -i * props.tileWidth : -(i % props.size) * props.tileWidth;

    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;
    let style = {
        backgroundPosition: `left ${left}px top ${top}px`,
        backgroundImage: `url('${imPath}')`,
    }

    if (props.correctPos) {
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
