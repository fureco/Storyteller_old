import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

import {
  Colors,
} from '@blueprintjs/core';

import TopNavBar from './components/TopNavBar';
import Write from './views/Write';

export default class App extends React.Component {
  
  constructor() {

    super();

    this.state = {
      path_to_project: undefined,
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

  renderWriteComponent() {
    return <Write path_to_project={this.state.path_to_project} />
  }

  render() {
    return (
    
      <Router>

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
            { this.state.path_to_project ? this.state.path_to_project : 'No project selected.' }
          </div>

          <div id="Main" style={{ display: 'flex', height: '100vh', padding: '10px' }}>
            <Route path="/" exact component={this.renderWriteComponent.bind(this)} />
            <Route path="/characters" exact component={() => {return <h2>Characters</h2>}} />
            <Route path="/locations" exact component={() => {return <h2>Locations</h2>}} />
            <Route path="/timeline" exact component={() => {return <h2>Timeline</h2>}} />
          </div>

          <div
            id="StatusBar"
            style={{
              backgroundColor: Colors.LIGHT_GRAY5,
              borderTop: `1px solid ${Colors.LIGHT_GRAY1}`,
              height: '50px',
              padding: 12,
            }}>
            words: {this.state.statistic.words} - chars: {this.state.statistic.chars}
          </div>
         
        </div>
      </Router>
        
    );
  }
}
