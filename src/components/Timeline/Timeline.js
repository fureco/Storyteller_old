import React from 'react';
import { connect } from 'react-redux';

import Event from './components/Event'

export class Timeline extends React.Component {

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
					flexGrow: '1',
					flexDirection: 'column',
				}}>
				<Event
					from={2010}
					to={2012}
					title={"title"}
					subtitle={"subtitle"}
					text={"text"}
				/>
			</div>
		);
	}
}

function mapStateToProps({ appStateReducer, charactersReducer }, ownProps) {
	return {
		appState: appStateReducer,
		characters: charactersReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timeline)
