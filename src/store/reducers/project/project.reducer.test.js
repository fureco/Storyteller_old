import reducer from './project.reducer.index.js'
import * as projectActions from './project.actions.index'
import { initialState } from './project.model'

describe('Project reducer', () => {

    it('should return the initial state for an unknown action', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle SET_COVER', () => {
		expect(
			reducer(initialState, {
				type: projectActions.SET_COVER,
				cover: 'test_cover'
			})
		).toEqual(
			Object.assign({}, initialState, {
				cover: "test_cover"
			})
		)
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

	it('should handle SET_AUTHOR', () => {
		expect(
			reducer(initialState, {
				type: projectActions.SET_AUTHOR,
				author: 'firstname lastname'
			})
		).toEqual(
			Object.assign({}, initialState, {
				author: 'firstname lastname'
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

	it('should handle SET_ROUTE', () => {
		expect(
			reducer(initialState, {
				type: projectActions.SET_ROUTE,
				route: 'test_route'
			})
		).toEqual(
			Object.assign({}, initialState, {
				route: "test_route"
			})
		)
	})

	it('should handle SET_SELECTED_CHAPTER', () => {
		expect(
			reducer(initialState, {
				type: projectActions.SET_SELECTED_CHAPTER,
				chapter: 'test_chapter'
			})
		).toEqual(
			Object.assign({}, initialState, {
				selectedChapter: "test_chapter"
			})
		)
	})

})
