import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from './../../store/actions';

import {
	Button,
	TextArea
} from '@blueprintjs/core';

class Abstract extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.project.abstract
		};
	}

	undoEditing() {
		this.setState({
			text: this.props.project.abstract
		});
	}

	render() {

		return (
			<div id="Abstract"
				style={{
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<TextArea
					className="AbstractTextArea"
					onChange={() => this.setState({ "text": event.target.value })}
					value={this.state.text}
				/>
				<div style={{
					display: 'flex',
					justifyContent: 'center'
				}}>
					<Button
						minimal={false}
						disabled={!this.state.text.length}
						icon="floppy-disk"
						text="Save"
						onClick={() => { this.props.setTitle(this.state.value) }}
					/>
					<Button
						minimal={false}
						disabled={this.state.text == this.props.project.abstract}
						icon="undo"
						text="Discard"
						onClick={this.undoEditing.bind(this)}
					/>
				</div>
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
		setAbstract: abstract => dispatch(projectActions.setAbstractAction(abstract)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Abstract)
