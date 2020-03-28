import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../../store/actions';

import './Author.css';

import {
	Button,
	ButtonGroup,
	EditableText,
	InputGroup,
	Text,
	TextArea,
} from '@blueprintjs/core';

export class Author extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			isInEditMode: !this.props.project.author || this.props.project.author.length <= 0,
			mouseOver: false,
			value: this.props.project.author,
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
			isInEditMode: !this.props.project.author || this.props.project.author.length <= 0,
			value: this.props.project.author
		});
	}

	save() {
		this.props.setAuthor(this.state.value);
		this.props.saveProject();
	}

	render() {
		return (
			<div id="Author" onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>

				{this.state.isInEditMode ?

					<div id="AuthorInput">

						<TextArea
							value={this.state.value}
							placeholder="Firstname Lastname..."
							fill={true}
							growVertically={true}
							autoFocus
							onChange={() => this.setState({ value: event.target.value })} />

						<div id="AuthorButtons">
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

					: <div id="AuthorText" onClick={this.openEditMode.bind(this)}>

						{this.props.project.author}

					</div>
				}

			</div>
		);
	}
}

function mapStateToProps({ project }) {
	return {
		project
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setAuthor: author => dispatch(projectActions.setAuthor(author)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Author)
