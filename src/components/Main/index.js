import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";

import {
    Colors,
} from '@blueprintjs/core';

import Welcome from '../Welcome';
import Project from '../Project';

class Main extends React.Component {
  
    constructor(props) {
      super(props);
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

              <div id="Main" style={{ display: 'flex', height: '100vh', padding: '10px' }}>
                {content}
              </div>
          
          </div>
        </Router>
      );
    }
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