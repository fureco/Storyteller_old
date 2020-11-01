import React from 'react';
import { connect } from 'react-redux';
import * as projectActions from './../../store/project/project.actions';

import {
	Button,
	Colors,
	Icon
} from '@blueprintjs/core';

import "./Cover.css";

const fs = require('fs');
const { dialog } = require('electron').remote;

export class Cover extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			border: `1px solid ${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.GRAY5}`,
			borderRadius: `3px`,
			backgroundColor: `${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY3 : Colors.LIGHT_GRAY5}`,
			coverFolderPath: props.appState.path + "\\src\\assets\\cover\\",
			fileName: "",
			filePath: props.project.cover,
			hasSelection: false,
			isHovering: false,
		};

		if (this.state.filePath && this.state.filePath.length > 0) {
			this.state.hasSelection = true;
		}
	}

	render() {

		// without a cover
		var content =
			<div id="cover-preview-empty">
				<Icon icon="media" iconSize={100} style={{
					alignSelf: `center`,
					color: this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY5 : Colors.LIGHT_GRAY1
				}} />
				<Button
					id="OpenProjectButton"
					minimal={this.state.minimal}
					icon="folder-open"
					text="Browse"
					style={{ marginTop: "20px" }}
					onClick={() => {
						dialog.showOpenDialog({
							properties: ['openFile'],
							filters: [
								{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },
							]
						}).then(result => {
							console.log("result: " + JSON.stringify(result));
							if (!result.canceled) {
								this.onUpdateCover(result.filePaths[0])
							}
						});
					}}
				/>
			</div>;

		// with a cover
		if (this.state.hasSelection) {
			content =
				<div id="cover-preview-filled"
					onMouseEnter={this.handleMouseHover.bind(this)}
					onMouseLeave={this.handleMouseHover.bind(this)}
				>
					<img src={this.state.filePath} />
					{
						this.state.isHovering &&

						<div id="cover-preview-overlay" />
					}
					{
						this.state.isHovering &&
						<Button
							id="OpenProjectButton"
							minimal={this.state.minimal}
							icon="folder-open"
							text="Browse"
							style={this.props.style}
							onClick={() => {
								dialog.showOpenDialog({
									properties: ['openFile'],
									filters: [
										{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },
									]
								}).then(result => {
									console.log("result: " + JSON.stringify(result));
									if (!result.canceled) {
										this.onUpdateCover(result.filePaths[0])
									}
								});
							}}
						/>
					}
				</div>;
		}

		return (
			<div id="Cover">

				<div className="page-preview" >
					<div className="page-preview-content" style={{
						border: `${this.state.border}`,
						borderRadius: `${this.state.borderRadius}`,
						backgroundColor: `${this.state.backgroundColor}`,
					}}>
						{content}
					</div>
				</div>
			</div>
		);
	}

	onUpdateCover(filePath) {

		if (!filePath) return;

		if (!fs.existsSync(this.props.appState.path + "\\src")) {
			fs.mkdirSync(this.props.appState.path + "\\src");
		}

		if (!fs.existsSync(this.props.appState.path + "\\src\\assets")) {
			fs.mkdirSync(this.props.appState.path + "\\src\\assets");
		}

		if (!fs.existsSync(this.state.coverFolderPath)) {
			fs.mkdirSync(this.state.coverFolderPath);
		}

		var filePathArr = filePath.split("\\");
		var fileName = filePathArr[filePathArr.length - 1];

        // copy file into project folder
 		fs.copyFile(filePath, this.state.coverFolderPath + fileName, (err) => {

			if (err) throw err;

			console.log(fileName + ' was copied to ' + this.state.coverFolderPath);

			this.setState({
				"fileName": fileName,
				"filePath": this.state.coverFolderPath + fileName,
				"hasSelection": true
			});

			this.save();
		});
	}

	save() {
		this.props.setCover(this.state.filePath);
		this.props.saveProject();
	}

	handleMouseHover() {
		this.setState(this.toggleHoverState);
	}

	toggleHoverState(state) {
		return {
			isHovering: !state.isHovering,
		};
	}
}

function mapStateToProps({ appStateReducer, project }, ownProps) {

	return {
		appState: appStateReducer,
		project
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setCover: filePath => dispatch(projectActions.setCover(filePath)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cover)
