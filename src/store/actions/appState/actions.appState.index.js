import storage from 'electron-json-storage';
import { initialState } from './../../models/appStateModel'

const fs = require('fs');

// ############## ACTION TYPES #################
export const SET_OBJECT_TO_DELETE = 'SET_OBJECT_TO_DELETE';
export const SET_PATH = 'SET_PATH';
export const SET_ROUTE = 'SET_ROUTE';
export const SET_THEME = 'SET_THEME';

export const SHOW_MOVE_TO_TRASH_ALERT = 'SHOW_MOVE_TO_TRASH_ALERT';
export const HIDE_MOVE_TO_TRASH_ALERT = 'HIDE_MOVE_TO_TRASH_ALERT';

// ############## ACTIONS #################
export const setObjectToDelete = (object_to_delete) => ({ type: SET_OBJECT_TO_DELETE, object_to_delete });
export const setPath = (path) => ({ type: SET_PATH, path });
export const setRoute = (route) => ({ type: SET_ROUTE, route });
export const setTheme = (theme) => ({ type: SET_THEME, theme });
export const showMoveToTrashAlert = (object_to_delete) => ({ type: SHOW_MOVE_TO_TRASH_ALERT, object_to_delete });
export const hideMoveToTrashAlert = () => ({ type: HIDE_MOVE_TO_TRASH_ALERT });

export const changeTheme = (theme) => {

	return (dispatch, getState) => {

		storage.get('storyteller', function (error, data) {
			if (error) throw error;

			if (data) {

				var new_data = Object.assign({}, data, {
					theme: theme
				});

				storage.set('storyteller', new_data, (error) => {
					if (error) throw error;
					dispatch(setTheme(theme));
				});
			}
		});
	}
}

export const changeCurrentRootRoute = (navbarTabId) => {

	return (dispatch, getState) => {

		var route_copy = getState().appStateReducer.route || initialState.route;
		route_copy.current = navbarTabId;

		var route = Object.assign({}, getState().appStateReducer.route, route_copy);

		dispatch(setRoute(route));
	}
}

export const changeCurrentScriptRoute = (navbarTabId) => {

	return (dispatch, getState) => {

		var route_copy = getState().appStateReducer.route || initialState.route;
		route_copy.script.current = navbarTabId;

		var route = Object.assign({}, getState().appStateReducer.route, route_copy);

		dispatch(setRoute(route));
	}
}

export const changeCurrentScriptStructureRoute = (navbarTabId) => {

	return (dispatch, getState) => {

		var route_copy = getState().appStateReducer.route || initialState.route;

		if ( route_copy.script.structure ) {
			route_copy.script.structure.current = navbarTabId;
		}
		else {
			route_copy.script.structure = { current: navbarTabId };
		}

		var route = Object.assign({}, getState().appStateReducer.route, route_copy);

		console.log(route)

		dispatch(setRoute(route));
	}
}

export const load = (directoryPath) => {

	return (dispatch, getState) => {

		storage.get('storyteller', function (error, storageData) {

			if (error) throw error;

			if (storageData.path) {

				console.log("load app state: " + storageData.path);

				return fs.readFile(storageData.path + '/src/appState.json', (err, fileData) => {

					if (err) throw err;

					if (!fileData) {
						console.log("appState.json is empty");
						return;
					}

					let jsonData = JSON.parse(fileData);

					dispatch(setRoute(jsonData.route || initialState.route));
				});
			}
		});
	};
}

export const save = () => {

	console.log("saving app state...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().appStateReducer);
		// console.log("content: " + content);

		storage.get('storyteller', function (error, data) {

			if (error) throw error;

			if (data.path) {

				fs.writeFile(data.path + "/src/appState.json", content, (err) => {

					if (err) throw error;

					else {
						console.log("Saved!");
					}
				})
			}
		});
	};
};
