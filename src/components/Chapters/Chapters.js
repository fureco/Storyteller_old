import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../store/actions';

import { PagePreview } from './../../components';
import TextInput from "./../TextInput/TextInput";

class Chapters extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			text: props.project.abstract,
		};
	}

	componentDidUpdate() {
		if (this.props.project.abstract !== this.state.text) {
			this.setState({ text: this.props.project.abstract });
		}
	}

	save(text) {
		this.props.setAbstract(text);
		this.props.saveProject();
	}

	render() {

		return (
			<div id="Chapters" style={{
				width: `100%`,
				height: `100%`,
			}}>
				{this.props.chapters.map((chapter, index) => (
					chapter.title
				))}
			</div>
		);
	}
}

function mapStateToProps({ project, chapters }) {
	return {
		project,
		chapters: chapters.filter((chapter) => {
			return chapter.deleted_at == null
		}),
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
)(Chapters)
