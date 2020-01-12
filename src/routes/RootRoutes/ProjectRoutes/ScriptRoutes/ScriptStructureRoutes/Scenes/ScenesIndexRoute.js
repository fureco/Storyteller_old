import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect, Link } from "react-router-dom";

import Trash from '../../../../../../components/Trash/Trash.index.js'

import {
	Button,
	ButtonGroup,
	InputGroup,
} from '@blueprintjs/core';


class ScenesIndexRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		var active_scenes = this.props.scenes
			.filter((scene) => {
				return scene.deleted_at == null
			})
			.sort((a, b) => ('' + a.position).localeCompare(b.position));

		active_scenes = active_scenes.map((title, index) => {
			return (
				<Link to={`/scenes/${active_scenes[index].id}`} key={active_scenes[index].id}>
					{active_scenes[index].title}
				</Link>
			);
		});

		var deleted_scenes = this.props.scenes
			.filter((scene) => {
				return scene.deleted_at != null
			})
			.sort((a, b) => ('' + a.title).localeCompare(b.title));

		deleted_scenes = deleted_scenes.map((title, index) => {
			return ({
				label: <Link to={`/scenes/${deleted_scenes[index].id}`} key={deleted_scenes[index].id}>
					{deleted_scenes[index].title}
				</Link>
			});
		});

		return (

			<div id="ScenesList" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

				<h2>All Scenes</h2>

				{active_scenes}

				<Link to="/script/structure/scenes/create">
					<Button
						id="OpenCreateSceneDialogButton"
						minimal={true}
						icon="plus"
						text="Add a new scene"
					// onClick={() => this.toggleEditMode()}
					/>
				</Link>

				<Trash content={deleted_scenes} />

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer, scenesReducer }) {
	return {
		appState: appStateReducer,
		scenes: scenesReducer,
	};
}

export default withRouter(connect(
	mapStateToProps,
	null
)(ScenesIndexRoute))
