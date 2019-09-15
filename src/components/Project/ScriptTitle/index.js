import React from 'react';
import { connect } from 'react-redux';
import { saveProject } from  "../../../utils/file-functions.js";
import { setTitleAction } from  "../../../reducers/projectReducer";

import {
    Button,
    InputGroup,
} from '@blueprintjs/core';

class ScriptTitle extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isInEditMode: false,
            value: this.props.project.title,
        };
    }

    render() {
        return (
            <div id="ScriptTitle" style={Style}>

                { 
                    this.state.isInEditMode || !this.props.project.title || this.props.project.title <= 0 ?

                    <InputGroup
                        placeholder="title..."
                        value={this.state.value}
                        onChange={() => this.setState( { value : event.target.value } ) }
                        rightElement={
                            <div>
                                <Button 
                                    minimal={false}
                                    disabled={!this.state.value.length}
                                    icon="floppy-disk"
                                    onClick={() => {
                                        this.props.setTitle(this.state.value)
                                        saveProject(this.props.project.path + '/project.st', this.props.project)
                                    }}
                                />
                                <Button 
                                    minimal={false}
                                    disabled={!this.state.value.length}
                                    icon="small-cross"
                                    onClick={undoEditing.bind(this)}
                                />
                            </div>
                        }
                    />

                    :   <h1>{this.props.project.title}</h1>
                }
     
            </div>
        );
    }
}

const Style = {
    marginTop: '1em',
};

function undoEditing() {
    this.setState({ 
        value: this.props.project.title,
    });
}

function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer
    };
}

function mapDispatchToProps (dispatch) {
    return {
        setTitle: title => dispatch(setTitleAction(title)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScriptTitle)