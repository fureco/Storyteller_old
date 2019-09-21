import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";

import { openProjectAction } from "../../reducers/projectReducer";

import Welcome from '../Welcome';
import Project from '../../components/Project';

const storage = require('electron-json-storage');

class Home extends React.Component {
  
    constructor(props) {
        super(props);

        storage.get('storyteller', function(error, data) {
            if (error) throw error;
            console.log("current_project: " + data.path);
            if(data.path) {
                props.openProject(data.path)
            }
        });
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
            <div id="Layout" style={styles.container}>
                {content}
            </div>
        </Router>
      );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
    }
}
  
function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openProject: (filePath) => dispatch(openProjectAction(filePath)),
    };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)