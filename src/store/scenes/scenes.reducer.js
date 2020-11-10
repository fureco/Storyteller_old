import * as scenesActions from './scenes.actions'
import { getNewID } from './../reducers/utils'
import { initialState } from './scene.model'
import sceneReducer from './sceneReducer/scene.reducer'

const scenesReducer = (state = [], action) => {

	switch (action.type) {

		case scenesActions.ADD_SCENE:
			state = state.slice();
			state.push(action.scene);
			return state;

		case scenesActions.CREATE_SCENE:
			state = state.slice();
			state.push(Object.assign(initialState, action.scene, { id: getNewID(state), position: state.length }));
			return state;

		case scenesActions.SET_DELETED_AT:
			state[state.indexOf(action.scene)] = sceneReducer(action.scene, action);
			return state;

		default:
			return state;
	}
};

export default scenesReducer;
