export const CREATE_PROJECT = 'CREATE_PROJECT';
export const OPEN_PROJECT = 'OPEN_PROJECT';
export const CLOSE_PROJECT = 'CLOSE_PROJECT';

export const SET_PATH = 'SET_PATH';
export const SET_TITLE = 'SET_TITLE';

export const ADD_PART = 'ADD_PART';
export const REMOVE_PART = 'REMOVE_PART';

export const SELECT_MAIN_AREA = 'SELECT_MAIN_AREA';

export const createProjectAction = (filePath) => ({ type: CREATE_PROJECT, filePath });

export const openProjectAction = (directoryPath) => {

    console.log("openProjectAction: " + directoryPath);

    return (dispatch, getState) => {

        const storage = require('electron-json-storage');

        storage.set('storyteller', { path: directoryPath }, (error) => {
            if (error) {
                console.error(error);
            }
        });

        return storytellerProjectFileExists(directoryPath).then((fileExists) => {
            if (!fileExists) {
                // TO DO: Show UI dialog that directory is not empty, ask user if it still should be used for the new project
                console.log("project.st file does not exist");
                let newState = Object.assign({}, getState().projectReducer, {
                    path: directoryPath
                });

                return save(newState).then(
                    () => dispatch(setPath(directoryPath)),
                    (err) => console.log(err)
                );
            }
            else {
                console.log("project.st file exists");
                const fs = require('fs');
                let rawData = fs.readFileSync(directoryPath + '/project.st');
                return dispatch(openProjectSuccess(JSON.parse(rawData)));
            }
        });
    };
}

export const setPath = (path) => ({ type: SET_PATH, path });

function openProjectSuccess(jsonData) {
    console.log("openProjectSuccess");
    return { type: OPEN_PROJECT, jsonData }
}

export const closeProjectAction = () => ({ type: CLOSE_PROJECT });

export const setTitleAction = (title) => {
    console.log("setTitleAction");
    return (dispatch, getState) => {
        let newState = Object.assign({}, getState().projectReducer, {
            title
        });
        return save(newState).then(
            () => dispatch(setTitleSuccess(title)),
            (err) => console.log(err)
        );
    };
};

export const setTitleSuccess = (title) => ({ type: SET_TITLE, title });

export const addScriptPartAction = (partName) => ({ type: ADD_PART, partName });

export const removeScriptPartAction = () => ({ type: REMOVE_PART });

export const selectMainAreaAction = (navbarTabId) => ({ type: SELECT_MAIN_AREA, navbarTabId });

function createProject(directoryPath) {
    console.log("start creating a new project...");
    const fs = require('fs');
    const files = fs.readdirSync(directoryPath);
    if (!files.length) {
        console.log("directory is empty, can be used to create new project: " + directoryPath);
        createNewStorytellerProjectFile(directoryPath);
    }
    else {
        console.log("directory is NOT empty");
        storytellerProjectFileExists(directoryPath).then((fileExists) => {
            if (!fileExists) {
                // TO DO: Show UI dialog that directory is not empty, ask user if it still should be used for the new project
                createNewStorytellerProjectFile(directoryPath);
            }
            else {
                console.log("project.st file exists");
            }
        });
    }

    storage.set('storyteller', { path: directoryPath }, (error) => {
        if (error) {
            console.error(error);
        }
    });

    return true;
}

function save(projectState) {
    console.log("saving project...")
    let content = JSON.stringify(projectState);
    return new Promise((resolve, reject) => {
        electronFs.writeFile(projectState.path + "/project.st", content, (err) => {
            if (err) {
                reject("FAILURE: ", err)
            }
            else {
                resolve("Saved!")
            }
        })
    })
};

function getNewID(array_of_objects_in_state) {

    let max_id = array_of_objects_in_state.reduce(function (prev, current) { return (prev.id > current.id) ? prev.id : current.id }, 0)
    return max_id + 1;
}

function storytellerProjectFileExists(dir) {
    const Promise = require('bluebird');
    const fs = Promise.promisifyAll(require('fs'));

    return fs.readdirAsync(dir).then(fileNamesArr => {

        let fileNameExists = false;

        fileNamesArr.forEach(fileName => {
            fileNameExists = fileName == "project.st";
        })

        return fileNameExists;
    });
};