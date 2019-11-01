import { setPath, selectMainAreaAction } from './actions.appState.index.js';

describe('App State actions', () => {

    it('should dispatch SET_PATH action', () => {
        expect(setPath("path_to_project_file")).toEqual({
            path: 'path_to_project_file',
            type: 'SET_PATH'
        });
    })

    it('should dispatch SELECT_MAIN_AREA action', () => {
        expect(selectMainAreaAction("navbarTabId")).toEqual({
            navbarTabId: 'navbarTabId',
            type: 'SELECT_MAIN_AREA'
        });
    })

});
