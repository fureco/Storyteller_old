// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import script from './script.js';

const rootReducer = combineReducers({
  router,
  script
});

export default rootReducer;
