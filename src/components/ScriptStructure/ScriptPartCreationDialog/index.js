import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from "../../../store/actions";

import "./ScriptPartCreationDialog.css";

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

export class ScriptPartCreationDialog extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isInEditMode: props.isInEditMode || false,
            partName: ''
        };
	}

    render() {

        return (
			<div id="ScriptPartCreationDialog">

                {
                    this.state.isInEditMode ?

                        <InputGroup
							id="ScriptPartCreationInputGroup"
							ref={(input) => { this.ScriptPartCreationInputGroup = input; }}
							placeholder="title of new part..."
							autoFocus={true}
							onChange={(event) => this.setState({ partName: event.target.value }) }
                            rightElement={
                                <div>
                                    <Button
                                        id="ScriptPartCreationSaveButton"
                                        minimal={false}
										icon="floppy-disk"
										disabled={!this.state.partName.length}
                                        onClick={() => this.createScriptPart(this.state.partName, this.props.position)}
                                    />
                                    <Button
                                        id="CloseScriptPartEditModeButton"
                                        minimal={false}
                                        icon="small-cross"
										onClick={() => this.handleCloseEditModeButtonClick()}
                                    />
                                </div>
                            }
                        />

                    :   <Button
                            id="OpenScriptPartEditModeButton"
                            minimal={true}
                            icon="plus"
                            text="Add a new part"
							onClick={() => this.toggleEditMode()}
                        />
                }

            </div>
        );
	}

	handleCloseEditModeButtonClick() {
		this.setState({ "partName": "" });
		this.toggleEditMode();
	}

    createScriptPart(partName, position) {
		this.props.addScriptPart(partName, position);
		this.setState({ "partName": ""});
	}

	toggleEditMode() {
		this.setState({ isInEditMode: !this.state.isInEditMode });
	}
}

function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addScriptPart: (partName, position) => dispatch(projectActions.addScriptPartAction(partName, position)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScriptPartCreationDialog)
