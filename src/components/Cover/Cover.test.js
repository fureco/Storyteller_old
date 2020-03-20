import React from 'react';
import { Cover } from './Cover.js';
import { shallow, mount, render } from 'enzyme';

test('Cover - renders', () => {

	const cover = shallow(
		<Cover
			appState={{
				themeName: "bp3-body"
			}}
			project={{

			}}
		/>
	);

	const result = cover.find('#Cover');
	expect(result.length).toEqual(1);
});
