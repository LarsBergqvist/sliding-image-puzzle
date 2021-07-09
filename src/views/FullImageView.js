import React from 'react';
import { connect } from 'react-redux'
import { PuzzleWidth } from '../constants';
import PropTypes from 'prop-types';

const FullImage = (props) => {
    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;
    const tileWidth = PuzzleWidth / props.size;
    const fullImageWidth = props.size * tileWidth;
    let fullImageStyle = {
        maxWidth: fullImageWidth + 'px',
        maxHeight: fullImageWidth + 'px'
    }

    return (
        <div className="full-image" style={fullImageStyle}>
            <img src={`${imPath}`} draggable='false' alt='Full image' />
        </div>
    );
}

FullImage.propTypes = {
    size: PropTypes.number,
    imageNumber: PropTypes.number,
};

const mapStateToProps = state => {
    return {
        imageNumber: state.imageNumber,
    }
}

const FullImageView = connect(
    mapStateToProps
)(FullImage)

export default FullImageView;