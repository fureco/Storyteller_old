import React from 'react';

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarGroup,
  Position,
  Tooltip
} from '@blueprintjs/core';

import { remote } from 'electron';
const { dialog } = require('electron').remote;

export default class TopNavBar extends React.Component {
  
    setPathToProject(path_to_project){
        this.props.setPathToProject(path_to_project) 
    }

    render() {
    return (
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <Tooltip content="Open project" position={Position.BOTTOM}>
              <Button 
                className={Classes.MINIMAL} 
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
                className={Classes.MINIMAL} 
                icon="floppy-disk"
              />
            </Tooltip>
            <Tooltip content="Write" position={Position.BOTTOM}>
              <Button 
                className={Classes.MINIMAL} 
                icon="draw"
              />
            </Tooltip>
            <Tooltip content="Characters" position={Position.BOTTOM}>
              <Button 
                className={Classes.MINIMAL} 
                icon="people"
              />
            </Tooltip>
            <Tooltip content="Places" position={Position.BOTTOM}>
              <Button 
                className={Classes.MINIMAL} 
                icon="map-marker"
              />
            </Tooltip>
            <Tooltip content="Timeline" position={Position.BOTTOM}>
              <Button 
                className={Classes.MINIMAL} 
                icon="time"
              />
            </Tooltip>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Tooltip content="Quit Storyteller" position={Position.BOTTOM}>
              <Button
                className={Classes.MINIMAL}
                icon="small-cross"
                onClick={() => remote.app.quit()}
              />
            </Tooltip>
          </NavbarGroup>
        </Navbar>
    );
  }
}
