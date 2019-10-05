// ############## ACTION TYPES #################
export const SET_PATH = 'SET_PATH';
export const SELECT_MAIN_AREA = 'SELECT_MAIN_AREA';

// ############## ACTIONS #################
export const setPath = (path) => ({ type: SET_PATH, path });
export const selectMainAreaAction = (navbarTabId) => ({ type: SELECT_MAIN_AREA, navbarTabId });