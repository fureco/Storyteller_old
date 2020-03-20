import { appStateActions, charactersActions, partsActions, scenesActions } from '../../actions';
import storage from 'electron-json-storage';

import { initialState as initialProjectState } from './project.model';
import { initialState as initialAppState } from '../../models/appStateModel';

const fs = require('fs-extra')

// ############ ACTION TYPES ##############
export const SET_COVER = 'SET_COVER';
export const SET_TITLE = 'SET_TITLE';
export const SET_ABSTRACT = 'SET_ABSTRACT';
export const SET_DEDICATION = 'SET_DEDICATION';

// ############## ACTIONS #################
export const setCover = (cover) => ({ type: SET_COVER, cover });
export const setTitle = (title) => ({ type: SET_TITLE, title });
export const setAbstract = (abstract) => ({ type: SET_ABSTRACT, abstract });
export const setDedication = (dedication) => ({ type: SET_DEDICATION, dedication });

export const createProjectAction = (directoryPath) => {

	console.log("starting to create a new project...", directoryPath);

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
	};
};

export const openProjectAction = (directoryPath) => {

    console.log("openProjectAction: " + directoryPath);

    return (dispatch, getState) => {

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

		if (!storytellerProjectFileExists(directoryPath + "/src")) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it should be used for a new project
			console.log("project.json file does not exist");
		}
		else {
			console.log("project.json file exists");

			return fs.readFile(directoryPath + '/src/project.json', (err, fileData) => {

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
		dispatch(setCover(jsonData.cover));
		dispatch(setTitle(jsonData.title));
		dispatch(setAbstract(jsonData.abstract));
		dispatch(setDedication(jsonData.dedication));
		dispatch(appStateActions.load());
		dispatch(charactersActions.load(directoryPath))
		dispatch(partsActions.load(directoryPath))
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

		console.log("content: " + content);

		storage.get('storyteller', function (error, data) {
			if (error) throw error;
			console.log("current_project: " + data.path);
			if (data.path) {
				fs.writeFile(data.path + "/src/project.json", content, (err) => {
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

export const exportAsEpub = () => {

	console.log("exporting project...")

	return (dispatch, getState) => {

		const path = require('path');

		var path_to_project = getState().appStateReducer.path;
		var dist_folder = path_to_project + "/dist";

		if (!fs.existsSync(dist_folder)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder);
		}
		else {
			// clear destination folder if it does exist
			fs.emptyDir(dist_folder, err => {

				if (err) return console.error(err)

				// copy fonts
				/* fs.copy(path_to_project + "/src/assets/fonts", path_to_project + "/dist/fonts/", (err) => {
					if (err) {
						return console.error(err);
					}
					console.log('done!');
				}); */

				// copy styles
				/* fs.copy(path_to_project + "/src/assets/styles", path_to_project + "/dist/styles/", (err) => {
					if (err) {
						return console.error(err);
					}
					console.log('done!');
				}); */

				fs.copy("./src/assets/META-INF", dist_folder + "/META-INF", (err) => {

					if (err) return console.error(err);

					fs.copy("./src/assets/meta-content", dist_folder + "/meta-content", (err) => {

						if (err) return console.error(err);

						var archiver = require('archiver');

						if (!fs.existsSync(path_to_project + "/epub")) {
							fs.mkdirSync(path_to_project + "/epub");
						}

						// create a file to stream archive data to.
						var output = fs.createWriteStream(path_to_project + "/epub/example.zip");
						var archive = archiver('zip');

						// listen for all archive data to be written
						// 'close' event is fired only when a file descriptor is involved
						output.on('close', function () {
							console.log(archive.pointer() + ' total bytes');
							console.log('archiver has been finalized and the output file descriptor has closed.');
						});

						// This event is fired when the data source is drained no matter what was the data source.
						// It is not part of this library but rather from the NodeJS Stream API.
						// @see: https://nodejs.org/api/stream.html#stream_event_end
						output.on('end', function () {
							console.log('Data has been drained');
						});

						// good practice to catch warnings (ie stat failures and other non-blocking errors)
						archive.on('warning', function (err) {
							if (err.code === 'ENOENT') {
								// log warning
							} else {
								// throw error
								throw err;
							}
						});

						// good practice to catch this error explicitly
						archive.on('error', function (err) {
							throw err;
						});

						// pipe archive data to the file
						archive.pipe(output);

						var mimetype = './src/assets/meta-content/mimetype';
						archive.append(fs.createReadStream(mimetype), { name: 'mimetype', store: true });

						var metadata = './src/assets/meta-content/metadata.opf';
						archive.append(fs.createReadStream(metadata), { name: 'metadata.opf' });

						archive.finalize();

						console.log('done!');
					});
				});
			})
		}
	};
};

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

				return dispatch(openProjectAction(directoryPath));
			});
		});
	};
}
