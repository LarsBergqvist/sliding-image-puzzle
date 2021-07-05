import React from 'react';
import { connect } from 'react-redux'
import { PuzzleWidth } from '../constants';
import TileView from './TileView'
import { moveTile } from '../actions';

const Puzzle = (props) => {
    const tileWidth = PuzzleWidth / props.size;
    const fullImageWidth = props.size * tileWidth;
    let tileWrapperStyle = {
        width: fullImageWidth + "px"
    }
    let tileContainerStyle = {
        gridTemplateColumns: "repeat(" + props.size + ", " + tileWidth + "px)"
    }

    const blocks = props.tiles.sort((a, b) => a.pos > b.pos).map(c =>
        <TileView key={c.id}
            id={c.id} pos={c.pos} left={c.left} top={c.top}
            imageNumber={props.imageNumber}
            onClick={props.onTileClicked}
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
