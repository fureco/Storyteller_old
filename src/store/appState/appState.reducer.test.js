import reducer from './appState.reducer'
import * as actions from './appState.actions'
import { initialState } from './appState.model'

describe('AppState reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle SET_OBJECT_TO_DELETE', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_OBJECT_TO_DELETE,
				object_to_delete: 'test'
			})
		).toEqual(
			Object.assign({}, initialState, {
				object_to_delete: "test"
			})
		)
	})

	it('should handle SET_PATH', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_PATH,
				path: 'test_path'
			})
		).toEqual(
			Object.assign({}, initialState, {
				path: "test_path"
			})
		)
	})

	it('should handle SET_THEME', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_THEME,
				theme: 'test_theme'
			})
		).toEqual(
			Object.assign({}, initialState, {
				theme: "test_theme"
			})
		)
	})

	it('should handle SHOW_MOVE_TO_TRASH_ALERT', () => {
		expect(
			reducer(initialState, {
				type: actions.SHOW_MOVE_TO_TRASH_ALERT
			})
		).toEqual(
			Object.assign({}, initialState, {
				showMoveToTrashAlert: true
			})
		)
	})

	it('should handle HIDE_MOVE_TO_TRASH_ALERT', () => {
		expect(
			reducer(initialState, {
				type: actions.HIDE_MOVE_TO_TRASH_ALERT
			})
		).toEqual(
			Object.assign({}, initialState, {
				showMoveToTrashAlert: false
			})
		)
	})

})
