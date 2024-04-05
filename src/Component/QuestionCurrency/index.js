import React from "react";
import CustomTextArea from "../../CommonComponent/TextArea";
import { currencyValidator, formatCurrencyNumber } from "../../helper/commonHelper";

function QuestionCurrency({answer, error, updateAnswer, isEditable , ...rest}) {


  function handleCurrencyChange(e) {
    if(!isEditable) return;
    let value = e.target.value;
    if(currencyValidator(value) || value === '' || value === 0) {
      updateAnswer(e.target.value);
    }
  }

  function handleKeyUp(event) {
    if(!isEditable) return;
    let value = event.target.value;
    if(value !== '') {
      let numberWithoutLetters = formatCurrencyNumber(value);
      if(numberWithoutLetters.indexOf('.') === -1) updateAnswer(numberWithoutLetters);
    }
    else {
      updateAnswer(value);
    }
  }

  return (
    <div>
      <CustomTextArea 
        value={answer} 
        onChange={handleCurrencyChange} 
        onKeyUp={handleKeyUp}
        error={error ? true : false}
        {...rest}
      />
      {error && <div className='text-danger text-14 margin-t5'>{error}</div> }
    </div>
  )
}

export default QuestionCurrency;