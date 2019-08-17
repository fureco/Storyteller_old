import React from 'react';
import { connect } from 'react-redux';

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

    let partCreation;

    if(this.state.showPartCreationDialog) {
      partCreation = <PartCreationDialog/>;
    }
    else {
      partCreation = <Button 
                        minimal={false}
                        icon="plus"
                        text="Add a new part"
                        onClick={togglePartCreationDialog.bind(this)}
                      />;
    }

    return (
        <div id="ScriptTree">

                <h1>Parts</h1>

                {partCreation}
        
        </div>
    );
  }
}

function togglePartCreationDialog() {
  this.setState({ showPartCreationDialog: !this.state.showPartCreationDialog });
}

function PartCreationDialog(props) {
  return(<InputGroup/>);
}
  
function mapStateToProps ({ projectReducer }) {
  return {
    project: projectReducer,
  };
}

export default connect(
  mapStateToProps,
  null
)(ScriptTree)