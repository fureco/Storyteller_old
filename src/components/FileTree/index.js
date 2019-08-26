import React from 'react';
import { connect } from 'react-redux';

import Directory from './components/Directory';
import File from './components/File';
import { getAllFiles } from '../../utils/file-functions';
import { mergeStyleObjects } from './utils/helpers';
import defaultStyles from './utils/defaultStyles';
import { toggleVisibility, openDirectory } from './reducers/file-tree';

class FileTree extends React.Component {

    constructor(props) {

        super();

        this.state = {
            files: props && props.files ? props.files : []
        };

        this.handleDirectoryClick = this.handleDirectoryClick.bind(this);
        this.onFileClick = this.onFileClick.bind(this);
    }

    componentDidMount() {
        
        if(this.props.directory == undefined)
            return;

        if (this.props.openedDirectories && this.props.openedDirectories[this.props.directory]) {
            console.log("openedDirectories: " + this.props.openedDirectories);
            this.setState({ files: this.props.openedDirectories[this.props.directory] });
        } 
        else {
            return this.props.directory && getAllFiles(this.props.directory)
            .then(files => this.setState({ files }))
            .catch(console.error);
        }
    }

    handleDirectoryClick(file) {
        this.props.toggleVisibility(file.filePath);
        if ((this.props.openedDirectories && !this.props.openedDirectories[file.filePath]) || this.props.isVisible[file.filePath]) {
        return getAllFiles(file.filePath)
        .then(files => this.props.dispatchOpenDirectory(file.filePath, files))
        .catch(console.error);
        }
    }

    onFileClick(file) {
        this.props.onFileClick && this.props.onFileClick(file);
    }

    render() {
        const files = this.state.files;

        // Lines 58-60 merge any style props passed down with default props.  This way no unexpected changes
        // occur as a result of passing down style props.
    
        const fileTreeStyle = this.props.fileTreeStyle ? mergeStyleObjects(defaultStyles.fileTreeStyle, this.props.fileTreeStyle) : defaultStyles.fileTreeStyle;
        const directoryStyle = this.props.directoryStyle ? mergeStyleObjects(defaultStyles.directoryStyle, this.props.directoryStyle) : defaultStyles.directoryStyle;
        const fileStyle = this.props.fileStyle ? mergeStyleObjects(defaultStyles.fileStyle, this.props.fileStyle) : defaultStyles.fileStyle;

        return(
            files.length > 0 &&
            <ul className="_fileTree" style={fileTreeStyle} >{
                files.map(file => {

                const filePath = file.filePath;
                const fileName = filePath.split('/').slice(-1).join('');

                return file.isDirectory ?
                    <li className="_directory" key={filePath + ' Directory'} style={directoryStyle}>
                    <div onClick={() => this.handleDirectoryClick(file)}>
                        <Directory className="directory" visible={this.props.isVisible[file.filePath]} theme={this.props.directoryTheme} />{`               ${fileName}`}
                    </div>
                    {this.props.isVisible[file.filePath] &&
                        <FileTree
                            directory={file.filePath}
                            files={file.files}
                            onFileClick={this.props.onFileClick}
                            toggleVisibility={this.props.toggleVisibility}
                            dispatchOpenDirectory={this.props.dispatchOpenDirectory}
                            openedDirectories={this.props.openedDirectories}
                            directoryTheme={this.props.directoryTheme || 'light'}
                            isVisible={this.props.isVisible}
                            fileTreeStyle={this.props.fileTreeStyle}
                            directoryStyle={this.props.directoryStyle}
                            fileStyle={this.props.fileStyle}
                        />}
                    </li>
                :
                    <li className="_file" key={filePath} onClick={() => this.onFileClick(file)} style={fileStyle}><File className="file" />{` ${fileName}`}</li>;
                })
            }</ul>
        );
    }
}

function mapStateToProps ({fileTreeReducer}) {
    return {
        isVisible: fileTreeReducer.fileTree.isVisible,
        openedDirectories: fileTreeReducer.fileTree.openedDirectories
    };
}

function mapDispatchToProps (dispatch) {
    return {
        toggleVisibility: filePath => dispatch(toggleVisibility(filePath)),
        dispatchOpenDirectory: (filePath, files) => dispatch(openDirectory(filePath, files))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FileTree)