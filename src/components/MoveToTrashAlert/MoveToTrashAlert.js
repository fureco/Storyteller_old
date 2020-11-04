import React from 'react';
import { connect } from 'react-redux';

import * as appStateActions from "./../../store/appState/appState.actions";
import { scenesActions } from "./../../store/actions";

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

function mapStateToProps({ appState }) {

	return {
		type: appState.object_to_delete ? appState.object_to_delete.type : "",
		id: appState.object_to_delete ? appState.object_to_delete.id : 0,
		position: appState.object_to_delete ? appState.object_to_delete.position : 0,
		title: appState.object_to_delete ? appState.object_to_delete.title : "",
		appState
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
