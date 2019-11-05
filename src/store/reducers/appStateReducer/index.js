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
