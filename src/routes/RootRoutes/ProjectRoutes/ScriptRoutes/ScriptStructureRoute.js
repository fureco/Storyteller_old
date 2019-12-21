import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import { ScriptStructure } from '../../../../components';
import ScriptTextArea from '../../../../components/ScriptTextArea/ScriptTextArea';

import {
	Colors,
} from '@blueprintjs/core';

class ScriptStructureRoute extends React.Component {

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

			<div id="ScriptStructureRoute" style={{ display: 'flex', flexDirection: 'row', height: '100%', marginBottom: '10px' }}>

				<div
					id="DirectoryTreeView"
					style={{
						width: '300px',
						overflow: 'auto',
						border: `1px solid ${this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
						resize: 'horizontal',
						outline: 'none',
						padding: '0 10px',
					}}
					onKeyDown={this.onInput}
				>
					{/* {window.location.hash} -> {this.props.route} */}

					<ScriptStructure />

				</div>

				<Switch>
					<Redirect exact from="/script" to={this.props.route} />
					<Route path="/script/structure" component={() => { return <ScriptTextArea /> }} />
					<Route path="/script/layout" component={() => { return <ScriptLayout /> }} />
					<Route path="/script/files" component={() => { return <FileBrowserTextArea /> }} />
				</Switch>

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, projectReducer }) {

	var route = "/script/structure/" + (appStateReducer.route.script.structure.current || 'abstract');

	return {
		appState: appStateReducer,
		project: projectReducer,
		route,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(ScriptStructureRoute))
