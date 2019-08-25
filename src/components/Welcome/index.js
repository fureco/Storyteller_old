import React from 'react';
import { connect } from 'react-redux';
import { createProjectAction, openProjectAction } from "../../reducers/projectReducer";

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

                <div className="app_name">Storyteller</div>

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
                            this.props.createProject(result[0])
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
        flexGrow: '1',
        justifyContent: 'center',
        alignItems: 'center'
    }
}


function mapStateToProps({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openProject: (filePath) => dispatch(openProjectAction(filePath)),
        createProject: (filePath) => dispatch(createProjectAction(filePath)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Welcome)