import React from 'react';
import { Workspace } from './Workspace.js';
import { shallow, mount, render } from 'enzyme';

import { initialState as appState } from './../../store/models/appStateModel'

describe('Workspace component', () => {

	it('renders', () => {

/* 		const project = {
			abstract: 'test abstract'
		} */

		const container = shallow(
			<Workspace appState={appState} />
		);

		const result = container.find('#Workspace');
		expect(result.length).toEqual(1);
	})

})
