import React from 'react';

const Button = ({ value, handleClick, _class, _key = null }) => {
  return (
      <button className={ _class || '' } onClick={ handleClick }>
          {value || ''}
      </button>
  );
};

export default Button;
