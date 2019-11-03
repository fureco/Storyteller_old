import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ScriptTitle from "../ScriptTitle/ScriptTitle";
import Parts from "./Parts/Parts";
import Trash from "./Trash/Trash";

import "./ScriptStructure.css";

import {
	Tab,
	Tabs,
} from '@blueprintjs/core';

class ScriptStructure extends React.Component {

    constructor(props) {

        super(props);

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark

            isInEditMode: false,
			showPartCreationDialog: false,
			selectedTabId: this.getTabId(),
        };
	}

	getTabId() {
		let tabId = '/script/structure/abstract';
		let splitted_location = window.location.hash.replace("#", "").split("/");
		if (splitted_location[1] && splitted_location[2] && splitted_location[3]) {
			tabId = "/" + splitted_location[1] + "/" + splitted_location[2] + "/" + splitted_location[3];
		}
		return tabId;
	}

    componentDidMount() {
        if(!this.props.project.title || this.props.project.title <= 0) {
            this.setState({ isInEditMode: true });
        }
	}

	render() {

		return (

			<div id="ScriptStructure">

				<ScriptTitle />

				<Tabs id="ScriptStructureNav" selectedTabId={this.state.selectedTabId} animate="true" vertical="true">
					<Tab id="/script/structure/abstract">
						<Link to="/script/structure/abstract">Abstract</Link>
					</Tab>
					<Tab id="/script/structure/dedication">
						<Link to="/script/structure/dedication">Dedication</Link>
					</Tab>
					<Tab id="/script/structure/parts">
						<Link to="/script/structure/parts">Parts</Link>
					</Tab>
				</Tabs>

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
