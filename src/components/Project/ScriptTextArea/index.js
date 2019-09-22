import React from 'react';
import { connect } from 'react-redux';

import {
    Tab, 
    Tabs,
    TextArea
} from '@blueprintjs/core';

class ScriptTextArea extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            text: ''
        };
    }

    handleTabChange(navbarTabId){
        // this.setState({ 
        //     selectedTabId: navbarTabId,
        // });
    }

    render() {

        var parts = this.props.project.parts
            .sort((a, b) => a.position > b.position)
            .map((name, index) => {
                return (
                    <div key={index} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        resize: 'none',
                    }}>
                        <h2 style={{textAlign: 'center'}}>Part {this.props.project.parts[index].position}: {this.props.project.parts[index].name}</h2>
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
            });

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

                <Tabs id="ScriptNav" onChange={this.handleTabChange.bind(this)} selectedTabId={this.state.selectedTabId} animate="true" >
                    <Tab id="abstract" title="Abstract" panel={
                        <div></div>
                    } />
                    <Tab id="parts" title="Parts" panel={
                        <div></div>
                    } />
                    <Tab id="chapters" title="Chapters" panel={
                        <div></div>
                    } />
                    <Tab id="scenes" title="Scenes" panel={
                        <div></div>
                    } />
                </Tabs>

                {parts}
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