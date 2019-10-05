import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from "../actions";

import {
    Button,
} from '@blueprintjs/core';

const { dialog } = require('electron').remote;

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
                        var result = dialog.showOpenDialog({ properties: ['openDirectory'] });
                        if (result) {
                            this.props.openProject(result[0])
                        }
                    }}
                />
                <Button
                    minimal={false}
                    icon="folder-new"
                    text="Create new project"
                    onClick={() => {
                        var result = dialog.showOpenDialog({ properties: ['openDirectory'] });
                        if (result) {
                            this.props.createProject(result[0], JSON.stringify(this.props.project))
                        }
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
        createProject: (filePath, data) => dispatch(projectActions.createProjectAction(filePath, data)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Welcome)
