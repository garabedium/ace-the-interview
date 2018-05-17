import React, { Component } from 'react';

class FilterQuestionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: '',
      categoryId: ''
    }
    this.handleClear = this.handleClear.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleInput = this.handleInput.bind(this)
    this.getCategoryQuestions = this.getCategoryQuestions.bind(this)
    this.getListQuestions = this.getListQuestions.bind(this)

  }


  getCategoryQuestions(event){

    const categoryId = parseInt(event.target.value),
          apiUrl = `/api/v1/categories/${categoryId}`

    fetch(apiUrl,{
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {;
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        this.props.updateQuestions( response.category.questions )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  getListQuestions(){
    console.log("get list questions")
  }

  handleClear(event){
    event.preventDefault()
    this.setState({
      listId: '',
      categoryId: ''
      // errors: {}
    })
  }

  // handleInput(event){
  //   debugger
  //   this.setState({
  //     [event.target.name]: parseInt(event.target.value)
  //   })
  // }

  // handleSubmit(event){
  //   event.preventDefault()

  //     const submission = {
  //       listId: this.state.listId,
  //       categoryId: this.props.categoryId
  //     }

  //     this.props.updateQuestions(submission)
  //     this.handleClear(event)

  // }

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
                  onChange={this.getCategoryQuestions}>
                <option value="">Select a Category...</option>
                  {categoryOptions}
                </select>
              </label>

          </div>

          <div className="columns medium-6">
              <label>Load List
                <select className="select__filter select--filter--list"
                  name="listId"
                  onChange={this.getListQuestions}>
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