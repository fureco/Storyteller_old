import React from 'react';
import { connect } from 'react-redux';

import {
	Cover,
	TitleAndAuthor,
	Abstract,
	Parts
} from './../../components';

import Chapters from './../../components/Chapters/Chapters';
import Dedication from './../../components/Dedication/Dedication';

import { getRoute } from './../../store/project/project.reducer';

class ScriptContent extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		if (this.props.route === "title_author") {
			return (<TitleAndAuthor />);
		}

		if (this.props.route === "abstract") {
			return (<Abstract />);
		}

		if (this.props.route === "dedication") {
			return (<Dedication />);
		}

		if (this.props.route === "parts") {
			return(<Parts />);
		}

		if (this.props.route === "chapters") {
			return (<Chapters />);
		}

		if (this.props.route === "scenes") {
			return(<ScenesRoute />);
		}

		return (<Cover />);
	}
}


function mapStateToProps({ project }) {

	let route = project.route.script.current

	return {
		project,
		route
	};
}

export default connect(
	mapStateToProps,
	null
)(ScriptContent)
