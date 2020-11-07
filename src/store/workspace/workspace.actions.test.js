import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './workspace.actions.js';

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

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

			const MOCK_FILE_INFO = {
				'/path/to/workspace/project_1': 'project.js',
				'/path/to/workspace/project_2': 'project.js',
			};

			require('fs').__setMockFiles(MOCK_FILE_INFO);

			const path_to_workspace = "/path/to/workspace";

			const mockState = {}

			const store = mockStore({
				workspace: {
					path: path_to_workspace
				},
				appState: {
					path: '/path/to/workspace/project_2'
				}
			})

			store.getState = () => mockState

			store.dispatch(actions.loadProjects())

			const executed_actions = store.getActions();

			expect(executed_actions).toEqual([
				{
					"payload": [
						{ name: "project_1", path: "/path/to/workspace/project_1", isCurrentlyOpen: false },
						{ name: "project_2", path: "/path/to/workspace/project_2", isCurrentlyOpen: true }
					],
					"type": "WORKSPACE_SET_PROJECTS"
				}
			])
		})
	})

});
