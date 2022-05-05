import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import tileGame from './reducers/tile-game-reducer';
import { fetchHighScoreList } from './reducers/thunks'
import { initGame } from './reducers/actions';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { GameId_3x3, NumImages } from './constants';
import GameView from './views/GameView';

// For integration with Redux DevTools in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(tileGame, composeEnhancers(
    applyMiddleware(thunk)
));

store.dispatch(initGame(GameId_3x3, Math.floor(Math.random() * NumImages) + 1, true));
store.dispatch(fetchHighScoreList);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <GameView />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
