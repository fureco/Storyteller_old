import { charactersActions } from '../../../actions'
import { initialState } from './../../../models/characterModel'

const characterReducer = (state = initialState, action) => {
	// console.log("characterReducer: " + action.type, action)
	switch (action.type) {

		case charactersActions.SET_FIRST_NAME:
			return Object.assign({}, state, {
				first_name: action.first_name
			});

		case charactersActions.SET_LAST_NAME:
			return Object.assign({}, state, {
				last_name: action.last_name
			});

		case charactersActions.SET_NICKNAME:
			return Object.assign({}, state, {
				nickname: action.nickname
			});

		case charactersActions.SET_DELETED_AT:
			return Object.assign({}, state, {
				deleted_at: action.deleted_at
			});

		default:
			return state;
	}
};

export default characterReducer;
