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

// Selector
export function getRoute(state) {
	return getSubRoute(state.route);
}

function getSubRoute(current_route_object) {

	var route_string = "";

	if (current_route_object.current) {

		route_string += "/" + current_route_object.current;

		if (current_route_object.current != 'index') {
			if (current_route_object[current_route_object.current]) {
				route_string += getSubRoute(current_route_object[current_route_object.current]);
			}
		}
		else {
			route_string += "/index"
		}
	}

	return route_string;
}
