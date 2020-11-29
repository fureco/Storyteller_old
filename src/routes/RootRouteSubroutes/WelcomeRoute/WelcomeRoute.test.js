import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import WelcomeRoute from './WelcomeRoute.js';

import configureStore from 'redux-mock-store'
const mockStore = configureStore()

import * as appState from '../../../store/appState/appState.model'
import { Provider } from 'react-redux';

describe('WelcomeRoute component', () => {

	it('renders', () => {

		const mockState = {
			appState: {
				theme: "bp3-body"
			}
		}

		const store = mockStore(mockState);

		store.getState = () => mockState

		const container = shallow(
			<Provider store={store} >
				<WelcomeRoute />
			</Provider>
		);

		const result = container.find(WelcomeRoute);
		expect(result.length).toEqual(1);
	});

})
