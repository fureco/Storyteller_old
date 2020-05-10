import storage from 'electron-json-storage';

const fs = require('fs');

// ############ ACTION TYPES ##############
export const ADD = 'ADD';
export const CREATE = 'CREATE';
export const SET_CHAPTERS = 'SET_CHAPTERS';
export const DELETE_CHAPTER = 'DELETE_CHAPTER';

export const SET_DELETED_AT = 'SET_DELETED_AT';

// ############## ACTIONS #################
export const add = (chapter) => ({ type: ADD, chapter });
export const create = (chapter) => ({ type: CREATE, chapter });
export const setChapters = (chapters) => ({ type: SET_CHAPTERS, chapters });
export const setDeletedAt = (chapter, deleted_at) => ({ type: SET_DELETED_AT, chapter, deleted_at });

export const save = () => {

	console.log("saving chapters...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().chapters);
		console.log("content: " + content);

		storage.get('storyteller', function (error, data) {
			if (error) throw error;
			console.log("current_project: " + data.path);
			if (data.path) {
				fs.writeFile(data.path + "/src/chapters.json", content, (err) => {
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

	console.log("load chapters from file: " + directoryPath);

	return (dispatch, getState) => {

		dispatch(setChapters([]));

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

		if (!storytellerChaptersFileExists(directoryPath + "/src")) {
			// TO DO: Show UI dialog that directory is not empty, ask user if it should be used for a new project
			console.log("chapters.json file does not exist");
		}
		else {
			console.log("chapters.json file exists");

			return fs.readFile(directoryPath + '/src/chapters.json', (err, fileData) => {

				if (err) throw err;

				var data = fileData;

				if (!fileData) {

					console.log("chapters.json file exists - but is empty");
				}
				else {
					JSON.parse(data).forEach(chapter => {
						dispatch(add(chapter));
					})
				}

			});
		}
	};
}

export const deleteChapter = (chapter) => {

	console.log("deleting chapter...")

	return (dispatch, getState) => {
		dispatch(setDeletedAt(chapter, new Date()));
	}
};

function storytellerChaptersFileExists(directoryPath) {

	let fileNameExists = false;

	fs.readdirSync(directoryPath).forEach(fileName => {
		if (fileName == "chapters.json") fileNameExists = true;
		// console.log(fileName, fileNameExists)
	});

	return fileNameExists;
};
