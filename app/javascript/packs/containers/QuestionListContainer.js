import React, { Component } from 'react';
import { Link } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group';
import FieldInput from '../components/FieldInput';
import ButtonSubmit from '../components/ButtonSubmit';
import CalloutMessage from '../components/CalloutMessage';

class QuestionListContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionLists: [],
      listName:"",
      listAdded: false,
      errors: {},
      showForm: false
    }
    this.showLists = this.showLists.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.validateTextInput = this.validateTextInput.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }

  showLists(){
    const questionLists = this.props.questionLists

    if(questionLists){
      let result = questionLists.map( (list) => {
        return (
          <li key={list.id} className="list--item">
            <Link to={`/app/lists/${list.id}`} className="list--link">{list.name}</Link>
          </li>)
      })

      return (
        <ul className="user-lists">
          {result}
        </ul>
      )
    }
  }

  handleClear(event){
    event.preventDefault()
    this.setState({
      listName: "",
      errors: {}
    })
  }

  handleInput(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()

    if (
      this.validateTextInput('listName','Please enter a List name.') &&
      this.validateDuplicateList('listName','List names must be unique.')
    ){
      const submission  = {
        name: this.state.listName
      }

      this.props.addNewList(submission)
      this.handleClear(event)
    }

  }

  toggleForm(){
    this.setState({
      showForm: !this.state.showForm
    })
  }

 validateTextInput(field,error) {
    const value = this.state[field];
    const setError = () => {
      let newError = { [field]: error }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    }
    const clearError = () => {
      let errorState = this.state.errors
      delete errorState[field]
      this.setState({ errors: errorState })
      return true
    }
    return (value.trim() === '') ? setError() : clearError();
  }

 validateDuplicateList(field,error) {
    const value = this.state[field].toLowerCase().replace(/ {1,}/g," ")
    const currentLists = this.props.questionLists.map( (list) => { return list.name.toLowerCase() })

    const setError = () => {
      let newError = { [field]: error }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    }
    const clearError = () => {
      let errorState = this.state.errors
      delete errorState[field]
      this.setState({ errors: errorState })
      return true
    }
    return (currentLists.indexOf(value) > -1) ? setError() : clearError();
  }


  render() {

    let errorWrapper, errorItems
    const newListButton = <button className="button small button--secondary button__question" onClick={this.toggleForm}>+ New List</button>
    const showForm = this.state.showForm

    if ( Object.keys(this.state.errors).length > 0 ){
      errorItems = Object.values(this.state.errors).map( error => {
        return (<div key={error}>{error}</div>)
      })
      errorWrapper =
        <CalloutMessage
          content={errorItems}
          class="alert"
          handleClick={this.handleClear}
        />
    }

    return (
      <div className="card-section">
        {this.showLists()}

        {newListButton}

        <CSSTransitionGroup
          transitionName="el-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {errorWrapper}
        </CSSTransitionGroup>

        {showForm &&
          <form className="form form__list--new" onSubmit={this.handleSubmit}>

            <div className="input-group">

              <FieldInput
                name="listName"
                class="input-group-field"
                content={this.state.listName}
                handleChange={this.handleInput}
                placeholder="Add a new list"
              />

              <div className="input-group-button">
                <ButtonSubmit
                  value="Add"
                  class="button button--secondary"
                />
              </div>
            </div>

          </form>
        }
      </div>
    );
  }
}

export default QuestionListContainer;









