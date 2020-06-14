import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import {
	Colors,
} from '@blueprintjs/core';

import {
	Cover,
	TitleAndAuthor,
	Abstract,
	ScriptStructureNav,
	Parts
} from '../../../../components';

import Chapters from '../../../../components/Chapters/Chapters';
import Dedication from '../../../../components/Dedication/Dedication';

import { getRoute } from '../../../../store/reducers/project/project.reducer.index';

import ScenesRoute from './Scenes/ScenesRoute';
//import DedicationRoute from './Scenes';

class ScriptRoute extends React.Component {

    constructor(props) {

		super(props);

        this.state = {
			selectedFile: null,
			border: `1px solid ${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
			borderRadius: `3px`,
			route: props.route
		};
	}

	render() {

		var content = <Cover />;

		if (this.state.route === "/script/title_author") {
			content = <TitleAndAuthor />;
		}
		else if (this.state.route === "/script/abstract") {
			content = <Abstract />;
		}
		else if (this.state.route === "/script/dedication") {
			content = <Dedication />;
		}
		else if (this.state.route === "/script/parts") {
			content = <Parts />;
		}
		else if (this.state.route === "/script/chapters") {
			content = <Chapters />;
		}
		else if (this.state.route === "/script/scenes") {
			content = <ScenesRoute />;
		}

		return (

			<div id="ScriptRoute" style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', marginBottom: '10px' }}>

				<div
					id="TreeviewColumn"
					style={{
						maxWidth: '400px',
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
					{content}

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


function mapStateToProps({ appStateReducer, project }) {

	return {
		appState: appStateReducer,
		project,
		route: getRoute(project),
	};
}

export default withRouter(connect(
    mapStateToProps,
    null
)(ScriptRoute))
