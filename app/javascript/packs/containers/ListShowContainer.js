import React, { Component } from 'react';

class ListShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {}
    }
  }

  componentDidMount() {
    const listId = this.props.params.id,
          apiUrl = `/api/v1/lists/${listId}`

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
        this.setState({ category: response.category });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let questions

    if (this.state.category.questions){
      questions = this.state.category.questions.map( (item) => {
        return(
          <div key={item.id}>
            {item.title}
          </div>
        )
      })
    }

    return(
      <div className="row">
        <div className="columns medium-10 medium-centered">
          <h1>Category: {this.state.category.name}</h1>
          {questions}
        </div>
      </div>
    )
  }
}

export default ListShowContainer;
