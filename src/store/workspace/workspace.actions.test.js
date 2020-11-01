import * as actions from './workspace.actions.js';
import * as reducer from './workspace.reducer.js';

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

});
