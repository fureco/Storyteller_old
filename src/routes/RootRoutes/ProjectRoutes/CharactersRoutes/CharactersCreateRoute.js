import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Route, withRouter, Switch, Redirect, Link } from "react-router-dom";

import { charactersActions } from "../../../../store/actions";

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';

import charactersReducer from '../../../../store/reducers/charactersReducer';

class CharactersCreateRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			character: {
				first_name: '',
				last_name: '',
				nickname: ''
			}
		};
	}

	full_name() {

		var full_name = this.state.character.first_name +
			(this.state.character.last_name.length > 0 ?
				" " : "") + this.state.character.last_name;

		// console.log(this.state.first_name, full_name);

		return full_name;
	}

	save() {
		this.props.createCharacter(this.state.character);
		this.props.saveToFile();
		this.props.history.push("/characters/index");
	}

	render() {

		return (

			<div id="CharacterCreation" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				<div>{window.location.hash} -> {this.props.route}</div>

				<div>{this.full_name()}</div>

				<div className="row">
					<InputGroup
						id="FirstName"
						ref={(input) => { this.ScriptPartCreationInputGroup = input; }}
						placeholder="first name"
						autoFocus={true}
						onChange={(event) => this.setState({ character: { ...this.state.character, first_name: event.target.value } })}
					/>

					<InputGroup
						id="LastName"
						ref={(input) => { this.ScriptPartCreationInputGroup = input; }}
						placeholder="last name"
						onChange={(event) => this.setState({ character: { ...this.state.character, last_name: event.target.value } })}
					/>

					<InputGroup
						id="NickName"
						ref={(input) => { this.ScriptPartCreationInputGroup = input; }}
						placeholder="nickname"
						onChange={(event) => this.setState({ character: { ...this.state.character, nickname: event.target.value } })}
					/>
				</div>

				<ButtonGroup>
					<Button
						id="CharacterCreationSaveButton"
						minimal={false}
						icon="floppy-disk"
						disabled={!this.full_name().length}
						onClick={() => this.save()}
					/>
					<Link to="/characters/index">
						<Button
							id="CloseCharacterCreationButton"
							minimal={false}
							icon="small-cross"
						/>
					</Link>
				</ButtonGroup>

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, projectReducer, charactersReducer }) {

	var route = "/characters/create";

	return {
		appState: appStateReducer,
		project: projectReducer,
		characters: charactersReducer,
		route,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createCharacter: (character) => dispatch(charactersActions.addCharacter(character)),
		saveToFile: () => dispatch(charactersActions.save()),
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(CharactersCreateRoute))
