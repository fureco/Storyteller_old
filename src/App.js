import { hot } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import RootRoute from './routes/RootRoute';

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Provider store={store}>
				{/* <div>App - window.location.hash: {window.location.hash}</div> */}
				<RootRoute />
			</Provider>
		);
	}
}

export default hot(module)(App);
