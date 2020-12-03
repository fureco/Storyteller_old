import React from 'react';
import { Abstract } from './Abstract.js';
import { shallow, mount, render } from 'enzyme';

describe('Abstract component', () => {

	it('renders', () => {

		const mockProps = Abstract.getMappedProps({
			project: {
				abstract: 'test abstract'
			}
		});

		const abstract = shallow(
			<Abstract {...mockProps} />
		);

		const wrapper = abstract.find('#Abstract');
		expect(wrapper.length).toEqual(1);

		const result = wrapper.text();
		expect(result).toEqual("<PagePreview />");
	})

})
