import React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Tab, 
  Tabs,
} from '@blueprintjs/core';

class ScriptTextArea extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            text: props.text
        };
    }

    render() {
        return (
            <textarea id="ScriptTextArea"
                style={{
                    height: '100%',
                    flexGrow: 3,
                    overflow: 'auto',
                    border: '1px solid #ddd',
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
)(ScriptTextArea)