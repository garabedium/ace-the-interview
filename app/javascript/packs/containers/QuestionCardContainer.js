import React, { Component } from 'react';

class QuestionCardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return (

        <div className="card">
          <h4 className="card-divider">
            {this.props.question}
          </h4>
          <div className="card-section">
            Content goes here.
          </div>
        </div>

    );
  }

}

export default QuestionCardContainer;