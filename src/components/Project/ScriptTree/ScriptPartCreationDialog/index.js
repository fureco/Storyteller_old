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
            partName: ''
        };
    }

    render() {

        return (
            <div id="ScriptPartCreationDialog">

                <InputGroup
                    placeholder="title of new part..."
                    onChange={() => this.setState( { partName : event.target.value } ) }
                    rightElement={
                        <Button 
                            minimal={false}
                            icon="floppy-disk"
                            onClick={() => this.createScriptPart(this.state.partName).bind(this)}
                        />
                    }
                />
            
            </div>
        );
    }

    createScriptPart(partName) {
        this.props.addScriptPart(partName);
        this.props.saveProject();
    }
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