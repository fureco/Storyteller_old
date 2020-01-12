import storage from 'electron-json-storage';

const fs = require('fs');

// ############ ACTION TYPES ##############
export const ADD_PART = 'ADD_PART';
export const SET_DELETED_AT = 'SET_DELETED_AT';

// ############## ACTIONS #################
export const addPart = (part) => ({ type: ADD_PART, part });
export const setDeletedAt = (part, deleted_at) => ({ type: SET_DELETED_AT, part, deleted_at });

export const save = () => {

	console.log("saving parts...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().partsReducer);
		console.log("content: " + content);

		storage.get('storyteller', function (error, data) {
			if (error) throw error;
			console.log("current_project: " + data.path);
			if (data.path) {
				fs.writeFile(data.path + "/src/parts.json", content, (err) => {
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

	console.log("load parts from file: " + directoryPath);

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

		if (!storytellerPartsFileExists(directoryPath + "/src")) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it should be used for a new project
			console.log("parts.json file does not exist");
		}
		else {
			console.log("parts.json file exists");

			return fs.readFile(directoryPath + '/src/parts.json', (err, fileData) => {

				if (err) throw err;

				var data = fileData;

				if (!fileData) {

					console.log("parts.json file exists - but is empty");
				}
				else {
					JSON.parse(data).forEach(character => {
						dispatch(addCharacter(character));
					})
				}

			});
		}
	};
}

function storytellerPartsFileExists(directoryPath) {

	let fileNameExists = false;

	fs.readdirSync(directoryPath).forEach(fileName => {
		if (fileName == "parts.json") fileNameExists = true;
		// console.log(fileName, fileNameExists)
	});

	return fileNameExists;
};
