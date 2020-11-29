import React from 'react';
import { connect } from 'react-redux';
import * as projectActions from '../../store/project/project.actions';

import Chapter from "./Chapter/Chapter";
import ChapterCreationDialog from "./ChapterCreationDialog";

import "./Chapters.css"

class Chapters extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		var content =
			<div>
				<div style={{ paddingBottom: '15px' }}>
					Your project has no chapters yet. Start writing your book by creating the first chapter now.
				</div>
				<div><ChapterCreationDialog /></div>
			</div>

		if (this.props.chapter) {
			content = <Chapter key={this.props.chapter.id} chapter={this.props.chapter} />
		}

		return (
			<div id="Chapters" style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: `100%`,
				height: `100%`,
			}}>
				{content}
			</div>
		);
	}
}

function mapStateToProps({ project, chapters }) {
	return {
		project,
		chapter: project.selectedChapter || chapters[0],
	};
}

function mapDispatchToProps(dispatch) {
	return {
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chapters)
