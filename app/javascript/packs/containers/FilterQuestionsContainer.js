import React, { Component } from 'react';

class FilterQuestionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: '',
      categoryId: ''
    }
    // this.handleClear = this.handleClear.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleInput = this.handleInput.bind(this)
    this.getCategoryQuestions = this.getCategoryQuestions.bind(this)
    this.getListQuestions = this.getListQuestions.bind(this)

  }


  getCategoryQuestions(event){
    const submission = event.target.value
    this.props.filterCategory(submission)
  }

  getListQuestions(event){
    const submission = event.target.value
    this.props.filterList(submission)
  }

  // handleClear(event){
  //   event.preventDefault()
  //   this.setState({
  //     listId: '',
  //     categoryId: ''
  //     // errors: {}
  //   })
  // }

  render() {
      const categoryOptions = this.props.questionCategories.map( (category) => {
          return ( <option key={category.id} value={`${category.id}`}>{category.name}</option> )
      })
      const listOptions = this.props.questionLists.map( (list) => {
          return ( <option key={list.id} value={`${list.id}`}>{list.name}</option> )
      })
      // if isFilterCategoryActive is true, set List to ""


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