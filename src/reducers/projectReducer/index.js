import { projectActions } from './../../actions'

export const initialState = {
    path: "",
    appState: {
        selectedMainArea: "script",
    },
    title: "",
    abstract: "",
    parts: [],
    chapters: []
};

const projectReducer = (state = initialState, action) => {

    switch (action.type) {

      case projectActions.CREATE_PROJECT:
        console.log("CREATE_PROJECT");
        if(createProject(action.filePath))
            return Object.assign({}, state, { 
                path: action.filePath 
            });
        else 
            return state;

      case projectActions.OPEN_PROJECT:
        console.log("OPEN_PROJECT");
        return Object.assign({}, state, action.jsonData);

      case projectActions.CLOSE_PROJECT:
        console.log("CLOSE_PROJECT");
        storage.clear('storyteller', (error) => {
            if (error) throw error; 
        });
        return Object.assign({}, state, { 
            path: '' 
        });

      case projectActions.SET_PATH:
        console.log("SET_PATH");
        return Object.assign({}, state, { 
            path: action.path 
        });

      case projectActions.SET_TITLE:
        console.log("SET_TITLE");
        return Object.assign({}, state, { 
            title: action.title 
        });

      case projectActions.ADD_PART:
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

      case projectActions.REMOVE_PART:
        console.log("REMOVE_PART");
        return Object.assign({}, state, { parts: [] });

      case projectActions.SELECT_MAIN_AREA:
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

function getNewID(array_of_objects_in_state) {

    let max_id = array_of_objects_in_state.reduce(function (prev, current) { return (prev.id > current.id) ? prev.id : current.id }, 0)
    return max_id + 1;
}