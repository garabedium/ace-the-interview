import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import QuestionCardContainer from './QuestionCardContainer';
import QuestionListContainer from './QuestionListContainer';
import ButtonComponent from '../components/ButtonComponent';
import QuestionNewFormContainer from './QuestionNewFormContainer';

class AppContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      questions: [],
      questionId: 0,
      answer: {},
      hasAnswer: false,
      hasCategories: false,
      answerActive: true,
      shown: []
    }

    this.setQuestion = this.setQuestion.bind(this)
    this.addNewAnswer = this.addNewAnswer.bind(this)
    this.addNewQuestion = this.addNewQuestion.bind(this)
    this.updateAnswer = this.updateAnswer.bind(this)
    this.toggleAnswer = this.toggleAnswer.bind(this)
  }

  componentDidMount(){

    const apiUrl = `/api/v1/questions.json`

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
      .catch(error => {
        console.log(error)
        console.error(`Error in fetch: ${error.message}`)
      });


  }

  setQuestion(){
    let answerBody, answerHint, categories
    const randomIndex = Math.round(Math.random() * (this.state.questions.length - 1))
    const question = this.state.questions[randomIndex]
    const hasAnswer = (question.answer !== null) ? true : false
    const hasCategories = (question.categories.length > 0) ? true : false

    if (hasAnswer){
      answerBody = question.answer.body
      answerHint = question.answer.hint || ""
    }

    if (hasCategories){
      categories = question.categories
    }

    this.setState({
      questionId: randomIndex,
      hasAnswer: hasAnswer,
      hasCategories: hasCategories,
      answer:{
        answerBody: answerBody,
        answerHint: answerHint
      },
      categories: categories,
      answerActive: false
    })

  }

  toggleAnswer(){
    return this.setState({
      answerActive: !this.state.answerActive
    })
  }

  addNewQuestion(submission) {
    const questionId = this.state.questions[this.state.questionId].id

    const apiUrl = `/api/v1/questions/${questionId}/answers.json`

    fetch(apiUrl, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(submission),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
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
    .catch(error => console.error(`Error in fetch (adding new answer): ${error.message}`))

  }


  addNewAnswer(submission) {
    const questionId = this.state.questions[this.state.questionId].id
    const apiUrl = `/api/v1/questions/${questionId}/answers.json`

    fetch(apiUrl, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(submission),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
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
    .catch(error => console.error(`Error in fetch (adding new answer): ${error.message}`))

  }

  updateAnswer(submission){
    const questionId = this.state.questions[this.state.questionId].id,
          answerId = this.state.questions[this.state.questionId].answer.id,
          apiUrl = `/api/v1/questions/${questionId}/answers/${answerId}.json`

    fetch(apiUrl, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(submission),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
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
    .catch(error => console.error(`Error in fetch (updating answer): ${error.message}`))

  }

  render() {

    let question
    if (this.state.questions.length > 0){
      question = this.state.questions[this.state.questionId]
    }

    return (
      <div className="row">
         <div className="columns medium-4 medium-offset-3 text-center">
          <QuestionCardContainer
            question={question}
            answerBody={this.state.answer.answerBody}
            answerHint={this.state.answer.answerHint}
            categories={this.state.categories}
            hasAnswer={this.state.hasAnswer}
            hasCategories={this.state.hasCategories}
            answerActive={this.state.answerActive}
            toggleAnswer={this.toggleAnswer}
            addNewAnswer={this.addNewAnswer}
            updateAnswer={this.updateAnswer}
          />
          <ButtonComponent
            text="Random Question"
            class='button secondary'
            handleClick={this.setQuestion}
          />
        </div>
          <aside className="columns medium-4">
            <h4>My Lists</h4>
            <QuestionListContainer />
            <hr/>
            <button className="button warning">Add New Question +</button>

          </aside>
      </div>
    );

  }


}

export default AppContainer;

// <QuestionNewFormContainer />
//{this.showLists()}
// <QuestionFormContainer />