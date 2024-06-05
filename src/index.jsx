import { createRoot } from 'react-dom/client';
import './index.css';
import tileGame from './reducers/reducers';
import { fetchHighScoreList } from './reducers/thunks'
import { initGame } from './reducers/reducers';
import { Provider } from 'react-redux';
import { GameId_3x3, NumImages } from './constants';
import GameView from './views/GameView';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        tileGame
    }
});

store.dispatch(initGame({ gameId: GameId_3x3, imageNumber: Math.floor(Math.random() * NumImages) + 1, doShuffling: true }));
store.dispatch(fetchHighScoreList);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <GameView />
    </Provider>
);

