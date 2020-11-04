import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

import * as actions from './appState.actions.js';

describe('App State actions', () => {

    it('should dispatch SET_PATH action', () => {
        expect(actions.setPath("path_to_project_file")).toEqual({
            path: 'path_to_project_file',
            type: 'SET_PATH'
        });
    })

    it('should dispatch SET_THEME action', () => {
		expect(actions.setTheme("bp3-dark")).toEqual({
			theme: 'bp3-dark',
            type: 'SET_THEME'
        });
	})

	/* it('should change the theme', () => {

		const mockState = {}

		const store = mockStore({
			workspace: {
				theme: ''
			}
		})

		store.getState = () => mockState

		store.dispatch(actions.changeTheme('bp3-dark'))

		const executed_actions = store.getActions();

		expect(executed_actions).toEqual([
			{
				"payload": "",
				"type": "WORKSPACE_SET_PATH"
			},
			{
				"payload": [],
				"type": "WORKSPACE_SET_PROJECTS"
			}
		])
	}) */

});
