import React, { Component } from 'react';
import { Link } from 'react-router';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsCreated: [],
      questionsAnswered: [],
      lists: [],
      industry: {}
    }
  }

  componentDidMount() {
    const apiUrl = `/api/v1/dashboard.json`

    fetch(apiUrl,{
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {;
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          questionsCreated: response.questions_created,
          questionsAnswered: response.questions_answered,
          lists: response.lists,
          industry: response.industry
        });
      })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let questionsCreated,
        questionsAnswered,
        lists,
        industry

    questionsCreated = this.state.questionsCreated.map( (item) => {
      return(
        <li key={item.id} className="list list__item">
          {item.title}
        </li>
      )
    })
    questionsAnswered = this.state.questionsAnswered.map( (item) => {
      return(
        <li key={item.id} className="list list__item">
          {item.question.title}
        </li>
      )
    })
    lists = this.state.lists.map( (item) => {
      return(
        <li  className="list list__item">
          <Link to={`/app/lists/${item.id}`} className="list--link" key={item.id}>{item.name}</Link>
        </li>
      )
    })

    return(
      <div className="row">
        <div className="columns medium-10 medium-centered">
          <h1>Dashboard</h1>

          <div className="row">
            <div className="columns medium-4">
              <h5  className="dashboard--header">Your Questions</h5>
              <ul className="list menu vertical">
                {questionsCreated}
              </ul>
            </div>

            <div className="columns medium-4">
              <h5 className="dashboard--header">Questions Answered</h5>
              <ul className="list menu vertical">
                {questionsAnswered}
              </ul>
            </div>

            <div className="columns medium-4">
            <h5 className="dashboard--header">Your Lists</h5>
              <ul className="list menu vertical">
                {lists}
              </ul>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default DashboardContainer;

          // <ul className="list menu vertical">
          //   {questions}
          // </ul>