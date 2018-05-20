import React from 'react';

const ButtonComponent = (props) =>{
  return (
    <button
      type="button"
      className={props.class}
      onClick={props.handleClick}
    >
      {props.text} {props.icon}
    </button>
  );
}

export default ButtonComponent;