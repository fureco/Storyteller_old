// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appState from './appState/appState.reducer';
import chapters from './chapters/chapters.reducer';
import charactersReducer from './reducers/charactersReducer/reducer.characters.index';
import partsReducer from './reducers/partsReducer/reducer.parts.index';
import project from './project/project.reducer';
import scenesReducer from './reducers/scenesReducer/reducer.scenes.index';
import workspace from './workspace/workspace.reducer';

const rootReducer = combineReducers({
	appState,
	chapters,
	charactersReducer,
	routerReducer,
	partsReducer,
	project,
	scenesReducer,
	workspace
});

export default rootReducer;
