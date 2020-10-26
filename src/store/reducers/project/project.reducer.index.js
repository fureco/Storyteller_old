import * as projectActions from './project.actions.index'
import { initialState } from './project.model'

const project = (state = initialState, action) => {

	switch (action.type) {

		case projectActions.SET_COVER:
			return Object.assign({}, state, {
				cover: action.cover
			});

		case projectActions.SET_TITLE:
			return Object.assign({}, state, {
				title: action.title
			});

		case projectActions.SET_AUTHOR:
			return Object.assign({}, state, {
				author: action.author
			});

		case projectActions.SET_ABSTRACT:
			return Object.assign({}, state, {
				abstract: action.abstract
			});

		case projectActions.SET_DEDICATION:
			return Object.assign({}, state, {
				dedication: action.dedication
			});

		case projectActions.SET_ROUTE:
			return Object.assign({}, state, {
				route: action.route
			});

		case projectActions.SET_SELECTED_CHAPTER:
			return Object.assign({}, state, {
				selectedChapter: action.chapter
			});

    default:
        return state;
  }
};

export default project;