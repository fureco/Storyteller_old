import React from 'react';
import { connect } from 'react-redux';

import {
    TextArea
} from '@blueprintjs/core';

class FileBrowserTextArea extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            text: props.text
        };
    }

    render() {
        return (
            <TextArea id="FileBrowserTextArea"
                style={{
                    height: '100%',
                    flexGrow: 3,
                    overflow: 'auto',
                    border: '0',
                    resize: 'none',
                    outline: 'none',
                }}
                onKeyDown={this.onInput}
                value={this.state.text}
            />
        );
    }
}

  
function mapStateToProps ({ projectReducer }) {
  return {
    project: projectReducer,
  };
}

export default connect(
  mapStateToProps,
  null
)(FileBrowserTextArea)