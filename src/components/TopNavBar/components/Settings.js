import React from 'react';
import { connect } from 'react-redux';

import * as appStateActions from "./../../../store/actions/appState/actions.appState.index.js";

import {
	Menu,
	MenuItem,
} from '@blueprintjs/core';

export class Settings extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	handleThemeChange(theme) {
		this.props.changeTheme(theme);
	}

	render() {
		return (
			<Menu>
				<MenuItem text="Theme" icon="style">
					<MenuItem text="Light Mode" active={this.props.appState.theme == 'bp3-body'} onClick={() => this.handleThemeChange('bp3-body')} />
					<MenuItem text="Dark Mode" active={this.props.appState.theme == 'bp3-dark'} onClick={() => this.handleThemeChange('bp3-dark')} />
				</MenuItem>
			</Menu>
		);
	}
}

function mapStateToProps({ appStateReducer }) {
	return {
		appState: appStateReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// app_state
		changeTheme: (theme) => dispatch(appStateActions.changeTheme(theme)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Settings)
