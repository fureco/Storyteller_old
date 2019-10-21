import React from 'react';
import { connect } from 'react-redux';

import { CreateProjectButton, OpenProjectButton } from './../components';

import { remote } from 'electron';

const dialog = remote.dialog;

class Welcome extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div id="Welcome" style={styles.container}>

                <div className="app_name" style={styles.app_name}>
                    Storyteller
                </div>

				<OpenProjectButton minimal={false} showText={true} />
				<CreateProjectButton minimal={false} showText={true} />

            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '10em',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    app_name: {
        fontSize: '2em'
    }
}


// function mapStateToProps({ }) {
//     return {
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//     };
// }

export default connect(
    // mapStateToProps,
	// mapDispatchToProps,
	null,
	null
)(Welcome)
