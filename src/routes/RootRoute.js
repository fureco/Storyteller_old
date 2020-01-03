import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from "react-router-dom";

import storage from 'electron-json-storage';

import { appStateActions, projectActions, charactersActions } from "../store/actions";

import Welcome from './RootRoutes/WelcomeRoute';
import ProjectRoute from './RootRoutes/ProjectRoute';

class Root extends React.Component {

	constructor(props) {

		super(props);

		console.log("locale storage directory: " + storage.getDefaultDataPath());

		storage.get('storyteller', function (error, data) {

			if (error) throw error;

			console.log("theme: " + data.theme);

			if (data.theme) {
				props.setTheme(data.theme);
			}

			console.log("current_project: " + data.path);

            if(data.path) {
				props.openProject(data.path);
				props.loadCharacters(data.path);
			}
        });
    }

    render() {

        let content;

		if (this.props.appState.path) {
			content = <Route path="/" component={() => {
				return <ProjectRoute project={this.props.project} />
			}} />
        }
        else {
			content = <Route path="/welcome" component={() => {
				return <Welcome />
			}} />
        }

        return (
			<Router>
				<div style={styles.container}>
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

function mapStateToProps({ appStateReducer, projectReducer, charactersReducer }) {
    return {
        appState: appStateReducer,
		project: projectReducer,
		characters: charactersReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
		openProject: (filePath) => { dispatch(projectActions.openProjectAction(filePath)) },
		loadCharacters: (filePath) => { dispatch(charactersActions.load(filePath)) },
		setTheme: (theme) => dispatch(appStateActions.setTheme(theme)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root)
