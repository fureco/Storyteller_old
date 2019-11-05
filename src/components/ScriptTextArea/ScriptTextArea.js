import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { appStateActions } from "./../../store/actions";

import './ScriptTextArea.css';

import Nav from './../ScriptStructure/Nav/Nav.js';

import Abstract from '../Abstract/Abstract';
import Dedication from '../Dedication/Dedication';
import Parts from '../Parts/Parts';

import {
	Tab,
	Tabs,
} from '@blueprintjs/core';

class ScriptTextArea extends React.Component {

    constructor(props) {

        super(props);

		this.state = {
        };
	}

	handleTabChange(navbarTabId) {
		this.props.changeCurrentScriptStructureRoute(navbarTabId);
		this.props.saveAppState();
	}

    render() {

        return (
			<div
				id="ScriptTextArea"
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					flexGrow: 1,
					overflow: 'auto',
					border: '1px solid #ddd',
					padding: '0 1%',
				}}
			>

				<Nav />

				<div id="ScriptStructureContent">
					<Switch>
						<Redirect exact from="/script/structure" to="/script/structure/abstract" />
						<Route path="/script/structure/abstract" component={() => { return <Abstract /> }} />
						<Route path="/script/structure/dedication" component={() => { return <Dedication /> }} />
						<Route path="/script/structure/parts" component={() => { return <Parts /> }} />
						<Route path="/script/structure/chapters" component={() => { return "Chapters" }} />
						<Route path="/script/structure/scenes" component={() => { return "Scenes" }} />
					</Switch>
				</div>
            </div>
        );
    }
}

function mapStateToProps({ appStateReducer, projectReducer }) {
  return {
	  project: projectReducer,
	  selectedTabId: appStateReducer.route.script.structure ? appStateReducer.route.script.structure.current : 'abstract'
  };
}

function mapDispatchToProps(dispatch) {
	return {
		changeCurrentScriptStructureRoute: (navbarTabId) => dispatch(appStateActions.changeCurrentScriptStructureRoute(navbarTabId)),
		saveAppState: () => dispatch(appStateActions.save()),
	};
}

export default connect(
  	mapStateToProps,
	mapDispatchToProps
)(withRouter(ScriptTextArea))
