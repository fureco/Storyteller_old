import storage from 'electron-json-storage';

const fs = require('fs');

// ############ ACTION TYPES ##############
export const ADD_SCENE = 'ADD_SCENE';
export const SET_DELETED_AT = 'SET_DELETED_AT';

// ############## ACTIONS #################
export const addScene = (scene) => ({ type: ADD_SCENE, scene });
export const setDeletedAt = (scene, deleted_at) => ({ type: SET_DELETED_AT, scene, deleted_at });

export const save = () => {

	console.log("saving scene...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().scenesReducer);
		console.log("content: " + content);

		storage.get('storyteller', function (error, data) {
			if (error) throw error;
			console.log("current_project: " + data.path);
			if (data.path) {
				fs.writeFile(data.path + "/src/scenes.json", content, (err) => {
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

export const load = (directoryPath) => {

	console.log("load scenes from file: " + directoryPath);

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

		if (!storytellerScenesFileExists(directoryPath + "/src")) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it should be used for a new project
			console.log("scenes.json file does not exist");
		}
		else {
			console.log("scenes.json file exists");

			return fs.readFile(directoryPath + '/src/scenes.json', (err, fileData) => {

				if (err) throw err;

				var data = fileData;

				if (!fileData) {

					console.log("scenes.json file exists - but is empty");
				}
				else {
					JSON.parse(data).forEach(scene => {
						dispatch(addScene(scene));
					})
				}

			});
		}
	};
}

function storytellerScenesFileExists(directoryPath) {

	let fileNameExists = false;

	fs.readdirSync(directoryPath).forEach(fileName => {
		if (fileName == "scenes.json") fileNameExists = true;
		// console.log(fileName, fileNameExists)
	});

	return fileNameExists;
};
