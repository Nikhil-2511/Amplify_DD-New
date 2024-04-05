import { Button } from '@mui/material';
import React from 'react';
import './style.scss';
import { BooleanButton } from '../../CommonComponent/CustomButton';

function QuestionBoolean({answer, error, updateAnswer, isEditable, commonClass, ...rest}) {

  function handleActionCTA(value) {
    if(!isEditable) return;
    updateAnswer(value);
  }

  return (
    <div {...rest}>
      <div className='boolean-button-container'>
        <BooleanButton className={(commonClass ? commonClass : '')} selected={(answer === 'yes')} onClick={() => handleActionCTA("yes")} >Yes</BooleanButton>
        <BooleanButton className={(commonClass ? commonClass : '')} selected={(answer === 'no')} onClick={() => handleActionCTA("no")} >No</BooleanButton>
      </div>
      {error && <div className='text-danger text-14 margin-t5'>{error}</div>}
    </div>
  )
}

export default QuestionBoolean;