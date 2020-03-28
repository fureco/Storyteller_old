import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../../store/actions';

import './Title.css';

import ContentEditable from "react-contenteditable";

import {
	Button,
	ButtonGroup,
	EditableText,
	InputGroup,
	Text,
	TextArea,
	Colors,
} from '@blueprintjs/core';

export class Title extends React.Component {

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
		this.setState({ isInEditMode: true });
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
			<div id="Title"
				style={{
					display: "flex",
					flexDirection: "column",
					height: "30%"
				}}
			>

				<ContentEditable
					id="TitleInput"
					className="editable"
					placeholder="Title..."
					html={this.state.value} // innerHTML of the editable div
					disabled={false} // use true to disable edition
					onClick={this.openEditMode.bind(this)}
					onMouseEnter={this.onMouseEnter.bind(this)}
					onMouseLeave={this.onMouseLeave.bind(this)}
					onKeyDown={this.handleKeyDown.bind(this)}
					onChange={this.handleChange.bind(this)} // handle innerHTML change
					onBlur={this.handleBlur.bind(this)} // the element looses focus
					style={{
						border: `${this.state.isInEditMode || this.state.mouseOver ? '1px solid #2B95D6' : '1px solid transparent'}`,
					}}
				/>

			</div>
		);
	}

	handleChange(event) {
		this.setState({
			value: event.target.value,
		});
	}

	handleKeyDown(event) {
		if (event.which === 13) {
			event.preventDefault();
			document.getElementById("TitleInput").blur();
			window.getSelection().removeAllRanges();
			this.handleBlur();
		}
	}

	handleBlur() {
		if (this.state.value.length > 0) this.closeEditMode();
		if (this.state.value != this.props.project.title) this.save();
	}
}

function mapStateToProps({ appStateReducer, project }) {
	return {
		appState: appStateReducer,
		project
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
)(Title)
