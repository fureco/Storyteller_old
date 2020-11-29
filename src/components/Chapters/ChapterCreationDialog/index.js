import React from 'react';
import { connect } from 'react-redux';

import { create } from "./../../../store/chapters/chapter.actions";

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

class ChapterCreationDialog extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showChapterCreationDialog: props.showChapterCreationDialog || false,
            title: ''
        };
    }

    render() {

        return (
            <div id="ChapterCreationDialog" style={this.props.style}>

                {
                    this.state.showChapterCreationDialog ?

                    <InputGroup
						placeholder="title of new chapter..."
						autoFocus
                        onChange={() => this.setState( { title : event.target.value } ) }
                        rightElement={
                            <div>
                                <Button
                                    minimal={false}
                                    icon="floppy-disk"
                                    onClick={() => this.create(this.state.title)}
                                />
                                <Button
                                    minimal={false}
                                    icon="small-cross"
                                    onClick={this.toggleDialog.bind(this)}
                                />
                            </div>
                        }
                    />

                    :   <Button
                            minimal={true}
                            icon="plus"
                            text="Add a new chapter"
                            onClick={this.toggleDialog.bind(this)}
                        />
                }

            </div>
        );
    }

	create(title) {
		this.props.create({ title });
		this.toggleDialog();
	}

	toggleDialog() {
		this.setState({ showChapterCreationDialog: !this.state.showChapterCreationDialog });
	}
}

function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
    return {
		create: (chapter) => dispatch(create(chapter)),
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterCreationDialog)
