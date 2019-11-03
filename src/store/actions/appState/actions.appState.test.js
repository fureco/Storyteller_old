import { setPath, setTheme } from './actions.appState.index.js';

describe('App State actions', () => {

    it('should dispatch SET_PATH action', () => {
        expect(setPath("path_to_project_file")).toEqual({
            path: 'path_to_project_file',
            type: 'SET_PATH'
        });
    })

    it('should dispatch SET_THEME action', () => {
		expect(setTheme("bp3-dark")).toEqual({
			theme: 'bp3-dark',
            type: 'SET_THEME'
        });
    })

});
