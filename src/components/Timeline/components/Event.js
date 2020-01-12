import React from 'react';
import { connect } from 'react-redux';

import {
	Colors,
} from '@blueprintjs/core';

export class Event extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
				}}>
				<div
					style={{
						padding: '5px 10px',
						backgroundColor: `${this.props.appState.theme == 'bp3-dark' ? Colors.BLUE3 : Colors.BLUE5}`,
						borderRadius: '15px',
						fontWeight: 'bold'
					}}>
					{this.props.from} - {this.props.to}
				</div>
				<div
					style={{
						display: 'flex',
						padding: '10px 10px',
					}}>
					<div
						style={{
							padding: '5px',
							marginRight: '10px',
							backgroundColor: `${this.props.appState.theme == 'bp3-dark' ? Colors.BLUE3 : Colors.BLUE5}`,
							borderRadius: '15px',
						}} />
					<div>
						<div><b>{this.props.title}</b></div>
						<div><b>{this.props.subtitle}</b></div>
						<div><b>{this.props.summary}</b></div>
						<div>{this.props.text}</div>
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
)(Event)
