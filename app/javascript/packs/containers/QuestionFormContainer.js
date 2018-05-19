import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group';
import FieldTextarea from '../components/FieldTextarea'
import FieldInput from '../components/FieldInput'
import ButtonSubmit from '../components/ButtonSubmit'
import CalloutMessage from '../components/CalloutMessage';

class QuestionFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionTitle: "",
      errors: {}
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.validateTextInput = this.validateTextInput.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }

  handleClear(event){
    event.preventDefault()
    this.setState({
      questionTitle: "",
      errors: {},
      showForm: false
    })
  }

  handleInput(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()

    if ( this.validateTextInput('questionTitle','Please enter a question.') ){
      const submission  = {
        title: this.state.questionTitle
      }
      this.props.addNewQuestion(submission)
      this.handleClear(event)
    }

  }

  toggleForm(){
    return this.setState( ({
      showForm: !this.state.showForm
    }));
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

  render() {

    let errorWrapper, errorItems

    const newQuestionButton = <button className="button small button--secondary button__question" onClick={this.toggleForm}>+ New Question</button>
    const showForm = this.state.showForm
    const questionAdded = this.props.questionAdded

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
      <div className="question-new">
        {newQuestionButton}

        <CSSTransitionGroup
          transitionName="el-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {errorWrapper}
        </CSSTransitionGroup>

      {showForm &&

        <form className="form form__question--new" onSubmit={this.handleSubmit}>

          <div className="input-group">

            <FieldInput
              name="questionTitle"
              content={this.state.questionTitle}
              handleChange={this.handleInput}
              placeholder="Add a new question"
              class="input-group-field"
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

export default QuestionFormContainer;