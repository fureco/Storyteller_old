import React from 'react';
import { Title } from './Title.js';
import { shallow, mount, render } from 'enzyme';

import { initialState } from './../../../store/project/project.model'

describe('Title component', () => {

	it('shows the title of the project in the TextInput component, when the title is not empty', () => {

		const project = Object.assign({}, initialState, {
			title: 'test_title'
		})

		const title = shallow(
			<Title project={project} />
		);

		// find TextInput component
		const titleTextInput = title.find('#TitleInput');

		expect(titleTextInput.render().text()).toEqual('test_title');
	})

	it('div is empty when the title is empty', () => {

		const project = initialState;

		const title = shallow(
			<Title project={project} />
		);

		// find TextInput component
		const titleTextInput = title.find('#TitleInput');

		expect(titleTextInput.render().text()).toEqual('');
	})

})
