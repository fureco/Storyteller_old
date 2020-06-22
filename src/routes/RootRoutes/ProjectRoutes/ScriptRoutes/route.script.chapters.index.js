import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../../../store/actions';

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
				{this.props.chapters.map((chapter, index) => (
					<div key={chapter.id}>
						<div id={`chapter-${chapter.id}`} style={{ position: "relative", top: "-10px", left: "0"}}></div>
						{/* <section id={`chapter-${chapter.id}`}> */}
							<h2>{chapter.title}</h2>
								chapter-${chapter.id}
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
							{/* </section> */}
					</div>
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
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChaptersRoute)
