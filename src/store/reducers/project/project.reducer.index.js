import { projectActions } from '../../actions'
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

    default:
        return state;
  }
};

export default project;