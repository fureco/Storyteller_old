import { scenesActions as actions } from './../../actions'
import { initialState } from './../../models/sceneModel'

const sceneReducer = (state = initialState, action) => {

	switch (action.type) {

		case actions.SET_FROM:
			return Object.assign({}, state, {
				first_name: action.from
			});

		case actions.SET_TO:
			return Object.assign({}, state, {
				first_name: action.to
			});

		case actions.SET_LOCATION_ID:
			return Object.assign({}, state, {
				first_name: action.location_id
			});

		case actions.SET_TITLE:
			return Object.assign({}, state, {
				first_name: action.title
			});

		case actions.SET_SUBTITLE:
			return Object.assign({}, state, {
				last_name: action.subtitle
			});

		case actions.SET_SUMMARY:
			return Object.assign({}, state, {
				nickname: action.summary
			});

		case actions.SET_TEXT:
			return Object.assign({}, state, {
				nickname: action.text
			});

		case actions.SET_DELETED_AT:
			console.log(state, action.deleted_at)
			return Object.assign({}, state, {
				deleted_at: action.deleted_at
			});

		default:
			return state;
	}
};

export default sceneReducer;
