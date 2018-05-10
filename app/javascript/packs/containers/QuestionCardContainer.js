import React, { Component } from 'react';
import AnswerFormContainer from './AnswerFormContainer'

class QuestionCardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      answerActive: false
    }

    this.addNewAnswer = this.addNewAnswer.bind(this)
    this.toggleAnswer = this.toggleAnswer.bind(this)

    // this.showAnswerForm = this.showAnswerForm.bind(this)

  }

  addNewAnswer(submission) {
    let apiUrl = `/api/v1/questions/${this.props.question.id}/answers.json`
    fetch(apiUrl, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(submission),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      // let allReviews = this.state.reviews
      // this.setState({
      //   reviews: allReviews.concat(review)
      // })
    })
    .catch(error => console.error(`Error in fetch (submitting new review): ${error.message}`))
  }

  // showAnswerForm(){
  //   return this.setState({
  //     showAnswerForm: !this.state.showAnswerForm
  //   })
  // }

  toggleAnswer(){
    return this.setState({
      answerActive: !this.state.answerActive
    })
  }

  render() {

    const isAnswerActive = this.state.answerActive
    const answerButton = !isAnswerActive ? (
      <button className="button" onClick={this.toggleAnswer}>Show Answer</button>
    ) : (
      <button className="button" onClick={this.toggleAnswer}>Hide Answer</button>
    )

    let title, answer
    if (this.props.question){
      title = this.props.question.title
      //answer = this.props.answerBody
    }

    // let answerComponent = () => {
    //   if (this.props.hasAnswer){
    //     return(
    //       <button className="button" onClick={this.toggleAnswer}>Show Answer</button>
    //     )
    //   }
    // }

    //   console.log(this.props.answerBody);
    // if (this.props.answerBody){
    // }

    return (
      <div className="card">
        <h4 className="card-divider">
          {title}
        </h4>
        <div className="card-section">
          {answerButton}
          {isAnswerActive && <AnswerFormContainer/>}
        </div>
      </div>
    );
  }

}

export default QuestionCardContainer;

// {this.state.answerActive && <AnswerFormContainer/>}
