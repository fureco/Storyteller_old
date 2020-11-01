import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

import * as actions from './workspace.actions.js';

describe('Workspace actions', () => {

	it('should dispatch WORKSPACE_SET_PATH action', () => {
		expect(actions.setPath("path")).toEqual({
			type: 'WORKSPACE_SET_PATH',
			payload: 'path'
		});
	})

	it('should dispatch WORKSPACE_SET_PROJECTS action', () => {
		expect(actions.setProjects("projects")).toEqual({
			type: 'WORKSPACE_SET_PROJECTS',
			payload: 'projects'
		});
	})

	it('should open empty workspace', () => {

		var dir = process.cwd();
		const mockState = {}

		const store = mockStore({
			workspace: {
				path: dir + "\\config\\test_workspaces\\empty_workspace"
			}
		})

		store.getState = () => mockState

		store.dispatch(actions.openWorkspace(""))

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
	})

	it('should open workspace with projects', () => {

		var dir = process.cwd();
		const mockState = {}

		const store = mockStore({
			appStateReducer: {
				path: dir + "\\config\\test_workspaces\\workspace_with_projects\\test_project_1"
			},
			workspace: {
				path: dir + "\\config\\test_workspaces\\workspace_with_projects"
			}
		})

		store.getState = () => mockState

		store.dispatch(actions.openWorkspace(""))

		const executed_actions = store.getActions();

		expect(executed_actions).toEqual([
			{
				"payload": "",
				"type": "WORKSPACE_SET_PATH"
			},
			{
				"payload": [{
					"isCurrentlyOpen": true,
					"name": "test_project_1",
					"path": "D:\\Dropbox\\Melle\\Writing\\Storyteller\\config\\test_workspaces\\workspace_with_projects\\test_project_1",
				}],
				"type": "WORKSPACE_SET_PROJECTS"
			}
		])
	})

});
