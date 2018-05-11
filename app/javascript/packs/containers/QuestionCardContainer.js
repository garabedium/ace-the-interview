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

    const buttonText = () => {
      let result
      if (!isAnswerActive && this.props.hasAnswer){
        result = "Show Answer"
      } else if (!this.props.hasAnswer) {
        result = "Add Answer"
      } else {
        result = "Hide Answer"
      }
      return result
    }

    const answerButton = <button className="button button__answer" onClick={this.props.toggleAnswer}>{buttonText()}</button>

    return (
      <div className="card question">
        <h4 className="card-divider question__header">
          {question}
        </h4>
        <div className="card-section question__body">

          {answerButton}

          {isAnswerActive &&
            <AnswerFormContainer
              addNewAnswer={this.props.addNewAnswer}
              updateAnswer={this.props.updateAnswer}
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

    // const answerButton = (!isAnswerActive) ? (

    //   <button className="button" onClick={this.props.toggleAnswer}>Show Answer</button>
    // ) : (
    //   <button className="button" onClick={this.props.toggleAnswer}>Hide Answer</button>
    // )
          // {answerButton}

          // {isAnswerActive &&
          //   <AnswerFormContainer
          //     addNewAnswer={this.props.addNewAnswer}
          //     answerBody={this.props.answerBody}
          //     answerHint={this.props.answerHint}
          //     hasAnswer={this.props.hasAnswer}
          //   />
          // }