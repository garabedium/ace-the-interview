import React, { Component } from 'react';
import {Router, browserHistory, Route, IndexRoute } from 'react-router';
import QuestionCardContainer from './QuestionCardContainer';
import QuestionListContainer from './QuestionListContainer';
import ButtonComponent from '../components/ButtonComponent';
import QuestionFormContainer from './QuestionFormContainer';
import FilterQuestionsContainer from './FilterQuestionsContainer';


class AppContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      questions: [],
      categories: [],
      questionId: 0,
      selectedCategoryId: 0,
      selectedListId: 0,
      answer: {},
      hasAnswer: false,
      hasCategories: false,
      answerActive: true,
      questionAdded: false,
      questionLists: [],
      cache: {}
    }

    this.setQuestion = this.setQuestion.bind(this)
    this.addNewAnswer = this.addNewAnswer.bind(this)
    this.addNewQuestion = this.addNewQuestion.bind(this)
    this.addQuestionToList = this.addQuestionToList.bind(this)
    this.addNewList = this.addNewList.bind(this)
    this.updateAnswer = this.updateAnswer.bind(this)
    this.toggleAnswer = this.toggleAnswer.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
    this.getLists = this.getLists.bind(this)
    this.getCategories = this.getCategories.bind(this)
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
          questions: response.questions,
          selectedCategoryId: response.category_id
        })
      })
      .then( this.setQuestion )
      .then( this.getLists )
      .then( this.getCategories )

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

  updateQuestions(submission){
    debugger
    return this.setState({
      questions: submission
    })
  }

  toggleAnswer(){
    return this.setState({
      answerActive: !this.state.answerActive
    })
  }

  addNewQuestion(submission) {

    const apiUrl = '/api/v1/questions.json'

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
        questions: response.questions,
        questionAdded: true
      })
    })
    .catch(error => console.error(`Error in fetch (add new question): ${error.message}`))

  }

  handleAnswer(submission){

    if (this.state.hasAnswer){
      this.updateAnswer(submission)
    } else {
      this.addNewAnswer(submission)
    }
  }

  addNewList(submission) {

    const apiUrl = '/api/v1/lists.json'

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
        questionLists: this.state.questionLists.concat(response)
      })
    })
    .catch(error => console.error(`Error in fetch (add new list): ${error.message}`))

  }

  handleAnswer(submission){

    if (this.state.hasAnswer){
      this.updateAnswer(submission)
    } else {
      this.addNewAnswer(submission)
    }
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
        questions: response.questions,
        hasAnswer: true,
        answer:{
          answerBody: submission.body,
          answerHint: submission.hint
        }
      })
    })
    .catch(error => console.error(`Error in fetch (adding new answer): ${error.message}`))

  }


  addQuestionToList(submission) {

    const apiUrl = '/api/v1/question_lists.json'

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
      // this.setState({
      //   questions: response.questions,
      //   questionAdded: true
      // })
    })
    .catch(error => console.error(`Error in fetch (add question to list): ${error.message}`))

  }

  handleAnswer(submission){

    if (this.state.hasAnswer){
      this.updateAnswer(submission)
    } else {
      this.addNewAnswer(submission)
    }
  }

  getLists(){
    let apiUrl = '/api/v1/lists.json'
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
          questionLists: response.lists
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getCategories(){
    let apiUrl = '/api/v1/categories.json'
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
          categories: response.categories
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  updateAnswer(submission){
    const questionId = this.state.questions[this.state.questionId].id
    const answerId = this.state.questions[this.state.questionId].answer.id
    const apiUrl = `/api/v1/questions/${questionId}/answers/${answerId}.json`

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
        questions: response.questions,
        hasAnswer: true,
        answer:{
          answerBody: submission.body,
          answerHint: submission.hint
        }
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
<div className="parent">

    <div className="row">
      <div className="columns medium-11 medium-centered">

         <FilterQuestionsContainer
          questionLists={this.state.questionLists}
          questionCategories={this.state.categories}
          updateQuestions={this.updateQuestions}
         />

      </div>
    </div>

      <div className="row">
      <div className="columns medium-11 medium-centered">

        <div className="row">
         <div className="columns medium-7 text-center">
           <div className="question-wrapper">
              <QuestionCardContainer
                question={question}
                answerBody={this.state.answer.answerBody}
                answerHint={this.state.answer.answerHint}
                //categories={this.state.categories}
                hasAnswer={this.state.hasAnswer}
                hasCategories={this.state.hasCategories}
                answerActive={this.state.answerActive}
                toggleAnswer={this.toggleAnswer}
                handleAnswer={this.handleAnswer}
                questionLists={this.state.questionLists}
                addQuestionToList={this.addQuestionToList}
              />
              <ButtonComponent
                text="Random Question"
                class='button secondary'
                handleClick={this.setQuestion}
              />
            </div>
        </div>
        <div className="columns medium-5">
          <aside className="sidebar card">
            <h4 className="card-divider">My Lists</h4>
            <QuestionListContainer
              questionLists={this.state.questionLists}
              addNewList={this.addNewList}
            />
            <hr/>
            <QuestionFormContainer
              addNewQuestion={this.addNewQuestion}
              questionAdded={this.state.questionAdded}
            />
          </aside>
        </div>
        </div>

        </div>
        </div>








  </div>

    );

  }


}

export default AppContainer;

