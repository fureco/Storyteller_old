import { createStore, applyMiddleWare } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

let store;

if (process.NODE_ENV === 'development') {
  store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleWare(
        createLogger({ collapsed: true })
      )
    )
  )
} else {
  store = createStore(
    rootReducer
  );
}

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;