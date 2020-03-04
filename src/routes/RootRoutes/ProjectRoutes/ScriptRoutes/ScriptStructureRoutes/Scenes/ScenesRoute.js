import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import ScenesIndexRoute from './ScenesIndexRoute.js';
import ScenesCreateRoute from './ScenesCreateRoute.js';

class ScenesRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		return (
			<div>

				<div>Scenes: {window.location.hash} -> {this.props.route}</div>

				<Switch>
					<Redirect exact from="/script/structure/scenes" to="/script/structure/scenes/index" />
					<Route path="/script/structure/scenes/index" component={() => { return <ScenesIndexRoute /> }} />
					<Route path="/script/structure/scenes/create" component={() => { return <ScenesCreateRoute /> }} />
					<Route path="/script/structure/scenes/:id" children={(props) => <Scene {...props} />} />
				</Switch>
			</div>
		);
	}
}

function mapStateToProps({ appStateReducer, projectReducer }) {

	var route = "/script/structure/scenes/" + (appStateReducer.route.script.structure.scenes ? appStateReducer.route.script.structure.scenes.current : 'index');

	return {
		appState: appStateReducer,
		project: projectReducer,
		route,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(ScenesRoute))
