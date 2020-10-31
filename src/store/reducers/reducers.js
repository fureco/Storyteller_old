// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appStateReducer from './appStateReducer';
import chapters from './chapters/chapters.reducer.index';
import charactersReducer from './charactersReducer/reducer.characters.index';
import partsReducer from './partsReducer/reducer.parts.index';
import project from './project/project.reducer.index';
import scenesReducer from './scenesReducer/reducer.scenes.index';
import workspace from './../workspace/workspace.reducer';

const rootReducer = combineReducers({
	appStateReducer,
	chapters,
	charactersReducer,
	routerReducer,
	partsReducer,
	project,
	scenesReducer,
	workspace
});

export default rootReducer;
