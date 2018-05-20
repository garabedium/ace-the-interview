import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

import AppContainer from './containers/AppContainer';
import HomepageContainer from './containers/HomepageContainer';
import QuestionsIndexContainer from './containers/QuestionsIndexContainer';
import CategoriesIndexContainer from './containers/CategoriesIndexContainer';
import CategoryShowContainer from './containers/CategoryShowContainer';
import ListShowContainer from './containers/ListShowContainer';
import DashboardContainer from './containers/DashboardContainer';

class Routes extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/app' component={AppContainer} />
        <Route path='/app/dashboard' component={DashboardContainer} />
        <Route path='/app/categories/:id' component={CategoryShowContainer} />
        <Route path='/app/lists/:id' component={ListShowContainer} />
      </Router>
    );
  }
}

export default Routes;