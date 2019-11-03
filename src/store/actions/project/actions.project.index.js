import { appStateActions } from './../';
import storage from 'electron-json-storage';

import { initialState as initialProjectState } from './../../models/projectModel';
import { initialState as initialAppState } from './../../models/appStateModel';

const fs = require('fs');

// ############ ACTION TYPES ##############
export const SET_TITLE = 'SET_TITLE';
export const SET_ABSTRACT = 'SET_ABSTRACT';
export const SET_DEDICATION = 'SET_DEDICATION';
export const SET_PARTS = 'SET_PARTS';
export const ADD_PART = 'ADD_PART';
export const REMOVE_PART = 'REMOVE_PART';

// ############## ACTIONS #################
export const createProjectAction = (directoryPath) => {

	console.log("start creating a new project...", directoryPath);

	return (dispatch, getState) => {

		const files = fs.readdirSync(directoryPath);

		if (!files.length) {
			console.log("directory is empty, can be used to create new project");

			return dispatch(createNewStorytellerProjectFile(directoryPath));
		}
		else {
			console.log("directory is NOT empty");
			if (!storytellerProjectFileExists(directoryPath)) {
				// TO DO: Show UI dialog that directory is not empty, ask user if it still should be used for a new project
				// createNewStorytellerProjectFile(directoryPath, data);
			}
			else {
				console.log("project.json file exists");
				// TO DO: show UI dialog to inform user and ask if existing project should be opened
				return dispatch(openProjectAction(directoryPath));
			}
		}

		storage.set('storyteller', { path: directoryPath }, (error) => {
			if (error) {
				console.error(error);
			}
		});
	};
};

export const openProjectAction = (directoryPath) => {

    console.log("openProjectAction: " + directoryPath);

    return (dispatch, getState) => {

        storage.set('storyteller', { path: directoryPath }, (error) => {
			if (error) throw error;
        });

		if (!storytellerProjectFileExists(directoryPath)) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it should be used for a new project
			console.log("project.json file does not exist");
		}
		else {
			console.log("project.json file exists");

			return fs.readFile(directoryPath + '/project.json', (err, fileData) => {

				if (err) throw err;

				var data = fileData;

				if (!fileData) {

					console.log("project.json file exists - but is empty");
					return dispatch(createNewStorytellerProjectFile(directoryPath));
				}

				return dispatch(openProjectSuccess(directoryPath, JSON.parse(data)));
			});
		}
    };
}

function openProjectSuccess(directoryPath, jsonData) {

	console.log("openProjectSuccess");

	return (dispatch, getState) => {

        dispatch(appStateActions.setPath(directoryPath));
		dispatch(setTitle(jsonData.title));
		dispatch(setAbstract(jsonData.abstract));
		dispatch(setDedication(jsonData.dedication));
        jsonData.parts.forEach(part => {
            dispatch(addScriptPartActionSuccess(part.title));
        })
        // jsonData.chapters.forEach(chapter => {
        //     dispatch(addChapterActionSuccess(chapter));
		// })

		dispatch(appStateActions.load());
    }
}

export const closeProjectAction = () => {

	console.log("closeProjectAction");

	return (dispatch, getState) => {
		storage.clear('storyteller', (error) => {
			if (error) throw error;
			dispatch(appStateActions.setPath(""));
		});
	}
}

export const setTitle = (title) => ({ type: SET_TITLE, title });
export const setAbstract = (abstract) => ({ type: SET_ABSTRACT, abstract });
export const setDedication = (dedication) => ({ type: SET_DEDICATION, dedication });
export const setParts = (parts) => ({ type: SET_PARTS, parts });

export const addScriptPartAction = (partTitle) => {

    console.log("addScriptPartAction");

    return (dispatch, getState) => {

		dispatch(addScriptPartActionSuccess(partTitle));

		console.log("state: " + JSON.stringify(getState().projectReducer));

		return dispatch(save());
    };
}

export const addScriptPartActionSuccess = (partTitle) => ({ type: ADD_PART, partTitle });

export const deleteScriptPartAction = (partID) => {

	// console.log("deleteScriptPartAction: " + partID);

	return (dispatch, getState) => {

		dispatch(removeScriptPartAction(partID));

		// console.log("state: " + JSON.stringify(getState().projectReducer));

		return dispatch(save());
	};
}

const removeScriptPartAction = (partID) => ({ type: REMOVE_PART, partID });

export const save = () => {

	console.log("saving project...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().projectReducer);
		console.log("content: " + content);

		storage.get('storyteller', function (error, data) {
			if (error) throw error;
			console.log("current_project: " + data.path);
			if (data.path) {
				fs.writeFile(data.path + "/project.json", content, (err) => {
					if (err) {
						console.log("FAILURE: ", err)
					}
					else {
						console.log("Saved!")
					}
				})
			}
		});
	};
};

function storytellerProjectFileExists(directoryPath) {

	let fileNameExists = false;

	fs.readdirSync(directoryPath).forEach(fileName => {
		fileNameExists = fileName == "project.json";
	});

	return fileNameExists;
};

function createNewStorytellerProjectFile(directoryPath) {

	console.log("creating new project file...");

	return (dispatch, getState) => {

		fs.writeFile(directoryPath + "/project.json", JSON.stringify(initialProjectState), (err) => {

			if (err) throw err;

			console.log("creating new app state file...");

			fs.writeFile(directoryPath + "/appState.json", JSON.stringify(initialAppState), (err) => {

				if (err) throw err;

				storage.set('storyteller', { path: directoryPath }, (error) => {
					if (error) throw error;
				});

				return dispatch(openProjectAction(directoryPath));
			});
		});
	};
}
