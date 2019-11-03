import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { appStateActions, projectActions } from "../../store/actions";

import { CreateProjectButton, OpenProjectButton } from './../../components';

import './TopNavBar.css';

import {
    Alignment,
    Button,
    Icon,
    Navbar,
    NavbarGroup,
    NavbarDivider,
    Position,
    Tab,
    Tabs,
    Tooltip,
} from '@blueprintjs/core';

import { remote } from 'electron';

export class TopNavBar extends React.Component {

    constructor(props) {

        super(props);

		this.state = {
        };
    }

    handleTabChange(navbarTabId) {
		this.props.setRoute(window.location.hash);
		this.props.saveAppState();
	}

    render() {
        return (
            <Navbar id="TopNavBarContainer">

                <NavbarGroup id="TopNavBarGroupLeft" align={Alignment.LEFT}>

                    <Tooltip content="Open project" position={Position.BOTTOM}>
						<OpenProjectButton minimal={true} />
                    </Tooltip>
                    <Tooltip content="Close project" position={Position.BOTTOM}>
                        <Button
                            minimal={true}
                            icon="folder-close"
                            onClick={ () => {this.props.closeProject()} }
                        />
                    </Tooltip>
                    <Tooltip content="Create new project" position={Position.BOTTOM}>
						<CreateProjectButton minimal={true} />
					</Tooltip>

                    <NavbarDivider />

                    { this.props.appState.path &&
						<Tabs id="TopNavTabs" onChange={this.handleTabChange.bind(this)} selectedTabId={this.props.selectedTabId} animate="true">
                            <Tab id="/script">
                                <Link to="/script"><Icon icon="draw" /> Script</Link>
                            </Tab>
                            <Tab id="/characters">
                                <Link to="/characters"><Icon icon="people" /> Characters</Link>
                            </Tab>
                            <Tab id="/locations">
                                <Link to="/locations"><Icon icon="map-marker" /> Locations</Link>
                            </Tab>
                            <Tab id="/timeline">
                                <Link to="/timeline"><Icon icon="time" /> Timeline</Link>
                            </Tab>
                        </Tabs>
                    }

                </NavbarGroup>

                <NavbarGroup id="TopNavBarGroupRight" align={Alignment.RIGHT}>
                    <Tooltip content="Quit Storyteller" position={Position.BOTTOM}>
						<Button
							minimal={true}
							icon="small-cross"
							onClick={() => remote.app.quit()}
						/>
                    </Tooltip>
                </NavbarGroup>

            </Navbar>
        );
    }
}

function mapStateToProps({ appStateReducer, projectReducer }) {

	let tabId = '/script';
	let splitted_location = appStateReducer.route.replace("#", "").split("/");

	if (splitted_location[1]) {
		tabId = "/" + splitted_location[1];
	}

    return {
        appState: appStateReducer,
		project: projectReducer,
		selectedTabId: tabId,
    };
}

function mapDispatchToProps (dispatch) {
    return {
		setRoute: (route) => dispatch(appStateActions.setRoute(route)),
        closeProject: () => dispatch(projectActions.closeProjectAction()),
		saveAppState: () => dispatch(appStateActions.save()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopNavBar)
