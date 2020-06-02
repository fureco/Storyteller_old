import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { appStateActions, projectActions } from "../../../store/actions";

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
		this.props.changeCurrentScriptRoute(navbarTabId);
		this.props.save();
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

				<Tab id="cover">
					<Link to="/script/cover">Cover</Link>
				</Tab>
				<Tab id="title_author">
					<Link to="/script/title_author">Title &amp; Author</Link>
				</Tab>
				<Tab id="abstract">
					<Link to="/script/abstract">Abstract</Link>
				</Tab>
				<Tab id="dedication">
					<Link to="/script/dedication">Dedication</Link>
				</Tab>
				{/* <Tab id="parts">
					<Link to="/script/parts">Parts</Link>
				</Tab> */}
				<Tab id="chapters">
					<Link to="/script/chapters">Chapters</Link>
				</Tab>
{/* 				<Tab id="scenes">
					<Link to="/script/scenes">Scenes</Link>
				</Tab> */}

			</Tabs>
		);
	}
}

function mapStateToProps({ appStateReducer, project }) {
	return {
		appState: appStateReducer,
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
