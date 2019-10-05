import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";

import { projectActions } from "../actions";

import Welcome from './WelcomeRoute';
import Project from './ProjectRoute';

const storage = require('electron-json-storage');

class Home extends React.Component {
  
    constructor(props) {
        super(props);

        storage.get('storyteller', function(error, data) {
            if (error) throw error;
            console.log("current_project: " + data.path);
            if(data.path) {
                props.openProject(data.path)
            }
        });
    }
  
    render() {

        let content;

        if(this.props.appState.path) {
            content = <Project project={this.props.project} />;
        }
        else {
            content = <Welcome/>;
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
    };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)
