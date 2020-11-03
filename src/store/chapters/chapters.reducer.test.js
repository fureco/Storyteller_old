import reducer from './chapters.reducer'
import * as actions from './chapter.actions'
import { initialState as initialStateChapter } from './chapter.model.js'

const initialState = [];

describe('Chapters reducer', () => {

    it('should return the initial state for an unknown action', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle ADD', () => {
		expect(
			reducer(initialState, {
				type: actions.ADD,
				chapter: initialStateChapter
			})
		).toEqual(
			Object.assign([], initialState, [
				initialStateChapter
			])
		)
	})

	it('should handle CREATE', () => {
		expect(
			reducer(initialState, {
				type: actions.CREATE,
				chapter: initialStateChapter
			})
		).toEqual(
			Object.assign([], initialState, [
				initialStateChapter
			])
		)
	})

    it('should handle SET_CHAPTERS', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_CHAPTERS,
				chapters: [
                    initialStateChapter
                ]
			})
		).toEqual(
			Object.assign([], initialState, [
				initialStateChapter
			])
		)
	})

    it('should handle SET_TITLE', () => {

		const chapter = initialStateChapter;

		const state = reducer(initialState, {
			type: actions.ADD,
			chapter: chapter
		})

		const expected_result = Object.assign({}, chapter, { title: 'title' })

		expect(
			reducer(state, {
				type: actions.SET_TITLE,
				chapter: state[0],
				title: 'title'
			})
		).toEqual(
			Object.assign([], initialState, [
				expected_result
			])
		)
	})

    it('should handle SET_DELETED_AT', () => {

		const chapter = initialStateChapter;

		const state = reducer(initialState, {
			type: actions.ADD,
			chapter: chapter
		})

		const expected_result = Object.assign({}, chapter, { deleted_at: '01-01-1900 00:00:00' })

		expect(
			reducer(state, {
				type: actions.SET_DELETED_AT,
				chapter: state[0],
				deleted_at: '01-01-1900 00:00:00'
			})
		).toEqual(
			Object.assign([], initialState, [
				expected_result
			])
		)
	})

})
