import React from 'react';
import { connect } from 'react-redux';

import {
	Cover,
	TitleAndAuthor,
	Abstract,
	Parts
} from '../../../../components';

import Chapters from './../../../../components/Chapters/Chapters';
import Dedication from './../../../../components/Dedication/Dedication';

export class ScriptRouteContent extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
		};
	}

	render() {

		return (
			<div
				id="ScriptRouteContent"
				style={{
					overflow: 'auto',
					resize: 'none',
					outline: 'none',
					padding: '10px',
					flex: '1',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Content id="Content" route={this.props.route} />
			</div>
		);
	}
}

export function Content(props) {

	if (props.route === "title_author") {
		return (<TitleAndAuthor />);
	}

	if (props.route === "abstract") {
		return (<Abstract />);
	}

	if (props.route === "dedication") {
		return (<Dedication />);
	}

	if (props.route === "parts") {
		return (<Parts />);
	}

	if (props.route === "chapters") {
		return (<Chapters />);
	}

	return (<Cover />);
}

import { getRoute } from './../../../../store/project/project.selectors';

function mapStateToProps({ project }) {
	return {
		route: getRoute(project)
	};
}

export default connect(
	mapStateToProps,
	null
)(ScriptRouteContent)
