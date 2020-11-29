import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { ScriptRoute } from './ScriptRoute.js';
import { mapStateToProps, mapDispatchToProps } from './ScriptRoute';

describe('ScriptRoute component', () => {

	it('renders', () => {

		const mockProps = ScriptRoute.getMappedProps({
			appState: {
				theme: 'bp3-dark'
			}
		});

		const container = shallow(
			<ScriptRoute {...mockProps} />
		);

		const result = container.find('#ScriptRoute');
		expect(result.length).toEqual(1);
	})

})
