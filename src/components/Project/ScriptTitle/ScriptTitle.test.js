import React from 'react';
import { ScriptTitle } from '.';
import { shallow, mount, render } from 'enzyme';

test('ScriptTitle - edit mode is open when project title is empty', () => {

	var project = {
		title: ''
	};

	const scriptTitle = shallow(
		<ScriptTitle project={project} />
	);

	// find input group
	const scriptTitleInputGroup = scriptTitle.find('#ScriptTitleInputGroup')
	expect(scriptTitleInputGroup.length).toEqual(1);
});

test('ScriptTitle - edit mode is closed when project title is not empty', () => {

	var project = {
		title: 'test'
	};

	const scriptTitle = shallow(
		<ScriptTitle project={project} />
	);

	// find input group
	const scriptTitleInputGroup = scriptTitle.find('#ScriptTitleInputGroup')
	expect(scriptTitleInputGroup.length).toEqual(0);
});
