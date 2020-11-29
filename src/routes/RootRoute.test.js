import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { RootRoute, Content } from './RootRoute.js';
import { mapStateToProps, mapDispatchToProps } from './RootRoute';

jest.mock('electron-json-storage-sync');

describe('RootRoute component', () => {

	it('renders', () => {

		const mockProps = RootRoute.getMappedProps({});

		const wrapper = shallow(
			<RootRoute {...mockProps} />
		);

		const rootRoute = wrapper.find('#RootRoute');
		expect(rootRoute.length).toEqual(1);
	})

	it('should set the theme', () => {
		const dispatch = jest.fn();
		mapDispatchToProps(dispatch).setTheme();
		expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SET_THEME' });
	});

	describe('Content component', () => {

		it('renders the WelcomeRoute if appState.path is not set', () => {

			const appState = {
				path: null
			}

			const wrapper = shallow(
				<Content appState={appState} />
			);

			const result = wrapper.text();
			expect(result).toEqual("<WelcomeRoute />");
		})

		it('renders the ProjectRoute if appState.path is set', () => {

			const appState = {
				path: 'path/to/test/project'
			}

			const wrapper = shallow(
				<Content appState={appState} />
			);

			const result = wrapper.text();
			expect(result).toEqual("<ProjectRoute />");
		})
	})

})
