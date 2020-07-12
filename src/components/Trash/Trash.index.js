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

		this.state = {
		};
	}

	render() {

		var nodes = [];

		let treeRoot =
		{
			id: nodes.length,
			disabled: this.props.content.length <= 0,
			hasCaret: true,
			isExpanded: false,
			icon: "trash",
			label: "Trash (" + this.props.content.length + ")",
			childNodes: []
		};

		this.props.content.forEach(element => {

			let treeItem =
			{
				id: treeRoot.childNodes.length,
				isExpanded: false,
				label: element,
			};

			treeRoot.childNodes.push(treeItem);
		});

		nodes.push(treeRoot);

		return (

			<div id="Trash">

				<Tree
					contents={nodes}
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

function mapStateToProps({ chapters, }) {
	return {

	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Trash)
