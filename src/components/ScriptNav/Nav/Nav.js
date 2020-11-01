import React from 'react';
import { connect } from 'react-redux';
import { appStateActions } from "../../../store/actions";
import * as projectActions from "../../../store/project/project.actions";

import {
	Tab,
	Tabs,
} from '@blueprintjs/core';

class Nav extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			vertical: props.vertical || false,
		};
	}

	handleTabChange(navbarTabId) {
		if (navbarTabId != this.props.project.route.script.current) {
			this.props.changeCurrentScriptRoute(navbarTabId);
			this.props.save();
		}
		else {
			console.log("The current route already is " + navbarTabId)
		}
	}

	render() {

		return (

			<Tabs
				id="ScriptStructureNav"
				className={this.props.appState.theme}
				onChange={this.handleTabChange.bind(this)}
				selectedTabId={this.props.selectedTabId}
				animate="true"
				vertical={this.state.vertical}>

				<Tab id="cover">Cover</Tab>
				<Tab id="title_author">Title &amp; Author</Tab>
				<Tab id="abstract">Abstract</Tab>
				<Tab id="dedication">Dedication</Tab>
				{/* <Tab id="parts">>Parts</Tab> */}
				<Tab id="chapters">Chapters</Tab>
				{/* <Tab id="scenes">Scenes</Tab> */}

			</Tabs>
		);
	}
}

function mapStateToProps({ appStateReducer, project }) {
	return {
		appState: appStateReducer,
		project,
		selectedTabId: project.route.script ? project.route.script.current : 'abstract'
	};
}

function mapDispatchToProps(dispatch) {
	return {
		changeCurrentScriptRoute: (navbarTabId) => dispatch(projectActions.changeCurrentScriptRoute(navbarTabId)),
		save: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav)
