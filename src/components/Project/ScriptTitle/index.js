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
            isInEditMode: !this.props.project.title || this.props.project.title.length <= 0,
            mouseOver: false,
            value: this.props.project.title,
        };
    }

    onMouseEnter() {
        this.setState({ mouseOver: true })
    }

    onMouseLeave() {
        this.setState({ mouseOver: false })
    }

    openEditMode() {
        this.setState({ isInEditMode: true })
    }

    closeEditMode() {
        this.setState({ isInEditMode: false })
    }

    undoEditing() {
        this.setState({ 
            isInEditMode: !this.props.project.title || this.props.project.title.length <= 0,
            value: this.props.project.title 
        });
    }

    render() {
        return (
            <div id="ScriptTitle" style={Style.container} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>

                { 
                    this.state.isInEditMode ?

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
                                    onClick={() => {this.props.setTitle(this.state.value)}}
                                />
                                <Button 
                                    minimal={false}
                                    disabled={!this.state.value.length}
                                    icon="small-cross"
                                    onClick={this.undoEditing.bind(this)}
                                />
                            </div>
                        }
                    />

                    :   <h1 style={Style.h1}>

                            {this.props.project.title}

                            {this.state.mouseOver &&
                                <Button 
                                    minimal={true}
                                    disabled={!this.state.value.length}
                                    icon="edit"
                                    onClick={this.openEditMode.bind(this)}
                                />
                            }
                        </h1>
                }
     
            </div>
        );
    }
}

const Style = {
    container: {
    },
    h1: {
        display: 'flex',
        justifyContent: 'space-between',
    }
};

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