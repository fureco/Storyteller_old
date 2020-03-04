import { scenesActions } from '../../actions'
import { getNewID } from '../utils'
import { initialState } from '../../models/sceneModel'
import sceneReducer from './sceneReducer/reducer.scene.index'

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
