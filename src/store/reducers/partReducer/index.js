import { partActions } from './../../actions'
import { initialState } from './../../models/partModel'

const partReducer = (state = initialState, action) => {

	switch (action.type) {

		case partActions.SET_TITLE:
			return Object.assign({}, state, {
				title: action.title
			});

		case partActions.SET_ABSTRACT:
			return Object.assign({}, state, {
				abstract: action.abstract
			});

		default:
			return state;
	}
};

export default partReducer;
