import { appStateActions } from './../../actions'
import { initialState } from './../../models/appStateModel'

const appStateReducer = (state = initialState, action) => {

    switch (action.type) {

        case appStateActions.SET_PATH:
            return Object.assign({}, state, {
                path: action.path
			});

		case appStateActions.SET_ROUTE:
			return Object.assign({}, state, {
				route: action.route
			});

		case appStateActions.SET_THEME:
			return Object.assign({}, state, {
				theme: action.theme
			});

        default:
            return state;
    }
};

export default appStateReducer;

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
