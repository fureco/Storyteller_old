const CREATE_PROJECT = 'CREATE_PROJECT';
const OPEN_PROJECT = 'OPEN_PROJECT';

const initialState = {
  path: ""
};

const projectReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case CREATE_PROJECT:
      console.log("create");
      return Object.assign({}, { path: action.filePath });
    case OPEN_PROJECT:
      return Object.assign({}, { path: action.filePath });
    default:
      return state;
  }

};

export default projectReducer;

export const createProjectAction = (filePath) => ({ type: CREATE_PROJECT, filePath });

export const openProjectAction = (filePath) => ({ type: OPEN_PROJECT, filePath });
