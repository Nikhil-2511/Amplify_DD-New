import { FormControlLabel, FormGroup, InputAdornment,} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CustomCheckbox from '../../CommonComponent/CustomCheckbox';
import CustomRadio from '../../CommonComponent/CustomRadio';
import InformationBox from '../../CommonComponent/InformationBox';
import SelectComponent from '../../CommonComponent/SelectComponent';
import Tag from '../../CommonComponent/Tag';
import { isMobileView } from '../../helper/commonHelper';
import MultiSelectColWrap from '../MultiSelectColWrap';
import QuestionBoolean from '../QuestionBoolean';
import QuestionSlider from '../QuestionSlider';

import './style.scss';
import QuestionNumberTextArea from '../QuestionNumberTextArea';
import QuestionPercentageTextArea from '../QuestionPercentageTextArea';
import QuestionCurrency from '../QuestionCurrency';
import QuestionMultiLineTextArea from '../QuestionMultiLineTextArea';
import QuestionTextArea from '../QuestionTextArea';
import CustomAutoComplete from '../CustomAutoComplete';
import { CHAR_COUNT_VALUE } from '../../constants';

function Step1({ answer, updateAnswer, error }) {
  const currentQuestion = useSelector((state) => state.questionStore?.currentQuestion);

  function isEditable() {
    let isEditable = true;
    if (currentQuestion?.submittedAnswer?.answerValue && !currentQuestion?.questionMetadata?.editable) {
      isEditable = false;
    }
    return isEditable;
  }

  function handleChange(e) {
    if (!isEditable()) return;
    updateAnswer(e.target.value);

  }

  const handleSelectChange = (value) => {
    if (!isEditable()) return;
    updateAnswer(value);
  }

  const handleCheckboxChange = (e) => {
    if (!isEditable()) return;
    let value = e.target.value, answerData = answer.split(',').filter((ele) => ele) || [];
    if (isChecked(value)) {
      let index = answerData.findIndex((ans) => ans === value);
      answerData.splice(index, 1);
    }
    else {
      answerData.push(value);
    }
    updateAnswer(answerData.join(','));
  }

  const isChecked = (value) => {
    let answerData = answer.split(',') || [];
    if (answerData.includes(value)) {
      return true;
    }
    return false;
  }


  function renderTagValue() {
    let current = currentQuestion?.questionMetadata?.section?.current || '',
      total = currentQuestion?.questionMetadata?.section?.total || '';
    if (total) {
      return `${current}/${total}`;
    }
    return `${current}`;
  }

  return (
    <div className='step-container'>
      <div className="flex margin-b10">
        {
          <Tag className="font-500" description={renderTagValue()} />
        }
      </div>
      <div className="question-title">
        <div className='text-30 font-600'>{currentQuestion?.questionText || ''}</div>
        {isMobileView() && <InformationBox content={currentQuestion?.questionHint || ''} bodyPosition="top-align-info" />}
      </div>
      {
        currentQuestion?.questionType === 'multi_select' && currentQuestion?.options?.length > 0 &&
        <div>
          <MultiSelectColWrap>
            {
              currentQuestion.options.map((listItem, index) => (
                <FormGroup className='checkbox-content' key={index}>
                  <FormControlLabel key={index} className='primary-theme padding-x15 padding-y5' control={<CustomCheckbox checked={isChecked(listItem.optionValue)} onChange={(e) => handleCheckboxChange(e)} value={listItem.optionValue} />} label={listItem.optionText} labelPlacement="end" />
                </FormGroup>
              ))
            }
          </MultiSelectColWrap>
          {error && <div className='text-danger text-14 margin-t5'>{error}</div>}
        </div>
      }
      {
        currentQuestion?.questionType === 'single_select' && currentQuestion?.options.length > 0 &&
        <div>
          <MultiSelectColWrap>
            {
              currentQuestion.options.map((listItem, index) => (
                <FormGroup className='checkbox-content' key={index}>
                  <FormControlLabel key={index} className='primary-theme padding-x15 padding-y5' control={<CustomRadio checked={answer === listItem.optionValue} sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} onChange={(e) => handleChange(e, index)} value={listItem.optionValue} />} label={listItem.optionText} labelPlacement="end" />
                </FormGroup>
              ))
            }
          </MultiSelectColWrap>
          {error && <div className='text-danger text-14 margin-t5'>{error}</div>}
        </div>

      }
      {
        currentQuestion?.questionType === 'textarea' &&
        <QuestionMultiLineTextArea
          className="rounded-8 primary-theme"
          placeholder="Enter description"
          fullWidth={true}
          error={error}
          minRows={5}
          maxRows={6}
          backgroundColor="#121212"
          borderRadius={12}
          isEditable={isEditable()}
          multiline={true}
          answer={answer}
          updateAnswer={updateAnswer}
          autoFocus={true}
          inputProps={{ maxLength: CHAR_COUNT_VALUE}}
        />
      }
      {
        currentQuestion?.questionType === 'dropdown' && currentQuestion?.options.length > 0 &&
        <React.Fragment>
          <SelectComponent
            selectedValue={answer}
            onChange={handleSelectChange}
            placeholder='-Please make a selection-'
            options={currentQuestion?.options}
            isEditable={isEditable()}
          />
          {error && <div className='text-danger text-14 margin-t5'>{error}</div>}
        </React.Fragment>
      }
      {
        currentQuestion?.questionType === 'autosuggest' && currentQuestion?.options.length > 0 &&
        <React.Fragment>
          <CustomAutoComplete
            value={answer}
            id="custom-autosuggest"
            onChange={handleSelectChange}
            placeholder='Enter your subsector'
            options={currentQuestion?.options}
            error={error}
            isEditable={isEditable()}
          />
          {error && <div className='text-danger text-14 margin-t5'>{error}</div>}
        </React.Fragment>
      }
      {
        currentQuestion?.questionType === 'slider' &&
        <QuestionSlider
          className=''
          updateAnswer={updateAnswer}
          error={error}
          answer={answer}
          isEditable={isEditable()}
        />
      }
      {
        (currentQuestion?.questionType === 'boolean' || currentQuestion?.questionType === 'yes_no') &&
        <QuestionBoolean
          commonClass="primary-theme"
          updateAnswer={updateAnswer}
          error={error}
          answer={answer}
          isEditable={isEditable()}
        />
      }
      {
        currentQuestion?.questionType === 'text' &&
        <QuestionTextArea
          className="rounded-8"
          placeholder="Type your answer here..."
          answer={answer}
          fullWidth={true}
          fieldsetBgColor="#121212"
          // backgroundColor="#121212"
          isEditable={isEditable()}
          updateAnswer={updateAnswer}
          error={error}
          autoFocus={true}
          inputProps={{ maxLength: CHAR_COUNT_VALUE}}
        />
      }
      {
        currentQuestion?.questionType === 'number' &&
        <QuestionNumberTextArea
          className="rounded-8"
          placeholder={'e.g. 40.0'}
          answer={answer}
          isEditable={isEditable()}
          updateAnswer={updateAnswer}
          fullWidth={true}
          fieldsetBgColor="#121212"
          // backgroundColor="#121212"
          error={error}
          autoFocus={true}
        />
      }
      {
        currentQuestion?.questionType === 'percentage' &&
        <QuestionPercentageTextArea
          className="rounded-8"
          placeholder={'e.g. 40'}
          answer={answer}
          isEditable={isEditable()}
          fullWidth={true}
          fieldsetBgColor="#121212"
          // backgroundColor="#121212"
          InputProps={{
            startAdornment: <InputAdornment sx={{ root: { color: '#fff', zIndex: 2 } }} position="start">%</InputAdornment>,
          }}
          error={error ? true : false}
          updateAnswer={updateAnswer}
          autoFocus={true}
        />
      }
      {
        currentQuestion?.questionType === 'currency' &&
        <QuestionCurrency
          className="rounded-8"
          placeholder='e.g. 50,000'
          answer={answer}
          fullWidth={true}
          updateAnswer={updateAnswer}
          isEditable={isEditable()}
          fieldsetBgColor="#121212"
          InputProps={{
            startAdornment: <InputAdornment sx={{ root: { color: '#fff', zIndex: 2 } }} position="start">₹</InputAdornment>,
          }}
          error={error}
          autoFocus={true}
        />
      }
    </div>
  )
}

export default Step1;