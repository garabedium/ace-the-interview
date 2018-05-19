import React, { Component } from 'react';
import { Link } from 'react-router';
import AnswerFormContainer from './AnswerFormContainer'
import QuestionAddtoListFormContainer from './QuestionAddtoListFormContainer'

class QuestionCardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.showCategories = this.showCategories.bind(this)
  }

  showCategories(){
      // debugger
    if (this.props.hasCategories){
      let categories = this.props.categories.map( (item) => {
        return (
          <li key={item.id} className="question__category--item">
            <Link to={`/app/categories/${item.id}`} className="question__category--link">{item.name}</Link>
          </li>
        )
      })

      return (
        <ul className="menu simple question__categories">
          {categories}
        </ul>
      )
    }
  }

  render() {

    const question = (this.props.question) ? this.props.question.title : ""
    const isAnswerActive = this.props.answerActive
    const hasQuestionLists = (this.props.questionLists.length > 0) ? true : false

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
              answerBody={this.props.answerBody}
              hasAnswer={this.props.hasAnswer}
              toggleAnswer={this.props.toggleAnswer}
              handleAnswer={this.props.handleAnswer}
            />
          }

          <div className="question__body--bottom">
            {this.showCategories()}

            {hasQuestionLists &&
              <QuestionAddtoListFormContainer
                questionLists={this.props.questionLists}
                questionId={this.props.question.id}
                addQuestionToList={this.props.addQuestionToList}
                showSuccessMessage={this.props.showSuccessMessage}
                toggleQuestionToList={this.props.toggleQuestionToList}
              />
            }
          </div>

        </div>
      </div>
    );
  }

}

export default QuestionCardContainer;


          // <QuestionAddtoListFormContainer
          //   questionLists={this.props.questionLists}
          // />



