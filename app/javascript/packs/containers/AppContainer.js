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
      answerActive: false,

      loadedCategory: '',
      loadedList: '',

      filterDefault: true,
      filterCategory: false,
      filterList: false,

      questionAdded: false,
      questionAddedtoList: false,
      questionLists: []
    }


    this.addNewAnswer = this.addNewAnswer.bind(this)
    this.addNewQuestion = this.addNewQuestion.bind(this)
    this.addQuestionToList = this.addQuestionToList.bind(this)
    this.addNewList = this.addNewList.bind(this)

    this.updateAnswer = this.updateAnswer.bind(this)
    this.toggleAnswer = this.toggleAnswer.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)

    this.getLists = this.getLists.bind(this)
    this.getCategories = this.getCategories.bind(this)

    this.getRandomQuestion = this.getRandomQuestion.bind(this)
    this.getRandomCategoryQuestion = this.getRandomCategoryQuestion.bind(this)
    this.getRandomListQuestion = this.getRandomListQuestion.bind(this)
    this.toggleQuestionToList = this.toggleQuestionToList.bind(this)

  }

  componentDidMount(){
    this.getRandomQuestion()
    this.getLists()
    this.getCategories()
  }

  getRandomQuestion(){

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
          question: response.question,
          answer: {
            body: (response.answer) ? response.answer.body : '',
            hint: (response.answer && response.answer.hint) ? response.answer.hint : '',
            id: (response.answer) ? response.answer.id : ''
          },
          hasAnswer: (response.answer) ? true : false,
          questionCategories: response.categories,
          hasCategories: (response.categories.length > 0) ? true : false
        })
      })
      .catch(error => {
        console.error(`Error in (random question) fetch: ${error.message}`)
      })

  }

  getRandomCategoryQuestion(submission){

    const categoryId = submission,
          apiUrl = `/api/v1/categories.json&?random=${categoryId}`

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
        response
        this.setState({
          question: response.question,
          answer: {
            body: (response.answer) ? response.answer.body : '',
            hint: (response.answer && response.answer.hint) ? response.answer.hint : '',
            id: (response.answer) ? response.answer.id : ''
          },
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
          question: response.question,
          answer: {
            body: (response.answer) ? response.answer.body : '',
            hint: (response.answer && response.answer.hint) ? response.answer.hint : '',
            id: (response.answer) ? response.answer.id : ''
          },
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
        // question: response.questions,
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

  addNewAnswer(submission) {
    const questionId = this.state.question.id
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
        hasAnswer: true,
        answer:{
          body: response.body,
          hint: response.hint,
          id: response.id
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
      this.toggleQuestionToList()
    })
    .catch(error => console.error(`Error in fetch (add question to list): ${error.message}`))
  }

  toggleQuestionToList(){
    this.setState({
      questionAddedtoList: !this.state.questionAddedtoList
    })
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
      debugger
      this.setState({
        hasAnswer: true,
        answer:{
          body: submission.body,
          hint: submission.hint,
          id: answerId
        }
      })
    })
    .catch(error => console.error(`Error in fetch (updating answer): ${error.message}`))

  }

  render() {

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
              />

              {this.state.filterDefault &&
                <ButtonComponent
                  text="Random Question"
                  class='button secondary'
                  handleClick={this.getRandomQuestion}
                />
              }

              {this.state.filterCategory &&
                <ButtonComponent
                  text="Random Question"
                  class='button secondary'
                  handleClick={ () => this.getRandomCategoryQuestion(this.state.loadedCategory)}
                />
              }

              {this.state.filterList &&
                <ButtonComponent
                  text="Random Question"
                  class='button secondary'
                  handleClick={ () => this.getRandomListQuestion(this.state.loadedList) }
                />
              }

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



