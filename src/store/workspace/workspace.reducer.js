import * as actions from './workspace.actions'
import { initialState } from './workspace.model'

const workspace = (state = initialState, action) => {

	switch (action.type) {

		case actions.WORKSPACE_SET_PATH:
			return Object.assign({}, state, {
				path: action.payload
			});

		case actions.WORKSPACE_SET_PROJECTS:
			return Object.assign({}, state, {
				projects: action.payload
			});

		default:
			return state;
	}
};

export default workspace;
