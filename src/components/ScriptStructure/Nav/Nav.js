import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { appStateActions } from "../../../store/actions";

import {
	Tab,
	Tabs,
} from '@blueprintjs/core';

class Nav extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark

		};
	}

	handleTabChange(navbarTabId) {
		this.props.selectScriptStructureArea(navbarTabId);
		this.props.setRoute(window.location.hash);
		this.props.saveAppState();
	}

	render() {

		return (

			<Tabs
				id="ScriptStructureNav"
				className={this.state.themeName}
				onChange={this.handleTabChange.bind(this)}
				selectedTabId={this.props.appState.selectedScriptStructureArea}
				animate="true"
				vertical="true">

				<Tab id="abstract">
					<Link to="/script/structure/abstract">Abstract</Link>
				</Tab>
				<Tab id="dedication">
					<Link to="/script/structure/dedication">Dedication</Link>
				</Tab>
				<Tab id="parts">
					<Link to="/script/structure/parts">Parts</Link>
				</Tab>

			</Tabs>
		);
	}
}

function mapStateToProps({ appStateReducer, }) {
	return {
		appState: appStateReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		selectScriptStructureArea: (navbarTabId) => dispatch(appStateActions.selectScriptStructureArea(navbarTabId)),
		setRoute: (route) => dispatch(appStateActions.setRoute(route)),
		saveAppState: () => dispatch(appStateActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav)
