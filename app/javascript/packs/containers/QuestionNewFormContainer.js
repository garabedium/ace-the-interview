import React, { Component } from 'react'
import FieldTextarea from '../components/FieldTextarea'
import FieldInput from '../components/FieldInput'
import ButtonSubmit from '../components/ButtonSubmit'

class QuestionNewFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionTitle: "",
      answerBody: "",
      answerHint: "",
      errors: {}
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount(){
    this.setState({
      answerBody: this.props.answerBody,
      answerHint: this.props.answerHint
    })
  }

  handleClear(event){
    event.preventDefault()
    this.setState({
      answerBody: "",
      answerHint: "",
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
    const submission  = {
      title: this.state.questionTitle,
      body: this.state.answerBody,
      hint: this.state.answerHint
    }


    this.props.addNewQuestion(submission)
  }

  render() {

    return (
        <form className="form form__question--new" onSubmit={this.handleSubmit}>

          <FieldInput
            label="Question"
            content={this.state.questionTitle}
            handleChange={this.handleInput}
          />

          <FieldTextarea
            label="Answer"
            name="answerBody"
            content={this.state.answerBody}
            handleChange={this.handleInput}
          />

          <ButtonSubmit
            value="Save"
            class="button"
          />

        </form>
    );
  }

}

export default QuestionNewFormContainer;