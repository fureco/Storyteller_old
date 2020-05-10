import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

/* import Chapter from "./Chapter"; */
import CreateDialog from "./CreateDialog";
import Chapter from "./Chapter.js";

import { setChapters, save, deleteChapter } from "../../../store/reducers/chapters/chapter.actions.index";

import {
	Alert,
	Intent,
	Toaster,
} from '@blueprintjs/core';

import './Chapters.css';

class Chapters extends React.Component {

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
								{this.props.chapters.map((chapter, index) => (
									<Chapter
										key={chapter.id}
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

				<CreateDialog />

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
		this.props.save();
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
		this.props.save();
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

function mapStateToProps({ appStateReducer, project, chapters }) {

	return {
		appState: appStateReducer,

		project,

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
		save: () => dispatch(save()),
		deleteChapter: chapter => dispatch(deleteChapter(chapter)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chapters)
