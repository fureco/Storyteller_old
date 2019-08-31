import React from 'react';
import { connect } from 'react-redux';
import { createScriptPartAction } from  "../../../../reducers/projectReducer";

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

class ScriptPartCreationDialog extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
    };
  }

  render() {

    return (
        <div id="ScriptPartCreationDialog">

            <InputGroup
                rightElement={
                    <Button 
                        minimal={false}
                        icon="floppy-disk"
                        onClick={() =>this.props.createScriptPart("test")}
                    />
                }
            />
        
        </div>
    );
  }
}
  
function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        createScriptPart: partName => dispatch(createScriptPartAction(partName)),
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptPartCreationDialog)