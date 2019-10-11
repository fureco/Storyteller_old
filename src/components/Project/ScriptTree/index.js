import React from 'react';
import { connect } from 'react-redux';
import ScriptTitle from  "./../ScriptTitle";
import ScriptPartCreationDialog from  "./ScriptPartCreationDialog";
import ChapterCreationDialog from  "./ChapterCreationDialog";

import {
    Button,
    InputGroup,
    Tree,
} from '@blueprintjs/core';

class ScriptTree extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isInEditMode: false,
            showPartCreationDialog: false
        };
    }

    componentDidMount() {
        if(!this.props.project.title || this.props.project.title <= 0) {
            this.setState({ isInEditMode: true });
        }
    }

    render() {
        return (
            <div id="ScriptTree">

                <ScriptTitle/>

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

function toggleEditMode() {
    this.setState({ isInEditMode: !this.state.isInEditMode });
}

function deletePart(partID) {
    console.log(partID)
}

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
            secondaryLabel: (
                <Button 
                    minimal={true}
                    icon="trash"
                    onClick={deletePart.bind(this)}
                />
            ),
            childNodes: children
        };

        parts[part.id] = aPart;
    });

    return {
        project: projectReducer,
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