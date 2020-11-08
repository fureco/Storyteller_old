const fs = require('fs-extra');
const path = require('path');

// ############ ACTION TYPES ##############
export const WORKSPACE_SET_PATH = 'WORKSPACE_SET_PATH';
export const WORKSPACE_SET_PROJECTS = 'WORKSPACE_SET_PROJECTS';

// ############## ACTIONS #################
export const setPath = (payload) => ({ type: WORKSPACE_SET_PATH, payload });
export const setProjects = (payload) => ({ type: WORKSPACE_SET_PROJECTS, payload });

export const openWorkspace = (directoryPath) => {
	return (dispatch, getState) => {
		dispatch(setPath(directoryPath));
		dispatch(loadProjects());
	};
}

export const loadProjects = () => {

	return (dispatch, getState) => {

		let projects = [];

		if (getState().workspace.path) {

			let directoryPath = getState().workspace.path;

			fs.readdirSync(directoryPath).forEach(project => {
				projects.push({ name: project, path: path.join(directoryPath, project), isCurrentlyOpen: getState().appState.path === path.join(directoryPath, project) });
			});
		}

		dispatch(setProjects(projects));
	};
}
