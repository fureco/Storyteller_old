import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from './../../store/actions';

import {
	Button,
	TextArea
} from '@blueprintjs/core';

class TextAreaWithPreview extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.project.abstract,
		};
	}

	undoEditing() {
		this.setState({
			text: this.props.project.abstract
		});
	}

	save() {
		this.props.setAbstract(this.state.text);
		this.props.saveProject();
	}

	render() {

		return (
			<div id="Abstract"
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%'
				}}
			>
				<TextArea
					className="AbstractTextArea"
					onChange={() => this.setState({ "text": event.target.value })}
					value={this.state.text}
					style={{
						// height: '100%',
						overflow: 'auto',
						resize: 'vertical',
						flexGrow: 1,
					}}
				/>
				<div
					className="PreviewArea"
					style={{
						// height: '100%',
						overflow: 'auto',
						resize: 'none',
						flex: 1,
					}}
					dangerouslySetInnerHTML={previewHtmlText()} >
				</div>
				<div style={{
					display: 'flex',
					justifyContent: 'center'
				}}>
					<Button
						minimal={false}
						disabled={this.state.text == this.props.project.abstract}
						icon="floppy-disk"
						text="Save"
						onClick={this.save.bind(this)}
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
		setAbstract: abstract => dispatch(projectActions.setAbstract(abstract)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TextAreaWithPreview)