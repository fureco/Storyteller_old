import React from 'react';
import { connect } from 'react-redux';
import { Switch, Link, Route, Redirect } from "react-router-dom";
import { PartTitle, ScriptPartCreationDialog } from "./../../components";

import {
	Button,
	Tab,
	Tabs,
	TextArea
} from '@blueprintjs/core';

class Parts extends React.Component {

	constructor(props) {

		super(props);

		let url_parts = window.location.hash.replace('#', '').split("/");

		this.state = {
			selectedPartIndex: url_parts[url_parts.length-1]
		};
	}

	render() {

		var parts = this.props.project.parts
			.sort((a, b) => a.position > b.position)
			.map((name, index) => {
				return (
					<Link to={`/script/structure/parts/${index}`} key={this.props.project.parts[index].id}>Part {this.props.project.parts[index].position}: {this.props.project.parts[index].name}</Link>
				);
			});

		var selectedPart = this.props.project.parts[this.state.selectedPartIndex];

		return (
			<div>

				<div>{window.location.hash}</div>

				{parts}

				<ScriptPartCreationDialog />

				<Switch>

					<Redirect exact from="/script/structure/parts" to={`/script/structure/parts/0`} />

					{selectedPart &&

						<Route path={`/script/structure/parts/${this.state.selectedPartIndex}`} component={() => { return (
							<div style={{
								display: 'flex',
								flexDirection: 'column',
								overflow: 'auto',
								resize: 'none',
							}}>
								<PartTitle part={selectedPart} />
								<TextArea id="ScriptTextArea"
									style={{
										height: '100%',
										margin: '1%',
										overflow: 'auto',
										border: '1px solid #ddd',
										resize: 'none',
									}}
									onKeyDown={this.onInput}
									value={this.state.text}
								/>
							</div>
						)}} />
					}
				</Switch>
			</div>
		);
	}
}

function mapStateToProps({ projectReducer }) {
	return {
		project: projectReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// setAbstract: abstract => dispatch(projectActions.setAbstractAction(abstract)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Parts)
