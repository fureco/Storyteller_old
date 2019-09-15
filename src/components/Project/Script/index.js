import React from 'react';
import { connect } from 'react-redux';

import FileTree from '../../FileTree';
import ScriptTree from '../ScriptTree';
import ScriptTextArea from '../ScriptTextArea';

import {
    Tab, 
    Tabs,
} from '@blueprintjs/core';

class Script extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedTabId: 'script',
            selectedFile: null
        };
    }

    componentDidMount() {
        // $("#DirectoryTreeView").resizable({
        //    handles: 'e, w'
        // })
    }

    handleTabChange(navbarTabId){
        this.setState({ selectedTabId: navbarTabId });
    }

    onFileClick(file) {
        this.loadTextFromFile(file);
    }

    loadTextFromFile(file) {
    
        console.log("loading content from file: " + file.filePath);
    
        fetch(file.filePath)
            .then( r => r.text() )
            .then( text => document.getElementById('ScriptTextArea').value = text )
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
                        <Tab id="script" title="Script" panel={
                            <ScriptTree />
                        } />
                        <Tab id="file_browser" title="File Browser" panel={
                            <FileTree 
                            directory={this.props.project.path}
                            onFileClick={this.onFileClick.bind(this)}
                            />
                        } />
                    </Tabs>
                </div>

                <ScriptTextArea />
            
            </div>
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
)(Script)