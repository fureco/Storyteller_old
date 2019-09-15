import React from 'react';
import { connect } from 'react-redux';
import { addScriptPartAction, saveProjectAction } from  "../../../../reducers/projectReducer";

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

class ChapterCreationDialog extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showChapterCreationDialog: props.showChapterCreationDialog || false,
            name: ''
        };
    }

    render() {

        return (
            <div id="ChapterCreationDialog">

                {
                    this.state.showChapterCreationDialog ? 

                    <InputGroup
                        placeholder="title of new chapter..."
                        onChange={() => this.setState( { name : event.target.value } ) }
                        rightElement={
                            <div>
                                <Button 
                                    minimal={false}
                                    icon="floppy-disk"
                                    onClick={() => this.create(this.state.name)}
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
                            text="Add a new chapter"
                            onClick={toggleDialog.bind(this)}
                        />
                }
            
            </div>
        );
    }

    create(name) {
        this.props.addChapter(name);
        this.props.saveProject();
    }
}

function toggleDialog() {
    this.setState({ showChapterCreationDialog: !this.state.showChapterCreationDialog });
}
  
function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addChapter: name => dispatch(addScriptPartAction(name)),
        saveProject: () => dispatch(saveProjectAction()),
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterCreationDialog)