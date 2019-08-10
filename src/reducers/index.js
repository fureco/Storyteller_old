// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import projectReducer from './project.js';

const rootReducer = combineReducers({
  routerReducer,
  projectReducer
});

export default rootReducer;