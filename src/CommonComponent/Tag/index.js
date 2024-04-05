import React from 'react';
import './style.scss';

function Tag({className, description}) {
  return (
    <div className={"tag-container " + (className ? className : '')}>{description}</div>
  )
}

export default Tag;