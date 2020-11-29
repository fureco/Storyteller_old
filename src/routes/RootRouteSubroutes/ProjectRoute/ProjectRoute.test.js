import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { ProjectRoute } from './ProjectRoute.js';
import { mapStateToProps, mapDispatchToProps } from './ProjectRoute';

describe('ProjectRoute component', () => {

	it('renders dark mode', () => {

		const mockProps = ProjectRoute.getMappedProps({
			appState: {
				theme: 'bp3-dark'
			}
		});

		const container = shallow(
			<ProjectRoute {...mockProps} />
		);

		const result = container.find('#ProjectRoute');
		expect(result.length).toEqual(1);
	})

	it('renders light mode', () => {

		const mockProps = ProjectRoute.getMappedProps({
			appState: {
				theme: 'bp3-body'
			}
		});

		const container = shallow(
			<ProjectRoute {...mockProps} />
		);

		const result = container.find('#ProjectRoute');
		expect(result.length).toEqual(1);
	})

})
