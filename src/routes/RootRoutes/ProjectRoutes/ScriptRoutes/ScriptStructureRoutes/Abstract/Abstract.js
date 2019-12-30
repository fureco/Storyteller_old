import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from './../../../../../../store/actions';

import { TextAreaWithPreview } from '../../../../../../components';

class Abstract extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.project.abstract,
		};
	}

	save(text) {
		this.props.setAbstract(text);
		this.props.saveProject();
	}

	render() {

		return (
			<TextAreaWithPreview text={this.state.text} save={this.save.bind(this)} />
		);
	}
}

function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setAbstract: abstract => dispatch(projectActions.setAbstract(abstract)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Abstract)
