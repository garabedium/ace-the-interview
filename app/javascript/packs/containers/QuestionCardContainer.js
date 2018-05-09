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
    let apiUrl = `/api/v1/questions/${this.props.question.id}/answers`
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
      debugger
      // let allReviews = this.state.reviews
      // this.setState({
      //   reviews: allReviews.concat(review)
      // })
    })
    .catch(error => console.error(`Error in fetch (submitting new review): ${error.message}`))
  }

  render() {

    let title
    if (this.props.question){
      title = this.props.question.title
    }
    return (
      <div className="card">
        <h4 className="card-divider">
          {title}
        </h4>
        <div className="card-section">
          <AnswerFormContainer
            addNewAnswer={this.addNewAnswer}
          />
        </div>
      </div>
    );
  }

}

export default QuestionCardContainer;