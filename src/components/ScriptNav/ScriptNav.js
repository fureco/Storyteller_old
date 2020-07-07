import React from 'react';
import { connect } from 'react-redux';
import Nav from "./Nav/Nav";
import Parts from "./Parts/Parts";
import Chapters from "./Chapters/Chapters";
import Chapter from "./Chapters/Chapter";
import Scenes from "./Scenes/Scenes";
import Trash from "../Trash/Trash.index.js";

class ScriptNav extends React.Component {

    constructor(props) {

		super(props);

		var parts = this.props.parts.filter((part) => {
			return part.deleted_at != null
		})

		if (parts) {
			parts = parts.map((part, index) => {
				return ({
					label: part.title
				});
			});
		}

		var deleted_chapters = this.props.chapters.filter((chapter) => {
			return chapter.deleted_at != null
		})

		var trash_content = deleted_chapters.length > 0 ? deleted_chapters.map(element => {
			return <Chapter
				key={element.id}
				draggableId={`chapter-${element.id}`}
				position={element.position}
				chapter={element}
			/>
		}) : [];

		this.state = {
			parts,
			trash_content
		};
	}

	render() {

		return (

			<div id="ScriptStructure">

				<Nav vertical />

				{/* <Parts /> */}

				<Chapters />

				{/* <Scenes /> */}

				{<Trash content={this.state.trash_content} />}

			</div>
        );
	}
}

function mapStateToProps({ partsReducer, chapters }) {
    return {
		parts: partsReducer,
		chapters
    };
}

function mapDispatchToProps (dispatch) {
	return {
    };
}

export default connect(
    mapStateToProps,
	mapDispatchToProps
)(ScriptNav)
