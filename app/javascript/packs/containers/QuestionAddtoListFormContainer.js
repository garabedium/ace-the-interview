import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router';
import FieldInput from '../components/FieldInput';
import ButtonSubmit from '../components/ButtonSubmit';
import CalloutMessage from '../components/CalloutMessage';

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

    if ( this.validateListId('questionListId','Please select a valid List.') ){
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

    const showSuccessMessage = this.props.showSuccessMessage
    const selectOptions = this.props.questionLists.map( (list) => {
        return ( <option key={list.id} value={`${list.id}`}>{list.name}</option> )
    })

    let errorWrapper, errorItems

    if ( Object.keys(this.state.errors).length > 0){
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
      <div>

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
          {showSuccessMessage &&
            <CalloutMessage
              content="Question added to list."
              class="success"
              handleClick={this.props.toggleQuestionToList}
            /> }
        </CSSTransitionGroup>

        <form className="form form__addQuestionList" onSubmit={this.handleSubmit}>

          <div className="input-group">

            <select className="input-group-field" name="questionListId" value={this.state.questionListId} onChange={this.handleInput}>
              <option value="">Add question to list...</option>
              {selectOptions}
            </select>

            <div className="input-group-button">
              <ButtonSubmit
                value="Add"
                class="button"
              />
            </div>

          </div>
        </form>

      </div>
    );
  }
}

export default QuestionAddtoListFormContainer;









