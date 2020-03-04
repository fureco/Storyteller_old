import { appStateActions } from './../../actions'
import { initialState } from './../../models/appStateModel'

const appStateReducer = (state = initialState, action) => {

	switch (action.type) {


		case appStateActions.SET_OBJECT_TO_DELETE:
			return Object.assign({}, state, {
				object_to_delete: action.object_to_delete
			});

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

		case appStateActions.SHOW_MOVE_TO_TRASH_ALERT:
			return Object.assign({}, state, {
				showMoveToTrashAlert: true,
			});

		case appStateActions.HIDE_MOVE_TO_TRASH_ALERT:
			return Object.assign({}, state, {
				showMoveToTrashAlert: false,
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
