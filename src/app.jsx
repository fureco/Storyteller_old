import React from 'react';

import {
  Alignment,
  Button,
  Classes,
  Colors,
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

const { dialog } = require('electron').remote

export default class App extends React.Component {
  
  constructor() {

    super();

    this.state = {
      path_to_open_project: 'No project selected.',
      statistic: {
        words: 0,
        chars: 0,
      },
    };

    this.onInput = this.onInput.bind(this);
  }

  onInput() {
    const textField = document.querySelector('#TextField');
    const textBeforCaret = textField.value.slice(0, textField.selectionStart);
    const words = textBeforCaret.split(' ');
    this.setState({ statistic: {
      words: words.length,
      chars: textField.value.length,
    } });
  }

  render() {
    return (
      <div id="Layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <Tooltip content="Open project" position={Position.BOTTOM}>
              <Button 
                className={Classes.MINIMAL} 
                icon="folder-open"
                onClick={() => {
                  var result = dialog.showOpenDialog({ properties: ['openDirectory']});
                  if(result) {
                    this.setState({ path_to_open_project: result[0] }) 
                  } 
                }}
              />
            </Tooltip>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Tooltip content="Quit Storyteller" position={Position.BOTTOM}>
              <Button
                className={Classes.MINIMAL}
                icon="small-cross"
                onClick={() => app.quit()}
              />
            </Tooltip>
          
          </NavbarGroup>
        </Navbar>

        <div
          id="path_to_open_project"
          style={{
            backgroundColor: Colors.LIGHT_GRAY5,
            borderBottom: `1px solid ${Colors.LIGHT_GRAY1}`,
            height: '50px',
            padding: 12,
          }}
        >
          {this.state.path_to_open_project}
        </div>

        <div id="Main" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

          <textarea
            id="TextField"
            style={{
              height: '100%',
              flexGrow: 1,
              overflow: 'auto',
              border: '1px solid #ddd',
              resize: 'none',
              outline: 'none',
            }}
            onKeyDown={this.onInput}
          />
        </div>

        <div
          id="StatusBar"
          style={{
            backgroundColor: Colors.LIGHT_GRAY5,
            borderTop: `1px solid ${Colors.LIGHT_GRAY1}`,
            height: '50px',
            padding: 12,
          }}
        >
          words: {this.state.statistic.words} - chars: {this.state.statistic.chars}
        </div>

      </div>
    );
  }
}
