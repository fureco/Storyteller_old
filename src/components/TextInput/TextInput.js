import React from 'react';

import ContentEditable from "react-contenteditable";
import ReactHtmlParser from 'react-html-parser';

import './TextInput.css';

export class TextInput extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			value: props.html || "",
			html: props.html || "",
			isInEditMode: !props.html || props.html.length <= 0,
			multiLine: props.multiLine,
			mouseOver: false,
		};
	}

 	componentDidUpdate() {
		if (this.props.html.localeCompare(this.state.value)) {
			this.setState({ value: this.props.html });
		}
	}

	onMouseEnter() {
		if (!this.state.isInEditMode && this.state.html !== this.state.value) {
			this.setState({ html: this.state.value });
		}
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
			isInEditMode: !this.props.html || this.props.html.length <= 0,
			html: this.props.text
		});
	}

	render() {
		if (this.state.mouseOver || this.state.isInEditMode) {
			return (
				<ContentEditable
					id={this.props.id}
					style={this.props.style}
					className={`${this.state.isInEditMode || this.state.mouseOver ? 'showBorder ' : ''}` + "editable"}
					placeholder={this.props.placeholder}
					html={this.state.html} // innerHTML of the editable div
					disabled={false} // use true to disable edition
					onClick={this.openEditMode.bind(this)}
					onKeyDown={this.handleKeyDown.bind(this)}
					onChange={this.handleChange.bind(this)} // handle innerHTML change
					onBlur={this.handleBlur.bind(this)} // the element looses focus
					onMouseLeave={this.onMouseLeave.bind(this)}
				/>
			);
		}
		else {
			return (
				<div
					style={this.props.style}
					className={`${this.state.isInEditMode || this.state.mouseOver ? 'showBorder ' : ''}` + "editable"}
					onMouseEnter={this.onMouseEnter.bind(this)}
					onMouseLeave={this.onMouseLeave.bind(this)}>

					{ReactHtmlParser(this.state.value)}
				</div>
			);
		}
	}

	handleChange(event) {
		this.setState({
			html: event.target.value,
		});
	}

	handleKeyDown(event) {
		if (event.which === 13 && !this.state.multiLine) {
			event.preventDefault();
			document.getElementById(this.props.id).blur();
			window.getSelection().removeAllRanges();
			this.handleBlur();
		}
	}

	handleBlur() {
		if (this.state.html.length > 0) this.closeEditMode();
		if (this.state.html != this.props.html) {
			this.props.save(this.state.html);
		}
	}
}

export default TextInput;
