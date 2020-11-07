import React from 'react';
import { connect } from 'react-redux';

import {
	Colors,
} from '@blueprintjs/core';

class PagePreview extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			content: props.content,

			border: `1px solid ${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.GRAY5}`,
			borderRadius: `3px`,
			backgroundColor: `${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY3 : Colors.LIGHT_GRAY5}`,
		};
	}

	render() {

		return (
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
						{this.state.content}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ appState }, ownProps) {

	return {
		appState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PagePreview)
