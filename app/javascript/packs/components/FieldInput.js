import React from 'react';

const FieldInput = (props) => {
  return (
    <label>{props.label}
      <input
        type="text"
        name={props.name}
        value={props.content}
        onChange={props.handleChange}
      />
    </label>
  );
}

export default FieldInput;
