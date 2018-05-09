import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import QuestionCardContainer from './QuestionCardContainer';
import ButtonComponent from '../components/ButtonComponent';

class AppContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      questions: [],
      questionId: 0,
      shown: []
    }
    this.randomQuestion = this.randomQuestion.bind(this)
  }

  componentDidMount(){
    let apiUrl = '/api/v1/questions'
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
        this.setState({ questions: response });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  randomQuestion(){
    let randomIndex = Math.round(Math.random() * (this.state.questions.questions.length - 1))
    this.setState({ questionId: randomIndex })
  }

  render() {

    let questionTitle
    if (this.state.questions.questions){
      questionTitle = this.state.questions.questions[this.state.questionId]["title"];
    }

    return (
      <div className="row">
        <h1>App homepage: containers/appcontainer</h1>
         <div className="columns medium-4 text-center end">
          <QuestionCardContainer
            question={questionTitle}
          />
          <ButtonComponent
            text="Random Question"
            class='button'
            handleClick={this.randomQuestion}
          />
        </div>
      </div>
    );

  }


}

export default AppContainer;