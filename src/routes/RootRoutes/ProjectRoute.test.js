import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { ProjectRoute } from './ProjectRoute.js';
import { mapStateToProps, mapDispatchToProps } from './ProjectRoute';

import { initialState as appState } from './../../store/appState/appState.model'

describe('ProjectRoute component', () => {

	it('renders', () => {

		const container = shallow(
			<ProjectRoute appState={appState} />
		);

		const result = container.find('#ProjectRoute');
		expect(result.length).toEqual(1);
	})

})
