import reducer from './reducer.parts.index'
import { partsActions as actions } from '../../actions'

describe('Parts reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([
			{
				"id": 1,
			}
		])
	})

	// it('should handle ADD_PART', () => {

	// 	var test_part = {
	// 		position: 1,
	// 		name: "test"
	// 	};

	// 	expect(
	// 		reducer([], {
	// 			type: actions.ADD_PART,
	// 			part: test_part
	// 		})
	// 	).toEqual([{ "id": 1, "name": "test", "position": 1 }])
	// })

})
