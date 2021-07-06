import React from 'react';
import './Game.css';

const TileView = (props) => {
    let style = getStyleForTile(props);

    return (
        <div className='tile'
            style={style}
            onClick={() => props.onClick(props.id)}
        >
        </div>
    );
}

const getStyleForTile = props => {
    //
    // Position a section of a background image in the tile
    // based on the id of the tile
    //
    let i = props.id - 1;
    let top = -(Math.floor(i / props.size)) * props.tileWidth;
    let left = i < props.size ? -i * props.tileWidth : -(i % props.size) * props.tileWidth;

    let bgPos = 'left ' + left + 'px top ' + top + 'px';
    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;
    let style = {
        backgroundPosition: bgPos,
        backgroundImage: "url(" + imPath + ")",
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

    if (props.id === 0) {
        // This is the blank tile
        // Show no image
        style = {};
    }

    return style;
}

export default TileView;
