import React from 'react';
import { connect } from 'react-redux';
import { createScriptPartAction } from  "../../../reducers/projectReducer";
import ScriptPartCreationDialog from  "./ScriptPartCreationDialog";

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

class ScriptTree extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
        showPartCreationDialog: false
    };
  }

  render() {

    return (
        <div id="ScriptTree">

                <h1>Parts</h1>
                { 
                    this.state.showPartCreationDialog ? 

                        <ScriptPartCreationDialog />

                    :   <Button 
                            minimal={false}
                            icon="plus"
                            text="Add a new part"
                            onClick={togglePartCreationDialog.bind(this)}
                        />
                }
        
        </div>
    );
  }
}

function togglePartCreationDialog() {
    this.setState({ showPartCreationDialog: !this.state.showPartCreationDialog });
}
  
function mapStateToProps ({ projectReducer }) {
    return {
    };
}

function mapDispatchToProps (dispatch) {
    return {
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptTree)