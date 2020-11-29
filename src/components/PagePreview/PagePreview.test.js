import React from 'react';
import { PagePreview } from './PagePreview.js';
import { shallow, mount, render } from 'enzyme';

describe('PagePreview component', () => {

	it('renders', () => {

		const mockProps = PagePreview.getMappedProps({
			appState: {
				theme: 'bp3-dark'
			},
		});

		const abstract = shallow(
			<PagePreview {...mockProps} />
		);

		const result = abstract.find('#PagePreview');
		expect(result.length).toEqual(1);
	})

})
