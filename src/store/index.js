import { createStore } from 'redux';
import rootReducer from '../reducers';

const isDevMode = process.execPath.match(/[\\/]electron/);

let store;

if (isDevMode) {
  console.log("dev");
  store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  console.log(store.getState())
} 
else {
  console.log("prod");
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