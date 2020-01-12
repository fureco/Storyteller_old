import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import SceneCreationDialog from "./SceneCreationDialog";

import { projectActions } from "../../../store/actions";

import {
	Button,
	ButtonGroup,
	Tree,
	Intent,
} from '@blueprintjs/core';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? "lightgreen" : "grey",

	// styles we need to apply on draggables
	...draggableStyle
});

class Scene extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			themeName: props.theme == "dark" ? "bp3-dark" : "bp3-body",

		};
	}

	render() {

		let treeContent = [];

		let children = [
			{
				id: 1,
				label: (<SceneCreationDialog />)
			},
		];

		let aScene =
		{
			id: treeContent.length,
			hasCaret: true,
			isExpanded: false,
			icon: "folder-close",
			label: <Link to={`/script/structure/scenes/${this.props.scene.position}`}>Scene {this.props.scene.position}: {this.props.scene.name}</Link>,
			secondaryLabel:
				<ButtonGroup>
					<Button minimal icon="edit" />
					<Button minimal icon="trash" onClick={() => this.handleOpenMovePartToTrashAlert()} />
					<Button minimal icon="drag-handle-vertical" />
				</ButtonGroup>,
			childNodes: children,
		};

		treeContent.push(aPart);

		return (

			<Draggable key={this.props.scene.id} draggableId={`part-${this.props.scene.id}`} index={this.props.scene.position}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className="Scene">
						<Tree contents={treeContent} />
					</div>
				)}
			</Draggable>
		);
	}

	handleOpenMoveToTrashAlert() {
		this.setState({ moveToTrashAlertIsOpen: true });
	}

	handleMoveToTrashConfirm() {
		this.setState({ moveToTrashAlertIsOpen: false });
		this.setState({ moveToTrash: '' });
		this.toaster.show({ intent: Intent.SUCCESS, className: this.state.themeName, message: <TOAST_MESSAGE scene={this.props.scene} /> });
		this.props.deletePart(this.state.moveToTrash.id);
	}

	handleMoveToTrashCancel() {
		this.setState({ moveToTrashAlertIsOpen: false });
		this.setState({ moveToTrashPart: '' });
	}
}

function TOAST_MESSAGE(props) {
	return <div><b>Part {props.scene.position}: {props.scene.title}</b> was moved to Trash.</div>
}

function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// deleteScene: sceneID => dispatch(projectActions.deleteScriptPartAction(partID)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Scene)
