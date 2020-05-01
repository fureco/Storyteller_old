import * as chapterActions from './chapter.actions.index.js'
import chapterReducer from './chapter.reducer.index.js'
import { initialState } from './chapter.model.js'
import { getNewID } from '../utils'

const chapters = (state = [], action) => {

	switch (action.type) {

		case chapterActions.ADD:
			state = state.slice();
			state.push(action.chapter);
			return state;

		case chapterActions.CREATE:
			state = state.slice();
			state.push(Object.assign(initialState, action.chapter, { id: getNewID(state), position: state.length + 1 }));
			return state;

		case chapterActions.SET:
			state = action.chapters;
			return state;

		case chapterActions.SET_DELETED_AT:
			state[state.indexOf(action.chapter)] = chapterReducer(action.chapter, action);
			return state;

		default:
			return state;
	}
};

export default chapters;
