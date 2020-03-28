import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import {
	Colors,
} from '@blueprintjs/core';

import { Cover, TitleAndAuthor, ScriptStructureNav, Parts } from '../../../components';
import { Abstract, DedicationRoute, ScenesRoute } from './ScriptRoutes';

class ScriptRoute extends React.Component {

    constructor(props) {

		super(props);

        this.state = {
			selectedFile: null,
			border: `1px solid ${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
			borderRadius: `3px`,
		};
	}

	render() {

		if (window.location.hash.split("/")[2] && window.location.hash.split("/")[2] != this.props.route.split("/")[2]) {
			// console.log("ScriptStructureRoute: ", window.location.hash.split("/")[2], this.props.route.split("/")[2], this.props.route)
			return <Redirect to={this.props.route} />
		}

		return (

			<div id="ScriptRoute" style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', marginBottom: '10px' }}>

				<div
					id="TreeviewColumn"
					style={{
						width: '300px',
						overflow: 'auto',
						border: `${this.state.border}`,
						borderRadius: `${this.state.borderRadius}`,
						resize: 'horizontal',
						outline: 'none',
						padding: '10px 10px',
						marginRight: '5px',
					}}
					onKeyDown={this.onInput}
				>
					{/* <div>ScriptRoute: {window.location.hash} -> {this.props.route}</div> */}

					<ScriptStructureNav />

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
						flex: '1',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Switch>
						<Redirect exact from="/script" to="/script/cover" />
						<Route path="/script/cover" component={() => { return <Cover /> }} />
						<Route path="/script/title_author" component={() => { return <TitleAndAuthor /> }} />
						<Route path="/script/abstract" component={() => { return <Abstract /> }} />
						<Route path="/script/dedication" component={() => { return <DedicationRoute /> }} />
						<Route path="/script/parts" component={() => { return <Parts /> }} />
						<Route path="/script/chapters" component={() => { return "Chapters" }} />
						<Route path="/script/scenes" component={() => { return <ScenesRoute /> }} />
					</Switch>

				</div>

			</div>
		);
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
}


function mapStateToProps({ appStateReducer, projectReducer }) {

	var route = "/script/" + (appStateReducer.route.script.structure.current || 'cover');

	return {
		appState: appStateReducer,
		project: projectReducer,
		route: route,
	};
}

export default withRouter(connect(
    mapStateToProps,
    null
)(ScriptRoute))
