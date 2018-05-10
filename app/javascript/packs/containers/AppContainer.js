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
      hasAnswer: false,
      shown: []
    }
    this.setQuestion = this.setQuestion.bind(this)
  }

  componentDidMount(){
    let apiUrl = '/api/v1/questions.json'
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
          questions: response.questions
        })
      })
      .then( this.setQuestion )
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  setQuestion(){
    let randomIndex = Math.round(Math.random() * (this.state.questions.length - 1))
    let hasAnswer = (this.state.questions[randomIndex].question.answer !== null) ? true : false

    this.setState({
      questionId: randomIndex,
      hasAnswer: hasAnswer
    })
  }

  render() {

    let question, answerBody
    if (this.state.questions.length > 0){
      question = this.state.questions[this.state.questionId].question
      answerBody = (question.answer !== null) ? question.answer.body : ""
    }

    return (
      <div className="row">
        <h1>App homepage: containers/appcontainer</h1>
         <div className="columns medium-4 text-center end">
          <QuestionCardContainer
            question={question}
            answerBody={answerBody}
            hasAnswer={this.state.hasAnswer}
          />
          <ButtonComponent
            text="Random Question"
            class='button secondary'
            handleClick={this.setQuestion}
          />
        </div>
      </div>
    );

  }


}

export default AppContainer;