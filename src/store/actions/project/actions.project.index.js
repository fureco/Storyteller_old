import { appStateActions } from './../';
import storage from 'electron-json-storage';
import { initialState } from './../../models/projectModel';

const fs = require('fs');

// ############ ACTION TYPES ##############
export const OPEN_PROJECT = 'OPEN_PROJECT';

export const SET_TITLE = 'SET_TITLE';
export const SET_ABSTRACT = 'SET_ABSTRACT';

export const ADD_PART = 'ADD_PART';
export const REMOVE_PART = 'REMOVE_PART';

// ############## ACTIONS #################
export const createProjectAction = (directoryPath, data) => {

	console.log("start creating a new project...");

	const files = fs.readdirSync(directoryPath);

    if (!files.length) {
        console.log("directory is empty, can be used to create new project: " + directoryPath);
		createNewStorytellerProjectFile(directoryPath, data);
		return (dispatch, getState) => {
			return dispatch(openProjectSuccess(directoryPath, JSON.parse(data)));
		}
    }
    else {
        console.log("directory is NOT empty");
		if (!storytellerProjectFileExists(directoryPath)) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it still should be used for the new project
			// createNewStorytellerProjectFile(directoryPath, data);
		}
		else {
			console.log("project.json file exists");
		}
    }

    storage.set('storyteller', { path: directoryPath }, (error) => {
        if (error) {
            console.error(error);
        }
    });

    return true;
};

export const openProjectAction = (directoryPath) => {

    console.log("openProjectAction: " + directoryPath);

    return (dispatch, getState) => {

        storage.set('storyteller', { path: directoryPath }, (error) => {
            if (error) {
                console.error(error);
            }
        });

		if (!storytellerProjectFileExists(directoryPath)) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it still should be used for the new project
			console.log("project.json file does not exist");

			data = JSON.stringify(initialState);
			createNewStorytellerProjectFile(directoryPath, data);
		}
		else {
			console.log("project.json file exists");

			return fs.readFile(directoryPath + '/project.json', (err, fileData) => {

				if (err) {
					console.error(err)
					return
				}

				var data = fileData;

				if (!fileData) {
					console.log("project.json file exists - but is empty");
					data = JSON.stringify(initialState);
					createNewStorytellerProjectFile(directoryPath, data);
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
        jsonData.parts.forEach(part => {
            dispatch(addScriptPartActionSuccess(part.name));
        })
        // jsonData.chapters.forEach(chapter => {
        //     dispatch(addChapterActionSuccess(chapter));
        // })
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

export const addScriptPartAction = (partName) => {

    console.log("addScriptPartAction");

    return (dispatch, getState) => {

        dispatch(addScriptPartActionSuccess(partName));

        console.log("state: " + JSON.stringify(getState().projectReducer));

        return save(getState().projectReducer).then(
            () => dispatch(setPath(directoryPath)),
            (err) => console.log(err)
        );
    };
}

export const addScriptPartActionSuccess = (partName) => ({ type: ADD_PART, partName });

export const removeScriptPartAction = () => ({ type: REMOVE_PART });

export const save = () => {

	console.log("saving project...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().projectReducer);
		// console.log("content: " + content);

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

function createNewStorytellerProjectFile(directoryPath, data) {

	console.log("creating new project file...");

	return fs.writeFileSync(directoryPath + "/project.json", data);
}
