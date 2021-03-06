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

      question: {},
      answer: {
        body: null,
        hint: null,
        id: null,
      },
      category: {},

      categories: [],
      questionCategories: [],
      questionId: 0,
      selectedCategoryId: 0,
      selectedListId: 0,
      answer: {},

      hasAnswer: false,
      hasCategories: false,
      hasLists: false,
      answerActive: false,
      answerAdded: false,
      answerUpdated: false,

      loadedCategory: '',
      loadedList: '',

      filterDefault: true,
      filterCategory: false,
      filterList: false,

      questionAdded: false,
      questionAddedtoList: false,
      questionLists: []
    }


    this.createAnswer = this.createAnswer.bind(this)
    this.createQuestion = this.createQuestion.bind(this)
    this.addQuestionToList = this.addQuestionToList.bind(this)
    this.addNewList = this.addNewList.bind(this)

    this.updateAnswer = this.updateAnswer.bind(this)
    this.toggleAnswer = this.toggleAnswer.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
    this.toggleAnswerUpdated = this.toggleAnswerUpdated.bind(this)
    this.toggleAnswerAdded = this.toggleAnswerAdded.bind(this)

    this.getLists = this.getLists.bind(this)
    this.getCategories = this.getCategories.bind(this)

    this.getRandomQuestion = this.getRandomQuestion.bind(this)
    this.getRandomCategoryQuestion = this.getRandomCategoryQuestion.bind(this)
    this.getRandomListQuestion = this.getRandomListQuestion.bind(this)
    this.toggleQuestionToList = this.toggleQuestionToList.bind(this)
    this.toggleQuestionAdded = this.toggleQuestionAdded.bind(this)

  }

  componentDidMount(){
    this.getRandomQuestion()
    this.getLists()
    this.getCategories()
  }

  getRandomQuestion(){
    const apiUrl = `/api/v1/questions.json`

    this.get(apiUrl)
    .then(response => {
      this.setState({
        question: response.question,
        answer: {
          body: (response.answer) ? response.answer.body : '',
          hint: (response.answer && response.answer.hint) ? response.answer.hint : '',
          id: (response.answer) ? response.answer.id : ''
        },
        answerActive: false,
        hasAnswer: (response.answer) ? true : false,
        questionCategories: response.categories,
        hasCategories: (response.categories.length > 0) ? true : false
      })
    debugger;
    })
    .catch(error => {
      console.error(`Error in (random question) fetch: ${error.message}`)
    })

  }

  getRandomCategoryQuestion(submission){
    const categoryId = submission,
          apiUrl = `/api/v1/categories.json&?random=${categoryId}`
    this.get(apiUrl)
    .then(response => {
      this.setState({
        question: response.question,
        answer: {
          body: (response.answer) ? response.answer.body : '',
          hint: (response.answer && response.answer.hint) ? response.answer.hint : '',
          id: (response.answer) ? response.answer.id : ''
        },
        answerActive: false,
        hasAnswer: (response.answer) ? true : false,
        questionCategories: response.categories,
        hasCategories: (response.categories.length > 0) ? true : false,
        loadedCategory: submission,
        loadedList: '',
        filterCategory: true,
        filterList: false,
        filterDefault: false
      })
    })
    .catch(error => {
      console.error(`Error in (random question by category) fetch: ${error.message}`)
    })

  }

  getRandomListQuestion(submission){
    const listId = submission,
          apiUrl = `/api/v1/lists.json?random=${listId}`
    this.get(apiUrl)
    .then(response => {
      this.setState({
        question: response.question,
        answer: {
          body: (response.answer) ? response.answer.body : '',
          hint: (response.answer && response.answer.hint) ? response.answer.hint : '',
          id: (response.answer) ? response.answer.id : ''
        },
        answerActive: false,
        hasAnswer: (response.answer) ? true : false,
        questionCategories: response.categories,
        hasCategories: (response.categories.length > 0) ? true : false,
        loadedList: submission,
        loadedCategory: '',
        filterList: true,
        filterDefault: false,
        filterCategory: false
      })
    })
    .catch(error => {
      console.error(`Error in (random question) fetch: ${error.message}`)
    })

  }

  toggleAnswer(){
    return this.setState({
      answerActive: !this.state.answerActive
    })
  }

