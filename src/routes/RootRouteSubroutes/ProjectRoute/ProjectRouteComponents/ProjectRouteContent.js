import React from 'react';
import { connect } from 'react-redux';

import { getRoute } from './../../../../store/project/project.selectors';

import Workspace from './../../../../components/Workspace/Workspace';
import ScriptRoute from './../ProjectRouteSubroutes/ScriptRoute/ScriptRoute';
import CharactersRoute from './../ProjectRouteSubroutes/CharactersRoutes/CharactersRoute';
import PreviewRoute from '../ProjectRouteSubroutes/PreviewRoute/PreviewRoute';

import {
	Timeline,
} from './../../../../components';

export class ProjectRouteContent extends React.Component {

	constructor(props) {

		super(props);
	}

	render() {
		return (
			<Content
				id="ProjectRouteContent"
				appState={this.props.appState}
				project={this.props.project} />
		);
	}
}

function Content(props) {

	if (!props.project) return null;

	switch (props.project.route.current) {

		case 'workspace':
			return <Workspace />

		case 'script':
			return <ScriptRoute path_to_project={props.appState.path} />

		case 'characters':
			return <CharactersRoute path_to_project={props.appState.path} />

		case 'locations':
			return <h2>Locations</h2>

		case 'timeline':
			return <Timeline />

		case 'preview':
			return <PreviewRoute />

		default:
			return <ScriptRoute path_to_project={props.appState.path} />;
	}
}

function mapStateToProps({ appState, project }) {
	return {
		appState,
		project,
		route: getRoute(project),
	};
}

export default connect(
	mapStateToProps,
	null
)(ProjectRouteContent)
