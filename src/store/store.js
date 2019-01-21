import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import timersReducer from '../reducers/timersReducer';

import initialState from './initialState';

const rootReducer = combineReducers({
    timers: timersReducer,
});

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
