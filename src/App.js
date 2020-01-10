import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";

import RootRoute from './routes/RootRoute';

import store from './store';

import './assets/css/App.css';

export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					{/* <div>{window.location.hash} -> {this.props.route}</div> */}
					<RootRoute />
				</Router>
			</Provider>
		);
	}
}
