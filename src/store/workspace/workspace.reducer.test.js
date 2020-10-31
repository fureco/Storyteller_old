import reducer from './workspace.reducer.js'
import * as actions from './workspace.actions.js'
import { initialState } from './workspace.model.js'

describe('Workspace reducer', () => {

	it('should return the initial state for an unknown action', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle WORKSPACE_SET_PATH', () => {
		expect(
			reducer(initialState, {
				type: actions.WORKSPACE_SET_PATH,
				payload: 'test_path'
			})
		).toEqual(
			Object.assign({}, initialState, {
				path: "test_path"
			})
		)
	})

	it('should handle WORKSPACE_SET_PROJECTS', () => {
		expect(
			reducer(initialState, {
				type: actions.WORKSPACE_SET_PROJECTS,
				payload: 'projects'
			})
		).toEqual(
			Object.assign({}, initialState, {
				projects: "projects"
			})
		)
	})

})
