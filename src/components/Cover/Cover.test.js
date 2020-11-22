import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { Cover } from './Cover.js';

describe('Cover component', () => {

	it('renders - without cover set', () => {

		const mockProps = Cover.getMappedProps({
			project: {
				cover: '',
			}
		});

		const cover = shallow(
			<Cover {...mockProps} />
		);

		const result = cover.find('#Cover');
		expect(result.length).toEqual(1);
	});

	it('renders - with cover set', () => {

		const mockProps = Cover.getMappedProps({
			project: {
				cover: 'path/to/cover.png',
			}
		});

		const cover = shallow(
			<Cover {...mockProps} />
		);

		const result = cover.find('#Cover');
		expect(result.length).toEqual(1);
	});
});
