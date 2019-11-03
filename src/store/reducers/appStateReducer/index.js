import { appStateActions } from './../../actions'
import { initialState } from './../../models/appStateModel'

const appStateReducer = (state = initialState, action) => {

    switch (action.type) {

        case appStateActions.SET_PATH:
            return Object.assign({}, state, {
                path: action.path
			});

		case appStateActions.SET_THEME:
			return Object.assign({}, state, {
				theme: action.theme
			});

		case appStateActions.SELECT_MAIN_AREA:
			return Object.assign({}, state, {
				selectedMainArea: action.navbarTabId
			});

		case appStateActions.SELECT_SCRIPT_AREA:
			return Object.assign({}, state, {
				selectedScriptArea: action.navbarTabId
			});

		case appStateActions.SELECT_SCRIPT_STRUCTURE_AREA:
			return Object.assign({}, state, {
				selectedScriptStructureArea: action.navbarTabId
			});

        default:
            return state;
    }
};

export default appStateReducer;
