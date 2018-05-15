import React, { Component } from 'react'
import FieldTextarea from '../components/FieldTextarea'
import FieldInput from '../components/FieldInput'
import ButtonSubmit from '../components/ButtonSubmit'

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

    const newQuestionButton = <button className="button button__question warning" onClick={this.toggleForm}>+ New Question</button>
    const showForm = this.state.showForm

    if ( Object.keys(this.state.errors).length > 0 ){
      errorItems = Object.values(this.state.errors).map( error => {
        return (<li key={error}>{error}</li>)
      })
      errorWrapper = <ul className="callout alert">{errorItems}</ul>
    }


    return (

      <div>
        {newQuestionButton}
        {errorWrapper}

        {showForm &&
        <form className="form form__question--new" onSubmit={this.handleSubmit}>

          <FieldInput
            label="Question"
            name="questionTitle"
            content={this.state.questionTitle}
            handleChange={this.handleInput}
          />

          <ButtonSubmit
            value="Save"
            class="button"
          />

        </form>
      }
      </div>
    );
  }

}

export default QuestionFormContainer;