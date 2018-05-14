import React, { Component } from 'react';
import { Link } from 'react-router';
import AnswerFormContainer from './AnswerFormContainer'

class QuestionCardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.showCategories = this.showCategories.bind(this)
  }

  showCategories(){
    if (this.props.hasCategories){
      let categories = this.props.categories.map( (item) => {
        return (
          <li key={item.id} className="question__category">
            <Link to={`/app/categories/${item.id}`}>{item.name}</Link>
          </li>
        )
      })

      return (
        <ul className="menu simple">
          <li className="question__category--label">Tags:</li>
          {categories}
        </ul>
      )
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

          {this.showCategories()}

        </div>
      </div>
    );
  }

}

export default QuestionCardContainer;
