import { partsActions } from '../../actions'
import { initialState } from '../../models/partModel'

const partReducer = (state = initialState, action) => {

	switch (action.type) {

		case partsActions.SET_DELETED_AT:
			console.log(state, action.deleted_at)
			return Object.assign({}, state, {
				deleted_at: action.deleted_at
			});

		default:
			return state;
	}
};

export default partReducer;
