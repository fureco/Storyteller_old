import React from 'react';
import { connect } from 'react-redux';
import { appStateActions, projectActions } from "../../../store/actions";

import {
	Menu,
	MenuItem,
} from '@blueprintjs/core';

const { dialog } = require('electron').remote;

export class Settings extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	handleThemeChange(theme) {
		this.props.changeTheme(theme);
		this.props.saveAppState();
	}

	render() {
		return (
			<Menu>
				<MenuItem text="Project">
					<MenuItem text="Open" icon="folder-open" onClick={() => {
						dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
							// console.log("result: " + JSON.stringify(result));
							if (!result.canceled) {
								this.props.openProject(result.filePaths[0])
							}
						});
					}} />
					<MenuItem text="Create" icon="folder-new" onClick={() => {
						dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
							// console.log("result: " + JSON.stringify(result));
							if (!result.canceled) {
								this.props.createProject(result.filePaths[0])
							}
						});
					}} />
					{this.props.appState.path && <MenuItem text="Save Backup" icon="archive" onClick={() => { this.props.archiveProject() }} />}
					{this.props.appState.path && <MenuItem text="Restore Backup" icon="unarchive" onClick={() => { }} />}
					{this.props.appState.path && <MenuItem text="Close" icon="delete" onClick={() => this.props.closeProject()} />}
				</MenuItem>
				<MenuItem text="Theme">
					<MenuItem text="Light Mode" active={this.props.appState.theme == 'bp3-body'} onClick={() => this.handleThemeChange('bp3-body')} />
					<MenuItem text="Dark Mode" active={this.props.appState.theme == 'bp3-dark'} onClick={() => this.handleThemeChange('bp3-dark')} />
				</MenuItem>
			</Menu>
		);
	}
}

function mapStateToProps({ appStateReducer, projectReducer }) {
	return {
		appState: appStateReducer,
		project: projectReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// project
		openProject: (filePath) => dispatch(projectActions.openProjectAction(filePath)),
		closeProject: () => dispatch(projectActions.closeProjectAction()),
		createProject: (filePath) => dispatch(projectActions.createProjectAction(filePath)),
		archiveProject: () => dispatch(projectActions.archive()),
		// app_state
		changeTheme: (theme) => dispatch(appStateActions.changeTheme(theme)),
		saveAppState: () => dispatch(appStateActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Settings)
