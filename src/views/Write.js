import React from 'react';

// import FileTree from 'react-filetree-electron';
import FileTree from '../components/FileTree';

import {
  Tab, 
  Tabs,
} from '@blueprintjs/core';

export default class Write extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
        selectedTabId: 'script',
    };
  }

  handleTabChange(navbarTabId){
    this.setState({ selectedTabId: navbarTabId });
  } 

  render() {
    return (
        <div id="MainAreaViewWrite" style={{ display: 'flex', flexDirection: 'row', flexGrow: '1' }}>

          <div
            id="DirectoryTreeView"
            style={{
              height: '100%',
              width: '300px',
              overflow: 'auto',
              border: '1px solid #ddd',
              resize: 'horizontal',
              outline: 'none',
              padding: '0 10px',
            }}
            onKeyDown={this.onInput}
          >
            <Tabs id="LeftNav" onChange={this.handleTabChange.bind(this)} selectedTabId={this.state.selectedTabId} animate="true" >
              <Tab id="script" title="Script" panel={<FileTree directory={this.props.path_to_project ? this.props.path_to_project + '/src/manuscript' : undefined} />} />
              <Tab id="file_browser" title="File Browser" panel={<FileTree directory={this.props.path_to_project} />} />
            </Tabs>

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
    );
  }
}
