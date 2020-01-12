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

    default:
        return state;
  }
};

export default projectReducer;
