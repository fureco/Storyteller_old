import reducer from './reducer.characters.index'
import { charactersActions as actions } from '../../actions'

const initialState = [];

describe('Characters reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle ADD_CHARACTER', () => {
		expect(
			reducer(initialState, {
				type: actions.ADD_CHARACTER,
				character: {}
			})
		).toEqual([{
			id: 1
		}])
	})

	// it('should handle SET_DELETED_AT', () => {
	// 	expect(
	// 		reducer([{id: 1},{id: 2}], {
	// 			type: actions.SET_DELETED_AT,
	// 			character: {
	// 				id: 1
	// 			}
	// 		})
	// 	).toEqual([{ id: 1 }, { id: 2 }])
	// })

})
