import { getNewID } from './utils'

describe('getNewID', () => {

	it('should return a new ID', () => {

		let array_of_objects_in_state = [{ id: 1 }, { id: 3 }]

		expect(getNewID(array_of_objects_in_state)).toEqual(4)
	})
})
