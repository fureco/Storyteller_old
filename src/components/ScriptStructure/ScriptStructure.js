import React from 'react';
import { connect } from 'react-redux';
import ScriptTitle from "../ScriptTitle/ScriptTitle";
import Nav from "./Nav/Nav";
import Parts from "./Parts/Parts";
import Scenes from "./Scenes/Scenes";
import Trash from "./../Trash/Trash.index.js";

import "./ScriptStructure.css";

class ScriptStructure extends React.Component {

    constructor(props) {

		super(props);

		var parts = this.props.parts.filter((part) => {
			return part.deleted_at != null
		})

		if (parts) {
			parts = parts.map((part, index) => {
				return ({
					label: part.title
				});
			});
		}

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

				{/* <Parts /> */}

				<Scenes />

				<Trash content={this.state.parts} />

			</div>
        );
	}
}

function mapStateToProps({ partsReducer }) {
    return {
		parts: partsReducer,
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
