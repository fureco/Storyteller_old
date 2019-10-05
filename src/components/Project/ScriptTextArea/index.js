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
            text: props.project.abstract
        };
    }

    handleTabChange(navbarTabId){
        // this.setState({ 
        //     selectedTabId: navbarTabId,
        // });
    }

    render() {

        // const abstract = {
        //     <div key={index} style={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         overflow: 'auto',
        //         resize: 'none',
        //     }}>
        //         <TextArea id="AbstractTextArea"
        //             style={{
        //                 height: '100%',
        //                 margin: '1%',
        //                 overflow: 'auto',
        //                 border: '1px solid #ddd',
        //                 resize: 'none',
        //             }}
        //             onKeyDown={this.onInput}
        //             value={this.state.text}
        //         />
        //     </div >};
 
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
                        <h2 style={{ textAlign: 'center' }}>Part {this.props.project.parts[index].position}: </h2>
                        {/* <h2 style={{ textAlign: 'center' }}>Part {this.props.project.parts[index].position}: {this.props.project.parts[index].name}</h2> */}
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
        
        console.log(parts);

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                flexGrow: 1,
                overflow: 'auto',
                border: '1px solid #ddd',
                padding: '0 1%'
            }}>

                <Tabs id="ScriptNav" onChange={this.handleTabChange.bind(this)} selectedTabId={this.state.selectedTabId} animate="true" style={{
                    'display': 'flex',
                    'justifyContent': 'center',
                    backgroundColor: 'blue'
                }}>
                    <Tab id="abstract" title="Abstract" panel={
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <TextArea id="AbstractTextArea"
                                style={{
                                    height: '100%',
                                    overflow: 'auto',
                                    border: '1px solid #ddd',
                                    resize: 'none',
                                }}
                                onChange={() => this.setState({ text: event.target.value })}
                                value={this.state.text}
                            />
                        </div>
                    } />
                    <Tab id="parts" title="Parts" panel={
                        <div>{parts}</div>
                    } />
                    <Tab id="chapters" title="Chapters" panel={
                        <div></div>
                    } />
                    <Tab id="scenes" title="Scenes" panel={
                        <div></div>
                    } />
                </Tabs>

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