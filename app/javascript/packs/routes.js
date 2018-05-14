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
        <Route path='/app/:list_type/:id' component={AppContainer} />
      </Router>
    );
  }
}

export default Routes;

// Route path='/app/categories' component={CategoriesIndexContainer} />
// <Route path="/app/categories/:id" component={CategoryShowContainer} />
        // <Route path='/app/questions' component={QuestionsIndexContainer} />
        // <Route path='/app/categories' component={CategoriesIndexContainer} />
        // <Route path='/app/categories/:id' component={CategoryShowContainer} />