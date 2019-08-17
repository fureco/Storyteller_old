import React from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';

import store from './store';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
          <Main/>
      </Provider>
    );
  }
}