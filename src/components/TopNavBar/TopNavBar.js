import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { appStateActions, projectActions } from "../../store/actions";

import './TopNavBar.css';

import {
    Alignment,
    Button,
	Icon,
	Menu,
	MenuItem,
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
        };
	}

	handleThemeChange(theme) {
		this.props.changeTheme(theme);
		this.props.saveAppState();
	}

	handleTabChange(navbarTabId) {
		this.props.changeCurrentRootRoute(navbarTabId);
		this.props.saveAppState();
	}

	render() {

		var settings = (
			<Menu>
				<MenuItem text="Project">
					<MenuItem text="Open" icon="folder-open" onClick={() => {
						dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
							// console.log("result: " + JSON.stringify(result));
							if (!result.canceled) {
								this.props.openProject(result.filePaths[0])
							}
						});
					}} />
					<MenuItem text="Create" icon="folder-new" onClick={() => {
						dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
							// console.log("result: " + JSON.stringify(result));
							if (!result.canceled) {
								this.props.createProject(result.filePaths[0])
							}
						});
					}} />
					{this.props.appState.path && <MenuItem text="Save Backup" icon="archive" onClick={() => { this.props.archiveProject() }} />}
					{this.props.appState.path && <MenuItem text="Restore Backup" icon="unarchive" onClick={() => { }} />}
					{this.props.appState.path && <MenuItem text="Close" icon="delete" onClick={() => this.props.closeProject()} />}
				</MenuItem>
				<MenuItem text="Theme">
					<MenuItem text="Light Mode" active={this.props.appState.theme == 'bp3-body'} onClick={() => this.handleThemeChange('bp3-body')} />
					<MenuItem text="Dark Mode" active={this.props.appState.theme == 'bp3-dark'} onClick={() => this.handleThemeChange('bp3-dark')} />
				</MenuItem>
			</Menu>
		)

        return (
			<Navbar id="TopNavBarContainer" className={this.props.appState.theme}>

				<NavbarGroup id="TopNavBarGroupLeft" align={Alignment.LEFT}>

					<Popover content={settings} position={Position.BOTTOM_RIGHT}>
						<Button minimal={true} icon="settings" />
					</Popover>

					<NavbarDivider />

                    { this.props.appState.path &&
						<Tabs id="TopNavTabs" onChange={this.handleTabChange.bind(this)} selectedTabId={this.props.appState.route.current} animate="true">
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

function mapStateToProps({ appStateReducer, projectReducer }) {
    return {
        appState: appStateReducer,
		project: projectReducer,
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
		// app_state
		changeCurrentRootRoute: (navbarTabId) => dispatch(appStateActions.changeCurrentRootRoute(navbarTabId)),
		changeTheme: (theme) => dispatch(appStateActions.changeTheme(theme)),
		saveAppState: () => dispatch(appStateActions.save()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopNavBar)
