import React from 'react';
import { connect } from 'react-redux';
import * as projectActions from '../../store/project/project.actions';

import Chapter from "./../Chapter/Chapter";
import ChapterCreationDialog from "./../ChapterCreationDialog";

import "./Chapters.css"

class Chapters extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		return (
			<div id="Chapters" style={{
				width: `100%`,
				height: `100%`,
			}}>
				{this.props.chapters.sort(this.sortByPosition).map((chapter, index) => (
					<Chapter key={chapter.id} chapter={chapter} />
				))}

				{/* <div><ChapterCreationDialog /></div> */}
			</div>
		);
	}

	sortByPosition(a, b) {
		let comparison = 0;
		if (a.position > b.position) {
			comparison = 1;
		} else if (a.position < b.position) {
			comparison = -1;
		}
		return comparison;
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
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chapters)
