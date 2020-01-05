import React from 'react';
import { connect } from 'react-redux';
import { charactersActions } from "../../store/actions";

import {
	Alert,
	Button,
	ButtonGroup,
	InputGroup,
	Intent,
} from '@blueprintjs/core';

export class Character extends React.Component {

	constructor(props) {

		super(props);

		// console.log(props.characters, props.match.params.id, props.character)

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark
			moveToTrashIsOpen: false,

			first_name: (props.character ? props.character.first_name : ""),
			last_name: (props.character ? props.character.last_name : ""),
		};
	}

	render() {

		return (
			<div id="Character">
				<h3>{this.state.first_name} {this.state.last_name}</h3>

				<Button
					id="DeleteCharacter"
					minimal={true}
					icon="trash"
					text="Delete"
					onClick={() => this.handleMoveToTrashOpen()}
				/>

				<Alert
					className={this.props.appState.theme}
					cancelButtonText="Cancel"
					confirmButtonText="Move to Trash"
					icon="trash"
					intent={Intent.DANGER}
					isOpen={this.state.moveToTrashIsOpen}
					onCancel={() => this.handleMoveToTrashCancel()}
					onConfirm={() => this.handleMoveToTrashConfirm()}
				>
					<p>
						Are you sure you want to move the character <b>{this.state.first_name} {this.state.last_name}</b> to Trash?
					</p>
				</Alert>
			</div>
		);
	}

	handleMoveToTrashOpen() {
		this.setState({ "moveToTrashIsOpen": true})
	}

	handleMoveToTrashCancel() {
		this.setState({ "moveToTrashIsOpen": false })
	}

	handleMoveToTrashConfirm() {
		this.props.setDeletedAt(this.props.character, Date());
		this.props.saveToFile();
		this.props.history.push("/characters/index");
	}
}

function mapStateToProps({ appStateReducer, charactersReducer }, ownProps) {

	var character = charactersReducer.find((characterInArray) => { return characterInArray.id == ownProps.match.params.id; });

	return {
		appState: appStateReducer,
		characters: charactersReducer,
		character
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setDeletedAt: (character, deleted_at) => dispatch(charactersActions.setDeletedAt(character, deleted_at)),
		saveToFile: () => dispatch(charactersActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Character)
