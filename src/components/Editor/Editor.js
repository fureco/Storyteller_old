import React from 'react';
import { connect } from 'react-redux';
import * as chapterActions from '../../store/chapters/chapter.actions';

import TextInput from "./../../components/TextInput/TextInput";

import {
	Button,
	Colors,
	Switch,
	TextArea
} from '@blueprintjs/core';

class Editor extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.chapter.text,
		};
	}

	save() {
		this.props.saveText(this.props.chapter, this.state.text);
	}

	onChange(event) {
		this.setState({ "text": event.target.value });
	}

	render() {

		return (
			<div id="Editor"
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					lineHeight: '180%'
				}}
			>
				{/* <div style={{
					display: 'flex',
					flexDirection: 'row',
					flex: '1'
				}}>
					<Switch checked={this.state.isPublic} label="Editor" onChange={this.handlePublicChange} />
					<Switch checked={this.state.isPublic} label="HTML" onChange={this.handlePublicChange} />
				</div> */}
				{/* <div>
					<Button>Italic</Button>
				</div> */}
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					flex: '1'
				}}>
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
					>
						<TextInput
							id="PreviewAreaInput"
							placeholder="Start typing..."
							html={this.state.text} // innerHTML of the editable div
							disabled={false} // use true to disable edition
							multiLine={true}
							onChange={this.onChange.bind(this)}
							save={this.save.bind(this)}
							style={{
								textAlign: this.state.textAlign
							}}
						/>
					</div>

					<TextArea
						className="HTMLArea"
						onChange={this.onChange.bind(this)}
						value={this.state.text}
						style={{
							// height: '100%',
							overflow: 'auto',
							resize: 'none',
							flex: '1'
						}}
					/>

				</div>
			</div>
		);
	}
}

function mapStateToProps({ appState, project }) {
	return {
		appState,
		project
	};
}

function mapDispatchToProps(dispatch) {
	return {
		saveText: (chapter, new_text) => dispatch(chapterActions.saveText(chapter.position, new_text)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Editor)
