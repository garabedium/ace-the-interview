import React from 'react';

const SelectList = (props) => {
  return (
    <label>
      <select
        type="text"
        name={props.name}
        value={props.content}
        onChange={props.handleInput}
      >
      {props.selectOptions}
      </select>
      </label>
  );
}

export default SelectList;
