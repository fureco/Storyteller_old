import reducer from '.'
import { appStateActions as actions } from '../../actions'
import { initialState } from './../../models/appStateModel'

describe('AppState reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
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

	it('should handle SET_ROUTE', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_ROUTE,
				route: 'test_route'
			})
		).toEqual(
			Object.assign({}, initialState, {
				route: "test_route"
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

})
