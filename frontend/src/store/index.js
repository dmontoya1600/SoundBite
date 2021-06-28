import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import followerReducer from './follow';

import sessionReducer from './session';
import uploadPicReducer from './uploadPic'
import librariesReducer from './library'
import soundBitesRedeucer from './soundBite'
import commentsReducer from './comment'

const rootReducer = combineReducers({
  session: sessionReducer,
  pic: uploadPicReducer,
  follow: followerReducer,
  libraries: librariesReducer,
  soundbites: soundBitesRedeucer,
  comments: commentsReducer,
});
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
