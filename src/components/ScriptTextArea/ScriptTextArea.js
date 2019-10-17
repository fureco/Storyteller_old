import React from 'react';
import { connect } from 'react-redux';
// import { projectActions } from './../../../store/actions';

import './ScriptTextArea.css';

import Abstract from '../Abstract/Abstract';
import Parts from '../Parts/Parts';

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

				<Tabs id="ScriptNav" onChange={this.handleTabChange.bind(this)} selectedTabId={this.state.selectedTabId} animate="true">
                    <Tab id="abstract" title="Abstract" panel={
                        <Abstract/>
                    } />
                    <Tab id="parts" title="Parts" panel={
						<Parts/>
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
