import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ScriptTitle from  "../ScriptTitle/ScriptTitle";
import ScriptPartCreationDialog from  "./ScriptPartCreationDialog";
import ChapterCreationDialog from  "./ChapterCreationDialog";

import {
    Button,
	InputGroup,
	Tab,
	Tabs,
    Tree,
} from '@blueprintjs/core';

class ScriptStructure extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isInEditMode: false,
			showPartCreationDialog: false,
			selectedTabId: this.getTabId(),
        };
	}

	getTabId() {
		let tabId = '/script/structure/abstract';
		let splitted_location = window.location.hash.replace("#", "").split("/");
		if (splitted_location[1] && splitted_location[2] && splitted_location[3]) {
			tabId = "/" + splitted_location[1] + "/" + splitted_location[2] + "/" + splitted_location[3];
		}
		return tabId;
	}

    componentDidMount() {
        if(!this.props.project.title || this.props.project.title <= 0) {
            this.setState({ isInEditMode: true });
        }
	}

	render() {

        return (
            <div id="ScriptStructure">

				<ScriptTitle />

				<Tabs id="ScriptStructureNav" selectedTabId={this.state.selectedTabId} animate="true" vertical="true">
					<Tab id="/script/structure/abstract">
						<Link to="/script/structure/abstract">Abstract</Link>
					</Tab>
					<Tab id="/script/structure/dedication">
						<Link to="/script/structure/dedication">Dedication</Link>
					</Tab>
					<Tab id="/script/structure/parts">
						<Link to="/script/structure/parts">Parts</Link>
					</Tab>
				</Tabs>

				<Tree contents={this.props.treeContent} />

                <div style={Style.PartCreation}>
                    <ScriptPartCreationDialog />
                </div>

            </div>
        );
    }
}

const Style = {
	PartCreation: {
		marginTop: '1em',
	}
};

function toggleEditMode() {
    this.setState({ isInEditMode: !this.state.isInEditMode });
}

function deletePart(partID) {
    console.log(partID)
}

function mapStateToProps ({ projectReducer }) {

	let content = [];

    projectReducer.parts.forEach(part => {

        let children = [
            {
                id: 1,
                label: ( <ChapterCreationDialog /> )
            }
        ];

        let aPart =
        {
			id: content.length,
            hasCaret: true,
            isExpanded: false,
            icon: "folder-close",
            label: "Part " + part.id + ": " + part.name,
            secondaryLabel: (
                <Button
                    minimal={true}
                    icon="trash"
                    onClick={deletePart.bind(this)}
                />
            ),
            childNodes: children
        };

		content.push(aPart);
    });

    return {
        project: projectReducer,
		treeContent: content,
    };
}

function mapDispatchToProps (dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScriptStructure)
