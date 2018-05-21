import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

class FilterQuestionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.getCategoryQuestions = this.getCategoryQuestions.bind(this)
    this.getListQuestions = this.getListQuestions.bind(this)

  }

  getCategoryQuestions(event){
    const submission = event.target.value
    if (submission !== '' && submission !== this.props.loadedCategory){
      this.props.filterCategory(submission)
    }
  }

  getListQuestions(event){
    const submission = event.target.value
    if (submission !== '' && submission !== this.props.loadedList){
      this.props.filterList(submission)
    }
  }

  render() {

    const hasLists = this.props.hasLists
    const categoryOptions = this.props.questionCategories.map( (category) => {
        return ( <option key={category.id} value={`${category.id}`}>{category.name}</option> )
    })
    const listOptions = this.props.questionLists.map( (list) => {
        return ( <option key={list.id} value={`${list.id}`}>{list.name}</option> )
    })

    return(

      <div className="row">

        <form className="form form__filterQuestions clearfix">
          <div className="columns medium-6">

            <select className="select__filter select__filter--category"
              name="categoryId"
              onChange={this.getCategoryQuestions}
              value={this.props.loadedCategory}
            >
            <option value="">Select a Category...</option>
              {categoryOptions}
            </select>

          </div>

        <CSSTransitionGroup
          transitionName="el-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {hasLists &&
            <div className="columns medium-6">
              <select className="select__filter select--filter--list"
                name="listId"
                onChange={this.getListQuestions}
                value={this.props.loadedList}
              >
              <option value="">Select a List...</option>
                {listOptions}
              </select>
            </div>
          }
         </CSSTransitionGroup>
        </form>

      </div>

    )
  }
}

export default FilterQuestionsContainer;


// value={this.state.cateogryId}