import React from 'react';

import Write from './MainAreaViews/Write';

export default class MainArea extends React.Component {

  constructor() {

    super();

    this.state = {
    };
  }

  render() {
    return (
        <div id="Main" style={{ display: 'flex', height: '100vh' }}>
            { this.props.selectedMainArea == "write" ? <Write /> : "" }
        </div>
    );
  }
}
