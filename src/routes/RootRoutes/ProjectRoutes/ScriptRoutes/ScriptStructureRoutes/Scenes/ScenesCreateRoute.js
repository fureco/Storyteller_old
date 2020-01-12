import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Route, withRouter, Switch, Redirect, Link } from "react-router-dom";

import { scenesActions } from "../../../../../../store/actions";

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';

class ScenesCreateRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			scene: {
				title: '',
			}
		};
	}

	save() {
		this.props.createScene(this.state.scene);
		this.props.saveToFile();
		this.props.history.push("/script/structure/scenes/index");
	}

	render() {

		return (

			<div id="SceneCreation" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* <div>{window.location.hash} -> {this.props.route}</div> */}

				<h2>
					<Link to={`/scenes/index`}>All Scenes</Link> / Create
				</h2>

				<div>{this.state.scene.title}</div>

				<div className="row">
					<InputGroup
						id="Title"
						ref={(input) => { this.ScriptPartCreationInputGroup = input; }}
						placeholder="title"
						autoFocus={true}
						onChange={(event) => this.setState({ scene: { ...this.state.scene, title: event.target.value } })}
					/>
				</div>

				<ButtonGroup>
					<Button
						id="SceneCreationSaveButton"
						minimal={false}
						icon="floppy-disk"
						disabled={!this.state.scene.title.length}
						onClick={() => this.save()}
					/>
					<Link to="/scenes/index">
						<Button
							id="CloseSceneCreationButton"
							minimal={false}
							icon="small-cross"
						/>
					</Link>
				</ButtonGroup>

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, projectReducer, scenesReducer }) {

	var route = "/scenes/create";

	return {
		appState: appStateReducer,
		project: projectReducer,
		scenes: scenesReducer,
		route,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createScene: (scene) => dispatch(sceneActions.addScene(scene)),
		saveToFile: () => dispatch(scenesActions.save()),
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ScenesCreateRoute))
