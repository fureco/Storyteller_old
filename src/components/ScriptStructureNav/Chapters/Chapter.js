import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import ChapterCreationDialog from "../Chapters/CreateDialog";

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

class Chapter extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			draggable: props.draggable,
			canEscapeKeyCancel: false,
			canOutsideClickCancel: false,
			moveToTrashIsOpen: false,
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

		let secondaryLabel = this.props.chapter.deleted_at != null && this.props.chapter.deleted_at != "" ?
			<ButtonGroup>
				<Button minimal icon="edit" />
			</ButtonGroup>

			: <ButtonGroup>
				<Button minimal icon="edit" />
				<Button minimal icon="trash" onClick={() => this.props.handleOpenMoveToTrashAlert()} />
				<Button minimal icon="drag-handle-vertical" />
			</ButtonGroup>;

		let aTreeNode =
		{
			id: treeContent.length,
			hasCaret: false,
			isExpanded: false,
			icon: "document",
			label: <Link to={`/script/structure/chapters/${this.props.chapter.id}`}>Chapter {this.props.position}: {this.props.chapter.title}</Link>,
			secondaryLabel,
			childNodes: children,
		};

		treeContent.push(aTreeNode);

		let content = this.props.draggable ?

			<Draggable key={this.props.key} draggableId={this.props.draggableId} index={this.props.chapter.position}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}>
						<Tree contents={treeContent} />
					</div>
				)}
			</Draggable>

			: <Tree contents={treeContent} />;

		return (
			content
		);
	}
}

function mapStateToProps({ appStateReducer, project }) {
	return {
		appState: appStateReducer,
		project
	};
}

function mapDispatchToProps(dispatch) {
	return {
		deleteChapter: ID => dispatch(chapterActions.delete(ID)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chapter)
