import React from 'react';
import FieldInput from './FieldInput';
import ButtonSubmit from './ButtonSubmit';

const ListFormNew = (props) =>{

  return (

    <form className="form form__list--new" onSubmit={props.handleSubmit}>

      <FieldInput
        label="List Name"
        name="listName"
        content={props.listName}
        handleChange={props.handleInput}
      />

      <ButtonSubmit
        value="Add"
        class="button"
      />

    </form>

  );
}

export default ListFormNew;