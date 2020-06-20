import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import ChapterCreationDialog from "../Chapters/CreateDialog";

import { setSelectedChapter, save } from "./../../../store/reducers/project/project.actions.index";

import {
	Button,
	ButtonGroup,
	Tree,
	Intent,
} from '@blueprintjs/core';

import './Chapter.css';

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
				id: 0,
				label: (<ChapterCreationDialog />)
			},
		];

		let secondaryLabel = this.props.chapter.deleted_at != null && this.props.chapter.deleted_at != "" ?
			<ButtonGroup>
				<Button minimal icon="edit" />
			</ButtonGroup>

			: <ButtonGroup>
				{/* <Button minimal icon="edit" /> */}
				<Button minimal icon="trash" onClick={() => this.props.handleOpenMoveToTrashAlert()} />
				<Button minimal icon="drag-handle-vertical" />
			</ButtonGroup>;

		let aTreeNode =
		{
			id: this.props.chapter.id,
			key: this.props.chapter.id,
			className: `chapters-list-item-li ${this.props.className}`,
			hasCaret: false,
			isExpanded: false,
			label:
				<Button
					minimal
					className={`chapters-list-item-button ${this.props.className}`}
					icon={`${this.props.isSelected ? "chevron-right" : ""}`}
					onClick={() => this.handleClickOnChapter(this.props.chapter.id)}
				>
					{this.props.position}: {this.props.chapter.title}
				</Button>,
			secondaryLabel,
		};

		treeContent.push(aTreeNode);

		return (
			<Draggable key={this.props.key} draggableId={this.props.draggableId} index={this.props.chapter.position}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}>
						<Tree className="chapters-list-item" contents={treeContent} />
					</div>
				)}
			</Draggable>
		);
	}

	handleClickOnChapter(chapter_id) {
		this.props.setSelectedChapter(chapter_id);
		this.props.saveProject();
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
		setSelectedChapter: ID => dispatch(setSelectedChapter(ID)),
		deleteChapter: ID => dispatch(chapterActions.delete(ID)),
		saveProject: () => dispatch(save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chapter)
