import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import ExportIndexRoute from './ExportIndexRoute.js';

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';


class ExportRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			themeName: props.themeName || "bp3-body", // null || bp3-dark
		};
	}

	render() {

		return (

			<div id="ExportRoute" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

				<Switch>
					<Redirect exact from="/export" to="/export/index" />
					<Route path="/export/index" component={() => { return <ExportIndexRoute /> }} />
				</Switch>

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, charactersReducer }) {

	var route = "/export";

	return {
		appState: appStateReducer,
		route,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(ExportRoute))
