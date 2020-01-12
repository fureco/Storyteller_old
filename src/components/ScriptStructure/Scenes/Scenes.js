import React from 'react';
import { connect } from 'react-redux';
import { scenesActions } from "../../../store/actions";
import Scene from "./Scene";
import SceneCreationDialog from "./SceneCreationDialog";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

class Scenes extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
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

			<div id="ScriptStructureScenes">

				<DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{this.props.scenes.map((scene, index) => (
									<Scene key={`scene-${scene.id}`} scene={scene} />
								))}

								{provided.placeholder}

							</div>
						)}
					</Droppable>
				</DragDropContext>

				<SceneCreationDialog />

				<Alert
					className={this.props.appState.theme}
					cancelButtonText="Cancel"
					confirmButtonText="Move to Trash"
					icon="trash"
					intent={Intent.DANGER}
					isOpen={this.state.movePartToTrashIsOpen}
					onCancel={() => this.handleMovePartToTrashCancel()}
					onConfirm={() => this.handleMovePartToTrashConfirm()}
				>
					<p>
						Are you sure you want to move <b>Scene {this.state.movePartToTrashPart.position}: {this.state.movePartToTrashPart.title}</b> to Trash?
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

function mapStateToProps({ appStateReducer, scenesReducer }) {
	return {
		appState: appStateReducer,
		scenes: scenesReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Scenes)
