import React from 'react';
import { connect } from 'react-redux';
import Title from "./Title/Title";
import Author from "./Author/Author";

import {
	PagePreview
} from './../../components';

class TitleAndAuthor extends React.Component {

	constructor(props) {

		super(props);
	}

	render() {

		return (

			<div id="TitleAndAuthor" style={{
				width: `100%`,
				height: `100%`,
			}}>
				<PagePreview content={
					<div id="TitleAndAuthorContent" style={{
						display: `flex`,
						flexDirection: `column`,
						justifyContent: `center`,
						height: `100%`
					}}>
						<Title />
						<Author />
					</div>
				} />
			</div>
		);
	}
}

function mapStateToProps({ appState }, ownProps) {

	return {
		appState,
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TitleAndAuthor)
