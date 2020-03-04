import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import { Cover, ScriptStructure, Parts } from '../../../../components';
import { Abstract, Dedication, ScenesRoute } from './ScriptStructureRoutes';

import {
	Colors,
} from '@blueprintjs/core';

class ScriptStructureRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			selectedFile: null,
			border: `1px solid ${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
			borderRadius: `3px`,
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

		if (window.location.hash.split("/")[3] && window.location.hash.split("/")[3] != this.props.route.split("/")[3]) {
			// console.log("ScriptStructureRoute: ", window.location.hash.split("/")[3], this.props.route.split("/")[3], this.props.route)
			return <Redirect to={this.props.route} />
		}

		return (

			<div id="ScriptStructureRoute" style={{ display: 'flex', flexDirection: 'row', height: '100%', marginBottom: '10px' }}>

				<div
					id="TreeviewColumn"
					style={{
						width: '300px',
						overflow: 'auto',
						border: `${this.state.border}`,
						borderRadius: `${this.state.borderRadius}`,
						resize: 'horizontal',
						outline: 'none',
						padding: '0 10px',
						marginRight: '5px',
					}}
					onKeyDown={this.onInput}
				>
					{/* <div>ScriptStructureRoute: {window.location.hash} -> {this.props.route}</div> */}

					<ScriptStructure />

				</div>

				<div
					id="ContentColumn"
					style={{
						overflow: 'auto',
						border: `${this.state.border}`,
						borderRadius: `${this.state.borderRadius}`,
						resize: 'none',
						outline: 'none',
						padding: '10px',
						flex: '1'
					}}
				>
					{/* <div>ScriptStructureRoute: {window.location.hash} -> {this.props.route}</div> */}

					<Switch>
						<Redirect exact from="/script/structure" to="/script/structure/cover" />
						<Route path="/script/structure/cover" component={() => { return <Cover /> }} />
						<Route path="/script/structure/abstract" component={() => { return <Abstract /> }} />
						<Route path="/script/structure/dedication" component={() => { return <Dedication /> }} />
						<Route path="/script/structure/parts" component={() => { return <Parts /> }} />
						<Route path="/script/structure/chapters" component={() => { return "Chapters" }} />
						<Route path="/script/structure/scenes" component={() => { return <ScenesRoute /> }} />
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
		route: route,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(ScriptStructureRoute))
