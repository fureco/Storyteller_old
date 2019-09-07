import React from 'react';
import { connect } from 'react-redux';
import ScriptPartCreationDialog from  "./ScriptPartCreationDialog";
import ChapterCreationDialog from  "./ChapterCreationDialog";

import {
  Button,
  Tree,
  ITreeNode,
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

                <Tree contents={this.props.projectParts} />

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

    let parts = [];

    projectReducer.parts.forEach(part => {
        let aPart = 
        {
            id: part.id,
            hasCaret: true,
            icon: "folder-close",
            label: part.name,
        };

        parts.push(aPart);
    });

    return {
        projectParts: parts,
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