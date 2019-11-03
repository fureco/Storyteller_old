import React from 'react';
import { connect } from 'react-redux';

import { CreateProjectButton, OpenProjectButton } from './../components';

import { remote } from 'electron';

import {
	Icon,
} from '@blueprintjs/core';

const dialog = remote.dialog;

class Welcome extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        };
    }

    render() {
        return (
			<div id="Welcome" style={styles.container} className={this.props.appState.theme}>

				<div className="app_name" style={styles.app_name}>
					<Icon icon="draw" iconSize={55} style={{ marginRight: "0.2em"}} />Storyteller
                </div>

				<OpenProjectButton style={styles.item} minimal={false} showText={true} />
				<CreateProjectButton style={styles.item} minimal={false} showText={true} />

            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
		alignItems: 'center',
	},
	item: {
		margin: '1em'
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
