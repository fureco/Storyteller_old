import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../../store/actions';

import TextInput from "./../../TextInput/TextInput";

export class Title extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			title: this.props.project.title,
		};
	}

	save(title) {
		this.props.setTitle(title);
		this.props.saveProject();
	}

	render() {
		return (
			<div id="Title"
				style={{
					display: "flex",
					flexDirection: "column",
					height: "30%",
					margin: "10px 0",
					fontSize: "48px",
					alignItems: "center",
					justifyContent: "center"
				}}
			>

				<TextInput
					id="TitleInput"
					placeholder="Title..."
					html={this.state.title} // innerHTML of the editable div
					disabled={false} // use true to disable edition
					save={this.save.bind(this)}
				/>

			</div>
		);
	}
}

function mapStateToProps({ project }) {
	return {
		project
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setTitle: title => dispatch(projectActions.setTitle(title)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Title)
