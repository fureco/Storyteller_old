import React from 'react';
import { connect } from 'react-redux';

import {
	Colors,
} from '@blueprintjs/core';

import {
	TopNavBar
} from '../../components';

import ScriptRoute from './ProjectRoutes/ScriptRoute';
import CharactersRoute from './ProjectRoutes/CharactersRoute';

class Project extends React.Component {

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
		const textBeforCaret = textField.value.slice(0, textField.selectionStart);
		const words = textBeforCaret.split(' ');
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
				id="Project"
				className={this.props.appState.theme}
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh'
				}}>

				{/* <div>{window.location.hash} -> {this.props.route}</div> */}

				<TopNavBar />

				<div
					id="path_to_open_project"
					style={{
						backgroundColor: this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY4 : Colors.LIGHT_GRAY5,
						borderBottom: `1px solid ${this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
						height: '50px',
						padding: 12,
					}}>
					{this.props.appState.path ? this.props.appState.path : 'No project selected.'}
				</div>

				<div id="Main" style={{ display: 'flex', height: '100vh', padding: '10px' }}>
					<div style={{ display: 'flex', flexGrow: '1' }}>
						{
							this.props.route === '/script' &&
							<ScriptRoute path_to_project={this.props.appState.path} />
						}
						{
							this.props.route === '/characters' &&
							<CharactersRoute path_to_project={this.props.appState.path} />
						}
						{
							this.props.route === '/locations' &&
							<h2>Locations</h2>
						}
						{
							this.props.route === '/timeline' &&
							<h2>Timeline</h2>
						}
					</div>
				</div>

				<div
					id="StatusBar"
					style={{
						backgroundColor: Colors.LIGHT_GRAY5,
						borderTop: `1px solid ${Colors.LIGHT_GRAY1}`,
						height: '50px',
						padding: 12,
					}}>
					words: {this.state.statistic.words} - chars: {this.state.statistic.chars}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ appStateReducer }) {
	return {
		appState: appStateReducer,
		route: "/" + (appStateReducer.route ? appStateReducer.route.current : 'script'),
	};
}

export default connect(
	mapStateToProps,
	null
)(Project)
