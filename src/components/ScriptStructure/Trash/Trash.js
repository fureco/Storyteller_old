import React from 'react';
import { connect } from 'react-redux';

import { projectActions } from "../../../store/actions";

import {
	Tree,
} from '@blueprintjs/core';

class Trash extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark
		};
	}

	render() {

		var treeContent = [];

		let trash =
		{
			id: treeContent.length,
			hasCaret: true,
			isExpanded: false,
			icon: "trash",
			label: "Trash",
		};

		treeContent.push(trash);

		return (

			<div id="Trash">

				<Tree contents={treeContent} />

			</div>
		);
	}
}

function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		deletePart: partID => dispatch(projectActions.deleteScriptPartAction(partID)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Trash)
