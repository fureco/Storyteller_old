import { charactersActions } from '../../actions'
import { getNewID } from '../utils'
import { initialState } from './../../models/characterModel'
import characterReducer from './characterReducer/reducer.character.index'

const charactersReducer = (state = [], action) => {
	// console.log("charactersReducer: " + action.type)
	switch (action.type) {

		case charactersActions.ADD_CHARACTER:
			state = state.slice();
			state.push(action.character);
			return state;

		case charactersActions.CREATE_CHARACTER:
			state = state.slice();
			state.push(Object.assign(initialState, action.character, { id: getNewID(state), position: state.length }));
			return state;

		case charactersActions.SET_CHARACTERS:
			state = action.characters;
			return state;

		case charactersActions.SET_DELETED_AT:
			state[state.indexOf(action.character)] = characterReducer(action.character, action);
			return state;

		default:
			return state;
	}
};

export default charactersReducer;
