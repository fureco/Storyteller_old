import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { appStateActions } from "../../store/actions";

import {
	Tab,
	Tabs,
} from '@blueprintjs/core';

class ScriptRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	handleTabChange(navbarTabId) {
		this.props.selectScriptArea(navbarTabId);
		this.props.saveAppState();
	}

	render() {

		return (
			<Tabs id="ScriptNav" onChange={this.handleTabChange.bind(this)} selectedTabId={this.props.appState.selectedScriptArea} animate="true" >
				<Tab id="structure">
					<Link to="/script/structure">Structure</Link>
				</Tab>
				<Tab id="layout">
					<Link to="/script/layout">Layout</Link>
				</Tab>
				<Tab id="files">
					<Link to="/script/files">File Browser</Link>
				</Tab>
			</Tabs>
		);
	}
}


function mapStateToProps({ appStateReducer, projectReducer }) {
	return {
		appState: appStateReducer,
		project: projectReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		selectScriptArea: (navbarTabId) => dispatch(appStateActions.selectScriptArea(navbarTabId)),
		saveAppState: () => dispatch(appStateActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(ScriptRoute))
