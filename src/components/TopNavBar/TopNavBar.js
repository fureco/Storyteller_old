import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { appStateActions, projectActions } from "../../store/actions";

import './TopNavBar.css';

import Settings from './components/Settings.js';

import {
    Alignment,
    Button,
	Icon,
    Navbar,
    NavbarGroup,
    NavbarDivider,
	Position,
	Popover,
    Tab,
    Tabs,
    Tooltip,
} from '@blueprintjs/core';

import { remote } from 'electron';

const fs = require('fs');
const { dialog } = require('electron').remote;

export class TopNavBar extends React.Component {

    constructor(props) {

        super(props);

		this.state = {
			workspaceIsOpen: props.workspaceIsOpen || false
        };
	}

	handleTabChange(navbarTabId) {
		this.props.changeCurrentRootRoute(navbarTabId);
		this.props.save();
	}

	handleClickOnWorkspace() {
		this.props.closeProject()
	}

	render() {

        return (
			<Navbar id="TopNavBarContainer" className={this.props.appState.theme}>

				<NavbarGroup id="TopNavBarGroupLeft" align={Alignment.LEFT}>

					{/* SETTINGS DROPDOWN */}
					<Popover content={<Settings />} position={Position.BOTTOM_RIGHT}>
						<Button minimal={true} icon="settings" />
					</Popover>

					<NavbarDivider />

					<Button
						id="WorkspaceButton"
						minimal={true}
						icon="box"
						text="Workspace"
						disabled={ this.state.workspaceIsOpen }
						onClick={() => this.props.closeProject()}
					/>

					<NavbarDivider />

					{/* SECTION TABS */}
                    { this.props.appState.path &&
						<Tabs id="TopNavTabs" onChange={this.handleTabChange.bind(this)} selectedTabId={this.props.project.route.current} animate="true">
                            <Tab id="script">
                                <Link to="/script"><Icon icon="draw" /> Script</Link>
                            </Tab>
                            <Tab id="characters">
                                <Link to="/characters"><Icon icon="people" /> Characters</Link>
                            </Tab>
                            <Tab id="locations">
                                <Link to="/locations"><Icon icon="map-marker" /> Locations</Link>
                            </Tab>
                            <Tab id="timeline">
                                <Link to="/timeline"><Icon icon="time" /> Timeline</Link>
							</Tab>
							<Tab id="preview">
								<Link to="/preview"><Icon icon="eye-open" /> Preview</Link>
							</Tab>
							{/* <Tab id="export">
								<Link to="/export"><Icon icon="export" /> Export</Link>
							</Tab> */}
                        </Tabs>
                    }

                </NavbarGroup>

				<NavbarGroup id="TopNavBarGroupRight" align={Alignment.RIGHT}>

					{this.props.appState.path &&
						<Button
							minimal={true}
							icon="export"
							text="Export"
							onClick={() => this.props.exportAsEpub()}
						/>
					}

					<NavbarDivider />

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

function mapStateToProps({ appStateReducer, project }) {
    return {
        appState: appStateReducer,
		project
    };
}

function mapDispatchToProps (dispatch) {
	return {
		// project
		openProject: (filePath) => dispatch(projectActions.openProjectAction(filePath)),
		closeProject: () => dispatch(projectActions.closeProjectAction()),
		createProject: (filePath) => dispatch(projectActions.createProjectAction(filePath)),
		archiveProject: () => dispatch(projectActions.archive()),
		exportAsEpub: () => dispatch(projectActions.exportAsEpub()),
		changeCurrentRootRoute: (navbarTabId) => dispatch(projectActions.changeCurrentRootRoute(navbarTabId)),
		save: () => dispatch(projectActions.save()),
		// app_state
		changeTheme: (theme) => dispatch(appStateActions.changeTheme(theme)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopNavBar)
