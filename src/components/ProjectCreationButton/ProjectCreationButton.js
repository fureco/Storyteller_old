import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from "../../store/actions";

import {
	Button,
} from '@blueprintjs/core';

const { dialog } = require('electron').remote;

export class ProjectCreationButton extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			minimal: this.props.minimal || false,
			showText: this.props.showText || false,
		};
	}

	render() {

		let text = this.state.showText ? "Create new project" : "";

		return (
			<Button
				id="ProjectCreationButton"
				minimal={this.state.minimal}
				icon="folder-new"
				text={text}
				onClick={() => {
					dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
						// console.log("result: " + JSON.stringify(result));
						if (!result.canceled) {
							this.props.createProject(result.filePaths[0])
						}
					});
				}}
			/>
		);
	}
}

function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createProject: (filePath) => dispatch(projectActions.createProjectAction(filePath)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProjectCreationButton)
