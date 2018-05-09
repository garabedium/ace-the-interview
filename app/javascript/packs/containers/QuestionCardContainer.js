import React, { Component } from 'react';
import AnswerFormContainer from './AnswerFormContainer'

class QuestionCardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      answer: {}
    }

    this.addNewAnswer = this.addNewAnswer.bind(this)
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

  render() {

    let title, answerBody
    if (this.props.question){
      title = this.props.question.title
      answerBody = this.props.answerBody
    }

    return (
      <div className="card">
        <h4 className="card-divider">
          {title}
        </h4>
        <div className="card-section">

          <blockquote>{answerBody}</blockquote>

          <AnswerFormContainer
            addNewAnswer={this.addNewAnswer}
          />

        </div>
      </div>
    );
  }

}

export default QuestionCardContainer;