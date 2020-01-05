import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect, Link } from "react-router-dom";

import Trash from '../../../../components/Trash/Trash.index.js'

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

		var active_characters = this.props.characters
			.filter((character) => {
				return character.deleted_at == null
			})
			.sort((a, b) => ('' + a.first_name).localeCompare(b.first_name));

		active_characters = active_characters.map((name, index) => {
			return (
				<Link to={`/characters/${active_characters[index].id}`} key={active_characters[index].id}>
					{active_characters[index].first_name} {active_characters[index].last_name}
				</Link>
			);
		});

		var deleted_characters = this.props.characters
			.filter((character) => {
				return character.deleted_at != null
			})
			.sort((a, b) => ('' + a.first_name).localeCompare(b.first_name));

		deleted_characters = deleted_characters.map((name, index) => {
				return ({
					label: <Link to={`/characters/${deleted_characters[index].id}`} key={deleted_characters[index].id}>
						{deleted_characters[index].first_name} {deleted_characters[index].last_name}
					</Link>
				});
			});

		return (

			<div id="CharactersList" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

				{active_characters}

				<Link to="/characters/create">
					<Button
						id="OpenCreateCharacterDialogButton"
						minimal={true}
						icon="plus"
						text="Add a new character"
						// onClick={() => this.toggleEditMode()}
					/>
				</Link>

				<Trash content={deleted_characters} />

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
