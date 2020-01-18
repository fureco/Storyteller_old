import { getNewID } from '../utils'

import partReducer from './partReducer/reducer.part.index'

const partsReducer = (state = [], action) => {

	switch (action.type) {

		case partsReducer.ADD_PART:
			state = state.slice();
			state.push(Object.assign({}, action.part, { id: getNewID(state) }));
			return state;

		case partsReducer.SET_DELETED_AT:
			state[state.indexOf(action.part)] = partReducer(action.part, action);
			return state;

		default:
			return state;
	}
};

export default partsReducer;
