import React from 'react';
import { connect } from 'react-redux';

import {
	Colors,
} from '@blueprintjs/core';

import {
	Timeline,
	TopNavBar,
} from '../../components';

import { getRoute } from './../../store/project/project.selectors';

import { MoveToTrashAlert } from './../../components';

import LocalStorage from './../../components/LocalStorage/LocalStorage';
import Workspace from './../../components/Workspace/Workspace';
import ScriptRoute from './ProjectRoutes/ScriptRoutes/route.script.index';
import CharactersRoute from './ProjectRoutes/CharactersRoutes/CharactersRoute';
import PreviewRoute from './ProjectRoutes/PreviewRoute/PreviewRoute';

export class ProjectRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			statistic: {
				words: 0,
				chars: 0,
			},
		};

		this.onInput = this.onInput.bind(this);
	}

	onInput() {
		const textField = document.querySelector('#TextField');
		const textBeforeCaret = textField.value.slice(0, textField.selectionStart);
		const words = textBeforeCaret.split(' ');
		this.setState({
			statistic: {
				words: words.length,
				chars: textField.value.length,
			}
		});
	}

	handleTabChange(navbarTabId) {
		this.setState({ selectedTabId: navbarTabId });
	}

	render() {

		return (
			<div
				id="ProjectRoute"
				className={this.props.appState.theme}
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh'
				}}>

				<TopNavBar />

				<div
					id="path_to_open_project"
					style={{
						display: "flex",
						alignItems: "center",
						backgroundColor: this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY4 : Colors.LIGHT_GRAY5,
						borderBottom: `1px solid ${this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
						height: '50px',
						padding: 12,
					}}>
					{this.props.appState.path ? this.props.appState.path : 'No project selected.'}
				</div>

				<div id="Main" style={{ display: 'flex', flexGrow: '1', padding: '10px', overflow: 'auto' }}>
					<div style={{
						display: 'flex',
						flexGrow: '1',
						justifyContent: "center",
						alignItems: "center"
					}}>
						<Content appState={this.props.appState} project={this.props.project} />
					</div>
				</div>

				<div
					id="StatusBar"
					style={{
						backgroundColor: this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY4 : Colors.LIGHT_GRAY5,
						borderTop: `1px solid ${this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
						height: '50px',
						padding: 12,
					}}>
					{/* words: {this.state.statistic.words} - chars: {this.state.statistic.chars} */}
				</div>

				<MoveToTrashAlert />

			</div>
		);
	}
}

function Content(props) {

	if (!props.project) return null;

	switch (props.project.route.current) {

		case 'workspace':
			return <Workspace />

		case 'script':
			return <ScriptRoute path_to_project={props.appState.path} />

		case 'characters':
			return <CharactersRoute path_to_project={props.appState.path} />

		case 'locations':
			return <h2>Locations</h2>

		case 'timeline':
			return <Timeline />

		case 'preview':
			return <PreviewRoute />

		default:
			return <ScriptRoute path_to_project={props.appState.path} />;
	}
}

function mapStateToProps({ appState, project }) {
	return {
		appState,
		project,
		route: getRoute(project),
	};
}

export default connect(
	mapStateToProps,
	null
)(ProjectRoute)
