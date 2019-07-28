const OPEN_FILE = 'OPEN_FILE';

const initialState = {
  openedFile: {}
};

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case OPEN_FILE:
      newState.openedFile = Object.assign({}, newState.openedFile);
      break;
    default:
      return state;
  }
  return newState;
};

export default reducer;

export const openFile = filePath => ({ type: OPEN_FILE, filePath });