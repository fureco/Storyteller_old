import reducer from './reducer.part.index'
import { partsActions as actions } from '../../actions'

describe('Part reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([
			{
				"id": 1,
			}
		])
	})

})
