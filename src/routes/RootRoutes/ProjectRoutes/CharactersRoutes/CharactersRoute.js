import React from 'react';
import { connect } from 'react-redux';

import CharactersIndexRoute from './CharactersIndexRoute.js';
import CharactersCreateRoute from './CharactersCreateRoute.js';

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';

import {
	Character
} from '../../../../components';


class CharactersRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			themeName: props.themeName || "bp3-body", // null || bp3-dark
		};
	}

	render() {

		return (

			<div id="CharactersRoute" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

{/* 				<Switch>
					<Redirect exact from="/characters" to="/characters/index" />
					<Route path="/characters/index" component={() => { return <CharactersIndexRoute /> }} />
					<Route path="/characters/create" component={() => { return <CharactersCreateRoute /> }} />
					<Route path="/characters/:id" children={(props) => <Character {...props} />} />
				</Switch> */}

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, charactersReducer }) {

	var route = "/characters";

	return {
		appState: appStateReducer,
		characters: charactersReducer,
		route,
	};
}

export default connect(
	mapStateToProps,
	null
)(CharactersRoute)
