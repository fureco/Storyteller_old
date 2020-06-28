import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../../store/actions';

import TextInput from "./../../TextInput/TextInput";

export class Title extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			title: this.props.project.title,
			fontSize: this.props.project.styles.title.fontSize
		};
	}

	save() {
		this.props.setTitle(this.state.title);
		this.props.saveProject();
	}

	onChange(event) {
		this.setState({ "title": event.target.value });
	}

	render() {
		return (
			<div id="Title"
				style={{
					display: "flex",
					flexDirection: "column",
					fitContent: "100%",
					margin: "10px 0",
					fontSize: this.state.fontSize,
					alignItems: "center",
					justifyContent: "center"
				}}>
				<TextInput
					id="TitleInput"
					style={{
						textAlign: "center"
					}}
					placeholder="Title..."
					html={this.state.title} // innerHTML of the editable div
					disabled={false} // use true to disable edition
					onChange={this.onChange.bind(this)}
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
