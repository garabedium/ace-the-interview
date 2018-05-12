import React, { Component } from 'react';

class CategoryShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      questions: []
    }
  }

  componentDidMount(){
    let apiUrl = '/api/v1/questions'
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
        this.setState({ questions: response });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let questions;
    if (this.state.questions.questions){
      questions = this.state.questions.questions.map(item => {
        return(
          <div>{item.title}</div>
        )
      })
    }

    return (
      <div>
        {questions}
      </div>
    );
  }
}

export default CategoryShowContainer;

