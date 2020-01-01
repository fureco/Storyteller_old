import storage from 'electron-json-storage';

const fs = require('fs');

// ############ ACTION TYPES ##############
export const ADD_CHARACTER = 'ADD_CHARACTER';

// ############## ACTIONS #################
export const addCharacter = (character) => ({ type: ADD_CHARACTER, character });

export const save = () => {

	console.log("saving characters...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().charactersReducer);
		console.log("content: " + content);

		storage.get('storyteller', function (error, data) {
			if (error) throw error;
			console.log("current_project: " + data.path);
			if (data.path) {
				fs.writeFile(data.path + "/characters.json", content, (err) => {
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

	console.log("load characters from file: " + directoryPath);

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

		if (!storytellerCharactersFileExists(directoryPath)) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it should be used for a new project
			console.log("characters.json file does not exist");
		}
		else {
			console.log("characters.json file exists");

			return fs.readFile(directoryPath + '/characters.json', (err, fileData) => {

				if (err) throw err;

				var data = fileData;

				if (!fileData) {

					console.log("characters.json file exists - but is empty");
				}
				else {
					console.log(JSON.parse(data))
					JSON.parse(data).forEach(character => {
						dispatch(addCharacter(character));
					})
				}

			});
		}
	};
}

function storytellerCharactersFileExists(directoryPath) {

	let fileNameExists = false;

	fs.readdirSync(directoryPath).forEach(fileName => {
		if (fileName == "characters.json") fileNameExists = true;
		// console.log(fileName, fileNameExists)
	});

	return fileNameExists;
};
