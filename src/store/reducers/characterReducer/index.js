import { characterActions } from './../../actions'
import { initialState } from './../../models/characterModel'

const characterReducer = (state = initialState, action) => {

	switch (action.type) {

		case characterActions.SET_FIRST_NAME:
			return Object.assign({}, state, {
				firstName: action.firstName
			});

		case characterActions.SET_LAST_NAME:
			return Object.assign({}, state, {
				lastName: action.lastName
			});

		case characterActions.SET_NICKNAME:
			return Object.assign({}, state, {
				nickname: action.nickname
			});

		default:
			return state;
	}
};

export default characterReducer;

function getNewID(array_of_objects_in_state) {

	let max_id = array_of_objects_in_state.reduce(function (prev, current) { return (prev.id > current.id) ? prev.id : current.id }, 0)
	return max_id + 1;
}
