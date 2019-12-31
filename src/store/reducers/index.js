// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appStateReducer from './appStateReducer';
import charactersReducer from './charactersReducer';
import projectReducer from './projectReducer';
import fileTreeReducer from './../../components/FileTree/reducers';

const rootReducer = combineReducers({
	appStateReducer,
	charactersReducer,
	routerReducer,
    projectReducer,
    fileTreeReducer
});

export default rootReducer;
