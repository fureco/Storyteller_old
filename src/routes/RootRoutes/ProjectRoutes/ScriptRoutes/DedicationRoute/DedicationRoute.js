import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../../../../store/actions';

import { TextAreaWithPreview } from '../../../../../components';

class DedicationRoute extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.project.dedication,
		};
	}

	save(text) {
		this.props.setDedication(text);
		this.props.saveProject();
	}

	render() {

		return (
			<TextAreaWithPreview text={this.state.text} save={this.save.bind(this)} />
		);
	}
}

function mapStateToProps({ project }) {
	return {
		project,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setDedication: dedication => dispatch(projectActions.setDedication(dedication)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DedicationRoute)
