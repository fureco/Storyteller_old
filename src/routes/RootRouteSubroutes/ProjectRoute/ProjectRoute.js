import React from 'react';
import { connect } from 'react-redux';

import {
	Colors,
} from '@blueprintjs/core';

import {
	Timeline,
	TopNavBar,
} from '../../../components';

import { getRoute } from '../../../store/project/project.selectors';
import { getBgColor } from '../../../store/appState/appState.selectors';

import { MoveToTrashAlert } from '../../../components';

import ProjectRouteContent from './ProjectRouteComponents/ProjectRouteContent';

export class ProjectRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			statistic: {
				words: 0,
				chars: 0,
			},
		};
	}

	render() {
		return (
			<div
				id="ProjectRoute"
				className={this.props.appState.theme}
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh'
				}}>

				<TopNavBar />

				<div
					id="path_to_open_project"
					style={{
						display: "flex",
						alignItems: "center",
						backgroundColor: this.props.bgColor,
						borderBottom: this.props.border,
						height: '50px',
						padding: 12,
					}}>
					{this.props.pathToOpenProject}
				</div>

				<div id="Main" style={{ display: 'flex', flexGrow: '1', padding: '10px', overflow: 'auto' }}>
					<div style={{
						display: 'flex',
						flexGrow: '1',
						justifyContent: "center",
						alignItems: "center"
					}}>
						<ProjectRouteContent />
					</div>
				</div>

				<div
					id="StatusBar"
					style={{
						backgroundColor: this.props.bgColor,
						borderTop: this.props.border,
						height: '50px',
						padding: 12,
					}}>
					{/* words: {this.state.statistic.words} - chars: {this.state.statistic.chars} */}
				</div>

				<MoveToTrashAlert />

			</div>
		);
	}
}

function mapStateToProps({ appState, project }) {
	return {
		appState,
		project,
		route: getRoute(project),
		border: `1px solid ${appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
		bgColor: getBgColor(appState, "dark"),
		pathToOpenProject: appState.path || 'No project selected.',
	};
}

export default connect(
	mapStateToProps,
	null
)(ProjectRoute)
