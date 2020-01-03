import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect, Link } from "react-router-dom";

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';


class CharactersIndexRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		var characters = this.props.characters
			.filter((character) => {
				console.log(character.deleted_at)
				return character.deleted_at == null
			})
			.sort((a, b) => ('' + a.first_name).localeCompare(b.first_name))
			.map((name, index) => {
				return (
					<Link to={`/characters/${this.props.characters[index].id}`} key={this.props.characters[index].id}>
						{this.props.characters[index].first_name} {this.props.characters[index].last_name}
					</Link>
				);
			});

		return (

			<div id="CharactersList" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

				{characters}

				<Link to="/characters/create">
					<Button
						id="OpenCreateCharacterDialogButton"
						minimal={true}
						icon="plus"
						text="Add a new character"
						// onClick={() => this.toggleEditMode()}
					/>
				</Link>

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, charactersReducer }) {

	var route = "/characters/index";

	return {
		appState: appStateReducer,
		characters: charactersReducer,
		route,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(CharactersIndexRoute))
