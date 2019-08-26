import React from 'react';
import Layout from './components/Layout';
import { Provider } from 'react-redux';

import store from './store';

const storage = require('electron-json-storage');

export default class App extends React.Component {

    constructor(props) {
        super(props);

        console.log("locale storage directory: " + storage.getDefaultDataPath());
    }

    render() {
        return (
        <Provider store={store}>
            <Layout/>
        </Provider>
        );
    }
}