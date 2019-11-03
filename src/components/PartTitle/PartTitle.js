import React from 'react';
import { connect } from 'react-redux';
import { partActions, projectActions } from '../../store/actions';

import './PartTitle.css';

import {
	Button,
	TextArea,
} from '@blueprintjs/core';

export class PartTitle extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			isInEditMode: !this.props.part.name || this.props.part.name.length <= 0,
			mouseOver: false,
			value: props.part.name || '',
			disabled: props.part.name && props.part.name.length <= 0,
			position: props.part.position || ''
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
			isInEditMode: !this.props.part.name || this.props.part.name <= 0,
			value: this.props.part.name
		});
	}

	save() {
		this.props.setPartTitle(this.state.value);
		// this.props.saveProject();
	}

	render() {
		return (
			<div id="PartTitle" onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>

				{this.state.isInEditMode ?

					<div id="PartTitleInput">

						<TextArea
							value={this.state.value}
							placeholder="Title..."
							fill={true}
							growVertically={true}
							autoFocus
							onChange={() => this.setState({ value: event.target.value })} />

						<div id="PartTitleButtons">
							<Button
								minimal={false}
								disabled={this.state.disabled}
								icon="floppy-disk"
								onClick={this.save.bind(this)}
							/>
							<Button
								minimal={false}
								disabled={this.state.disabled}
								icon="small-cross"
								onClick={this.undoEditing.bind(this)}
							/>
						</div>

					</div>

					: <div id="PartTitleText" onClick={this.openEditMode.bind(this)}>
						Part {this.state.position}: {this.props.part.name}
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
		setPartTitle: title => dispatch(partActions.setTitle(title)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PartTitle)
