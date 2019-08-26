import { remote } from 'electron';
import { storytellerProjectFileExists } from '../utils/file-functions';

var electronFs = remote.require('fs');

const storage = require('electron-json-storage');

const CREATE_PROJECT = 'CREATE_PROJECT';
const OPEN_PROJECT = 'OPEN_PROJECT';
const CLOSE_PROJECT = 'CLOSE_PROJECT';

const CREATE_PART = 'CREATE_PART';

const initialState = {
    path: "",
    parts: [],
    chapters: []
};

const projectReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case CREATE_PROJECT:
        console.log("CREATE_PROJECT");
        return createProject(action.filePath);

    case OPEN_PROJECT:
        console.log("OPEN_PROJECT");
        storage.set('storyteller', { path: action.filePath }, function(error) {
            if (error) throw error;
        });
        storage.get('storyteller', function(error, data) {
            if (error) throw error;
        });
        return Object.assign({}, { path: action.filePath });

    case CLOSE_PROJECT:
        console.log("CLOSE_PROJECT");
        storage.clear('storyteller', (error) => {
            if (error) throw error;
        });
        return Object.assign({}, { path: '' });

    case CREATE_PART:
        console.log("CREATE_PART");
        createNewPart();
        return state;

    default:
        return state;
  }

};

export default projectReducer;

export const createProjectAction = (filePath) => ({ type: CREATE_PROJECT, filePath });

export const openProjectAction = (filePath) => ({ type: OPEN_PROJECT, filePath });

export const closeProjectAction = () => ({ type: CLOSE_PROJECT });

export const createPartAction = () => ({ type: CREATE_PART });


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

  return Object.assign({}, { path: filePath });
}

function createNewStorytellerProjectFile(filePath) {
  console.log("creating new Storyteller project file...");

  let content = JSON.stringify(initialState);

  electronFs.appendFile(filePath + '/project.st', content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

function createNewPart() {
  console.log("creating new part in script...");
}