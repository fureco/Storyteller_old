import storage from 'electron-json-storage';

const fs = require('fs');

// ############## ACTION TYPES #################
export const SET_PATH = 'SET_PATH';
export const SET_THEME = 'SET_THEME';
export const SELECT_MAIN_AREA = 'SELECT_MAIN_AREA';
export const SELECT_SCRIPT_AREA = 'SELECT_SCRIPT_AREA';
export const SELECT_SCRIPT_STRUCTURE_AREA = 'SELECT_SCRIPT_STRUCTURE_AREA';

// ############## ACTIONS #################
export const setPath = (path) => ({ type: SET_PATH, path });
export const setTheme = (theme) => ({ type: SET_THEME, theme });
export const selectMainArea = (navbarTabId) => ({ type: SELECT_MAIN_AREA, navbarTabId });
export const selectScriptArea = (navbarTabId) => ({ type: SELECT_SCRIPT_AREA, navbarTabId });
export const selectScriptStructureArea = (navbarTabId) => ({ type: SELECT_SCRIPT_STRUCTURE_AREA, navbarTabId });


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

export const load = (directoryPath) => {

	return (dispatch, getState) => {

		storage.get('storyteller', function (error, storageData) {

			if (error) throw error;

			console.log("load app state: " + storageData.path);

			if (storageData.path) {

				return fs.readFile(storageData.path + '/appState.json', (err, fileData) => {

					if (err) throw err;

					if (!fileData) {
						console.log("appState.json is empty");
						return;
					}

					var jsonData = JSON.parse(fileData);

					dispatch(selectMainArea(jsonData.selectedMainArea));
					dispatch(selectScriptArea(jsonData.selectedScriptArea));
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

				fs.writeFile(data.path + "/appState.json", content, (err) => {

					if (err) throw error;

					else {
						console.log("Saved!");
					}
				})
			}
		});
	};
};
