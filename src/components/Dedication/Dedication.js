import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../store/actions';

import { PagePreview } from './../../components';
import TextInput from "./../../components/TextInput/TextInput";

class Dedication extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.project.dedication,
			fontSize: this.props.project.styles.default.fontSize,
			textAlign: this.props.project.styles.dedication.textAlign
		};
	}

	save(text) {
		this.props.setDedication(text);
		this.props.saveProject();
	}

	render() {

		return (
			<div id="Dedication"
				style={{
					width: `100%`,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					fontSize: this.state.fontSize,
				}}>
				<PagePreview
					content={
						<TextInput
							id="DedicationInput"
							placeholder="Dedication..."
							html={this.state.text} // innerHTML of the editable div
							disabled={false} // use true to disable edition
							multiLine={true}
							save={this.save.bind(this)}
							style={{
								textAlign: this.state.textAlign
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
		setDedication: dedication => dispatch(projectActions.setDedication(dedication)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dedication)
