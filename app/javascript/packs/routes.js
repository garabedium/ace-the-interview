import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import HomepageContainer from './containers/HomepageContainer';
import AppContainer from './containers/AppContainer';
import QuestionsIndexContainer from './containers/QuestionsIndexContainer';

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
        <Route path='/app/questions' component={QuestionsIndexContainer} />
      </Router>
    );
  }
}

export default Routes;

// <Route path="spots/:id" component={SpotsShowContainer} />
