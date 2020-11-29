import React from 'react';
import { connect } from 'react-redux';

import {
	Cover
} from './../../../../../components';

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';


class PreviewIndexRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		return (

			<div id="Preview" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

				<h2>Preview</h2>

				<Cover />

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer }) {

	var route = "/preview/index";

	return {
		appState: appStateReducer,
		route,
	};
}

export default connect(
	mapStateToProps,
	null
)(PreviewIndexRoute)
