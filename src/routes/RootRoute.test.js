import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { RootRoute } from './RootRoute.js';
import { mapStateToProps, mapDispatchToProps } from './RootRoute';

jest.mock('electron-json-storage-sync');

describe('RootRoute component', () => {

/* 	it('renders', () => {

		require('sync_storage').set('storyteller', { status: '200', data: { theme: "bp3-body" } });
		let storage = require('sync_storage').get('storyteller');
		console.log(storage)

		const container = shallow(
			<RootRoute />
		);

		const result = container.find('#RootRoute');
		expect(result.length).toEqual(1);
	}) */

	it('should set the theme', () => {
		const dispatch = jest.fn();
		mapDispatchToProps(dispatch).setTheme();
		expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SET_THEME' });
	});

})
