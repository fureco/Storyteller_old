import React from 'react';
import { connect } from 'react-redux';

import {
    TextArea
} from '@blueprintjs/core';

class ScriptTextArea extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                flexGrow: 1,
                overflow: 'auto',
                border: '1px solid #ddd',
                resize: 'none',
            }}>
                <h1 style={{textAlign: 'center'}}>{this.props.project.title}</h1>
                <h2 style={{textAlign: 'center'}}>Part 1: {this.props.project.parts[0].name}</h2>
                <TextArea id="ScriptTextArea"
                    style={{
                        height: '100%',
                        margin: '1%',
                        overflow: 'auto',
                        border: '1px solid #ddd',
                        resize: 'none',
                    }}
                    onKeyDown={this.onInput}
                    value={this.state.text}
                />
            </div>
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