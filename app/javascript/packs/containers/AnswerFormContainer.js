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
  }

  handleClear(event){
    event.preventDefault();
    this.setState({
      answerBody: "",
      answerHint: "",
      errors: {}
    })
  }

  componentDidMount(){

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
    // this.handleClear()
    this.props.addNewAnswer(newAnswer)
  }

  render() {

    return (
        <form className="form form__answers--new">

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
          <br/>
          <button className="button" onClick={this.handleClear}>clear</button>
        </form>
    );
  }

}

export default AnswerFormContainer;


 // onSubmit={this.handleSubmit}