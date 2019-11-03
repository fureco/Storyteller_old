import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";

import {
	Colors,
} from '@blueprintjs/core';

import TopNavBar from './../components/TopNavBar/TopNavBar';
import ScriptRoute from './ProjectRoutes/ScriptRoute';

class Project extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			selectedMainArea: 'write',
			selectedTabId: 'script',
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

	setSelectedMainArea(value) {
		this.setState({ selectedMainArea: value });
	}

	render() {

		return (
			<div id="Project" style={styles.container} className={this.props.appState.theme}>

				{/* {window.location.hash} */}

				<TopNavBar setSelectedMainArea={this.setSelectedMainArea.bind(this)} />

				<div id="path_to_open_project"
					style={{
						// backgroundColor: Colors.LIGHT_GRAY5,
						borderBottom: `1px solid ${Colors.LIGHT_GRAY1}`,
						height: '50px',
						padding: 12,
					}}>
					{this.props.appState.path ? this.props.appState.path : 'No project selected.'}
				</div>

				<div id="Main" style={{ display: 'flex', height: '100vh', padding: '10px' }}>
					<div style={{ display: 'flex', flexGrow: '1' }}>
						<Switch>
							<Redirect exact from="/" to="/script" />
							<Route path="/script" component={() => { return <ScriptRoute path_to_project={this.props.appState.path} /> }} />
							<Route path="/characters" component={() => { return <h2>Characters</h2> }} />
							<Route path="/locations" component={() => { return <h2>Locations</h2> }} />
							<Route path="/timeline" component={() => { return <h2>Timeline</h2> }} />
						</Switch>
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

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh'
	}
}

function mapStateToProps({ appStateReducer }) {
	return {
		appState: appStateReducer,
	};
}

export default connect(
	mapStateToProps,
	null
)(Project)
