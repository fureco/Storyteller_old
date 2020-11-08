import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

import * as actions from './workspace.actions.js';

const path = require('path');

jest.mock('fs');

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

	describe('openWorkspace', () => {

		it('should dispatch WORKSPACE_SET_PATH & WORKSPACE_SET_PROJECTS actions', () => {

			const path_to_workspace = "";

			const mockState = {}

			const store = mockStore({
				workspace: {
					path: path_to_workspace
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
	})

	describe('loadProjects', () => {

		it('should set projects = [] if no valid workspace path is set', () => {

			const mockState = {}

			const store = mockStore({
				workspace: {
				}
			})

			store.getState = () => mockState

			store.dispatch(actions.loadProjects())

			const executed_actions = store.getActions();

			expect(executed_actions).toEqual([
				{
					"payload": [],
					"type": "WORKSPACE_SET_PROJECTS"
				}
			])
		})

		it('should return projects if valid workspace path is set', () => {

			const path_to_workspace = path.join('path', 'to', 'workspace');

			const path_to_project_1 = path.join(path_to_workspace, 'project_1');
			const path_to_project_2 = path.join(path_to_workspace, 'project_2');

			const MOCK_FILE_INFO = {};

			MOCK_FILE_INFO[path_to_project_1] = 'project.js';
			MOCK_FILE_INFO[path_to_project_2] = 'project.js';

			require('fs').__setMockFiles(MOCK_FILE_INFO);

			const mockState = {}

			const store = mockStore({
				workspace: {
					path: path_to_workspace
				},
				appState: {
					path: path_to_project_2
				}
			})

			store.getState = () => mockState

			store.dispatch(actions.loadProjects())

			const executed_actions = store.getActions();

			expect(executed_actions).toEqual([
				{
					"payload": [
						{ name: "project_1", path: path_to_project_1, isCurrentlyOpen: false },
						{ name: "project_2", path: path_to_project_2, isCurrentlyOpen: true }
					],
					"type": "WORKSPACE_SET_PROJECTS"
				}
			])
		})
	})

});
