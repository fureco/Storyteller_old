import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { RootRoute } from './RootRoute.js';
import { mapStateToProps, mapDispatchToProps } from './RootRoute';

describe('RootRoute component', () => {

	it('renders', () => {

		const container = shallow(
			<RootRoute />
		);

		const result = container.find('#RootRoute');
		expect(result.length).toEqual(1);
	})

	it('should set the theme', () => {
		const dispatch = jest.fn();
		mapDispatchToProps(dispatch).setTheme();
		expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SET_THEME' });
	});

})
