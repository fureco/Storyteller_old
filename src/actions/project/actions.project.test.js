import { closeProjectAction, addScriptPartActionSuccess } from './actions.project.index.js';

describe('Project actions', () => {

    it('should dispatch ADD_PART action', () => {
        expect(addScriptPartActionSuccess("title")).toEqual({
            partName: 'title',
            type: 'ADD_PART'
        });
    })
});
