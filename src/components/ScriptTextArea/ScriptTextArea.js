import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter, Switch, Redirect } from "react-router-dom";
// import { projectActions } from './../../../store/actions';

import './ScriptTextArea.css';

import Abstract from '../Abstract/Abstract';
import Dedication from '../Dedication/Dedication';
import Parts from '../Parts/Parts';

import {
	Button,
	Tab,
	Tabs,
	TextArea
} from '@blueprintjs/core';

class ScriptTextArea extends React.Component {

    constructor(props) {

        super(props);

		this.state = {
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

				<Tabs id="ScriptNav" selectedTabId={this.state.selectedTabId} animate="true">
					<Tab id="/script/structure/abstract">
						<Link to="/script/structure/abstract">Abstract</Link>
					</Tab>
					<Tab id="/script/structure/dedication">
						<Link to="/script/structure/dedication">Dedication</Link>
					</Tab>
					<Tab id="/script/structure/parts">
						<Link to="/script/structure/parts">Parts</Link>
					</Tab>
					<Tab id="/script/structure/chapters" title="Chapters" />
					<Tab id="/script/structure/scenes" title="Scenes" />
				</Tabs>

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

function mapStateToProps ({ projectReducer }) {
  return {
    project: projectReducer,
  };
}

function mapDispatchToProps(dispatch) {
	return {
		// setAbstract: abstract => dispatch(projectActions.setAbstractAction(abstract)),
	};
}

export default connect(
  	mapStateToProps,
	mapDispatchToProps
)(withRouter(ScriptTextArea))
