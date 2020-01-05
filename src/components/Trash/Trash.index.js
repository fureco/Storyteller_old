import React from 'react';
import { connect } from 'react-redux';

import { projectActions } from "../../store/actions";

import './Trash.css';

import {
	Icon,
	Tree,
} from '@blueprintjs/core';

class Trash extends React.Component {

	constructor(props) {

		super(props);

		var nodes = [];

		let treeRoot =
		{
			id: nodes.length,
			disabled: props.content.length <= 0,
			hasCaret: props.content.length > 0,
			isExpanded: false,
			icon: "trash",
			label: "Trash (" + props.content.length + ")",
			childNodes: []
		};

		props.content.forEach(element => {

			let treeItem =
			{
				id: treeRoot.childNodes.length,
				isExpanded: false,
				label: element.label,
			};

			treeRoot.childNodes.push(treeItem);
		});

		nodes.push(treeRoot);

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark
			nodes,
		};
	}

	render() {

		return (

			<div id="Trash">

				<Tree
					contents={this.state.nodes}
					onNodeClick={this.handleNodeClick.bind(this)}
					onNodeCollapse={this.handleNodeCollapse.bind(this)}
					onNodeExpand={this.handleNodeExpand.bind(this)}
				/>

			</div>
		);
	}

	handleNodeClick(nodeData, _nodePath, e) {
		nodeData.isExpanded = !nodeData.isExpanded;
		this.setState(this.state);
	}

	handleNodeCollapse(nodeData) {
		nodeData.isExpanded = false;
		this.setState(this.state);
	}

	handleNodeExpand(nodeData) {
		nodeData.isExpanded = true;
		this.setState(this.state);
	}

	forEachNode(nodes, callback) {

		if (nodes == null) {
			return;
		}

		for (const node of nodes) {
			callback(node);
			this.forEachNode(node.childNodes, callback);
		}
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
