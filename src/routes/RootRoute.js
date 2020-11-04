import React from 'react';
import { connect } from 'react-redux';

import * as sync_storage from 'electron-json-storage-sync';

import * as appStateActions from "./../store/appState/appState.actions";
import * as workspaceActions from "./../store/workspace/workspace.actions";
import * as projectActions from "./../store/project/project.actions";

import WelcomeRoute from './RootRoutes/WelcomeRoute';
import ProjectRoute from './RootRoutes/ProjectRoute';

export class RootRoute extends React.Component {

	constructor(props) {

		super(props);

		let result = sync_storage.get('storyteller');

		// console.log("storage-data: " + JSON.stringify(result));

		if (!result.status) {
			return;
		}

		if (result.data.theme) {
			console.log("theme: " + result.data.theme);
			props.setTheme(result.data.theme);
		}
		else {
			console.log("theme: not set");
		}

		if (result.data.workspace) {
			console.log("workspace: " + result.data.workspace);
			props.openWorkspace(result.data.workspace);
		}
		else {
			console.log("workspace: not set");
		}

		if (result.data.path) {
			console.log("current_project: " + result.data.path);
			props.openProject(result.data.path);
		}
		else {
			console.log("current_project: not set");
		}
    }

	render() {

		return (
			<div id="RootRoute" style={styles.container} >
				<Content appState={this.props.appState} project={this.props.project} />
			</div>
        );
    }
}

function Content(props) {
	if (props.appState.path) {
		return <ProjectRoute project={props.project} />
	}
	else {
		return <WelcomeRoute />
	}
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
    }
}

export function mapStateToProps({ appState, project, workspace }) {

    return {
		appState,
		project,
		workspace
    };
}

export function mapDispatchToProps(dispatch) {
	return {
		setTheme: (theme) => dispatch(appStateActions.setTheme(theme)),
		openWorkspace: (filePath) => { dispatch(workspaceActions.openWorkspace(filePath)) },
		openProject: (filePath) => { dispatch(projectActions.openProjectAction(filePath)) },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RootRoute)
