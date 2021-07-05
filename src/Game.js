import React, { Component } from 'react';
import TileView from './TileView'
import './Game.css';
import { connect } from 'react-redux'
import { initGame, moveTile, nameChanged } from './actions';
import GameStatusView from './GameStatusView';
import { NumImages, PuzzleWidth } from './constants';
import { fetchHighScoreList, updateHighScoreList } from './reducers';

class Game extends Component {
    render() {
        const imPath = `${window.location.href}/images/img${this.props.imageNumber}.jpg`;
        const tileWidth = PuzzleWidth / this.props.size;
        const fullImageWidth = this.props.size * tileWidth;
        let tileWrapperStyle = {
            width: fullImageWidth + "px"
        }
        let tileContainerStyle = {
            gridTemplateColumns: "repeat(" + this.props.size + ", " + tileWidth + "px)"
        }
        let fullImageStyle = {
            maxWidth: fullImageWidth + "px",
            maxHeight: fullImageWidth + "px"
        }

        const blocks = this.props.tiles.sort((a, b) => a.pos > b.pos).map(c =>
            <TileView key={c.id}
                id={c.id} pos={c.pos} left={c.left} top={c.top}
                imageNumber={this.props.imageNumber}
                onClick={this.props.onTileClicked}
            />
        );

        const gameHUD = <GameStatusView
            gameComplete={this.props.gameComplete}
            turnNo={this.props.turnNo}
            highScorePosition={this.props.highScorePosition}
            onSubmitNameToHighScore={this.props.onSubmitNameToHighScore}
            onNameChanged={this.props.onNameChanged}
            highScoreListSaved={this.props.highScoreListSaved}
            highScoreList={this.props.highScoreList}
            gameName={this.props.gameName}
        />;

        return (
            <div className='game'>
                <header className='game-header'>
                    <div className='game-title'>Sliding Image Puzzle</div>
                </header>
                <div className='game-status'>
                    {gameHUD}
                </div>
                <div>
                    <div className='tile-wrapper' style={tileWrapperStyle}>
                        <div className='tile-container' style={tileContainerStyle}>
                            {blocks}
                        </div>
                    </div>
                </div>
                <button className='game-button' onClick={() => this.props.onInitGame(0)}>Restart 3x3</button>
                <button className='game-button' onClick={() => this.props.onInitGame(1)}>Restart 4x4</button>
                <button className='game-button' onClick={() => this.props.onInitGame(2)}>Restart 5x5</button>
                <div className="full-image" style={fullImageStyle}>
                    <img src={`${imPath}`} draggable='false' alt='' />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        size: state.size,
        turnNo: state.turnNo,
        imageNumber: state.imageNumber,
        gameComplete: state.gameComplete,
        tiles: state.tiles,
        highScorePosition: state.highScorePosition,
        highScoreListSaved: state.highScoreListSaved,
        highScoreList: state.highScoreList,
        gameName: state.gameName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTileClicked: id => {
            dispatch(moveTile(id));
        },
        onInitGame: (gameId) => {
            dispatch(initGame(gameId, Math.floor(Math.random() * NumImages) + 1, true));
            dispatch(fetchHighScoreList);
        },
        onSubmitNameToHighScore: () => {
            dispatch(updateHighScoreList);
        },
        onNameChanged: (name) => {
            dispatch(nameChanged(name));
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;
