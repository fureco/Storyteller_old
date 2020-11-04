import React from 'react';
import { Workspace } from './Workspace.js';
import { shallow, mount, render } from 'enzyme';

import { initialState as appState } from './../../store/appState/appState.model'

describe('Workspace component', () => {

	it('renders', () => {

		const container = shallow(
			<Workspace appState={appState} />
		);

		const result = container.find('#Workspace');
		expect(result.length).toEqual(1);
	})

	it('renders SelectWorkspaceButton if workspace is undefined', () => {

		const container = shallow(
			<Workspace appState={appState} />
		);

		const workspace = container.find('#SelectWorkspaceButton');
		expect(workspace.length).toEqual(1);
	})

	it('renders ChangeWorkspaceButton if workspace is set', () => {

		const workspace = {
			path: "config/test_workspaces/empty_workspace",
			projects: []
		}

		const container = shallow(
			<Workspace appState={appState} workspace={workspace} />
		);

		const changeWorkspaceButton = container.find('#ChangeWorkspaceButton');
		expect(changeWorkspaceButton.length).toEqual(1);
	})

})
