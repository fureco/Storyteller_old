import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../../../store/actions';

import AnchorLink from 'react-anchor-link-smooth-scroll';

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
				<div>window.location.hash: {window.location.hash}</div>

				{/* {this.props.chapters.map((chapter, index) => (
					<div>
						<AnchorLink href='#chapter_'><h2>{chapter.title}</h2></AnchorLink>
						<section id='things'>
							bla bla
						</section>
					</div>
				))} */}

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
