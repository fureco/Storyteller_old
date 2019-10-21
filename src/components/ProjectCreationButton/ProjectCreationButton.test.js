import React from 'react';
import { ProjectCreationButton } from './ProjectCreationButton.js';
import { shallow, mount, render } from 'enzyme';

test('ProjectCreationButton - renders', () => {

	const projectCreationButton = shallow(
		<ProjectCreationButton minimal={true} showText={true} />
	);

	const result = projectCreationButton.find('#ProjectCreationButton');
	expect(result.length).toEqual(1);
	expect(result.text()).toEqual('<Blueprint3.Button />');
});
