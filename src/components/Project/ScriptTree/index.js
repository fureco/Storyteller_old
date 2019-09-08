import React from 'react';
import { connect } from 'react-redux';
import ScriptPartCreationDialog from  "./ScriptPartCreationDialog";
import ChapterCreationDialog from  "./ChapterCreationDialog";

import {
    Icon,
    Tooltip,
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

                <Tree contents={this.props.projectParts} />

                <div style={PartCreationStyle}>
                    <ScriptPartCreationDialog />
                </div>
        
        </div>
    );
  }
}

const PartCreationStyle = {
    marginTop: '1em',
};
  
function mapStateToProps ({ projectReducer }) {

    let parts = [];

    projectReducer.parts.forEach(part => {

        let children = [
            {
                id: 1,
                label: ( <ChapterCreationDialog /> )
            }
        ];

        let aPart = 
        {
            id: part.id,
            hasCaret: true,
            isExpanded: true,
            icon: "folder-close",
            label: "Part " + part.id + ": " + part.name,
            secondaryLabel: "X",
            childNodes: children
        };

        parts[part.id] = aPart;
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