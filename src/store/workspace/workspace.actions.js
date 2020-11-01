const fs = require('fs-extra');

// ############ ACTION TYPES ##############
export const WORKSPACE_SET_PATH = 'WORKSPACE_SET_PATH';
export const WORKSPACE_SET_PROJECTS = 'WORKSPACE_SET_PROJECTS';

// ############## ACTIONS #################
export const setPath = (payload) => ({ type: WORKSPACE_SET_PATH, payload });
export const setProjects = (payload) => ({ type: WORKSPACE_SET_PROJECTS, payload });

export const openWorkspace = (directoryPath) => {

	console.log("workspace - actions - openWorkspace: " + directoryPath);

	return (dispatch, getState) => {

		dispatch(setPath(directoryPath));
		dispatch(loadProjects());
	};
}

export const loadProjects = () => {

	console.log("workspace - actions - loadProjects");

	return (dispatch, getState) => {

		let directoryPath = getState().workspace.path;

		let projects = [];

		fs.readdirSync(directoryPath).forEach(project => {
			//console.log(getState().appStateReducer.path === directoryPath + "\\" + project, getState().appStateReducer.path, directoryPath + "\\" + project);
			projects.push({ name: project, path: directoryPath + "\\" + project, isCurrentlyOpen: getState().appStateReducer.path === directoryPath + "\\" + project });
		});

		dispatch(setProjects(projects));
	};
}
