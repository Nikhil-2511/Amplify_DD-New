import React from 'react';
import CustomTextArea from '../../CommonComponent/TextArea';
import { CHAR_COUNT_VALUE } from '../../constants';

function QuestionMultiLineTextArea({answer, error, updateAnswer, isEditable, charCount=CHAR_COUNT_VALUE ,showCharCount=true, ...rest}) {

  function handleTextAreaChange(event) {
    if(!isEditable) return;
    let { value } = event.target;
    if(!showCharCount || value.length <= charCount) {
      updateAnswer(value);
    }
  }

  function getCharCountMessage() {
    let answerCount = answer.length || 0, totalCount = charCount;
    totalCount = totalCount - answerCount;
    return totalCount > 1 ? `${totalCount} characters` : `${totalCount} character`;
  }

  return (
    <React.Fragment>
      <CustomTextArea 
        value={answer} 
        error={error ? true: false} 
        onChange={e => handleTextAreaChange(e)} 
        {...rest}
        />
        {error && <div className='text-danger text-14 margin-t5'>{error}</div> }
        {!error && showCharCount && <div className='text-white text-14 margin-t5'>{getCharCountMessage()}</div> }
    </React.Fragment>
  )
}

export default QuestionMultiLineTextArea;