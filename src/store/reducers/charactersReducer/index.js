import { charactersActions } from './../../actions'

import characterReducer from './../charactersReducer'

const charactersReducer = (state = [], action) => {

	switch (action.type) {

		case charactersActions.ADD_CHARACTER:
			state = state.slice();
			state.push(characterReducer(Object.assign({}, action.character, { id: getNewID(state) }), 'CREATE_CHARACTER'));
			return state;

		// case charactersActions.REMOVE_CHARACTER:
		// 	// console.log("REMOVE_CHARACTER: " + action.partID)

		// 	let filtered = state.characters.filter(character => character.id != action.partID);

		// 	// console.log("filtered: " + JSON.stringify(filtered))

		// 	for (let i = 0; i < filtered.length; i++) {
		// 		filtered[i].position = i + 1;
		// 	}

		// 	return Object.assign({}, state, {
		// 		characters: filtered
		// 	});

		default:
			return state;
	}
};

export default charactersReducer;

function getNewID(array_of_objects_in_state) {

	let max_id = array_of_objects_in_state.reduce(function (prev, current) { return (prev.id > current.id) ? prev.id : current.id }, 0)
	return max_id + 1;
}
