import { appStateActions } from './../../actions'

export const initialState = {
    path: "",
    selectedMainArea: "script",
};

const appStateReducer = (state = initialState, action) => {

    switch (action.type) {

        case appStateActions.SET_PATH:
            console.log("SET_PATH");
            return Object.assign({}, state, {
                path: action.path
            });

        case appStateActions.SELECT_MAIN_AREA:
            console.log("SELECT_MAIN_AREA");
            return Object.assign({}, state, {
                appState: {
                    selectedMainArea: action.navbarTabId
                }
            });

        default:
            return state;
    }
};

export default appStateReducer;