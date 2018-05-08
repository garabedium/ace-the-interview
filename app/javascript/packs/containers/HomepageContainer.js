import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';

class HomepageContainer extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <h1>Homepage: containers/homepagecontainer</h1>
    );
  }
}

export default HomepageContainer;