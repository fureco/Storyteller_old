import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../store/actions';

import { PagePreview } from './../../components';
import TextInput from "./../TextInput/TextInput";

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
			<div id="Abstract" style={{
				width: `100%`,
				height: `100%`,
			}}>
				<PagePreview content={
					<TextInput
						id="AbstractInput"
						placeholder="Abstract..."
						html={this.state.text} // innerHTML of the editable div
						disabled={false} // use true to disable edition
						multiLine={true}
						save={this.save.bind(this)}
						style={{
							height: `100%`,
						}}
					/>
				} />
			</div>
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
		setAbstract: abstract => dispatch(projectActions.setAbstract(abstract)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Abstract)
