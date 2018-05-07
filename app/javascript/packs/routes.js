import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import HomepageContainer from './containers/HomepageContainer';

class Routes extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={HomepageContainer} />
      </Router>
    );
  }
}

export default Routes;

// <Route path="spots/:id" component={SpotsShowContainer} />
