import React from 'react';
import { connect } from 'react-redux'
import { PuzzleWidth } from './constants';

function FullImage(props) {
    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;
    const tileWidth = PuzzleWidth / props.size;
    const fullImageWidth = props.size * tileWidth;
    let fullImageStyle = {
        maxWidth: fullImageWidth + "px",
        maxHeight: fullImageWidth + "px"
    }

    return (
        <div className="full-image" style={fullImageStyle}>
            <img src={`${imPath}`} draggable='false' alt='' />
        </div>

    );
}

const mapStateToProps = state => {
    return {
        imageNumber: state.imageNumber,
        tiles: state.tiles,
        gameName: state.gameName
    }
}

const FullImageView = connect(
    mapStateToProps
)(FullImage)

export default FullImageView;