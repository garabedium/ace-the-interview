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
    // this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  // handleClear(){
  //   this.setState({
  //     answerBody: "",
  //     answerHint: "",
  //     errors: {}
  //   })
  // }

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
    // this.handleClear()
  }

  render() {

    return (
        <form className="form form__answers--new" onSubmit={this.handleSubmit}>

          <FieldTextarea
            label="Answer"
            name="answerBody"
            content={this.state.body}
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