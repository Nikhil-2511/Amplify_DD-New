import React from "react";
import CustomInputSlider from "../../CommonComponent/CustomInputSlider";

function QuestionSlider({answer, error, updateAnswer, isEditable, ...rest}) {

  const handleSliderChange = (event, newValue) => {
    if(!isEditable) return;
    updateAnswer(newValue);
  };
  return (
    <div>
      <div className='flex justify-space-between align-center'>
        <div className='flex-1'>
          <CustomInputSlider 
              onChange= {handleSliderChange} 
              value = {(answer && typeof parseInt(answer) === 'number') ? parseInt(answer) : 0}
              {...rest}
          />
        </div>
        <div className='margin-l25 w-100px text-24 primary-theme border border-353535 rounded-8 padding-x10 padding-y15 font-600 text-center' >
          {answer || 0}%
        </div>
      </div>
      {error && <div className='text-danger text-14 margin-t5'>{error}</div> }
    </div>
  )
}

export default QuestionSlider;