import React from 'react';
import { connect } from 'react-redux';
import Title from "./Title/Title";
import Author from "./Author/Author";

import {
	PagePreview
} from './../../components';

import {
	Colors,
} from '@blueprintjs/core';

class TitleAndAuthor extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			themeName: props.appState.theme || "bp3-body", // null || bp3-dark
			border: `1px solid ${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.GRAY5}`,
			borderRadius: `3px`,
			backgroundColor: `${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY3 : Colors.LIGHT_GRAY5}`,
		};
	}

	render() {

		return (

			<div id="TitleAndAuthor" style={{
				width: `100%`,
				height: `100%`,
			}}>
				<PagePreview content={
					<div id="TitleAndAuthorContent" style={{
						display: `flex`,
						flexDirection: `column`,
						justifyContent: `center`,
						height: `100%`
					}}>
						<Title />
						<Author />
					</div>
				} />
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
)(TitleAndAuthor)
