import React from 'react';
import Main from './components/Main';
import { connect, Provider } from 'react-redux';

import store from './store';

const mapState = state => ({
  openedProject: state.openedProject
});

const mapDispatch = dispatch => ({
  openProject: filePath => dispatch(openProject(filePath))
});

const ConnectedMain = connect(mapState, mapDispatch)(Main);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
          <ConnectedMain {...this.props} />
      </Provider>
    );
  }
}
