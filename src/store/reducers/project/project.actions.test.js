import * as projectActions from './actions.project.index.js';

describe('Project actions', () => {

	it('should dispatch SET_ABSTRACT action', () => {
		expect(projectActions.setAbstract("test")).toEqual({
			abstract: 'test',
			type: 'SET_ABSTRACT'
		});
	})
});
