import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from "./../store/actions";

import {
    Button,
} from '@blueprintjs/core';

import { remote } from 'electron';

const dialog = remote.dialog;

class Welcome extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div id="Welcome" style={styles.container}>

                <div className="app_name" style={styles.app_name}>
                    Storyteller
                </div>

                <Button
                    minimal={false}
                    icon="folder-open"
                    text="Open project"
                    onClick={() => {
						dialog.showOpenDialog({ properties: ['openDirectory'] }, (result) => {
							if (result) {
								this.props.openProject(result[0])
							}
						});
                    }}
                />
                <Button
                    minimal={false}
                    icon="folder-new"
                    text="Create new project"
					onClick={() => {
						dialog.showOpenDialog({ properties: ['openDirectory'] }, (result) => {
							if (result) {
								this.props.createProject(result[0])
							}
						});
                    }}
                />

            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '10em',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    app_name: {
        fontSize: '2em'
    }
}


function mapStateToProps({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openProject: (filePath) => dispatch(projectActions.openProjectAction(filePath)),
        createProject: (filePath) => dispatch(projectActions.createProjectAction(filePath)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Welcome)
