import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ScriptTitle from  "../ScriptTitle/ScriptTitle";
import ScriptPartCreationDialog from  "./ScriptPartCreationDialog";
import ChapterCreationDialog from "./ChapterCreationDialog";

import { projectActions } from "../../store/actions";

import {
	Alert,
	Button,
	Intent,
	Tab,
	Tabs,
	Toaster,
    Tree,
} from '@blueprintjs/core';

class ScriptStructure extends React.Component {

    constructor(props) {

        super(props);

		this.state = {

			themeName: props.themeName || "bp3-body", // null || bp3-dark

            isInEditMode: false,
			showPartCreationDialog: false,
			selectedTabId: this.getTabId(),

			canEscapeKeyCancel: false,
			canOutsideClickCancel: false,
			movePartToTrashIsOpen: false,
			movePartToTrashPart: '',
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
				},
			];

			let aPart =
			{
				id: treeContent.length,
				hasCaret: true,
				isExpanded: false,
				icon: "folder-close",
				label: "Part " + part.position + ": " + part.name,
				secondaryLabel: (
					<Button
						minimal={true}
						icon="trash"
						onClick={ () => this.handleMovePartToTrashOpen(part) }
					/>
				),
				childNodes: children
			};

			treeContent.push(aPart);
		});

		let trash =
		{
			id: treeContent.length,
			hasCaret: true,
			isExpanded: false,
			icon: "trash",
			label: "Trash",
		};

		treeContent.push(trash);

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

				<Alert
					className={this.state.themeName}
					cancelButtonText="Cancel"
					confirmButtonText="Move to Trash"
					icon="trash"
					intent={Intent.DANGER}
					isOpen={this.state.movePartToTrashIsOpen}
					onCancel={ () => this.handleMovePartToTrashCancel() }
					onConfirm={ () => this.handleMovePartToTrashConfirm() }
				>
					<p>
						Are you sure you want to move <b>Part {this.state.movePartToTrashPart.position}: {this.state.movePartToTrashPart.name}</b> to Trash?
                    </p>
				</Alert>

				<Toaster ref={ref => (this.toaster = ref)} />

            </div>
        );
	}

	handleMovePartToTrashOpen(part) {
		this.setState({ movePartToTrashIsOpen: true });
		this.setState({ movePartToTrashPart: part });
	}

	handleMovePartToTrashConfirm() {
		this.setState({ movePartToTrashIsOpen: false });
		this.setState({ movePartToTrashPart: '' });
		this.toaster.show({ className: this.state.themeName, message: <TOAST_MESSAGE part={this.state.movePartToTrashPart} /> });
		this.props.deletePart(this.state.movePartToTrashPart.id);
	}

	handleMovePartToTrashCancel() {
		this.setState({ movePartToTrashIsOpen: false });
		this.setState({ movePartToTrashPart: '' });
	}
}

function TOAST_MESSAGE(props) {
	return <div><b>Part {props.part.position}: {props.part.name}</b> was moved to Trash.</div>
}

const Style = {
	PartCreation: {
		marginTop: '1em',
	}
};

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
