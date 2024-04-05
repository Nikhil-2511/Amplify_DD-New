import { FormControlLabel, FormGroup, InputAdornment, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import IconBox from '../../CommonComponent/IconBox';
import CustomTextArea from '../../CommonComponent/TextArea';
import QuestionBoolean from '../QuestionBoolean';
import QuestionCurrency from '../QuestionCurrency';
import QuestionMultiLineTextArea from '../QuestionMultiLineTextArea';
import QuestionNumberTextArea from '../QuestionNumberTextArea';
import QuestionPercentageTextArea from '../QuestionPercentageTextArea';
import QuestionSlider from '../QuestionSlider';
import QuestionTextArea from '../QuestionTextArea';
import { CHAR_COUNT_VALUE } from '../../constants';
import SelectComponent from '../../CommonComponent/SelectComponent';
import CustomCheckbox from '../../CommonComponent/CustomCheckbox';
import RangeTextArea from '../RangeTextArea';
import { findObjectValue } from '../../helper/commonHelper';

function DashboardFields({ data, handleUpdate, sectionId }) {

  function getFieldType(listItem, index) {
    switch(listItem.field_type) {
      case 'number': 
      return renderNumberField(listItem, index);
      case 'textarea':
        return renderMultiLineText(listItem, index);
      case 'slider':
        return renderSlider(listItem, index);
      case 'boolean':
        return renderBooleanData(listItem, index);
      case 'percentage':
        return renderPercentageField(listItem, index);
      case 'currency':
        return renderCurrencyField(listItem, index);
      case 'dropdown' :
        return renderDropdownField(listItem, index);
      case 'checkbox': 
        return renderCheckbox(listItem, index);
      case 'numberRange':
        return renderNumberRangeField(listItem, index);
      case 'dependent_checkbox':
        return renderDependentCheckbox(listItem, index);
      default:
        return renderTextField(listItem, index);
    }
  }

  function renderCheckbox(listItem, index) {
    return (
      <React.Fragment>
        <FormGroup className='checkbox-content' key={index}>
          <FormControlLabel sx={{color: '#B5B5B5'}} className='primary-theme padding-x15 padding-y5' control={<CustomCheckbox checked={listItem.answer} onChange={(e) => handleUpdate(!listItem.answer, index, listItem.field_type)} />} label={listItem.optionText} labelPlacement="end" />
        </FormGroup>
      </React.Fragment>
    )
  }

  function renderDependentCheckbox(listItem, index) {
    return (
      <React.Fragment>
        {
          !!checkDependentFieldValue(listItem) &&
          <FormGroup className='checkbox-content' key={index} fullWidth={true} sx={{width: '100%'}}>
            <FormControlLabel sx={{color: '#B5B5B5'}} className='primary-theme padding-x15 padding-y5' control={<CustomCheckbox checked={listItem.answer} onChange={(e) => handleUpdate(!listItem.answer, index, listItem.field_type)} />} label={listItem.dynamicLabel(data?.subSection)} labelPlacement="end" />
          </FormGroup>
        }
      </React.Fragment>
    )
  }

  function renderDropdownField(listItem, index) {
    return (
      <React.Fragment>
          <SelectComponent
            selectedValue={listItem.answer}
            onChange={(ans) => handleUpdate(ans, index, listItem.field_type)}
            placeholder={listItem.placeholder}
            options={listItem?.options}
            isEditable={listItem?.isEditable}
            size="small"
          />
          {listItem?.error && <div className='text-danger text-14 margin-t5'>{listItem?.error}</div>}
        </React.Fragment>
    )
  }

  function renderPercentageField(listItem, index) {
    return (
      <QuestionPercentageTextArea
        className="rounded-8" 
        placeholder={listItem?.placeholder ? listItem.placeholder : "e.g. 40"} 
        fullWidth={true}
        fieldsetBgColor="#121212"
        // backgroundColor="#121212"
        InputProps={{
          startAdornment: <InputAdornment sx={{ root: {color: '#fff', zIndex: 2}}} position="start">%</InputAdornment>,
        }}
        error={listItem.error}
        answer={listItem.answer || ''} 
        updateAnswer={(ans) => handleUpdate(ans, index, listItem.field_type)}
        isEditable={listItem.isEditable}
        disabled={!listItem.isEditable}
        size="small"
      />
    )
  }

  function renderNumberField(listItem, index) {
    return (
      <QuestionNumberTextArea
        className="rounded-8"
        placeholder={listItem?.placeholder ? listItem.placeholder : "e.g. 40.0"} 
        fullWidth={true}
        fieldsetBgColor="#121212"
        error={listItem.error}
        answer={listItem.answer || ''} 
        updateAnswer={(ans) => handleUpdate(ans, index, listItem.field_type)}
        isEditable={listItem.isEditable}
        disabled={!listItem.isEditable}
        size="small"
      />
    )
  }

  function renderCurrencyField(listItem, index) {
    return (
      <QuestionCurrency
        className="rounded-8" 
        placeholder={listItem?.placeholder ? listItem.placeholder : "e.g. 50,000"} 
        fullWidth={true}
        fieldsetBgColor="#121212"
        InputProps={{
          startAdornment: <InputAdornment sx={{ root: {color: '#fff', zIndex: 2}}} position="start">₹</InputAdornment>,
        }}
        error={listItem.error}
        answer={listItem.answer || ''} 
        updateAnswer={(ans) => handleUpdate(ans, index, listItem.field_type)}
        isEditable={listItem.isEditable}
        disabled={!listItem.isEditable}
        size="small"
    />
    )
  }

  function renderMultiLineText(listItem, index) {
    return (
      <QuestionMultiLineTextArea 
        className="rounded-8 primary-theme" 
        placeholder={listItem?.placeholder ? listItem.placeholder : "Enter description"} 
        fullWidth={true}
        minRows={5}
        maxRows={6}
        backgroundColor="#121212"
        borderRadius={12}
        multiline={true} 
        error={listItem.error}
        answer={listItem.answer || ''} 
        updateAnswer={(ans) => handleUpdate(ans, index, listItem.field_type)}
        isEditable={listItem.isEditable}
        disabled={!listItem.isEditable}
        size="small"
        charCount={listItem?.charCount}
      />
    )
  }

  function renderBooleanData(listItem, index) {
    return (
      <QuestionBoolean
        commonClass = "primary-theme padding-0"
        error={listItem.error}
        answer={listItem.answer || ''} 
        updateAnswer={(ans) => handleUpdate(ans, index, listItem.field_type)}
        isEditable={listItem.isEditable}
      />
    )
  }

  function renderSlider(listItem, index) {
    return (
      <QuestionSlider 
        className='' 
        error={listItem.error}
        answer={listItem.answer || ''} 
        updateAnswer={(ans) => handleUpdate(ans, index, listItem.field_type)}
        isEditable={listItem.isEditable} 
      />
    )
  }

  function renderTextField(listItem, index) {
    return (
      <QuestionTextArea 
        className="rounded-8" 
        placeholder={listItem?.placeholder ? listItem.placeholder : "Enter Value"} 
        fullWidth={true}
        fieldsetBgColor="#121212"
        // backgroundColor="#121212"
        size="small"
        answer={listItem.answer || ''} 
        updateAnswer={(ans) => handleUpdate(ans, index, listItem.field_type)}
        error={listItem.error}
        isEditable={listItem.isEditable}
        disabled={!listItem.isEditable}
      />
    )
  }

  function renderNumberRangeField(listItem, index) {
    return (
      <RangeTextArea 
        className="rounded-8" 
        placeholder={listItem?.placeholder ? listItem.placeholder : "Enter Value"} 
        fullWidth={true}
        size="small"
        answer={listItem.answer || ''} 
        updateAnswer={(ans) => handleUpdate(ans, index, listItem.field_type)}
        error={listItem.error}
        isEditable={listItem.isEditable}
        disabled={!listItem.isEditable}
      />
    )
  }

  function checkDependentFieldValue(currentObj) {
    let value = findObjectValue(data?.subSection, currentObj?.dependentOn);
    return value;
  }

  return (
    <div className='primary-theme rounded-8 border border-353535 margin-b25 padding-y25 padding-x35' id={sectionId}>
      <Stack direction='row' spacing={2} sx={{alignItems: 'center', marginBottom: 3}}>
        <IconBox className="icon-box" icon={data?.icon || ''} /> 
        <span className={'form-field-title'}>{data?.label || ''}</span>
      </Stack>
      {
        data?.error &&
        <div className='text-danger text-14 margin-y5'>{data.error}</div>
      }
      {
        data?.subSection?.length > 0 &&
        data.subSection.map((listItem, index) => {
          if(listItem.hideOnEditField) return;
          return (
            <div key={index} className="margin-b20">
              {listItem.label && <div className='text-B5B5B5 text-18 margin-b10'>{listItem.label || ''}{listItem.required && <span className='text-danger'>*</span>}</div>}
              {
                getFieldType(listItem, index)
              }
              {/* <CustomTextArea 
                className="border-type1 rounded-8 primary-theme" 
                placeholder={listItem?.placeholder ? listItem.placeholder : "Enter Value"} value={listItem.answer || ''} 
                onChange={e => handleUpdate(e.target.value, index, listItem.field_type)} 
                fullWidth={true}
                minRows={listItem?.field_type === 'textarea' ? 5 : ''}
                maxRows={listItem?.field_type === 'textarea'  ? 6 : ''}
                multiline={listItem?.field_type === 'textarea' ? true : ''}
                size="small"
                disabled={!listItem.isEditable}
              /> */}
            </div>
          )
        })
      }
    </div>
  )
}

export default DashboardFields;