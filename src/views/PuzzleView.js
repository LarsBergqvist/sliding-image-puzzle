import React from 'react';
import { connect } from 'react-redux'
import { PuzzleWidth } from '../constants';
import TileView from './TileView'
import { moveTile } from '../reducers/actions';
import PropTypes from 'prop-types';

const Puzzle = (props) => {
    const tileWidth = PuzzleWidth / props.size;
    const fullImageWidth = props.size * tileWidth;
    let tileWrapperStyle = {
        width: fullImageWidth + 'px'
    }
    let tileContainerStyle = {
        gridTemplateColumns: 'repeat(' + props.size + ', ' + tileWidth + 'px)'
    }

    const blocks = props.tiles.map((c, idx) =>
        <TileView key={idx}
            id={c}
            correctPos={c === (idx + 1)}
            imageNumber={props.imageNumber}
            onClick={props.onTileClicked}
            tileWidth={tileWidth}
            size={props.size}
        />
    );

    return (
        <div>
            <div className='tile-wrapper' style={tileWrapperStyle}>
                <div className='tile-container' style={tileContainerStyle}>
                    {blocks}
                </div>
            </div>
        </div>
    );
}

Puzzle.propTypes = {
    onTileClicked: PropTypes.func,
    size: PropTypes.number,
    tiles: PropTypes.array,
    imageNumber: PropTypes.number
};

const mapStateToProps = state => {
    return {
        imageNumber: state.imageNumber,
        tiles: state.tiles,
        size: state.size,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTileClicked: id => {
            dispatch(moveTile(id));
        }
    }
}

const PuzzleView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Puzzle)

export default PuzzleView;
