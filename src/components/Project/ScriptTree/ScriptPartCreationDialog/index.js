import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from "../../../../actions";
// import { save as saveProject } from "../../../../reducers/projectReducer";

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

export class ScriptPartCreationDialog extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isInEditMode: props.isInEditMode || false,
            partName: ''
        };
    }

    render() {

        return (
            <div id="ScriptPartCreationDialog">

                { 
                    this.state.isInEditMode ? 

                        <InputGroup
                            id="ScriptPartCreationInputGroup"
                            placeholder="title of new part..."
                            onChange={(event) => this.setState( { partName : event.target.value } ) }
                            rightElement={
                                <div>
                                    <Button 
                                        id="ScriptPartCreationSaveButton"
                                        minimal={false}
                                        icon="floppy-disk"
                                        onClick={() => this.createScriptPart(this.state.partName)}
                                    />
                                    <Button 
                                        id="CloseScriptPartEditModeButton"
                                        minimal={false}
                                        icon="small-cross"
                                        onClick={toggleEditMode.bind(this)}
                                    />
                                </div>
                            }
                        />

                    :   <Button 
                            id="OpenScriptPartEditModeButton"
                            minimal={true}
                            icon="plus"
                            text="Add a new part"
                            onClick={toggleEditMode.bind(this)}
                        />
                }
            
            </div>
        );
    }

    createScriptPart(partName) {
        this.props.addScriptPart(partName);
    }
}

function toggleEditMode() {
    this.setState({ isInEditMode: !this.state.isInEditMode });
}
  
function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addScriptPart: partName => dispatch(projectActions.addScriptPartAction(partName)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScriptPartCreationDialog)