import React from 'react';
import { connect } from 'react-redux';
import ScriptTitle from "../ScriptTitle/ScriptTitle";
import Nav from "./Nav/Nav";
import Parts from "./Parts/Parts";
import Trash from "./Trash/Trash";

import "./ScriptStructure.css";

class ScriptStructure extends React.Component {

    constructor(props) {

        super(props);

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark
        };
	}

	render() {

		return (

			<div id="ScriptStructure">

				<ScriptTitle />

				<Nav />

				<Parts />

				<Trash />

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
