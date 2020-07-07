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
/* export const create = (chapter) => ({ type: CREATE, chapter }); */

export const setChapters = (chapters) => ({ type: SET_CHAPTERS, chapters });
export const setDeletedAt = (chapter, deleted_at) => ({ type: SET_DELETED_AT, chapter, deleted_at });

// create a new chapter and save it to a new JSON file
export const create = (chapter) => {

	console.log("creating new chapter \"" + chapter.title + "\" ...")

	return (dispatch, getState) => {

		let directoryPath = getState().appStateReducer.path;

		if (!fs.existsSync(directoryPath + "/src/script/")) {
			// create script folder if it does not yet exist
			fs.mkdirSync(directoryPath + "/src/script/");
		}

		let pos_of_new_chapter = 1;

		getState().chapters.forEach((chapter) => {
			if (chapter.position > pos_of_new_chapter)
				pos_of_new_chapter = chapter.position + 1;
		});

		let data = {
			title: chapter.title,
			text: ""
		};

		fs.writeFile(directoryPath + "/src/script/" + pos_of_new_chapter + "_" + chapter.title + ".json", JSON.stringify(data), (err) => {
			if (err) {
				console.log("FAILURE: ", err)
			}
			else {
				console.log("Saved!")
				dispatch(load(directoryPath));
			}
		})
	};
};

// load an existing chapter from it's JSON file
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

				var json_data = JSON.parse(data);

				if (json_data) {

					// console.log(json_data);

					var title = json_data.title;
					//console.log(title[2]);

					var position = file.split("_")[0];
					//console.log(position);

					var text = json_data.text || "";

					var chapter = {
						"id": index,
						"file_name": file,
						"title": title,
						"part": 1,
						"position": parseInt(position),
						"text": text
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

export const saveTitle = (chapter_pos, new_title) => {

	console.log("saving new title of chapter " + chapter_pos + " ...")

	return (dispatch, getState) => {

		let directoryPath = getState().appStateReducer.path;

		let chapter = getState().chapters.find((chapter) => {
			return chapter.position == chapter_pos
		});

		fs.readFile(directoryPath + "/src/script/" + chapter.file_name, 'utf8', (err, data) => {

			if (err) throw err;

			var json_data = JSON.parse(data);

			json_data.title = new_title;

			fs.writeFile(directoryPath + "/src/script/" + chapter.file_name, JSON.stringify(json_data), (err) => {
				if (err) {
					console.log("FAILURE: ", err)
				}
				else {
					console.log("Saved!")
				}
			})
		});
	};
};

export const saveText = (chapter_pos, new_text) => {

	console.log("saving chapter " + chapter_pos + " ...")

	return (dispatch, getState) => {

		let directoryPath = getState().appStateReducer.path;

		let chapter = getState().chapters.find((chapter) => {
			return chapter.position == chapter_pos
		});

		fs.readFile(directoryPath + "/src/script/" + chapter.file_name, 'utf8', (err, data) => {

            if (err) throw err;

            var json_data = JSON.parse(data);

            json_data.text = new_text;

			fs.writeFile(directoryPath + "/src/script/" + chapter.file_name, JSON.stringify(json_data), (err) => {
				if (err) {
					console.log("FAILURE: ", err)
				}
				else {
					console.log("Saved!")
				}
			})
		});
	};
};
