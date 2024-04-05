import React from 'react';

function RadioIcon({isActive}) {
  return (
    <div className="radio-container">
      {
        isActive &&
        <div className="radio-filled"></div>
      }
    </div>
  )
}

export default RadioIcon;