import React from 'react';
import { shallow, mount, render } from 'enzyme';

import WelcomeRoute from './WelcomeRoute.js';

describe('WelcomeRoute component', () => {

	it('renders', () => {

		const mockProps = WelcomeRoute.getMappedProps({
			appState: {
				theme: 'bp3-dark'
			}
		});

		const container = shallow(
			<WelcomeRoute {...mockProps} />
		);

		const result = container.find('#WelcomeRoute');
		expect(result.length).toEqual(1);
	});

})
