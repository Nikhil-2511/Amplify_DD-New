import React from 'react';
import RadioIcon from '../RadioIcon';

function ProgressBar() {
  return (
    <div className="progress-bar-container">
      <div className="start-position">
        <RadioIcon isActive={true} />
        <div>About Your Company</div>
      </div>
      <div className="progress-divider"></div>
      <div className="end-position">
        <RadioIcon isActive={true} />
        <div>Financial Details</div>
      </div>
    </div>
  )
}

export default ProgressBar;