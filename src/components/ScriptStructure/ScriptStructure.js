import React from 'react';
import { connect } from 'react-redux';
import ScriptTitle from "../ScriptTitle/ScriptTitle";
import Nav from "./Nav/Nav";
import Parts from "./Parts/Parts";
import Trash from "./../Trash/Trash.index.js";

import "./ScriptStructure.css";

class ScriptStructure extends React.Component {

    constructor(props) {

		super(props);

		var parts = this.props.project.parts.filter((part) => {
			return part.deleted_at != null
		})

		parts = parts.map((part, index) => {
			return ({
				label: part.title
			});
		});

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark
			parts,
        };
	}

	render() {

		return (

			<div id="ScriptStructure">

				<ScriptTitle />

				<Nav vertical />

				<Parts />

				<Trash content={this.state.parts} />

			</div>
        );
	}
}

function mapStateToProps({ projectReducer }) {
    return {
		project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
	return {
    };
}

export default connect(
    mapStateToProps,
	mapDispatchToProps
)(ScriptStructure)
