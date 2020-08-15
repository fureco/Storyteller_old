import React from 'react';
import { connect } from 'react-redux';

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
				<div key={active_characters[index].id}>
					{active_characters[index].first_name} {active_characters[index].last_name}
				</div>
			);
		});

		var deleted_characters = this.props.characters
			.filter((character) => {
				return character.deleted_at != null
			})
			.sort((a, b) => ('' + a.first_name).localeCompare(b.first_name));

		deleted_characters = deleted_characters.map((name, index) => {
				return ({
					label: <div key={deleted_characters[index].id}>
						{deleted_characters[index].first_name} {deleted_characters[index].last_name}
					</div>
				});
			});

		return (

			<div id="CharactersList" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

				<h2>All Characters</h2>

				{active_characters}

				<div>
					<Button
						id="OpenCreateCharacterDialogButton"
						minimal={true}
						icon="plus"
						text="Add a new character"
						// onClick={() => this.toggleEditMode()}
					/>
				</div>

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

export default connect(
	mapStateToProps,
	null
)(CharactersIndexRoute)
