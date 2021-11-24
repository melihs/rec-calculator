import React from 'react';

const Button = ({ value, handleClick, _class }) => {
  return (
      <button className={ _class || '' } onClick={ handleClick }>
          {value || ''}
      </button>
  );
};

export default Button;
