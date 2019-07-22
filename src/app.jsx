import React from 'react';

import {
  Colors,
} from '@blueprintjs/core';

import FileTree from 'react-filetree-electron';

import TopNavBar from './components/TopNavBar';

export default class App extends React.Component {
  
  constructor() {

    super();

    this.state = {
      path_to_project: 'No project selected.',
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
    this.setState({ 
      statistic: {
        words: words.length,
        chars: textField.value.length,
      } 
    });
  }

  setPathToProject(value){
    this.setState({path_to_project: value});
  }

  render() {
    return (
      <div id="Layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        <TopNavBar setPathToProject={this.setPathToProject.bind(this)}/>

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

        <div id="Main" style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>

          <div
            id="DirectoryTreeView"
            style={{
              height: '100%',
              flexGrow: 1,
              overflow: 'auto',
              border: '1px solid #ddd',
              resize: 'none',
              outline: 'none',
            }}
            onKeyDown={this.onInput}
          >
            <FileTree directory={this.state.path_to_project} />
          </div>

          <textarea
            id="TextField"
            style={{
              height: '100%',
              flexGrow: 3,
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
