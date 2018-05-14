import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import HomepageContainer from './containers/HomepageContainer';
import QuestionsIndexContainer from './containers/QuestionsIndexContainer';
import CategoriesIndexContainer from './containers/CategoriesIndexContainer';
import CategoryShowContainer from './containers/CategoryShowContainer';

class Routes extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/app' component={AppContainer} />
        <Route path='/app/categories/:id' component={CategoryShowContainer} />
      </Router>
    );
  }
}

export default Routes;