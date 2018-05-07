import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

class AppContainer extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <h1>App homepage: containers/appcontainer</h1>
    );
  }
}

export default AppContainer;