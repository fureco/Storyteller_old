import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";

import storage from 'electron-json-storage';

import { appStateActions, projectActions } from "../store/actions";

import Welcome from './RootRoutes/WelcomeRoute';
import ProjectRoute from './RootRoutes/ProjectRoute';

class Root extends React.Component {

	constructor(props) {

		super(props);

		console.log("locale storage directory: " + storage.getDefaultDataPath());

        storage.get('storyteller', function(error, data) {
            if (error) throw error;
            console.log("current_project: " + data.path);
            if(data.path) {
				props.openProject(data.path);
			}
			console.log("theme: " + data.theme);
			if (data.theme) {
				props.setTheme(data.theme);
            }
        });
    }

    render() {

        let content;

        if(this.props.appState.path) {
			content = <ProjectRoute project={this.props.project} />;
        }
        else {
			content = <Welcome />;
        }

        return (
			<Router>
				<div id="Layout" style={styles.container}>
					{content}
				</div>
            </Router>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
    }
}

function mapStateToProps ({ appStateReducer, projectReducer }) {
    return {
        appState: appStateReducer,
        project: projectReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
		openProject: (filePath) => { dispatch(projectActions.openProjectAction(filePath)) },
		setTheme: (theme) => dispatch(appStateActions.setTheme(theme)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root)
