import React from 'react';
import { connect } from 'react-redux';

import * as workspaceActions from "./../../store/workspace/workspace.actions";
import * as projectActions from "./../../store/project/project.actions";

import storage from 'electron-json-storage-sync';

import "./Workspace.css";

import {
	Button,
	ButtonGroup,
	Card,
	Collapse,
	InputGroup,
	Intent,
	Pre,
} from '@blueprintjs/core';

const { dialog } = require('electron').remote;
const fs = require('fs-extra');

export class Workspace extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			createIsOpen: false
		}
	}

	render() {

		let content = "";

		if (this.props.workspace === undefined) {
			content =
				<Button
					id="SelectWorkspaceButton"
					icon="folder-open"
					text="Select a workspace folder"
					onClick={this.changeWorkspace.bind(this)}
				/>
		}
		else {

			let projectListItems = this.props.workspace.projects.map((project) =>
				<Project
					key={project.name}
					project={project}
					isCurrentlyOpen={project.isCurrentlyOpen}
					onClick={() => { this.props.openProject(project.path) }}
					onDelete={() => { this.props.deleteProject(project.path); this.props.loadProjects(); }} />
			);

			content = <div>
				<h2>Workspace</h2>
				<hr/>
				{this.props.workspace.path}
				<Button id="ChangeWorkspaceButton"
						icon="folder-open"
						text="Change"
						style={{ marginLeft: "15px" }}
						onClick={this.changeWorkspace.bind(this)} />
				<hr />
				<h2>Projects</h2>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<ButtonGroup id="projectsList" minimal={false} vertical={true} style={{ minWidth: "250px" }}>
						{projectListItems}
						<Collapse isOpen={this.props.workspace.createIsOpen}>
							<Pre>
								<InputGroup
									placeholder={"Title of new project..."}
									onChange={() => this.setState({
										name_of_new_project: event.target.value,
										name_of_new_project_is_valid: this.is_a_valid_new_project_name(event.target.value)
									})}
									autoFocus />
							</Pre>
						</Collapse>
						{ !this.props.workspace.createIsOpen &&
							<Button id="CreateProjectButton"
							minimal={false}
							icon={"folder-new"}
							text={"Create a new project"}
							intent={Intent.SUCCESS}
							onClick={this.handleCreateClick.bind(this)} />
						}
						{this.state.createIsOpen &&

							<ButtonGroup>
								<Button id="CreateProjectButton"
								style={{width:"50%"}}
								minimal={false}
								icon={"floppy-disk"}
								text={"Save"}
								disabled={this.state.name_of_new_project_is_valid ? false : true}
								onClick={this.handleSaveClick.bind(this)} />

								<Button id="CancelCreateProjectButton"
								style={{ width: "50%" }}
								minimal={false}
								icon={"delete"}
								text={"Cancel"}
								onClick={this.handleCancelClick.bind(this)} />
							</ButtonGroup>
						}
					</ButtonGroup>
				</div>
			</div>
		}

		return (
			<div id="Workspace" className={this.props.appState.theme}>
				<Card>
					{content}
				</Card>
			</div>
		);
	}

	changeWorkspace() {
		dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
			//console.log("result: " + JSON.stringify(result));
			if (!result.canceled) {

				var storage_data = storage.get('storyteller');

				if (storage_data.status) {

					var path = result.filePaths[0];

					this.props.openWorkspace(path);

					var new_storage_data = Object.assign({}, storage_data, {
						workspace: path
					});

					storage.set('storyteller', new_storage_data, (error) => {
						if (error) throw error;
					});
				}
				else {
					throw error;
				}
			}
		});
	}

	is_a_valid_new_project_name(new_name) {

		new_name = new_name.trim();

		var new_name_is_unique = true;

		this.state.projects.forEach(project => {
			if (project.name == new_name) {
				new_name_is_unique = false;
			}
		})

		return new_name.length > 0 && new_name_is_unique
	}

	handleCreateClick() {
		this.setState({ createIsOpen: true });
	}

	handleSaveClick() {
		let path_of_new_project = this.state.workspace + "\\" + this.state.name_of_new_project;
		console.log(path_of_new_project);
		this.props.createProject(path_of_new_project)
		this.readWorkspace();
		this.setState({
			createIsOpen: false,
			name_of_new_project: ""
		});
	}

	handleCancelClick() {
		this.setState({
			createIsOpen: false,
			name_of_new_project: ""
		});
	}
}

function Project(props) {
	return (
		<ButtonGroup key={props.project.name} style={{display: "flex"}}>
			<Button
				id={props.project.name}
				text={props.project.name}
				onClick={props.onClick}
				icon={props.isCurrentlyOpen ? "folder-open" : "folder-close"}
				intent={Intent.PRIMARY}
				active={props.isCurrentlyOpen ? true : false}
				style={{
					flex: "1",
					justifyContent: "left",
					width: "auto"
				}}
			/>
			<Button
				id={props.project.name + "-delete"}
				onClick={props.onDelete}
				icon={"trash"}
				intent={Intent.DANGER}
				style={{
					justifyContent: "center",
					width: "auto"
				}}
			/>
		</ButtonGroup>
	);
}

function mapStateToProps({ appState, workspace }) {
	return {
		appState,
		workspace
	};
}

function mapDispatchToProps(dispatch) {
	return {
		openWorkspace: (filePath) => { dispatch(workspaceActions.openWorkspace(filePath)) },
		loadProjects: () => dispatch(workspaceActions.loadProjects()),
		openProject: (filePath) => dispatch(projectActions.openProjectAction(filePath)),
		createProject: (filePath) => dispatch(projectActions.createProjectAction(filePath)),
		deleteProject: (filePath) => dispatch(projectActions.deleteProject(filePath)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Workspace)
