import React from 'react';

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

export default class TopNavBar extends React.Component {

  constructor() {

    super();

    this.state = {
      selectedTabId: 'write',
    };
  }
  
  setPathToProject(path_to_project){
      this.props.setPathToProject(path_to_project) 
  }

  handleTabChange(navbarTabId){
    this.setState({ selectedTabId: navbarTabId });
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
                <Icon icon="draw" /> Write
              </Tab>
              <Tab id="characters">
                <Icon icon="people" /> Characters
              </Tab>
              <Tab id="places">
                <Icon icon="map-marker" /> Places
              </Tab>
              <Tab id="timeline">
                <Icon icon="time" /> Timeline
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
