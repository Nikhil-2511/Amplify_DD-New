import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { API_SUCCESS_CODE, CHIP_INPUT, DATEPICKER, DROPDOWN, POST, SOMETHING_WENT_BAD, TEXTAREA, TOGGLE } from '../../constants';
import CustomSelect from '../CustomSelect';
import { deepClone, fetchAvailableTimeSlots, getFieldLabelData, numbersOnly } from '../../helper/commonHelper';
import { useDispatch } from 'react-redux';
import { globalAlert, updateFormToServer } from '../../Redux/slice/CommonSlice';
import NewTextField from '../NewTextField';
import { NewButton } from '../NewCustomButton';
import { CrossIcon } from '../../assets/icons';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Switch from '@mui/material/Switch';
import WarningCircularIcon from '../../assets/images/warningCircularIcon.svg';
import CustomSlotPicker from '../CustomSlotPicker';
import dayjs from 'dayjs';

const style = {
    maxWidth: 500,
    width: '100%',
    bgcolor: '#fff',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    color: '#101828',
    boxShadow: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
    p: 3,
    overflowY: 'auto',
    maxHeight: '90vh'
  };  

function ApproveActionModal({isopen, data, title, handleOnClose, icon, apiUrl, apiMethod, customObj, handleSuccess,successButtonText="Confirm", successBtnBackgroundColor='linear-gradient(0deg, #1D2939, #1D2939),linear-gradient(0deg, #7F56D9, #7F56D9)', companyData}) {
    const [formData, setFormData] = useState(data);
    const [chipInputValue, setChipInputValue] = useState('');
    const dispatch = useDispatch();
    const [dateValue, setDateValue] = useState(null);
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    function renderField(formField, key) {
        switch(formField.fieldType) {
            case DROPDOWN: 
                return renderDropDown(formData, key);
            case CHIP_INPUT:
                return renderChipInput(formData, key);
            case 'calender':
                return renderCalenderInput(formData, key)
            case TOGGLE:
                return renderToggle(formData, key)
            case DATEPICKER :
                return renderDatePicker(formData, key)
            default:
                return renderTextArea(formData, key); 
        }
    }

    function handleSlotConfirm(selectedSlot, key) {
        let data = deepClone(formData);
        let slotObj = {
            date: selectedSlot?.date ? dayjs(selectedSlot?.date)?.format("YYYY-MM-DD") : null,
            startTime: selectedSlot?.time,
        };
        data[key].value = [slotObj]
        setFormData(data);
    }

    function renderDatePicker(formData, key){
     return (
      <CustomSlotPicker maxDateAllowed={2} disablePast={true} helperText= 'Clicking "Confirm" sends a calendar invite with the meeting link to the company, investor and deal partner.' handleSlotConfirm={(slot) => handleSlotConfirm(slot, key)} format='DD/MM/YYYY' handleDateChange = {(date, cb) => fetchAvailableTimeSlots(date, companyData?.companyId,companyData?.id, cb)}/>
     )
    }

    function renderToggle(formData, key){
        return(
            <div className='text-caution'>
                <div className='flex justify-space-between align-center flex-wrap'>
                    <div className='margin-t6 text-667085 text-14'>
                        {checked ? formData[key]?.activeText : formData[key]?.inactiveText}
                    </div>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                {
                    !checked && (
                        <div style={{paddingTop: '20px'}}>
                        Caution: Visibility of this seller is limited to buyers with whom you've shared this via the "Recommended" tab.
                        </div>
                    )
                }

            </div>
          
           
        )
    }

    function renderChipInput(formData, key) {
        return (
            <div>
                <NewTextField 
                //   fieldsetBgColor="transparent"                  
                    onChange= {handleChipInput}
                    onKeyUp = {event => {
                        handleChipKeyUp(event, key)
                    }}
                    placeholder={getFieldLabelData(formData, key, 'placeholder')}
                  value={chipInputValue}
                  fullWidth
                  size="small"
                />
                <div className='flex col-gap-15 margin-t10 flex-wrap'>
                    {
                        formData[key]?.value?.length > 0 &&
                        formData[key]?.value?.map((companiesList, index) => {
                            return <div className='flex align-center text-344054 bg-F2F4F7 padding-y2 padding-x8 rounded-16' key={companiesList + index}>
                                <span>{companiesList}</span>
                                <CrossIcon sx={{fontSize: '14px', marginTop: '1px', marginLeft: '4px', cursor: 'pointer'}} onClick={() => hadleChipDelete(key, index)} />
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }

    
    function handleChipInput (event) {
        setChipInputValue(event.target.value);
      }
    
      function handleChipKeyUp(event, key) {
        if(event.key === 'Enter') {
            let data = deepClone(formData), newCompanies = data[key]?.value || [];
            newCompanies.push(event.target.value);
            data[key].value = newCompanies;
            setFormData(data);
            setChipInputValue('');
        }
      }

      function hadleChipDelete(key, index) {
        let data = deepClone(formData);
        if(data[key]?.value?.length) {
            data[key]?.value.splice(index, 1);
            setFormData(data);
        }
      }

    function handleFieldUpdate(value, key) {
        let fieldValue = deepClone(formData);
        if(fieldValue[key]?.isNumberOnly) {
            if(value !== 0 && value !== '')
            if(!numbersOnly(value)) {
                return;
            }
        }
        fieldValue[key].value = value;
        if(Object.keys(fieldValue)?.length) {
            Object.keys(fieldValue).map((keyName) => {
                let fieldValueModel = fieldValue[keyName];
                if(fieldValueModel?.dependentOn === key) {
                    fieldValue[keyName].value = '';
                }

            })
        }
        setFormData(fieldValue);
    }

    function renderTextArea(formField, key) {
        return (
            <NewTextField
                className="rounded-8 "
                onChange={(e) => handleFieldUpdate(e.target.value, key)}
                size="small"
                fullWidth
                autoComplete='off'
                multiline={!getFieldLabelData(formField, key, 'hideMultiLine')}
                minRows={getFieldLabelData(formField, key, 'minRow') || 3}
                maxRows={getFieldLabelData(formField, key, 'maxRow') || 5}
                inputProps={{ maxLength: getFieldLabelData(formField, key, 'maxLength') || 60 }}
                placeholder={getFieldLabelData(formField, key, 'placeholder')}
                value={getFieldLabelData(formField, key, 'value')} 
                error={!!getFieldLabelData(formField, key, 'error')}
                helperText={getFieldLabelData(formField, key, 'error') ? getFieldLabelData(formData, key, 'helperText') : ''}
                disabled={getFieldLabelData(formField, key, 'disabled')}
            />
        )
    }

    function renderDropDown(formField, key) {
        return (
            <CustomSelect
                className="rounded-8"
                parentClass={'bg-white text-101828 border border-D0D5DD'}
                options={formField[key]?.optionData || []} 
                handleSelect={(valueObj) => handleFieldUpdate(valueObj.key, key)}
                label={getFieldLabelData(formField, key, 'value') || getFieldLabelData(formField, key, 'placeholder')} 
                error={getFieldLabelData(formField, key, 'error')}
                errorMessage={getFieldLabelData(formField, key, 'error') ? getFieldLabelData(formField, key, 'helperText') : ''}
                disable={getFieldLabelData(formField, key, 'disabled')}
            />
        )
    }

    function handleDateField(newDate, key) {
        let fieldValue = deepClone(formData);
        fieldValue[key].value = newDate;
        setFormData(fieldValue);
        setDateValue(newDate);
    }

    function renderCalenderInput(formField, key) {
        // return (
        //     // <DatePicker 
        //     //     selected={getFieldLabelData(formField, key, 'value')} 
        //     //     onChange={(newValue) => handleFieldUpdate(newValue, key)} 
        //     //     error={!!getFieldLabelData(formField, key, 'error')}
        //     //     helperText={getFieldLabelData(formField, key, 'error') ? getFieldLabelData(formData, key, 'helperText') : ''}
        //     //     />
        // )


        return (
            <DatePicker 
                disabledKeyboardNavigation={false}
                minDate={new Date()}
                selected={dateValue}
                onKeyDown={(e) => {
                    e.preventDefault();
                }}
                placeholderText = {getFieldLabelData(formField, key, 'placeholder')}
                onChange={(newValue) => handleDateField(newValue, key)} 
            />
        );
    }

    function handleconfirm() {
        let {error, prepareObj} = prepareData();
        if(error) return;
        if(customObj) {
            prepareObj = {
                ...customObj,
                ...prepareObj
            }
            if(!checked && prepareObj.discoverable){
                prepareObj.discoverable = false;
            }
        }
        let dataToSend={
            postBody: prepareObj,
            url: apiUrl,
            method: apiMethod || POST,
            callback: handleCB
        }
        dispatch(updateFormToServer(dataToSend));
    }
    
    function handleCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            handleSuccess();
        }
        else {
            dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: res?.data?.message, title: 'Warning'}));
        }
    }
    function prepareData() {
        let prepareObj = {}, error = false, formFieldData = deepClone(formData);
        for(let key in formFieldData) {
            let currentObj = formData[key];
            if(formFieldData[key]?.dependentOn) {
                let dependentValue = formData?.[formFieldData[key]?.dependentOn]?.value || '';
                if(formFieldData[key]?.allOptions?.[dependentValue]) {
                    if(currentObj.required && !currentObj.value) {
                        error = true;
                        formFieldData[key].error = true;
                    }
                    else {
                        prepareObj[key] = currentObj.value;
                    }
                }
            }
            else if(currentObj.required && !currentObj.value && currentObj.fieldType !== 'calender')  {
                error = true;
                formFieldData[key].error = true;
            }
            else if(key === 'tags') {
                if(currentObj?.value?.length) {
                    prepareObj[key] = {
                        [key]: currentObj.value.join(',')
                    }
                }
            }
            else if(currentObj.fieldType === 'calender') {
                if(dateValue) {
                    let newDate = new Date(dateValue);
                    let milliSecond = newDate.getTime()
                    prepareObj[key] = milliSecond;
                }
            }else if(currentObj.minLength && currentObj?.value?.length < currentObj.minLength){
                error = true;
                formFieldData[key].error = true;
            }
            else if(currentObj?.isNumberOnly) {
                prepareObj[key] = parseInt(currentObj.value);
            }
            else {
                prepareObj[key] = currentObj.value;
            }
        }
        if(error) {
            setFormData(formFieldData);
        }
        return {error, prepareObj}
    }

    return (
        <Modal open={isopen} onClose={handleOnClose}>
        <div className="global-modal-container">
          <Box className="" sx={style}>
            <div className="flex col-gap-15 align-center">
              <img className="w-48px" src={icon} alt="" />
              <div className="text-18 font-500">{title || ''}</div>
            </div>
            <div className='margin-t20'>
                {
                    Object.keys(formData)?.length > 0 &&
                    Object.keys(formData).map((fieldList, index) => {
                        let formFieldData = formData[fieldList];
                        if(formFieldData?.dependentOn) {
                            let dependentValue = formData?.[formFieldData?.dependentOn]?.value || '';
                            if(formFieldData?.allOptions?.[dependentValue]) {
                                formFieldData['optionData'] = formFieldData?.allOptions[dependentValue];
                            }
                            else return;
                        }
                        return (
                            <div key={formFieldData.label + index} className='margin-b20'>
                                <div className='font-500 text-344054 margin-b6'>{formFieldData.label}{formFieldData?.required && <span className='text-F63D68'>*</span>}</div>
                                {renderField(formFieldData, fieldList)}
                                {
                                    formFieldData?.defaultHelpingText && 
                                    <div className='margin-t6 text-667085 text-14'>{formFieldData.defaultHelpingText}</div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex col-gap-10 margin-t10">
              <Button
                className="text-344054 capitalize"
                fullWidth
                variant="outline"
                sx={{ border: "1px solid #D0D5DD", color: "#344054" }}
                onClick={handleOnClose}
              >
                Cancel
              </Button>
              <NewButton
                className="text-white capitalize"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{
                  background: `${successBtnBackgroundColor}`,
                  color: "#FFF",
                  "&:hover": {
                    background:`${successBtnBackgroundColor}`,
                  },
                }}
                onClick={handleconfirm}
              >
                {successButtonText}
              </NewButton>
            </div>
          </Box>
        </div>
      </Modal>
    );
}

export default ApproveActionModal;