import React from 'react';
import { connect } from 'react-redux';

import { getBorderStyle, getBorderRadius, getBgColor } from './../../store/appState/appState.selectors';

export class PagePreview extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			content: props.content,
		};
	}

	render() {

		return (
			<div id="PagePreview" className="page-preview" >
				<div className="page-preview-content" style={{
					border: this.props.borderStyle,
					borderRadius: this.props.borderRadius,
					backgroundColor: this.props.bgColor,
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
		borderStyle: getBorderStyle(appState),
		borderRadius: getBorderRadius(),
		bgColor: getBgColor(appState, "dark")
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
