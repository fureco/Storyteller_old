import reducer from './reducer.project.index.js'
import { projectActions } from '../../actions'

import { initialState } from './projectModel'

describe('Project reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle SET_TITLE', () => {
		expect(
			reducer(initialState, {
				type: projectActions.SET_TITLE,
				title: 'test'
			})
		).toEqual(
			Object.assign({}, initialState, {
				title: "test"
			})
		)
	})

	it('should handle SET_ABSTRACT', () => {
		expect(
			reducer(initialState, {
				type: projectActions.SET_ABSTRACT,
				abstract: 'test'
			})
		).toEqual(
			Object.assign({}, initialState, {
				abstract: "test"
			})
		)
	})

	it('should handle SET_DEDICATION', () => {
		expect(
			reducer(initialState, {
				type: projectActions.SET_DEDICATION,
				dedication: 'test'
			})
		).toEqual(
			Object.assign({}, initialState, {
				dedication: "test"
			})
		)
	})

})
