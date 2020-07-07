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

import { getRoute } from './../../store/reducers/project/project.reducer.index';

class ScriptContent extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			route: props.route
		};
	}

	render() {

		if (this.state.route === "/script/title_author") {
			return (<TitleAndAuthor />);
		}

		if (this.state.route === "/script/abstract") {
			return (<Abstract />);
		}

		if (this.state.route === "/script/dedication") {
			return (<Dedication />);
		}

		if (this.state.route === "/script/parts") {
			return(<Parts />);
		}

		if (this.state.route === "/script/chapters") {
			return (<Chapters />);
		}

		if (this.state.route === "/script/scenes") {
			return(<ScenesRoute />);
		}

		return (<Cover />);
	}
}


function mapStateToProps({ project }) {

	return {
		route: getRoute(project),
	};
}

export default connect(
	mapStateToProps,
	null
)(ScriptContent)
