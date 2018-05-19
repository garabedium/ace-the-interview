import React from 'react';

const CalloutMessage = (props) =>{

  return (
    <div className={`callout ${props.class}`} data-closeable>
      {props.content}
      <button className="close-button" aria-label="Dismiss alert" type="button" onClick={props.handleClick}>
          <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

}

export default CalloutMessage;

