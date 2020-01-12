import reducer from './reducer.character.index'

describe('Character reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([
			{
				"id": 1,
			}
		])
	})

})
