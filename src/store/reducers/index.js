// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appStateReducer from './appStateReducer';
import charactersReducer from './charactersReducer/reducer.characters.index';
import partsReducer from './partsReducer/reducer.parts.index';
import project from './projectReducer/reducer.project.index';
import scenesReducer from './scenesReducer/reducer.scenes.index';

const rootReducer = combineReducers({
	appStateReducer,
	charactersReducer,
	routerReducer,
	partsReducer,
	project,
	scenesReducer
});

export default rootReducer;
