import reducer from './chapter.reducer'
import  * as actions from './chapter.actions'
import { initialState } from './chapter.model'

describe('Chapter reducer', () => {

	it('should return the initial state for an unknown action', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

})
