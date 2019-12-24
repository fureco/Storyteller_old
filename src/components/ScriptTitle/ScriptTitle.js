import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../store/actions';

import './ScriptTitle.css';

import {
	Button,
	ButtonGroup,
	EditableText,
	InputGroup,
	Text,
	TextArea,
} from '@blueprintjs/core';

export class ScriptTitle extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			isInEditMode: !this.props.project.title || this.props.project.title.length <= 0,
			mouseOver: false,
			value: this.props.project.title,
		};
	}

	onMouseEnter() {
		this.setState({ mouseOver: true })
	}

	onMouseLeave() {
		this.setState({ mouseOver: false })
	}

	openEditMode() {
		this.setState({ isInEditMode: true })
	}

	closeEditMode() {
		this.setState({ isInEditMode: false })
	}

	undoEditing() {
		this.setState({
			isInEditMode: !this.props.project.title || this.props.project.title.length <= 0,
			value: this.props.project.title
		});
	}

	save() {
		this.props.setTitle(this.state.value);
		this.props.saveProject();
	}

	render() {
		return (
			<div id="ScriptTitle" onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>

				{this.state.isInEditMode ?

					<div id="ScriptTitleInput">

						<TextArea
							value={this.state.value}
							placeholder="Title..."
							fill={true}
							growVertically={true}
							autoFocus
							onChange={() => this.setState({ value: event.target.value })} />

						<div id="ScriptTitleButtons">
							<ButtonGroup>
								<Button
									minimal={false}
									disabled={!this.state.value.length}
									icon="floppy-disk"
									onClick={this.save.bind(this)}
								/>
								<Button
									minimal={false}
									disabled={!this.state.value.length}
									icon="small-cross"
									onClick={this.undoEditing.bind(this)}
								/>
							</ButtonGroup>
						</div>

					</div>

					: <div id="ScriptTitleText" onClick={this.openEditMode.bind(this)}>

						{this.props.project.title}

					</div>
				}

			</div>
		);
	}
}

function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setTitle: title => dispatch(projectActions.setTitle(title)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScriptTitle)
