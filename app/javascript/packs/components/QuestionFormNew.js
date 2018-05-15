import React from 'react';

const QuestionFormNew = (props) =>{
  return (
    <button
      type="button"
      className={props.class}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
}

export default QuestionFormNew;