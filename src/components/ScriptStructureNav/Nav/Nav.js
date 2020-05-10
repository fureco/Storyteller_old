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
			vertical: props.vertical || false,
		};
	}

	handleTabChange(navbarTabId) {
		this.props.changeCurrentScriptStructureRoute(navbarTabId);
		this.props.saveAppState();
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

function mapStateToProps({ appStateReducer, }) {
	return {
		appState: appStateReducer,
		selectedTabId: appStateReducer.route.script.structure ? appStateReducer.route.script.structure.current : 'abstract'
	};
}

function mapDispatchToProps(dispatch) {
	return {
		changeCurrentScriptStructureRoute: (navbarTabId) => dispatch(appStateActions.changeCurrentScriptStructureRoute(navbarTabId)),
		saveAppState: () => dispatch(appStateActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav)
