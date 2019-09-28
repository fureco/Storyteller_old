import { addScriptPartAction } from './../projectActions';

describe('Project actions', () => {
    it('should dispatch ADD_PART action', () => {
        expect(addScriptPartAction("title")).toEqual({
            partName: 'title',
            type: 'ADD_PART'
        });
    })
});