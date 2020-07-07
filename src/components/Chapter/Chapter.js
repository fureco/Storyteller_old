import React from 'react';
import { connect } from 'react-redux';

import { chapterActions } from '../../store/actions';

import TextInput from "./../TextInput/TextInput";

import Editor from '../Editor/Editor';

class Chapter extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			chapter: props.chapter,
			title: props.chapter.title
		};
	}

	render() {

		return (
			<div key={this.state.chapter.id}>
				<div id={`chapter-${this.state.chapter.id}`} style={{ position: "relative", top: "-10px", left: "0" }}></div>
				<h2>
					<TextInput
						id="ChapterTitleInput"
						placeholder="Title..."
						html={this.state.title} // innerHTML of the editable div
						onChange={this.onTitleChange.bind(this)}
						disabled={false} // use true to disable edition
						multiLine={true}
						save={this.saveTitle.bind(this)}
						style={{
							textAlign: this.state.textAlign
						}}
					/>
				</h2>
				<div style={{
					display: "flex",
					flexDirection: "column"
				}}>
					<Editor chapter={this.state.chapter} />
				</div>
			</div>
		);
	}

	onTitleChange(event) {
		this.setState({ "title": event.target.value });
	}

	saveTitle() {
		this.props.saveTitle(this.state.chapter, this.state.title);
	}
}

function mapStateToProps({ }) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
		saveTitle: (chapter, new_title) => dispatch(chapterActions.saveTitle(chapter.position, new_title)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chapter)
