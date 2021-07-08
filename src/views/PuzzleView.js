import React from 'react';
import { connect } from 'react-redux'
import { PuzzleWidth } from '../constants';
import TileView from './TileView'
import { moveTile } from '../reducers/actions';
import PropTypes from 'prop-types';

const Puzzle = (props) => {
    const tileWidth = PuzzleWidth / props.size;
    const tileWrapperStyle = {
        width: `${props.size * tileWidth}px`
    }
    const tileContainerStyle = {
        gridTemplateColumns: `repeat(${props.size},${tileWidth}px)`
    }

    return (
        <div>
            <div className='tile-wrapper' style={tileWrapperStyle}>
                <div className='tile-container' style={tileContainerStyle}>
                    {
                        props.tiles.map((t, idx) =>
                            <TileView key={idx}
                                id={t}
                                correctPos={t === (idx + 1)}
                                imageNumber={props.imageNumber}
                                onClick={props.onTileClicked}
                                tileWidth={tileWidth}
                                size={props.size}
                            />)
                    }
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
