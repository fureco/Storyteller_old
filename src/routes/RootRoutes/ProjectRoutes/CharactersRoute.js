import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import CharactersIndexRoute from './CharactersRoutes/CharactersIndexRoute.js';
import CharactersCreateRoute from './CharactersRoutes/CharactersCreateRoute.js';

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';


class CharactersRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}



	render() {

		return (

			<div id="CharactersRoute" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

				<h2>Characters</h2>

				<div>
					<Switch>
						<Redirect exact from="/characters" to="/characters/index" />
						<Route path="/characters/index" component={() => { return <CharactersIndexRoute /> }} />
						<Route path="/characters/create" component={() => { return <CharactersCreateRoute /> }} />
					</Switch>
				</div>

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, projectReducer }) {

	var route = "/characters";

	return {
		appState: appStateReducer,
		project: projectReducer,
		route,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(CharactersRoute))
