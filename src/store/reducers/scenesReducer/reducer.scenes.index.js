import { getNewID } from '../utils'

import sceneReducer from './sceneReducer/reducer.scene.index'

const scenesReducer = (state = [], action) => {

	switch (action.type) {

		case scenesReducer.ADD_SCENE:
			state = state.slice();
			state.push(Object.assign({}, action.scene, { id: getNewID(state) }));
			return state;

		case scenesReducer.SET_DELETED_AT:
			state[state.indexOf(action.scene)] = sceneReducer(action.scene, action);
			return state;

		default:
			return state;
	}
};

export default scenesReducer;
