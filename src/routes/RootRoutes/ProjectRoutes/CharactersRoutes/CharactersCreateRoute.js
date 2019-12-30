import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect, Link } from "react-router-dom";

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';


class CharactersCreateRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			first_name: '',
			last_name: ''
		};
	}

	full_name() {
		this.state.first_name.length > 0 ?
			this.state.first_name.length + " " + this.state.last_name
			: this.state.last_name
	}

	render() {

		return (

			<div id="CharacterCreation" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{window.location.hash} -> {this.props.route}

				<div className="row">
					<InputGroup
						id="FirstName"
						ref={(input) => { this.ScriptPartCreationInputGroup = input; }}
						placeholder="first name"
						autoFocus={true}
						onChange={(event) => this.setState({ partName: event.target.value })}
					/>

					<InputGroup
						id="LastName"
						ref={(input) => { this.ScriptPartCreationInputGroup = input; }}
						placeholder="last name"
						onChange={(event) => this.setState({ partName: event.target.value })}
					/>

					<InputGroup
						id="NickName"
						ref={(input) => { this.ScriptPartCreationInputGroup = input; }}
						placeholder="nickname"
						onChange={(event) => this.setState({ partName: event.target.value })}
					/>
				</div>

				<ButtonGroup>
					<Button
						id="CharacterCreationSaveButton"
						minimal={false}
						icon="floppy-disk"
						disabled={!this.full_name.length}
						onClick={() => this.createCharacter(this.state.partName, this.props.position)}
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


function mapStateToProps({ appStateReducer, projectReducer }) {

	var route = "/characters/create";

	return {
		appState: appStateReducer,
		project: projectReducer,
		route,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(CharactersCreateRoute))
