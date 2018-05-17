import React from 'react';

const FieldTextarea = (props) => {
  return (
    <label>{props.label}
      <textarea
        name={props.name}
        placeholder={props.placeholder}
        value={props.content}
        onChange={props.handleChange}
        className={props.class}
      />
    </label>
  );
}

export default FieldTextarea;
