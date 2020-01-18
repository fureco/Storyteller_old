import reducer from './reducer.part.index'
import { partsActions as actions } from '../../../actions'
import { initialState } from './../../../models/partModel'

describe('Part reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle SET_DELETED_AT', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_DELETED_AT,
				deleted_at: 'deleted_at'
			})
		).toEqual(
			Object.assign({}, initialState, {
				deleted_at: "deleted_at"
			})
		)
	})

})
