import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from './../../store/actions';

import {
	Button,
	TextArea
} from '@blueprintjs/core';

class Dedication extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.project.dedication,
		};
	}

	undoEditing() {
		this.setState({
			text: this.props.project.dedication
		});
	}

	save() {
		this.props.setDedication(this.state.text);
		this.props.saveProject();
	}

	render() {

		return (
			<div id="Dedication"
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%'
				}}
			>
				<TextArea
					className="DedicationTextArea"
					onChange={() => this.setState({ "text": event.target.value })}
					value={this.state.text}
					style={{
						// height: '100%',
						overflow: 'auto',
						resize: 'vertical',
						flexGrow: 1,
					}}
				/>
				<div style={{
					display: 'flex',
					justifyContent: 'center'
				}}>
					<Button
						minimal={false}
						disabled={this.state.text == this.props.project.dedication}
						icon="floppy-disk"
						text="Save"
						onClick={this.save.bind(this)}
					/>
					<Button
						minimal={false}
						disabled={this.state.text == this.props.project.dedication}
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
		setDedication: dedication => dispatch(projectActions.setDedication(dedication)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dedication)
