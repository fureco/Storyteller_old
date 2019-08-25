import React from 'react';
import Layout from './components/Layout';
import { Provider } from 'react-redux';

import store from './store';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
          <Layout/>
      </Provider>
    );
  }
}