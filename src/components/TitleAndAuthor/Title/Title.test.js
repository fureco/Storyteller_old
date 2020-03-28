import React from 'react';
import { Title } from './Title.js';
import { shallow, mount, render } from 'enzyme';

test('ScriptTitle - edit mode is open when project title is empty', () => {

	var project = {
		title: ''
	};

	const scriptTitle = shallow(
		<Title project={project} />
	);

	// find input group
	const scriptTitleInputGroup = scriptTitle.find('#ScriptTitleInput')
	expect(scriptTitleInputGroup.length).toEqual(1);
});

test('ScriptTitle - edit mode is closed when project title is not empty', () => {

	var project = {
		title: 'test'
	};

	const scriptTitle = shallow(
		<Title project={project} />
	);

	// find input group
	const scriptTitleInputGroup = scriptTitle.find('#ScriptTitleInput')
	expect(scriptTitleInputGroup.length).toEqual(0);
});
