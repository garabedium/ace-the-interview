import React from 'react';

const ButtonSubmit = (props) =>{
  return (
    <input
      type="submit"
      value={props.value}
      className={props.class}
    />
  );
}

export default ButtonSubmit;