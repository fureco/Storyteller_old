import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import { ScriptStructure, Parts } from '../../../../components';
import { Abstract, Dedication } from './ScriptStructureRoutes';

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
			.then(text => this.setState(text, text))
	}

	render() {

		return (

			<div id="ScriptStructureRoute" style={{ display: 'flex', flexDirection: 'row', height: '100%', marginBottom: '10px' }}>

				<div
					id="TreeviewColumn"
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

				<div
					id="ContentColumn"
					style={{
						overflow: 'auto',
						border: `1px solid ${this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
						resize: 'none',
						outline: 'none',
						padding: '10px',
						flex: '1'
					}}
				>
					<Switch>
						<Redirect exact from="/script/structure" to="/script/structure/abstract" />
						<Route path="/script/structure/abstract" component={() => { return <Abstract /> }} />
						<Route path="/script/structure/dedication" component={() => { return <Dedication /> }} />
						<Route path="/script/structure/parts" component={() => { return <Parts /> }} />
						<Route path="/script/structure/chapters" component={() => { return "Chapters" }} />
						<Route path="/script/structure/scenes" component={() => { return "Scenes" }} />
					</Switch>

				</div>

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
