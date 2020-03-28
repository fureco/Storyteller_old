import React from 'react';
import { connect } from 'react-redux';
import Title from "./Title/Title";
import Author from "./Author/Author";

import {
	Button,
	Colors,
	Icon
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
				<div className="page-preview" >
					<div className="page-preview-content" style={{
						border: `${this.state.border}`,
						borderRadius: `${this.state.borderRadius}`,
						backgroundColor: `${this.state.backgroundColor}`,
					}}>
						<div style={{
							display: `flex`,
							flexDirection: `column`,
							justifyContent: `center`,
							padding: `50px`,
							height: `100%`
						}}>
							<Title />
							<Author />
						</div>
					</div>
				</div>
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
