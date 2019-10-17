import React from 'react';
import { connect } from 'react-redux';
import ScriptPartCreationDialog from "./../Project/ScriptTree/ScriptPartCreationDialog";

import {
	Button,
	Tab,
	Tabs,
	TextArea
} from '@blueprintjs/core';

class Parts extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
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
			<div>
				{parts}
				<ScriptPartCreationDialog />
			</div>
		);
	}
}

function mapStateToProps({ projectReducer }) {
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
)(Parts)