// add --> create (use REST verbs)
  createQuestion(submission) {
    const apiUrl = '/api/v1/questions.json'

    this.post(apiUrl,submission)
    .then(response => {
        this.setState({
          question: response.question,
          questionAdded: true,
          answer: {
            body: '',
            hint: '',
            id: ''
          },
          hasAnswer: false,
          hasCategories: false
        })

    })
    .catch(error => console.error(`Error in fetch (add new question): ${error.message}`))

  }

  handleAnswer(submission){

    if (this.state.hasAnswer){
      this.updateAnswer(submission)
    } else {
      this.createAnswer(submission)
    }
  }

  addNewList(submission) {
    const apiUrl = '/api/v1/lists.json'

    this.post(apiUrl,submission)
    .then(response => {
      this.setState({
        questionLists: this.state.questionLists.concat(response),
        hasLists: true
      })
    })
    .catch(error => console.error(`Error in fetch (add new list): ${error.message}`))
  }

  createAnswer(submission) {
    const questionId = this.state.question.id
    const apiUrl = `/api/v1/questions/${questionId}/answers.json`

    this.post(apiUrl,submission)
    .then(response => {
      this.setState({
        hasAnswer: true,
        answerAdded: true,
        answer:{
          body: response.body,
          hint: response.hint,
          id: response.id
        }
      })
    })
    .catch(error => console.error(`Error in fetch (adding new answer): ${error.message}`))
  }

  toggleQuestionAdded(){
    this.setState({
      questionAdded: !this.state.questionAdded
    })
  }

  addQuestionToList(submission) {
    const apiUrl = '/api/v1/question_lists.json'

    this.post(apiUrl,submission)
    .then(response => {
      this.toggleQuestionToList()
    })
    .catch(error => console.error(`Error in fetch (add question to list): ${error.message}`))
  }

  toggleQuestionToList(){
    this.setState({
      questionAddedtoList: !this.state.questionAddedtoList
    })
  }


  //

  post(url,payload){
    return fetch(url, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(payload),
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
  }

  get(url){
   return fetch(url,{
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
  }

  getLists(){
    const apiUrl = '/api/v1/lists.json'

    this.get(apiUrl)
    .then(response => {
      this.setState({
        questionLists: response.lists,
        hasLists: (response.lists.length > 0) ? true : false
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getCategories(){
    const apiUrl = '/api/v1/categories.json'

    this.get(apiUrl)
      .then(response => {
        this.setState({
          categories: response.categories
        })
      })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  updateAnswer(submission){
    const questionId = this.state.question.id
    const answerId = this.state.answer.id
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
        hasAnswer: true,
        answerAdded: false,
        answerUpdated: true,
        answerUpdated: !this.state.answerUpdated,
        answer:{
          body: submission.body,
          hint: submission.hint,
          id: answerId
        }
      })
    })
    .catch(error => console.error(`Error in fetch (updating answer): ${error.message}`))
  }

  toggleAnswerAdded(){
    this.setState({
      answerAdded: !this.state.answerAdded
    })
  }

  toggleAnswerUpdated(){
    this.setState({
      answerUpdated: !this.state.answerUpdated
    })
  }

  loadRandomQuestionButton(){
    let clickMethod
    if (this.state.loadedCategory || this.state.loadedList) {
      clickMethod = (this.state.loadedCategory) ? () => this.getRandomCategoryQuestion(this.state.loadedCategory) : () => this.getRandomListQuestion(this.state.loadedList)
    } else {
      clickMethod = this.getRandomQuestion
    }

      return   <ButtonComponent
                  text="Random Question"
                  class='button secondary'
                  handleClick={ clickMethod }
                />
  }

  render() {

    let randomQuestionButton = this.loadRandomQuestionButton()

    return (
<div className="parent">

      <div className="row">
        <div className="columns medium-11 medium-centered">
          <div className="row">

         <div className="columns medium-7 text-center">

            <div className="question-filters">
              <h5 className="question-filters__header">Load Questions by Category or List</h5>
               <FilterQuestionsContainer
                questionLists={this.state.questionLists}
                questionCategories={this.state.categories}
                filterCategory={this.getRandomCategoryQuestion}
                filterList={this.getRandomListQuestion}
                loadedCategory={this.state.loadedCategory}
                loadedList={this.state.loadedList}
                hasLists={this.state.hasLists}
               />
            </div>
            <div className="question-wrapper">

              <QuestionCardContainer
                question={this.state.question}
                answerBody={this.state.answer.body}
                categories={this.state.questionCategories}
                hasCategories={this.state.hasCategories}
                hasAnswer={this.state.hasAnswer}
                answerActive={this.state.answerActive}
                toggleAnswer={this.toggleAnswer}
                handleAnswer={this.handleAnswer}
                questionLists={this.state.questionLists}
                addQuestionToList={this.addQuestionToList}
                showSuccessMessage={this.state.questionAddedtoList}
                toggleQuestionToList={this.toggleQuestionToList}
                answerUpdated={this.state.answerUpdated}
                answerAdded={this.state.answerAdded}
                toggleAnswerAdded={this.toggleAnswerAdded}
                toggleAnswerUpdated={this.toggleAnswerUpdated}
              />

              {randomQuestionButton}

            </div>

        </div>
          <div className="columns medium-5">
            <aside className="sidebar card">
              <h5 className="card-divider">My Lists</h5>
              <QuestionListContainer
                questionLists={this.state.questionLists}
                addNewList={this.addNewList}
              />

              <QuestionFormContainer
                createQuestion={this.createQuestion}
                questionAdded={this.state.questionAdded}
                toggleQuestionAdded={this.toggleQuestionAdded}
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
