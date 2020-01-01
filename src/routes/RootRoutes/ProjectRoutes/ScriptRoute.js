import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import FileTree from '../../../components/FileTree';
import { ScriptNav } from '../../../components';
import ScriptLayout from './ScriptRoutes/LayoutRoute.js';
import ScriptStructureRoute from './ScriptRoutes/ScriptStructureRoute.js';
// import FileBrowserTextArea from '../../../components/Project/FileBrowserTextArea';


class ScriptRoute extends React.Component {

    constructor(props) {

		super(props);

        this.state = {
            selectedFile: null,
		};

		// props.history.push(props.route);
	}

	render() {

		return (

			<div id="ScriptRoute" style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>

				{/* {window.location.hash} -> {this.props.route} */}

				{/* <ScriptNav /> */}

				<Switch>
					<Redirect exact from="/script" to="/script/structure" />
					<Route path="/script/structure" component={() => { return <ScriptStructureRoute /> }} />
					<Route path="/script/layout" component={() => { return <ScriptLayout /> }} />
					<Route path="/script/files" component={() => {
						return <ScriptStructureRoute />
							// return <FileTree
							// 	directory={this.props.project.path}
							// 	onFileClick={this.onFileClick.bind(this)}
							// />
						}} />
				</Switch>
            </div>
        );
    }
}


function mapStateToProps({ appStateReducer, projectReducer }) {

	var route = "/script/" + (appStateReducer.route.script.current || 'structure');

	return {
		appState: appStateReducer,
		project: projectReducer,
		route,
    };
}

export default withRouter(connect(
    mapStateToProps,
    null
)(ScriptRoute))
