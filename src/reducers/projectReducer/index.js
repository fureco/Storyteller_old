import { projectActions } from './../../actions'

export const initialState = {
    title: "",
    abstract: "",
    parts: [],
    chapters: []
};

const projectReducer = (state = initialState, action) => {

    switch (action.type) {

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

    default:
        return state;
  }
};

export default projectReducer;

function getNewID(array_of_objects_in_state) {

    let max_id = array_of_objects_in_state.reduce(function (prev, current) { return (prev.id > current.id) ? prev.id : current.id }, 0)
    return max_id + 1;
}
