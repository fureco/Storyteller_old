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
		this.props.selectMainArea(navbarTabId);
		this.props.saveAppState();
	}

	render() {

		var settings = (
			< Menu >
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

					{this.props.appState.path &&
						<NavbarDivider />
					}

					{this.props.appState.path &&
						<Tooltip content="Open project" position={Position.BOTTOM}>
							<OpenProjectButton minimal={true} />
						</Tooltip>
					}

					{this.props.appState.path &&
						<Tooltip content="Close project" position={Position.BOTTOM}>
							<Button
								minimal={true}
								icon="folder-close"
								onClick={() => { this.props.closeProject() }}
							/>
						</Tooltip>
					}

					{this.props.appState.path &&
						<Tooltip content="Create new project" position={Position.BOTTOM}>
							<CreateProjectButton minimal={true} />
						</Tooltip>
					}

					{this.props.appState.path &&
						<NavbarDivider />
					}

                    { this.props.appState.path &&
						<Tabs id="TopNavTabs" onChange={this.handleTabChange.bind(this)} selectedTabId={this.props.appState.selectedMainArea} animate="true">
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
    return {
        appState: appStateReducer,
		project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
	return {
		closeProject: () => dispatch(projectActions.closeProjectAction()),
		selectMainArea: (navbarTabId) => dispatch(appStateActions.selectMainArea(navbarTabId)),
		changeTheme: (theme) => dispatch(appStateActions.changeTheme(theme)),
		saveAppState: () => dispatch(appStateActions.save()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopNavBar)
