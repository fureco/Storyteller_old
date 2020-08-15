import * as appStateActions from './../../actions/appState/actions.appState.index';
import * as chaptersActions from './../../reducers/chapters/chapter.actions.index';
import * as charactersActions from './../../actions/characters/actions.characters.index';
import * as partsActions from './../../actions/parts/actions.parts.index';
import * as scenesActions from './../../actions/scenes/actions.scenes.index';

import * as sync_storage from 'electron-json-storage-sync';

import { initialState as initialProjectState } from './project.model';
import { initialState as initialAppState } from '../../models/appStateModel';

import { exportAsEpub } from './project.actions.export.epub.index';
export { exportAsEpub };

const fs = require('fs-extra');

// ############ ACTION TYPES ##############
export const SET_COVER = 'SET_COVER';
export const SET_TITLE = 'SET_TITLE';
export const SET_AUTHOR = 'SET_AUTHOR';
export const SET_ABSTRACT = 'SET_ABSTRACT';
export const SET_DEDICATION = 'SET_DEDICATION';
export const SET_SELECTED_CHAPTER = 'SET_SELECTED_CHAPTER';
export const SET_STYLES = 'SET_STYLES';
export const SET_ROUTE = 'SET_ROUTE';

// ############## ACTIONS #################
export const setCover = (cover) => ({ type: SET_COVER, cover });
export const setTitle = (title) => ({ type: SET_TITLE, title });
export const setAuthor = (author) => ({ type: SET_AUTHOR, author });
export const setAbstract = (abstract) => ({ type: SET_ABSTRACT, abstract });
export const setDedication = (dedication) => ({ type: SET_DEDICATION, dedication });
export const setSelectedChapter = (chapter) => ({ type: SET_SELECTED_CHAPTER, chapter });
export const setStyles = (styles) => ({ type: SET_STYLES, styles });
export const setRoute = (route) => ({ type: SET_ROUTE, route });

export const createProjectAction = (directoryPath) => {

	console.log("starting to create a new project...", directoryPath);

	// create new project folder
	fs.mkdirSync(directoryPath);

	return (dispatch, getState) => {

		return dispatch(createNewStorytellerProjectFile(directoryPath));
	};
};

export const openProjectAction = (directoryPath) => {

    console.log("openProjectAction: " + directoryPath);

	return (dispatch, getState) => {

		let result_get = sync_storage.get('storyteller');

		var new_data = Object.assign({}, result_get.data, {
			path: directoryPath
		});

		let result_set = sync_storage.set('storyteller', new_data);

		if (!result_set.status) {
			throw error;
		}

		if (!storytellerProjectFileExists(directoryPath + "/src")) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it should be used for a new project
			console.log("project.json file does not exist");
		}
		else {
			console.log("project.json file exists");
			console.log("reading project.json file...");

			let fileData = fs.readFileSync(directoryPath + '/src/project.json')

			if (!fileData) {

				console.log("project.json file exists - but is empty");
				return dispatch(createNewStorytellerProjectFile(directoryPath));
			}
			else {
				return dispatch(openProjectSuccess(directoryPath, JSON.parse(fileData)));
			}
		}
    };
}

function openProjectSuccess(directoryPath, jsonData) {

	console.log("openProjectSuccess");

	return (dispatch, getState) => {

		dispatch(appStateActions.setPath(directoryPath));
		dispatch(setRoute(jsonData.route || initialProjectState.route));
  		dispatch(setCover(jsonData.cover));
 		dispatch(setTitle(jsonData.title));
		dispatch(setAuthor(jsonData.author));
		dispatch(setAbstract(jsonData.abstract));
		dispatch(setDedication(jsonData.dedication));
		dispatch(setStyles(jsonData.styles));
		dispatch(setSelectedChapter(jsonData.selectedChapter || initialProjectState.selectedChapter));
		dispatch(charactersActions.load(directoryPath))
		dispatch(partsActions.load(directoryPath))
		dispatch(chaptersActions.load(directoryPath))
		dispatch(scenesActions.load(directoryPath))
    }
}

export const closeProjectAction = () => {

	console.log("closeProjectAction");

	return (dispatch, getState) => {

		storage.get('storyteller', function (error, data) {
			if (error) throw error;

			if (data) {

				var new_data = Object.assign({}, data, {
					path: ''
				});

				storage.set('storyteller', new_data, (error) => {
					if (error) throw error;
					dispatch(appStateActions.setPath(""));
				});
			}
		});
	}
}

export const save = () => {

	console.log("saving project...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().project);

		if (!content) {
			console.error("content: " + content);
			return;
		}

		// console.log("content: " + content);
		let path = getState().appStateReducer.path;

		if (!path) {
			console.error("path: " + path);
			return;
		}

		let err = fs.writeFileSync(path + "/src/project.json", content)

		if (err) {
			console.log("FAILURE: ", err)
		}
		else {
			console.log("Saved!")
		}
	};
};

export const archive = () => {

	return (dispatch, getState) => {

		var date = new Date();
		var date_splitted = date.toISOString().split('T');
		var date_string = date_splitted[0].replace(/-/g, "") + "_" + date_splitted[1].substring(0, 8).replace(/:/g, "");

		var path = getState().appStateReducer.path;

		fs.copy(path + "/src", path + "/archive/" + date_string, (err) => {
			if (err) {
				return console.error(err);
			}
			console.log('done!');
		});
	};
}

export const deleteProject = (directoryPath) => {

	return (dispatch, getState) => {

		console.log("deleting project...", directoryPath);

		var rimraf = require("rimraf");
		rimraf(directoryPath, function () { console.log("done"); });
	};
}

function storytellerProjectFileExists(directoryPath) {

	let fileNameExists = false;

	fs.readdirSync(directoryPath).forEach(fileName => {
		if (fileName == "project.json") fileNameExists = true;
		// console.log(fileName, fileNameExists)
	});

	return fileNameExists;
};

function createNewStorytellerProjectFile(directoryPath) {

	console.log("creating new project file...");

	return (dispatch, getState) => {

		if (!fs.existsSync(directoryPath + "\\src")) {
			fs.mkdirSync(directoryPath + "\\src");
		}

		fs.writeFile(directoryPath + "/src/project.json", JSON.stringify(initialProjectState), (err) => {

			if (err) throw err;

			console.log("creating new app state file...");

			fs.writeFile(directoryPath + "/src/appState.json", JSON.stringify(initialAppState), (err) => {

				if (err) throw err;

				storage.get('storyteller', function (error, data) {
					if (error) throw error;

					if (data) {

						var new_data = Object.assign({}, data, {
							path: directoryPath
						});

						storage.set('storyteller', new_data, (error) => {
							if (error) throw error;
						});
					}
				});
			});
		});
	};
}

export const changeCurrentRootRoute = (navbarTabId) => {

	return (dispatch, getState) => {

		var route_copy = getState().project.route || initialProjectState.route;
		route_copy.current = navbarTabId;

		var route = Object.assign({}, getState().project.route, route_copy);

		dispatch(setRoute(route));
	}
}

export const changeCurrentScriptRoute = (navbarTabId) => {

	return (dispatch, getState) => {

		var route_copy = getState().project.route || initialProjectState.route;
		route_copy.script.current = navbarTabId;

		var route = Object.assign({}, getState().project.route, route_copy);

		dispatch(setRoute(route));
	}
}
