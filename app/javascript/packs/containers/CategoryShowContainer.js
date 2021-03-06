import React, { Component } from 'react';
import BackButton from '../components/BackButton';

class CategoryShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {}
    }
  }

  componentDidMount() {
    const categoryId = this.props.params.id,
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
        this.setState({ category: response.category });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let questions

    if (this.state.category.questions){
      questions = this.state.category.questions.map( (item) => {
        return(
          <li key={item.id} className="list list__item">
            {item.title}
          </li>
        )
      })
    }

    return(
      <div className="row">
        <div className="columns medium-10 medium-centered">
          <BackButton
            content="Back"
            class="button secondary small"
          />
          <h1>Category: {this.state.category.name}</h1>

          <ul className="list menu vertical">
            {questions}
          </ul>

        </div>
      </div>
    )
  }
}

export default CategoryShowContainer;
