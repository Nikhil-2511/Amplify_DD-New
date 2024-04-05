import React from 'react';
import { BOOLEAN, CURRENCY, DROPDOWN, NUMBER, PERCENTAGE, SINGLEDROPDOWN, SLIDER, TEXTAREA } from '../../constants';
import QuestionPercentageTextArea from '../../Component/QuestionPercentageTextArea';
import { InputAdornment } from '@mui/material';
import QuestionNumberTextArea from '../../Component/QuestionNumberTextArea';
import QuestionCurrency from '../../Component/QuestionCurrency';
import QuestionMultiLineTextArea from '../../Component/QuestionMultiLineTextArea';
import QuestionBoolean from '../../Component/QuestionBoolean';
import QuestionSlider from '../../Component/QuestionSlider';
import QuestionTextArea from '../../Component/QuestionTextArea';
import CustomDropdown from '../CustomDropdown';
import SelectComponent from '../SelectComponent';

function DoneDealFormField({type, ...rest}) {
    function renderField() {
        switch(type) {
            case NUMBER: 
            return renderNumberField();
            case TEXTAREA:
              return renderMultiLineText();
            case SLIDER:
              return renderSlider();
            case BOOLEAN:
              return renderBooleanData();
            case PERCENTAGE:
              return renderPercentageField();
            case CURRENCY:
              return renderCurrencyField();
            case DROPDOWN: 
              return renderDropdownField();
            case SINGLEDROPDOWN: 
              return renderSingleDropDown();
            default:
              return renderTextField();
        }
    }
   
    function renderSingleDropDown(){
      return (
        <SelectComponent
          {...rest}
        />
      )
    }

    function renderPercentageField() {
        return (
          <QuestionPercentageTextArea
            InputProps={{
              startAdornment: <InputAdornment sx={{ root: {color: '#fff', zIndex: 2}}} position="start">%</InputAdornment>,
            }}
            {...rest}
          />
        )
      }
    
      function renderNumberField() {
        return (
          <QuestionNumberTextArea
            {...rest}
          />
        )
      }
    
      function renderCurrencyField() {
        return (
          <QuestionCurrency
            InputProps={{
              startAdornment: <InputAdornment sx={{ root: {color: '#fff', zIndex: 2}}} position="start">₹</InputAdornment>,
            }}
            {...rest}
        />
        )
      }
    
      function renderMultiLineText() {
        return (
          <QuestionMultiLineTextArea 
            {...rest}
          />
        )
      }
    
      function renderBooleanData() {
        return (
          <QuestionBoolean
            {...rest}
          />
        )
      }
    
      function renderSlider() {
        return (
          <QuestionSlider 
            {...rest}
          />
        )
      }
    
      function renderTextField() {
        return (
          <QuestionTextArea 
           {...rest}
          />
        )
      }
      
      function renderDropdownField() {
        return (
          <CustomDropdown
            {...rest}
          />
        )
      }

    return (
        renderField()
    )
}

export default DoneDealFormField;