import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import CalloutMessage from '../components/CalloutMessage'
import FieldTextarea from '../components/FieldTextarea'
import ButtonSubmit from '../components/ButtonSubmit'

class AnswerFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      answerBody: "",
      answerHint: "",
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.clearErrors = this.clearErrors.bind(this)
    this.validateTextInput = this.validateTextInput.bind(this)
  }

  componentDidMount(){
    this.setState({
      answerBody: this.props.answerBody
    })
  }

  clearErrors(event){
    event.preventDefault()
    this.setState({
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
    if ( this.validateTextInput('answerBody','Please enter an answer.') ){
      const submission  = {
        body: this.state.answerBody,
        hint: this.state.answerHint
      }
      this.props.handleAnswer(submission)
    }
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

    const answerAdded = this.props.answerAdded
    const answerUpdated = this.props.answerUpdated

    let errorWrapper, errorItems, successWrapper
    if ( Object.keys(this.state.errors).length > 0 ){
      errorItems = Object.values(this.state.errors).map( error => {
        return (<div key={error}>{error}</div>)
      })
      errorWrapper =
        <CalloutMessage
          content={errorItems}
          class="alert"
          handleClick={this.clearErrors}
        />
    }
    if (answerAdded || answerUpdated){
        successWrapper =
        <CalloutMessage
          content={answerAdded ? "Answer recorded!" : "Answer updated!"}
          class="success"
          handleClick={answerAdded ? this.props.toggleAnswerAdded : this.props.toggleAnswerUpdated}
        />
    }

    return (
        <form className="form form__answers--new" onSubmit={this.handleSubmit}>

          <CSSTransitionGroup
            transitionName="el-transition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {errorWrapper}
          </CSSTransitionGroup>

          <CSSTransitionGroup
            transitionName="el-transition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {successWrapper}
          </CSSTransitionGroup>

          <FieldTextarea
            placeholder="Add and update your answer here."
            name="answerBody"
            content={this.state.answerBody}
            handleChange={this.handleInput}
            class="textarea textarea--answer"
          />

          <ButtonSubmit
            value="Save"
            class="button"
          />

        </form>
    );
  }

}

export default AnswerFormContainer;