import React from 'react';
import CustomTextArea from '../../CommonComponent/TextArea';
import { isDecimalValue } from '../../helper/commonHelper';

function QuestionNumberTextArea({answer, error, updateAnswer, isEditable , ...rest}) {

  function handleChange(event) {
    if(!isEditable) return;
    let { value } = event.target;
    if(isDecimalValue(value) || value === '' || value === 0) {
      updateAnswer(value);
    }
  }

  return (
    <div>
      <CustomTextArea 
        value={answer} 
        onChange={e => handleChange(e)}
        {...rest}
        error={error ? true : false}
      />
      {error && <div className='text-danger text-14 margin-t5'>{error}</div> }
    </div>
  )
}

export default QuestionNumberTextArea;