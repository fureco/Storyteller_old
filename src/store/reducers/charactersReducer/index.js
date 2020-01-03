import { charactersActions } from './../../actions'

import characterReducer from './../characterReducer'

const charactersReducer = (state = [], action) => {
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

function getNewID(array_of_objects_in_state) {

	let max_id = array_of_objects_in_state.reduce(function (prev, current) { return (prev.id > current.id) ? prev.id : current.id }, 0)
	return max_id + 1;
}
