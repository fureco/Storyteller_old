import React from 'react';
import { connect } from 'react-redux';

import TopNavBar from './../../components/TopNavBar/TopNavBar';
import Workspace from './../../components/Workspace/Workspace';

import {
	Icon,
} from '@blueprintjs/core';

class Welcome extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        };
    }

    render() {
        return (
			<div id="Welcome" style={styles.container} className={this.props.appState.theme}>

				<TopNavBar workspaceIsOpen={true} />

				<div style={styles.content}>

					<div className="app_name" style={styles.app_name}>
						<Icon icon="draw" iconSize={55} style={{ marginRight: "0.2em"}} />Storyteller
					</div>

					<Workspace />

				</div>

            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		justifyContent: 'center',
		alignItems: 'center',
	},
    app_name: {
		fontSize: '4em',
		marginBottom: '0.5em'
    }
}


function mapStateToProps({ appStateReducer, }) {
	return {
		appState: appStateReducer,
	};
}

export default connect(
	mapStateToProps,
	null
)(Welcome)
