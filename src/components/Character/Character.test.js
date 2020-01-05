import React from 'react';
import { Character } from './Character.js';
import { shallow, mount, render } from 'enzyme';

test('Character - renders', () => {

	const character = shallow(
		<Character
			appState={{
				themeName: "bp3-body"
			}}
			character={{ first_name: "first_name", last_name: "last_name" }}
		/>
	);

	const result = character.find('#Character');
	expect(result.length).toEqual(1);
	expect(result.text()).toEqual('first_name last_name<Blueprint3.Button /><Blueprint3.Alert />');
});
