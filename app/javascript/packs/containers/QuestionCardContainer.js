import React, { Component } from 'react';
import AnswerFormContainer from './AnswerFormContainer'

class QuestionCardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAnswerForm: false
    }

    this.addNewAnswer = this.addNewAnswer.bind(this)
    this.showAnswerForm = this.showAnswerForm.bind(this)
    // this.doSomething = this.doSomething.bind(this)
  }

  // doSomething(){
  //   console.log("lorem ipsum");
  // }

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

  showAnswerForm(){
    return this.setState({
      showAnswerForm: !this.state.showAnswerForm
    })
  }

  render() {

    let title, answerBody
    if (this.props.question){
      title = this.props.question.title
    }

    let answerComponent = () => {
      if (this.props.answerBody){
        return(
          <div>
            <button>Show Answer</button>
            <blockquote>{this.props.answerBody}</blockquote>
          </div>
        )
      } else {
        return( <button className="button" onClick={this.showAnswerForm}>Add Answer</button> )
      }
    }
    //   console.log(this.props.answerBody);
    // if (this.props.answerBody){
    // }

    return (
      <div className="card">
        <h4 className="card-divider">
          {title}
        </h4>
        <div className="card-section">
          {answerComponent()}
        </div>
      </div>
    );
  }

}

export default QuestionCardContainer;


    // return (
    //   <AnswerFormContainer
    //     addNewAnswer={this.addNewAnswer}
    //   />
    // )
          // <blockquote>{answerBody}</blockquote>