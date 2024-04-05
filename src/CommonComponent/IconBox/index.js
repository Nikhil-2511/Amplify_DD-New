import React from 'react';
import './style.scss';

function IconBox({icon, className}) {
  return (
    <div className={'rounded-full ' + (className ? className : '')}>{icon}</div>
  )
}

export default IconBox