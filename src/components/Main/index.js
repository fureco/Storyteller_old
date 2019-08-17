import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from "react-router-dom";

import {
    Colors,
} from '@blueprintjs/core';

import TopNavBar from '../TopNavBar';
import Write from './Write';

class Main extends React.Component {
  
    constructor(props) {
  
      super(props);
  
      this.state = {
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
  
    handleTabChange(navbarTabId){
      this.setState({ selectedTabId: navbarTabId });
    } 
  
    setSelectedMainArea(value){
      this.setState({ selectedMainArea: value });
    }
  
    render() {

      let content;

      if(this.props.project.path) {
        content = <Project project={this.props.project} />;
      }
      else {
        content = <Welcome/>;
      }

      return (
        <Router>
          <div id="Layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

              <TopNavBar 
                setSelectedMainArea={this.setSelectedMainArea.bind(this)} />

              <div
                id="path_to_open_project"
                style={{
                    backgroundColor: Colors.LIGHT_GRAY5,
                    borderBottom: `1px solid ${Colors.LIGHT_GRAY1}`,
                    height: '50px',
                    padding: 12,
                }}>
                  { this.props.project.path ? this.props.project.path : 'No project selected.' }
              </div>

              <div id="Main" style={{ display: 'flex', height: '100vh', padding: '10px' }}>
                {content}
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

  function Welcome(props) {
    return(<div>Welcome</div>);
  }

  function Project(props) {
    return(
      <div style={{ display: 'flex', height: '100vh', flexGrow: '1'}}>
        <Route path="/" exact component={() => {return <Write path_to_project={props.project.path} />}} />
        <Route path="/characters" exact component={() => {return <h2>Characters</h2>}} />
        <Route path="/locations" exact component={() => {return <h2>Locations</h2>}} />
        <Route path="/timeline" exact component={() => {return <h2>Timeline</h2>}} />
      </div>
    );
  }
  
  function mapStateToProps ({ projectReducer }) {
    return {
      project: projectReducer,
    };
  }
  
  export default connect(
    mapStateToProps,
    null
  )(Main)