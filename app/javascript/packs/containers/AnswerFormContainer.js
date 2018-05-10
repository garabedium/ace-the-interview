import React, { Component } from 'react'
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
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    // this.updateAnswer = this.updateAnswer.bind(this)
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

  // 1 infinite loop
  // updateAnswer(){
  //   this.setState({
  //     answerBody: this.props.answerBody,
  //     answerHint: this.props.answerHint
  //   })
  // }

  handleInput(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    const submission  = {
      body: this.state.answerBody,
      hint: this.state.answerHint
    }
    this.handleClear(event)
    this.props.addNewAnswer(submission)
  }

  render() {

    // 1 infinite loop
    // if (this.props.hasAnswer){
    //   this.updateAnswer()
    // }

    return (
        <form className="form form__answers--new" onSubmit={this.handleSubmit}>

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

export default AnswerFormContainer;