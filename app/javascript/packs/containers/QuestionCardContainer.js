import React, { Component } from 'react';
import AnswerFormContainer from './AnswerFormContainer'

class QuestionCardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      // answerActive: false
    }
  }

  render() {

    const question = (this.props.question) ? this.props.question.title : ""
    const isAnswerActive = this.props.answerActive
    const answerButton = !isAnswerActive ? (
      <button className="button" onClick={this.props.toggleAnswer}>Show Answer</button>
    ) : (
      <button className="button" onClick={this.props.toggleAnswer}>Hide Answer</button>
    )

    return (
      <div className="card">
        <h4 className="card-divider">
          {question}
        </h4>
        <div className="card-section">
          {answerButton}
          {isAnswerActive &&
            <AnswerFormContainer
              addNewAnswer={this.props.addNewAnswer}
              answerBody={this.props.answerBody}
              answerHint={this.props.answerHint}
              hasAnswer={this.props.hasAnswer}
            />
          }
        </div>
      </div>
    );
  }

}

export default QuestionCardContainer;