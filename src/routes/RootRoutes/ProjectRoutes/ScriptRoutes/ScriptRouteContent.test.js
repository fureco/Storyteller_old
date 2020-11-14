import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { ScriptRouteContent, Content } from './ScriptRouteContent.js';

describe('ScriptRouteContent component', () => {

	it('renders as expected', () => {

		const mockProps = ScriptRouteContent.getMappedProps({
			appState: {
				theme: 'bp3-dark'
			},
			project: {
				route: 'test',
			}
		});

		const wrapper = shallow(
			<ScriptRouteContent {...mockProps} />
		);

		const result = wrapper.find('#ScriptRouteContent');
		expect(result.length).toEqual(1);
	});

	describe('Content', () => {

		it('returns the TitleAndAuthor component if route is set to "/script/title_author"', () => {
			const wrapper = shallow(<Content route={"/script/title_author"} />);
			expect(wrapper.debug()).toEqual("<TitleAndAuthor />");
		})

		it('returns the Abstract component if route is set to "/script/abstract"', () => {
			const wrapper = shallow(<Content route={"/script/abstract"} />);
			expect(wrapper.debug()).toEqual("<Abstract />");
		})

		it('returns the Dedication component if route is set to "/script/dedication"', () => {
			const wrapper = shallow(<Content route={"/script/dedication"} />);
			expect(wrapper.debug()).toEqual("<Dedication />");
		})

		it('returns the Parts component if route is set to "/script/parts"', () => {
			const wrapper = shallow(<Content route={"/script/parts"} />);
			expect(wrapper.debug()).toEqual("<Parts />");
		})

		it('returns the Chapters component if route is set to "/script/chapters"', () => {
			const wrapper = shallow(<Content route={"/script/chapters"} />);
			expect(wrapper.debug()).toEqual("<Chapters />");
		})

		it('returns the Cover component if route is not set', () => {
			const wrapper = shallow(<Content />);
			expect(wrapper.debug()).toEqual("<Cover />");
		})
	})

})
