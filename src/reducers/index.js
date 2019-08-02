// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import projectReducer from './project.js';

const rootReducer = combineReducers({
  router: routerReducer,
  project: projectReducer
});

export default rootReducer;