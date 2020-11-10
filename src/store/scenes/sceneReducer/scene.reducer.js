import * as actions from './../scenes.actions'
import { initialState } from './../scene.model'

const sceneReducer = (state = initialState, action) => {

	switch (action.type) {

		case actions.SET_FROM:
			return Object.assign({}, state, {
				from: action.from
			});

		case actions.SET_TO:
			return Object.assign({}, state, {
				to: action.to
			});

		case actions.SET_LOCATION_ID:
			return Object.assign({}, state, {
				location_id: action.location_id
			});

		case actions.SET_TITLE:
			return Object.assign({}, state, {
				title: action.title
			});

		case actions.SET_SUBTITLE:
			return Object.assign({}, state, {
				subtitle: action.subtitle
			});

		case actions.SET_SUMMARY:
			return Object.assign({}, state, {
				summary: action.summary
			});

		case actions.SET_TEXT:
			return Object.assign({}, state, {
				text: action.text
			});

		case actions.SET_DELETED_AT:
			return Object.assign({}, state, {
				deleted_at: action.deleted_at
			});

		default:
			return state;
	}
};

export default sceneReducer;
