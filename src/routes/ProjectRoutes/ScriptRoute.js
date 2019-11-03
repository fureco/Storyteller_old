import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import FileTree from '../../components/FileTree';
import { ScriptNav, ScriptStructure } from '../../components';
import ScriptTextArea from '../../components/ScriptTextArea/ScriptTextArea';
import FileBrowserTextArea from '../../components/Project/FileBrowserTextArea';

class ScriptRoute extends React.Component {

    constructor(props) {

		super(props);

        this.state = {
            selectedFile: null,
        };
	}

    onFileClick(file) {
        this.loadTextFromFile(file);
    }

    loadTextFromFile(file) {

        console.log("loading content from file: " + file.filePath);

        fetch(file.filePath)
            .then( r => r.text() )
            .then( text => document.getElementById('FileBrowserTextArea').value = text )
    }

	render() {

		return (

			<div id="MainAreaViewWrite" style={{ display: 'flex', flexDirection: 'row', flexGrow: '1' }}>

				{/* {window.location.hash} */}

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
					<ScriptNav />

					<div>
						<Switch>
							<Redirect exact from="/script" to="/script/structure" />
							<Route path="/script/structure" component={() => { return <ScriptStructure /> }} />
							<Route path="/script/files" component={() => {
								return <FileTree
									directory={this.props.project.path}
									onFileClick={this.onFileClick.bind(this)}
								/>
							}} />
						</Switch>
					</div>
				</div>

				<Switch>
					<Redirect exact from="/script" to="/script/structure" />
					<Route path="/script/structure" component={() => { return <ScriptTextArea /> }} />
					<Route path="/script/files" component={() => { return <FileBrowserTextArea /> }} />
				</Switch>

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
)(withRouter(ScriptRoute))
