import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import ChapterCreationDialog from "../../ChapterCreationDialog";

import { projectActions } from "../../../../store/actions";

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

class Part extends React.Component {

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
				label: (<ChapterCreationDialog />)
			},
		];

		let aPart =
		{
			id: treeContent.length,
			hasCaret: true,
			isExpanded: false,
			icon: "folder-close",
			label: <div>
				<Link to={`/script/structure/parts/${this.props.part.position}`}>Part {this.props.part.position}: {this.props.part.title}</Link>
				<ButtonGroup>
					<Button minimal icon="edit" />
					<Button minimal icon="drag-handle-vertical" />
				</ButtonGroup>
			</div>,
			childNodes: children,
		};

		treeContent.push(aPart);

		// let popoverContent = (
		// 	<ButtonGroup vertical alignText={Alignment.LEFT}>
		// 		<Button icon="add-row-top">Create part before</Button>
		// 		<Button icon="add-row-bottom">Create part after</Button>
		// 		<Button icon="trash"
		// 			onClick={() => this.handleMovePartToTrashOpen(part)}>
		// 			Move to trash
		// 		</Button>
		// 	</ButtonGroup>
		// );

		return (

			<Draggable key={this.props.part.id} draggableId={`part-${this.props.part.id}`} index={this.props.part.position}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className="Part">
						<Tree contents={treeContent} />
					</div>
				)}
			</Draggable>
		);
	}

	handleMovePartToTrashOpen(part) {
		this.setState({ movePartToTrashIsOpen: true });
		this.setState({ movePartToTrashPart: part });
	}

	handleMovePartToTrashConfirm() {
		this.setState({ movePartToTrashIsOpen: false });
		this.setState({ movePartToTrashPart: '' });
		this.toaster.show({ intent: Intent.SUCCESS, className: this.state.themeName, message: <TOAST_MESSAGE part={this.props.part} /> });
		this.props.deletePart(this.state.movePartToTrashPart.id);
	}

	handleMovePartToTrashCancel() {
		this.setState({ movePartToTrashIsOpen: false });
		this.setState({ movePartToTrashPart: '' });
	}
}

function TOAST_MESSAGE(props) {
	return <div><b>Part {props.part.position}: {props.part.title}</b> was moved to Trash.</div>
}

function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		deletePart: partID => dispatch(projectActions.deleteScriptPartAction(partID)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Part)
