import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from './../../store/actions';

import {
	Button,
	Colors,
	TextArea
} from '@blueprintjs/core';

class TextAreaWithPreview extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.text,
		};
	}

	save() {
		this.props.save(this.state.text);
	}

	undoEditing() {
		this.setState({
			text: this.props.text
		});
	}

	render() {

		return (
			<div id="TextAreaWithPreview"
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%'
				}}
			>
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					flex: '1'
				}}>
					<TextArea
						className="TextArea"
						onChange={() => this.setState({ "text": event.target.value })}
						value={this.state.text}
						style={{
							// height: '100%',
							overflow: 'auto',
							resize: 'none',
							flex: '1'
						}}
					/>
					<div
						className="PreviewArea"
						style={{
							// height: '100%',
							overflow: 'auto',
							resize: 'none',
							flex: '1',
							padding: '10px',
							border: `1px solid ${this.props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
						}}
						dangerouslySetInnerHTML={{ __html: this.state.text }} />

				</div>

				<div style={{
					display: 'flex',
					justifyContent: 'center',
					padding: '10px 0'
				}}>
					<Button
						minimal={false}
						disabled={this.state.text == this.props.text}
						icon="floppy-disk"
						text="Save"
						onClick={this.save.bind(this)}
					/>
					<Button
						minimal={false}
						disabled={this.state.text == this.props.text}
						icon="undo"
						text="Discard"
						onClick={this.undoEditing.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ appStateReducer, projectReducer }) {
	return {
		appState: appStateReducer,
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
