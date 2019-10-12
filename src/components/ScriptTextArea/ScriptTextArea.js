import React from 'react';
import { connect } from 'react-redux';
// import { projectActions } from './../../../store/actions';

import './ScriptTextArea.css';

import Abstract from '../Abstract/Abstract.js';

import {
	Button,
	Tab,
	Tabs,
	TextArea
} from '@blueprintjs/core';

class ScriptTextArea extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
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

        return (
			<div
				id="ScriptTextArea"
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					flexGrow: 1,
					overflow: 'auto',
					border: '1px solid #ddd',
					padding: '0 1%',
				}}
			>

				<Tabs id="ScriptNav" onChange={this.handleTabChange.bind(this)} selectedTabId={this.state.selectedTabId} animate="true"
					// style={{
					// 	display: 'flex',
					// 	flexDirection: 'column',
					// 	height: '100%',
					// 	flexGrow: 1,
					// 	overflow: 'auto',
					// 	border: '1px solid #ddd',
					// 	padding: '0 1%'
					// }}
				>
                    <Tab id="abstract" title="Abstract" panel={
                        <Abstract/>
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

function mapDispatchToProps(dispatch) {
	return {
		// setAbstract: abstract => dispatch(projectActions.setAbstractAction(abstract)),
	};
}

export default connect(
  	mapStateToProps,
	mapDispatchToProps
)(ScriptTextArea)
