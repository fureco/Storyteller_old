import React from 'react';
import { connect } from 'react-redux';

import {
	Colors,
} from '@blueprintjs/core';

import ScriptNav from '../../../../components/ScriptNav/ScriptNav';
import ScriptContent from '../../../../components/ScriptContent/ScriptContent';

class ScriptRoute extends React.Component {

    constructor(props) {

		super(props);

		this.state = {
			border: `1px solid ${props.appState.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`,
			borderRadius: `3px`,
		};
	}

	render() {

		return (

			<div id="ScriptRoute" style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', marginBottom: '10px' }}>

				<div
					id="TreeviewColumn"
					style={{
						maxWidth: '400px',
						overflow: 'auto',
						border: `${this.state.border}`,
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
						border: `${this.state.border}`,
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
					<ScriptContent />

				</div>

			</div>
		);
	}
}


function mapStateToProps({ appStateReducer }) {

	return {
		appState: appStateReducer,
	};
}

export default connect(
    mapStateToProps,
    null
)(ScriptRoute)
