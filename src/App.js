import React from 'react';
import Root from './routes/RootRoute';
import { Provider } from 'react-redux';

import store from './store';

import './assets/css/App.css';

export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<Root />
			</Provider>
		);
	}
}
