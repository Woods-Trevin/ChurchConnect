import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import announcementReducer from './announcement';
import eventReducer from './event';
import commentReducer from './comment';
import replyReducer from './reply';

const rootReducer = combineReducers({
  session,
  announcement: announcementReducer,
  event: eventReducer,
  comment: commentReducer,
  reply: replyReducer,

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
