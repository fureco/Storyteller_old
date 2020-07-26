import React from 'react';
import { connect } from 'react-redux';

import PreviewIndexRoute from './PreviewIndexRoute.js';

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';


class PreviewRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			themeName: props.themeName || "bp3-body", // null || bp3-dark
		};
	}

	render() {

		return (

			<div id="PreviewRoute" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

{/* 				<Switch>
					<Redirect exact from="/preview" to="/preview/index" />
					<Route path="/preview/index" component={() => { return <PreviewIndexRoute /> }} />
				</Switch> */}

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, charactersReducer }) {

	var route = "/preview";

	return {
		appState: appStateReducer,
		route,
	};
}

export default connect(
	mapStateToProps,
	null
)(PreviewRoute)
