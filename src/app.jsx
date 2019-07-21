import React from 'react';

import {
  Button,
  Classes,
  Menu,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  Popover,
  Position,
  Tooltip
} from '@blueprintjs/core';

import { remote } from 'electron';

const app = remote.app;

export default class App extends React.Component {
  render() {
    return (
      <div id="Layout">
        <Navbar>
          <NavbarGroup>

            <Tooltip content="Open project" position={Position.BOTTOM}>
              <Button 
                className={Classes.MINIMAL} 
                icon="folder-open" 
              />
            </Tooltip>

            <Tooltip content="Quit Storyteller" position={Position.BOTTOM}>
              <Button
                className={Classes.MINIMAL}
                icon="small-cross"
                onClick={() => app.quit()}
              />
            </Tooltip>
          
          </NavbarGroup>
        </Navbar>

        <div id="Main">
          <h2>Welcome to Storyteller!</h2>
        </div>

      </div>
    );
  }
}
