import React from 'react';
import { Author } from './Author.js';
import { shallow, mount, render } from 'enzyme';

import { initialState } from './../../../store/reducers/project/project.model'

describe('Author component', () => {

	it('shows the author of the project in the TextInput component, when the author is not empty', () => {

		const project = Object.assign({}, initialState, {
			author: 'Max Mustermann'
		})

		const author = shallow(
			<Author project={project} />
		);

		// find TextInput component
		const textInput = author.find('#AuthorInput');

		expect(textInput.render().text()).toEqual('Max Mustermann');
	})

	it('div is empty when the author is empty', () => {

		const project = initialState;

		const author = shallow(
			<Author project={project} />
		);

		// find TextInput component
		const textInput = author.find('#AuthorInput');

		expect(textInput.render().text()).toEqual('');
	})

})
