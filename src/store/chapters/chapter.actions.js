const fs = require('fs');

import { getNewID } from '../reducers/utils'
import { initialState } from './chapter.model'

// ############ ACTION TYPES ##############
export const ADD = 'ADD';
export const CREATE = 'CREATE';

export const SET_CHAPTERS = 'SET_CHAPTERS';
export const DELETE_CHAPTER = 'DELETE_CHAPTER';

export const SET_TITLE = 'SET_TITLE';
export const SET_DELETED_AT = 'SET_DELETED_AT';

// ############## ACTIONS #################
export const add = (chapter) => ({ type: ADD, chapter });
export const setChapters = (chapters) => ({ type: SET_CHAPTERS, chapters });

export const setTitle = (chapter, title) => ({ type: SET_TITLE, chapter, title });
export const setDeletedAt = (chapter, deleted_at) => ({ type: SET_DELETED_AT, chapter, deleted_at });

// create a new chapter and save it to a new JSON file
export const create = (chapter) => {

	return (dispatch, getState) => {

		let directoryPath = getState().appState.path;
		let pos_of_new_chapter = getState().chapters.length + 1;

		if (!fs.existsSync(directoryPath + "/src/script/")) {
			// create script folder if it does not yet exist
			fs.mkdirSync(directoryPath + "/src/script/");
		}

		let data = {
			title: chapter.title,
			text: ""
		};

		fs.writeFile(directoryPath + "/src/script/" + pos_of_new_chapter + "_" + chapter.title.replace(/ /g, "_") + ".json", JSON.stringify(data), (err) => {
			if (err) {
				console.log("FAILURE: ", err)
			}
			else {
				console.log("Saved!")

				const new_chapter = Object.assign(initialState, chapter, { id: getNewID(getState().chapters), position: pos_of_new_chapter });

				dispatch(add(new_chapter));
			}
		})
	};
};

// create a new chapter and save it to a new JSON file
export const save = (chapter) => {

	return (dispatch, getState) => {

		let directoryPath = getState().appStateReducer.path;

		if (!fs.existsSync(directoryPath + "/src/script/")) {
			// create script folder if it does not yet exist
			fs.mkdirSync(directoryPath + "/src/script/");
		}

		let data = {
			title: chapter.title,
			text: ""
		};

		fs.writeFile(directoryPath + "/src/script/" + pos_of_new_chapter + "_" + chapter.title.replace(/ /g, "_") + ".json", JSON.stringify(data), (err) => {
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
						"text": text,
						"deleted_at": json_data.deleted_at
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

		var deleted_at = new Date();

		let directoryPath = getState().appStateReducer.path;

		fs.readFile(directoryPath + "/src/script/" + chapter.file_name, 'utf8', (err, data) => {

			if (err) throw err;

			var json_data = JSON.parse(data);

			json_data.deleted_at = deleted_at;

			fs.writeFile(directoryPath + "/src/script/" + chapter.file_name, JSON.stringify(json_data), (err) => {
				if (err) {
					console.log("FAILURE: ", err)
				}
				else {
					console.log("Saved!")
					dispatch(setDeletedAt(chapter, deleted_at));
				}
			})
		});
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
					dispatch(setTitle(chapter, new_title));
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
