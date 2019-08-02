import React from 'react';
import { Link } from "react-router-dom";
import { openProject } from "../../reducers";

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
const { dialog } = require('electron').remote;

import store from '../../store';

export default class TopNavBar extends React.Component {

  constructor() {

    super();

    this.state = {
      selectedTabId: 'write',
    };

    console.log(store.getState())
  }

  setPathToProject(path_to_project){
      this.props.setPathToProject(path_to_project) 
      // this.props.openProject(path_to_project)
  }

  setSelectedMainArea(selectedTabId){
    this.props.setSelectedMainArea(selectedTabId) 
  }

  handleTabChange(navbarTabId){
    this.setState({ selectedTabId: navbarTabId });
    this.setSelectedMainArea(navbarTabId);
  } 

  render() {
    return (
        <Navbar>
          
          <NavbarGroup align={Alignment.LEFT}>
            
            <Tooltip content="Open project" position={Position.BOTTOM}>
              <Button 
                minimal={true}
                icon="folder-open"
                onClick={() => {
                  var result = dialog.showOpenDialog({ properties: ['openDirectory']});
                  if(result) {
                    this.setPathToProject(result[0]) 
                  } 
                }}
              />
            </Tooltip>
            <Tooltip content="Save" position={Position.BOTTOM}>
              <Button 
                minimal={true}
                icon="floppy-disk"
              />
            </Tooltip>
            
            <NavbarDivider />

            <Tabs id="TopNav" onChange={this.handleTabChange.bind(this)} selectedTabId={this.state.selectedTabId} animate="true">
              <Tab id="write">
                <Link to="/"><Icon icon="draw" /> Write</Link>
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

          </NavbarGroup>

          <NavbarGroup align={Alignment.RIGHT}>
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
