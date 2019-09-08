import React from 'react';
import { connect } from 'react-redux';
import { addScriptPartAction, saveProjectAction } from  "../../../../reducers/projectReducer";

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

class ScriptPartCreationDialog extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showPartCreationDialogs: props.showChapterCreationDialog || false,
            partName: ''
        };
    }

    render() {

        return (
            <div id="ScriptPartCreationDialog">

                { 
                    this.state.showPartCreationDialog ? 

                    <InputGroup
                        placeholder="title of new part..."
                        onChange={() => this.setState( { partName : event.target.value } ) }
                        rightElement={
                            <div>
                                <Button 
                                    minimal={false}
                                    icon="floppy-disk"
                                    onClick={() => this.createScriptPart(this.state.partName).bind(this)}
                                />
                                <Button 
                                    minimal={false}
                                    icon="small-cross"
                                    onClick={toggleDialog.bind(this)}
                                />
                            </div>
                        }
                    />

                    :   <Button 
                            minimal={false}
                            icon="plus"
                            text="Add a new part"
                            onClick={toggleDialog.bind(this)}
                        />
                }
            
            </div>
        );
    }

    createScriptPart(partName) {
        this.props.addScriptPart(partName);
        this.props.saveProject();
    }
}

function toggleDialog() {
    this.setState({ showPartCreationDialog: !this.state.showPartCreationDialog });
}
  
function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addScriptPart: partName => dispatch(addScriptPartAction(partName)),
        saveProject: () => dispatch(saveProjectAction()),
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptPartCreationDialog)