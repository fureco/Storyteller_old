import reducer from './reducer.scenes.index'

describe('Scenes reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([{
			"id": 1
		}])
	})

})
