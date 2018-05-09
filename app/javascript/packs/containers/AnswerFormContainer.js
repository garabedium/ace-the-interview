import React, { Component } from 'react'
import FieldTextarea from '../components/FieldTextarea'

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
  }

  handleInput(event){
    // Taking this approach, event.target.name must match what's in state.
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let newAnswer = {
      body: this.state.answerBody,
      hint: this.state.answerHint
    }
    this.props.addNewAnswer(newAnswer)
  }

  render() {

    return (
        <form className="form form__answers--new" onSubmit={this.handleSubmit}>
          <FieldTextarea
            label="Hint"
            name="answerHint"
            content={this.state.body}
            handleChange={this.handleInput}
          />

          <FieldTextarea
            label="Answer"
            name="answerBody"
            content={this.state.body}
            handleChange={this.handleInput}
          />

          <input className="button" type="submit" value="Submit" />
        </form>
    );
  }

}

export default AnswerFormContainer;