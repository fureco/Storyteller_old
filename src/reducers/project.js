const OPEN_PROJECT = 'OPEN_PROJECT';
const OPEN_FILE = 'OPEN_FILE';

const initialState = {
  openedProject: {},
  openedFile: {}
};

const projectReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case OPEN_PROJECT:
      newState.openedProject = Object.assign({}, newState.openedProject);
      break;
    case OPEN_FILE:
      newState.openedFile = Object.assign({}, newState.openedFile);
      break;
    default:
      return state;
  }
  return newState;
};

export default projectReducer;

export const openProject = filePath => ({ type: OPEN_PROJECT, filePath });

export const openFile = filePath => ({ type: OPEN_FILE, filePath });