import React from 'react';
import { CreateProjectButton } from './CreateProjectButton.js';
import { shallow, mount, render } from 'enzyme';

test('ProjectCreationButton - renders', () => {

	const projectCreationButton = shallow(
		<CreateProjectButton minimal={true} showText={true} />
	);

	const result = projectCreationButton.find('#CreateProjectButton');
	expect(result.length).toEqual(1);
	expect(result.text()).toEqual('<Blueprint3.Button />');
});
