// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appStateReducer from './appStateReducer';
import charactersReducer from './charactersReducer';
import partsReducer from './partsReducer/reducer.parts.index';
import projectReducer from './projectReducer';
import scenesReducer from './scenesReducer/reducer.scenes.index';

const rootReducer = combineReducers({
	appStateReducer,
	charactersReducer,
	routerReducer,
	partsReducer,
	projectReducer,
	scenesReducer
});

export default rootReducer;
