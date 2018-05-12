import React, { Component } from 'react';
import { Link } from 'react-router';

class CategoriesIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount(){
    let apiUrl = '/api/v1/categories'
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
        this.setState({ categories: response.categories });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let categories;
    if (this.state.categories){
      categories = this.state.categories.map(item => {
        return(
          <div
            key={item.id}
          >
            <Link to={`/app/categories/${item.id}`}>
              {item.name}
            </Link>
          </div>
        )
      })
    }

    return (
      <div className="row">
        <div className="columns medium-10 medium-centered">
          {categories}
        </div>
      </div>
    );
  }
}

export default CategoriesIndexContainer;

