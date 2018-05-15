import React, { Component } from 'react';
import { Link } from 'react-router';
import FieldInput from '../components/FieldInput';
import ButtonSubmit from '../components/ButtonSubmit';

class QuestionAddtoListFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionListId: '',
      errors: {}
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleClear(event){
    event.preventDefault()
    this.setState({
      questionListId: '',
      errors: {}
    })
  }

  handleInput(event){
    this.setState({
      [event.target.name]: parseInt(event.target.value)
    })
  }

  handleSubmit(event){
    event.preventDefault()

    if ( this.validateListId('questionListId','Please select a List.') ){
      const submission = {
        list: this.state.questionListId,
        question: this.props.questionId
      }

      this.props.addQuestionToList(submission)
      this.handleClear(event)
    }

  }

   validateListId(field,error) {
      const value = this.state[field]
      const currentListIds = this.props.questionLists.map( (list) => { return list.id })

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
      return (currentListIds.indexOf(value) < 0) ? setError() : clearError();
    }

  render() {

    const selectOptions = this.props.questionLists.map( (list) => {
        return ( <option key={list.id} value={`${list.id}`}>{list.name}</option> )
    })

    let errorWrapper, errorItems

    if ( Object.keys(this.state.errors).length > 0){
      errorItems = Object.values(this.state.errors).map( error => {
        return (<li key={error}>{error}</li>)
      })
      errorWrapper = <ul className="callout alert">{errorItems}</ul>
    }

    return (
      <div>
        {errorWrapper}

        <form className="form form__addQuestion--list" onSubmit={this.handleSubmit}>

          <select name="questionListId" value={this.state.questionListId} onChange={this.handleInput}>
            <option value="">Add question to list...</option>
            {selectOptions}
          </select>

          <ButtonSubmit
            value="Add"
            class="button"
          />

        </form>

      </div>
    );
  }
}

export default QuestionAddtoListFormContainer;









