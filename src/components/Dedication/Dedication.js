import React from 'react';
import { connect } from 'react-redux';
import * as projectActions from '../../store/project/project.actions';

import { PagePreview } from './../../components';
import TextInput from "./../../components/TextInput/TextInput";

class Dedication extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			dedication: props.project.dedication,
			fontSize: this.props.project.styles.default.fontSize,
			textAlign: this.props.project.styles.dedication.textAlign
		};
	}

	save() {
		this.props.setDedication(this.state.dedication);
		this.props.saveProject();
	}

	onChange(event) {
		this.setState({ "dedication": event.target.value });
	}

	render() {

		return (
			<div id="Dedication"
				style={{
					width: `100%`,
					height: '100%',
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
							html={this.state.dedication} // innerHTML of the editable div
							onChange={this.onChange.bind(this)}
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
