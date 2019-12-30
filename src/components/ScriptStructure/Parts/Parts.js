import React from 'react';
import { connect } from 'react-redux';
import Part from "./Part/Part";
import ScriptPartCreationDialog from "../ScriptPartCreationDialog";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { projectActions } from "../../../store/actions";

import {
	Alert,
	Intent,
	Toaster,
} from '@blueprintjs/core';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex-1, 1);
	result.splice(endIndex-1, 0, removed);
	return result;
};

class Parts extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark

			showPartCreationDialog: false,

			canEscapeKeyCancel: false,
			canOutsideClickCancel: false,
			movePartToTrashIsOpen: false,
			movePartToTrashPart: '',
		};
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const reordered_parts = reorder(
			this.props.project.parts,
			result.source.index,
			result.destination.index
		);

		this.props.setParts(reordered_parts);
	}

	render() {

		return (

			<div id="ScriptStructureParts">

				<DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{this.props.project.parts.map((part, index) => (
									<Part key={`part-${part.id}`} part={part} />
								))}

								{provided.placeholder}

							</div>
						)}
					</Droppable>
				</DragDropContext>

				<ScriptPartCreationDialog />

				<Alert
					className={this.state.themeName}
					cancelButtonText="Cancel"
					confirmButtonText="Move to Trash"
					icon="trash"
					intent={Intent.DANGER}
					isOpen={this.state.movePartToTrashIsOpen}
					onCancel={() => this.handleMovePartToTrashCancel()}
					onConfirm={() => this.handleMovePartToTrashConfirm()}
				>
					<p>
						Are you sure you want to move <b>Part {this.state.movePartToTrashPart.position}: {this.state.movePartToTrashPart.name}</b> to Trash?
					</p>
				</Alert>

				<Toaster ref={ref => (this.toaster = ref)} />

			</div>
		);
	}

	// handleNodeMouseEnter(nodeData) {
	// 	this.setState({ hoveredPartID: nodeData.id });
	// 	console.log(this.state.hoveredPartID)
	// }

	// handleNodeMouseLeave(nodeData) {
	// 	this.setState({ hoveredPartID: null });
	// 	console.log(this.state.hoveredPartID)
	// }
}

function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setParts: parts => dispatch(projectActions.setParts(parts)),
		deletePart: partID => dispatch(projectActions.deleteScriptPartAction(partID)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Parts)
