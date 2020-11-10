import React from 'react';
import { connect } from 'react-redux';
import * as scenesActions from "./../../../store/scenes/scenes.actions";
// import { addScriptPartAction, save } from  "../../../../store/reducers/projectReducer";

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

class SceneCreationDialog extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            show: props.show || false,
			scene: {
				title: ''
			}
        };
    }

    render() {

        return (
            <div id="SceneCreationDialog">

                {
                    this.state.show ?

                    <InputGroup
                        placeholder="title of new scene..."
							onChange={() => this.setState({ scene: { title: event.target.value } }) }
                        rightElement={
                            <div>
                                <Button
                                    minimal={false}
                                    icon="floppy-disk"
                                    onClick={() => this.create(this.state.scene)}
                                />
                                <Button
                                    minimal={false}
                                    icon="small-cross"
                                    onClick={toggleDialog.bind(this)}
                                />
                            </div>
                        }
                    />

                    :   <Button
                            minimal={true}
                            icon="plus"
                            text="Add a new scene"
                            onClick={toggleDialog.bind(this)}
                        />
                }

            </div>
        );
    }

    create(scene) {
        this.props.addScene(scene);
        // this.props.saveProject();
    }
}

function toggleDialog() {
    this.setState({ show: !this.state.show });
}

function mapStateToProps ({ scenes }) {
    return {
        scenes
    };
}

function mapDispatchToProps (dispatch) {
    return {
		addScene: scene => dispatch(scenesActions.addScene(scene)),
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SceneCreationDialog)
