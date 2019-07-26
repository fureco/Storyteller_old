import React from 'react';

import {
  Colors,
} from '@blueprintjs/core';

import TopNavBar from './components/TopNavBar';
import MainArea from './components/MainArea';

export default class App extends React.Component {
  
  constructor() {

    super();

    this.state = {
      path_to_project: 'No project selected.',
      selectedTabId: 'script',
      selectedMainArea: 'write',
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
    this.setState({ path_to_project: value });
  }

  handleTabChange(navbarTabId){
    this.setState({ selectedTabId: navbarTabId });
  } 

  setSelectedMainArea(value){
    this.setState({ selectedMainArea: value });
  }

  render() {
    return (
      <div id="Layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        <TopNavBar 
          setPathToProject={this.setPathToProject.bind(this)}
          setSelectedMainArea={this.setSelectedMainArea.bind(this)} />

        <div
          id="path_to_open_project"
          style={{
            backgroundColor: Colors.LIGHT_GRAY5,
            borderBottom: `1px solid ${Colors.LIGHT_GRAY1}`,
            height: '50px',
            padding: 12,
          }}
        >
          {this.state.path_to_project}
        </div>

        <MainArea 
          path_to_project={this.state.path_to_project} 
          selectedMainArea={this.state.selectedMainArea} 
           />

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
