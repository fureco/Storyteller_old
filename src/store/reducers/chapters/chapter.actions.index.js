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

	console.log("load chapters from directory: " + directoryPath);

	return (dispatch, getState) => {

		dispatch(setChapters([]));

		if (!fs.existsSync(directoryPath + "/src/script")) {
			// create script folder if it does not yet exist
			fs.mkdirSync(directoryPath + "/src/script");
			return;
		}

		fs.readdirSync(directoryPath + "/src/script").forEach((file, index) => {

			// console.log(chapter);

			fs.readFile(directoryPath + "/src/script/" + file, 'utf8', (err, data) => {

				if (err) throw err;

				var meta_data = data.match(/<meta-data>(\n|\t|\s)*([^]*)<\/meta-data>/);

				if (meta_data) {

					// console.log(meta_data[2]);

					var title = meta_data[2].match(/<title>(\n|\t|\s)*([^]*)<\/title>/);
					//console.log(title[2]);

					var position = file.split("_")[0];
					//console.log(position);

					var chapter = {
						"id": index,
						"title": title[2],
						"part": 1,
						"position": parseInt(position)
					};

					dispatch(add(chapter));
				}
			});
		});
	};
}

export const deleteChapter = (chapter) => {

	console.log("deleting chapter...")

	return (dispatch, getState) => {
		dispatch(setDeletedAt(chapter, new Date()));
	}
};
