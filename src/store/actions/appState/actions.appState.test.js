import { setPath, setRoute } from './actions.appState.index.js';

describe('App State actions', () => {

    it('should dispatch SET_PATH action', () => {
        expect(setPath("path_to_project_file")).toEqual({
            path: 'path_to_project_file',
            type: 'SET_PATH'
        });
    })

    it('should dispatch SET_ROUTE action', () => {
		expect(setRoute("#/this/is/the/current/route")).toEqual({
			route: '#/this/is/the/current/route',
            type: 'SET_ROUTE'
        });
    })

});
