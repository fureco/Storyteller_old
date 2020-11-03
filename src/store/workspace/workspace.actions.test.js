import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './workspace.actions.js';
import * as projectActions from './../project/project.actions.js';

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

const fs = require('fs-extra')
const dir = process.cwd();
const path_to_workspaces = dir + "\\config\\test_workspaces\\workspace_actions_tests";

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

	describe('on file system', () => {

		it('should open empty workspace', () => {

			const path_to_workspace = path_to_workspaces + "\\workspace_actions_should_open_empty_workspace";

			clearWorkspace(path_to_workspace);

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

		it('should open workspace with projects', () => {

			const path_to_workspace = path_to_workspaces + "\\workspace_actions_should_open_workspace_with_projects";

			clearWorkspace(path_to_workspace);

			const mockState = {}

			const store = mockStore({
				appStateReducer: {
					path: path_to_workspace + "\\test_project"
				},
				workspace: {
					path: path_to_workspace
				}
			})

			store.getState = () => mockState

			// create a test project so the workspace is no longer empty
			const path = path_to_workspace + "\\test_project";
			store.dispatch(projectActions.createProjectAction(path))

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
						"name": "test_project",
						"path": path_to_workspace + "\\test_project",
					}],
					"type": "WORKSPACE_SET_PROJECTS"
				}
			])
		})

	})

});

const clearWorkspace = (path_to_workspace) => {
	fs.emptyDirSync(path_to_workspace)
}
