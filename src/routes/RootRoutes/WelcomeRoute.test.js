import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { WelcomeRoute } from './WelcomeRoute.js';
import { mapStateToProps, mapDispatchToProps } from './WelcomeRoute';

import { initialState as appState } from './../../store/appState/appState.model'

describe('WelcomeRoute component', () => {

	it('renders', () => {

		const container = shallow(
			<WelcomeRoute appState={appState} />
		);

		const result = container.find('#WelcomeRoute');
		expect(result.length).toEqual(1);
	})

})
