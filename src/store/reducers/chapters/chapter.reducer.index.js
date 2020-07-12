import * as actions from './chapter.actions.index'
import { initialState } from './chapter.model'

const chapterReducer = (state = initialState, action) => {

	switch (action.type) {

		case actions.SET_TITLE:
			return Object.assign({}, state, {
				title: action.title
			});

		case actions.SET_DELETED_AT:
			return Object.assign({}, state, {
				deleted_at: action.deleted_at
			});

		default:
			return state;
	}
};

export default chapterReducer;
