import React from 'react';
import { Abstract } from './Abstract.js';
import { shallow, mount, render } from 'enzyme';

describe('Abstract component', () => {

	it('renders', () => {

		const project = {
			abstract: 'test abstract'
		}

		const abstract = shallow(
			<Abstract project={project} />
		);

		const result = abstract.find('#Abstract');
		expect(result.length).toEqual(1);
	})

})
