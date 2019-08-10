const OPEN_PROJECT = 'OPEN_PROJECT';

const initialState = {
  path: ""
};

const projectReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case OPEN_PROJECT:
      return Object.assign({}, { path: action.filePath });
    default:
      return state;
  }

};

export default projectReducer;
