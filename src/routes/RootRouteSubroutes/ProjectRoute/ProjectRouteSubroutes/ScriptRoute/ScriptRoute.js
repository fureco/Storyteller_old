import React from 'react';
import { connect } from 'react-redux';

import { getBorderStyle } from './../../../../../store/appState/appState.selectors';
import ScriptNav from './../../../../../components/ScriptNav/ScriptNav';
import ScriptRouteContent from './ScriptRouteContent';

export class ScriptRoute extends React.Component {

    constructor(props) {

		super(props);

		this.state = {
			borderRadius: `3px`,
		};
	}

	render() {

		return (

			<div id="ScriptRoute"
				style={{
					display: 'flex',
					flexDirection: 'row',
					height: '100%',
					width: '100%'
				}}>

				<div
					id="TreeviewColumn"
					style={{
						width: '250px',
						minWidth: '250px',
						maxWidth: '400px',
						overflow: 'auto',
						border: this.props.borderStyle,
						borderRadius: `${this.state.borderRadius}`,
						resize: 'horizontal',
						outline: 'none',
						padding: '10px 10px',
						marginRight: '5px',
					}}
					onKeyDown={this.onInput}
				>
					<ScriptNav />

				</div>

				<div
					id="ContentColumn"
					style={{
						overflow: 'auto',
						border: this.props.borderStyle,
						borderRadius: `${this.state.borderRadius}`,
						resize: 'none',
						outline: 'none',
						padding: '10px',
						flex: '1',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ScriptRouteContent />

				</div>

			</div>
		);
	}
}


function mapStateToProps({ appState }) {

	return {
		appState,
		borderStyle: getBorderStyle(appState),
	};
}

export default connect(
    mapStateToProps,
    null
)(ScriptRoute)
