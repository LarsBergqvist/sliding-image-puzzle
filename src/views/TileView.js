import React from 'react';
import './Game.css';

const TileView = (props) => {
    let bgPos = 'left ' + props.left + 'px top ' + props.top + 'px';
    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;
    let style = {
        backgroundPosition: bgPos,
        backgroundImage: "url(" + imPath + ")",
    }

    if (props.id === 0) {
        // this is the blank tile
        style = {};
    }

    return (
        <div className='tile'
            style={style}
            onClick={() => props.onClick(props.id)}
        >
        </div>
    );
}

export default TileView;
