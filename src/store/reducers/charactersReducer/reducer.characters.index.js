import { charactersActions } from '../../actions'
import { getNewID } from '../utils'

import characterReducer from './characterReducer/reducer.character.index'

export const charactersReducer = (state = [], action) => {
	// console.log("charactersReducer: " + action.type)
	switch (action.type) {

		case charactersActions.ADD_CHARACTER:
			state = state.slice();
			state.push(Object.assign({}, action.character, { id: getNewID(state) }));
			return state;

		case charactersActions.SET_DELETED_AT:
			state[state.indexOf(action.character)] = characterReducer(action.character, action);
			return state;

		default:
			return state;
	}
};

export default charactersReducer;
