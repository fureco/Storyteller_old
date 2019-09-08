import { remote } from 'electron';
import { storytellerProjectFileExists } from '../utils/file-functions';

var electronFs = remote.require('fs');

const storage = require('electron-json-storage');

const CREATE_PROJECT = 'CREATE_PROJECT';
const OPEN_PROJECT = 'OPEN_PROJECT';
const CLOSE_PROJECT = 'CLOSE_PROJECT';

const ADD_PART = 'ADD_PART';

const SELECT_MAIN_AREA = 'SELECT_MAIN_AREA';

const initialState = {
    path: "",
    appState: {
        selectedMainArea: 'script',
    },
    parts: [],
    chapters: []
};

const projectReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case CREATE_PROJECT:
        console.log("CREATE_PROJECT");
        if(createProject(action.filePath))
            return Object.assign({}, state, { 
                path: action.filePath 
            });
        else 
            return state;

    case OPEN_PROJECT:
        console.log("OPEN_PROJECT");

        storage.set('storyteller', { path: action.filePath }, (error) => {
            if (error) {
                console.error(error);
                return state;
            }
        });

        let jsonData = state;
        let rawData;

        try {
            rawData = electronFs.readFileSync(action.filePath + '/project.st')
            jsonData = JSON.parse(rawData);
        
            return Object.assign({}, state, { 
                path: action.filePath,
                appState: jsonData.appState,
                parts: jsonData.parts,
                chapters: jsonData.chapters
            });
        }
        catch (error) {
            return state;
        }
        

    case CLOSE_PROJECT:
        console.log("CLOSE_PROJECT");
        storage.clear('storyteller', (error) => {
            if (error) throw error;
        });
        return Object.assign({}, state, { 
            path: '' 
        });

    case ADD_PART:
        console.log("ADD_PART");
        return Object.assign({}, state, {
            parts: [
                ...state.parts,
                {
                    id: getNewID(state.parts),
                    position: state.parts.length + 1,
                    name: action.partName 
                }
            ]
        });

    case SELECT_MAIN_AREA:
        console.log("SELECT_MAIN_AREA");
        return Object.assign({}, state, {
            appState: { 
                selectedMainArea: action.navbarTabId
            }
        });

    default:
        return state;
  }

};

export default projectReducer;

export const createProjectAction = (filePath) => ({ type: CREATE_PROJECT, filePath });
export const openProjectAction = (filePath) => ({ type: OPEN_PROJECT, filePath });
export const closeProjectAction = () => ({ type: CLOSE_PROJECT });

export const addScriptPartAction = (partName) => ({ type: ADD_PART, partName });

export const selectMainAreaAction = (navbarTabId) => ({ type: SELECT_MAIN_AREA, navbarTabId });


function createProject(filePath) {
  console.log("start creating a new project...");
  const files = electronFs.readdirSync(filePath);
  if (!files.length) { 
    console.log("directory is empty, can be used to create new project: " + filePath);
    createNewStorytellerProjectFile(filePath);
  }
  else { 
    console.log("directory is NOT empty");
    storytellerProjectFileExists(filePath).then((fileExists) => {
      if(!fileExists) {
        // TO DO: Show UI dialog that directory is not empty, ask user if it still should be used for the new project
        createNewStorytellerProjectFile(filePath);
      }
      else {
        console.log("project.st file exists");
      }
    });
  }

  return true;
}

function createNewStorytellerProjectFile(filePath) {
    console.log("creating new Storyteller project file...");

    let content = JSON.stringify(initialState);

    electronFs.writeFile(filePath + '/project.st', content, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function getNewID(array_of_objects_in_state) {

    let max_id = array_of_objects_in_state.reduce(function(prev, current) { return (prev.id > current.id) ? prev.id : current.id }, 0)
    return max_id + 1;
}