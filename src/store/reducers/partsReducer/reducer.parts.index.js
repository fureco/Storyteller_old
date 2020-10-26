import { partsActions } from '../../actions'
import { getNewID } from '../utils'

import partReducer from './partReducer/reducer.part.index'

const partsReducer = (state = [], action) => {

	switch (action.type) {

		case partsActions.ADD_PART:
			state = state.slice();
			state.push(action.part);
			return state;

		case partsActions.SET_DELETED_AT:
			state[state.indexOf(action.part)] = partReducer(action.part, action);
			return state;

		default:
			return state;
	}
};

export default partsReducer;
