import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import ChapterCreationDialog from "../../Chapters/ChapterCreationDialog";
import ScriptNavChapter from "./ScriptNavChapter.js";

import { setChapters, save, deleteChapter } from "../../../store/chapters/chapter.actions";

import {
	Alert,
	Intent,
	Toaster,
} from '@blueprintjs/core';

import './ScriptNavChapters.css';

class ScriptNavChapters extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
 			canEscapeKeyCancel: false,
			canOutsideClickCancel: false,
			moveToTrashAlertIsOpen: false,
			moveToTrashChapter: '',
		};
	}

	render() {

		return (

			<div id="Chapters">

				<DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{this.props.chapters.sort(this.sortByPosition).map((chapter, index) => (
									<ScriptNavChapter
										key={chapter.id}
										className={this.props.chaptersRouteIsActive && chapter.id == this.props.selectedChapter ? "is_selected" : ""}
										isSelected={this.props.chaptersRouteIsActive && chapter.id == this.props.selectedChapter}
										draggable
										draggableId={`chapter-${chapter.id}`}
										position={chapter.position}
										chapter={chapter}
										handleOpenMoveToTrashAlert={() => this.handleOpenMoveToTrashAlert(chapter)}
									/>
								))}

								{provided.placeholder}

							</div>
						)}
					</Droppable>
				</DragDropContext>

				<ChapterCreationDialog />

				<Alert
					className={this.props.appState.theme}
					cancelButtonText="Cancel"
					confirmButtonText="Move to Trash"
					icon="trash"
					intent={Intent.DANGER}
					isOpen={this.state.moveToTrashAlertIsOpen}
					onCancel={() => this.handleMoveToTrashCancel()}
					onConfirm={() => this.handleMoveToTrashConfirm(this.state.moveToTrashChapter)}>

					<p>
						Are you sure you want to move <b>Chapter {this.state.moveToTrashChapter.position}: {this.state.moveToTrashChapter.title}</b> to Trash?
					</p>
				</Alert>

				<Toaster ref={ref => (this.toaster = ref)} />

			</div>
		);
	}

	sortByPosition(a, b) {
		let comparison = 0;
		if (a.position > b.position) {
			comparison = 1;
		} else if (a.position < b.position) {
			comparison = -1;
		}
		return comparison;
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const reordered_elements = reorder(
			this.props.chapters,
			result.source.index,
			result.destination.index
		);

		this.props.setCharacters(reordered_elements);
	}

	handleOpenMoveToTrashAlert(chapter) {
		this.setState({ moveToTrashAlertIsOpen: true });
		this.setState({ moveToTrashChapter: chapter });
	}

	handleMoveToTrashConfirm(chapter) {
		this.setState({ moveToTrashAlertIsOpen: false });
		this.setState({ moveToTrashChapter: '' });

		this.toaster.show({
			intent: Intent.SUCCESS,
			className: this.props.appState.themeName,
			message: <TOAST_MESSAGE chapter={chapter} />
		});

		this.props.deleteChapter(chapter);
	}

	handleMoveToTrashCancel() {
		this.setState({ moveToTrashAlertIsOpen: false });
		this.setState({ moveToTrashChapter: '' });
	}
}

function TOAST_MESSAGE(props) {
	return <div><b>Chapter {props.chapter.position}: {props.chapter.title}</b> was moved to Trash.</div>
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex - 1, 1);
	result.splice(endIndex - 1, 0, removed);
	// renumber the positioning
	var position = 1;
	result.forEach(element => {
		element.position = position;
		position++;
	})
	return result;
};

function mapStateToProps({ appState, project, chapters }) {

	return {
		appState,

		project,

		chaptersRouteIsActive: project.route.script && project.route.script.current == 'chapters',

		selectedChapter: project.selectedChapter,

		chapters: chapters.filter((chapter) => {
			return chapter.deleted_at == null
		}),

		deleted_chapters: chapters.filter((chapter) => {
			return chapter.deleted_at != null
		})
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setChapters: chapters => dispatch(setChapters(chapters)),
		deleteChapter: chapter => dispatch(deleteChapter(chapter)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScriptNavChapters)
