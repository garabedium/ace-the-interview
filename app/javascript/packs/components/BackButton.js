import React from 'react';
import { browserHistory } from 'react-router'

const BackButton = (props) =>{
  return (
    <button
      type="button"
      className={props.class}
      onClick={browserHistory.goBack}
    >
      {props.content}
    </button>
  );
}

export default BackButton;