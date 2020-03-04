import React from 'react';
import { connect } from 'react-redux';

import {
	Colors,
	FileInput
} from '@blueprintjs/core';

import "./Cover.css";

export class Cover extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			border: `1px solid ${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.GRAY5}`,
			borderRadius: `3px`,
			backgroundColor: `${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY3 : Colors.LIGHT_GRAY5}`,
		};
	}

	render() {

		return (
			<div id="Cover">

				<FileInput className={this.props.appState.theme} text="Choose file..." onInputChange={() => { console.log("test") }} />

				<div
					id="cover-preview"
					style={{
						border: `${this.state.border}`,
						borderRadius: `${this.state.borderRadius}`,
						backgroundColor: `${this.state.backgroundColor}`,
					}}
				/>

			</div>
		);
	}
}

function mapStateToProps({ appStateReducer }, ownProps) {

	return {
		appState: appStateReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cover)
