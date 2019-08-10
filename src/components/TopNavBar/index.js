import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { openProjectAction } from "../../actions";

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

class TopNavBar extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      selectedTabId: 'write',
    };
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
                    this.props.openProject(result[0])
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

function mapStateToProps () {
  return {
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openProject: (filePath) => dispatch(openProjectAction(filePath)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavBar)