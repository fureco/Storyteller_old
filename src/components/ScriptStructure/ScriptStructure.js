import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ScriptTitle from  "../ScriptTitle/ScriptTitle";
import ScriptPartCreationDialog from  "./ScriptPartCreationDialog";
import ChapterCreationDialog from "./ChapterCreationDialog";

import { projectActions } from "../../store/actions";

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

		var treeContent = [];

		this.props.project.parts.forEach(part => {

			let children = [
				{
					id: 1,
					label: (<ChapterCreationDialog />)
				}
			];

			let aPart =
			{
				id: treeContent.length,
				hasCaret: true,
				isExpanded: false,
				icon: "folder-close",
				label: "Part " + part.id + ": " + part.name,
				secondaryLabel: (
					<Button
						minimal={true}
						icon="trash"
						onClick={() => this.props.deletePart(part.id)}
					/>
				),
				childNodes: children
			};

			treeContent.push(aPart);
		});

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

				<Tree contents={treeContent} />

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

function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
	return {
		deletePart: partID => dispatch(projectActions.deleteScriptPartAction(partID)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScriptStructure)
