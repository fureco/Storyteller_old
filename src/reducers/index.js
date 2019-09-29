// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import projectReducer from './projectReducer';
import fileTreeReducer from './../components/FileTree/reducers';

const rootReducer = combineReducers({
    routerReducer,
    projectReducer,
    fileTreeReducer
});

export default rootReducer;