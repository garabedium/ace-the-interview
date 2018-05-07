import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import HomepageContainer from './containers/HomepageContainer';
import AppContainer from './containers/AppContainer';

class Routes extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={HomepageContainer} />
        <Route path='/app' component={AppContainer} />
      </Router>
    );
  }
}

export default Routes;

// <Route path="spots/:id" component={SpotsShowContainer} />
