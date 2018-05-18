import React, { Component } from 'react';

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
      const categoryOptions = this.props.questionCategories.map( (category) => {
          return ( <option key={category.id} value={`${category.id}`}>{category.name}</option> )
      })
      const listOptions = this.props.questionLists.map( (list) => {
          return ( <option key={list.id} value={`${list.id}`}>{list.name}</option> )
      })

    return(

      <div className="row">

        <form className="form form__filterQuestions">

          <div className="columns medium-6">

              <label>Load Category
                <select className="select__filter select__filter--category"
                  name="categoryId"
                  onChange={this.getCategoryQuestions}
                  value={this.props.loadedCategory}
                >
                <option value="">Select a Category...</option>
                  {categoryOptions}
                </select>
              </label>

          </div>

          <div className="columns medium-6">
              <label>Load List
                <select className="select__filter select--filter--list"
                  name="listId"
                  onChange={this.getListQuestions}
                  value={this.props.loadedList}
                >
                <option value="">Select a List...</option>
                  {listOptions}
                </select>
              </label>
          </div>
        </form>

      </div>

    )
  }
}

export default FilterQuestionsContainer;


// value={this.state.cateogryId}