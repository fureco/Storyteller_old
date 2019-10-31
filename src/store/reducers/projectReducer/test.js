import reducer from '.'
import { projectActions } from './../../actions'

import { initialState } from './../../models/projectModel'

describe('Project reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            abstract: "",
            chapters: [],
            parts: [],
            title: ""
        })
    })

    it('should handle ADD_PART', () => {
        expect(
            reducer(initialState, {
                type: projectActions.ADD_PART,
                partName: 'test'
            })
        ).toEqual({
            abstract: "",
            chapters: [],
            parts: [{ "id": 1, "name": "test", "position": 1 }],
            title: ""
        })
	})

	it('should handle REMOVE_PART', () => {

		let state = initialState;

		state.parts = [
			{
				id: 1,
				position: state.parts.length + 1,
				name: 'test 1'
			},
			{
				id: 2,
				position: state.parts.length + 1,
				name: 'test 2'
			},
			{
				id: 3,
				position: state.parts.length + 1,
				name: 'test 3'
			}
		];

		expect(
			reducer(state, {
				type: projectActions.REMOVE_PART,
				partID: 2
			}).parts
		).toEqual([
			{
				id: 1,
				position: 1,
				name: 'test 1'
			},
			{
				id: 3,
				position: 2,
				name: 'test 3'
			}
		])
	})
})
