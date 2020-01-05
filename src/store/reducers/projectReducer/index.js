import { projectActions } from './../../actions'
import { initialState } from './../../models/projectModel'
import { getNewID } from './../utils'

const projectReducer = (state = initialState, action) => {

    switch (action.type) {

		case projectActions.SET_TITLE:
			return Object.assign({}, state, {
				title: action.title
			});

		case projectActions.SET_ABSTRACT:
			return Object.assign({}, state, {
				abstract: action.abstract
			});

		case projectActions.SET_DEDICATION:
			return Object.assign({}, state, {
				dedication: action.dedication
			});

		case projectActions.SET_PARTS:
			return Object.assign({}, state, {
				parts: action.parts
			});

		case projectActions.ADD_PART:
			return Object.assign({}, state, {
				parts: [
					...state.parts,
					{
						id: getNewID(state.parts),
						position: state.parts.length + 1,
						title: action.partTitle
					}
				]
			});

		case projectActions.REMOVE_PART:

			// console.log("REMOVE_PART: " + action.partID)

			let filtered_parts = state.parts.filter(part => part.id != action.partID);

			// console.log("filtered_parts: " + JSON.stringify(filtered_parts))

			for (let i = 0; i < filtered_parts.length; i++) {
				filtered_parts[i].position = i + 1;
			}

			return Object.assign({}, state, {
				parts: filtered_parts
			});

    default:
        return state;
  }
};

export default projectReducer;
