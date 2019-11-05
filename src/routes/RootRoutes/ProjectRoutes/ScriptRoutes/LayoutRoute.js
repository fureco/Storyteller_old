import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class LayoutRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			selectedFile: null,
		};
	}

	onFileClick(file) {
		this.loadTextFromFile(file);
	}

	loadTextFromFile(file) {

		console.log("loading content from file: " + file.filePath);

		fetch(file.filePath)
			.then(r => r.text())
			.then(text => document.getElementById('FileBrowserTextArea').value = text)
	}

	render() {

		return (

			<div id="ScriptLayout" style={{ display: 'flex', flexDirection: 'row', flexGrow: '1' }}>

				<h1>LAYOUT</h1>

				{window.location.hash}

			</div>
		);
	}
}


function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(LayoutRoute))
