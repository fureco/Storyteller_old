import React from 'react';
import { connect } from 'react-redux';

import { appStateActions, scenesActions } from "./../../store/actions";

import {
	Alert,
	Intent,
	Toaster,
} from '@blueprintjs/core';

class MoveToTrashAlert extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			canEscapeKeyCancel: false,
			canOutsideClickCancel: false,
		};
	}

	render() {

		return (

			<div id="MoveToTrashAlert">

				<Alert
					className={this.props.appState.theme}
					cancelButtonText="Cancel"
					confirmButtonText="Move to Trash"
					icon="trash"
					intent={Intent.DANGER}
					isOpen={this.props.appState.showMoveToTrashAlert}
					onCancel={() => this.handleCancel()}
					onConfirm={() => this.handleConfirm()}
				>
					<p>
						Are you sure you want to move <b>{this.props.type} {this.props.position}: {this.props.title}</b> to Trash?
					</p>
				</Alert>

				<Toaster ref={ref => (this.toaster = ref)} />

			</div>
		);
	}

	handleConfirm() {

		if(this.props.type === "Scene") this.props.deleteScene(this.props.id);

		this.toaster.show({
			intent: Intent.SUCCESS,
			className: this.props.appState.theme,
			message: <TOAST_MESSAGE type={this.props.type} position={this.props.position} title={this.props.title} />
		});

		this.props.hideMoveToTrashAlert();
	}

	handleCancel() {
		this.props.hideMoveToTrashAlert();
	}
}

function TOAST_MESSAGE(props) {
	return <div><b>{props.type} {props.position}: {props.title}</b> was moved to Trash.</div>
}

function mapStateToProps({ appStateReducer, }) {

	return {
		type: appStateReducer.object_to_delete ? appStateReducer.object_to_delete.type : "",
		id: appStateReducer.object_to_delete ? appStateReducer.object_to_delete.id : 0,
		position: appStateReducer.object_to_delete ? appStateReducer.object_to_delete.position : 0,
		title: appStateReducer.object_to_delete ? appStateReducer.object_to_delete.title : "",
		appState: appStateReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		hideMoveToTrashAlert: () => dispatch(appStateActions.hideMoveToTrashAlert()),
		deleteScene: sceneID => dispatch(scenesActions.deleteSceneAction(sceneID)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MoveToTrashAlert)
