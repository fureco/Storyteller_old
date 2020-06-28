import React from 'react';
import { connect } from 'react-redux';
import { projectActions, chapterActions } from '../../../../store/actions';

import Editor from './../../../../components/Editor/Editor';

import "./chapters.css"

class ChaptersRoute extends React.Component {

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
					<div key={chapter.id}>
						<div id={`chapter-${chapter.id}`} style={{ position: "relative", top: "-10px", left: "0" }}></div>
						<h2>{chapter.title}</h2>
						<div style={{
							display: "flex",
						}}>
							<Editor text={chapter.text} save={(new_text) => this.props.saveText(chapter, new_text)} />
						</div>
					</div>
				))}
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
		saveText: (chapter, new_text) => dispatch(chapterActions.saveText(chapter.position, new_text)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChaptersRoute)
