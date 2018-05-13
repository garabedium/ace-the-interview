import React, { Component } from 'react';
import { Link } from 'react-router';

class QuestionListContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionLists: []
    }
    this.showLists = this.showLists.bind(this)
  }

  componentDidMount(){
    let apiUrl = '/api/v1/lists.json'
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
        this.setState({
          questionLists: response.lists
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  showLists(){
    const questionLists = this.state.questionLists
    if(questionLists){
      let result = questionLists.map( (item) => {
        return (<li key={item.list.id}>{item.list.name}</li>)
      })

      return (
        <ul className="menu">
          {result}
        </ul>
      )
    }
  }

  render() {

    return (
      <div>
        {this.showLists()}
        <button className="button secondary">Add New List +</button>
        <hr/>
        <button className="button warning">Add New Question +</button>
      </div>
    );
  }
}

export default QuestionListContainer;

