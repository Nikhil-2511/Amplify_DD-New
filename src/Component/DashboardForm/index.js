import { Chip, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTextArea from '../../CommonComponent/TextArea';
import { deepClone, isValidAnswer } from '../../helper/commonHelper';
import DashboardFields from './DashboardFields';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconBox from '../../CommonComponent/IconBox';

function DashboardForm({ companyData, metricData, updateDashboardData, selectedSectionId, resetSelectedSectionId}) {
  const [fieldData, setFieldData] = useState({});
  const [inputValue, setInputValue] = useState({});

  useEffect(() => {
    setFieldData(companyData);
  }, [companyData])

  useEffect(() => {
    if(selectedSectionId && Object.keys(fieldData)?.length) {
      let currentDiv = document.getElementById(selectedSectionId);
      currentDiv.scrollIntoView({behavior: 'smooth' })
      resetSelectedSectionId()
    }
  }, [selectedSectionId, fieldData])

  // useEffect(() => {
  //   scrollToElement(selectedElementId);
  // }, [selectedElementId])

  // function scrollToElement(id) {
  //   var elmnt = document.getElementById(id);
  //   elmnt.scrollIntoView({behavior:'smooth', block:'start'});
  // }

  function handleUpdate(value, index, key, field_type) {
    let data = {...fieldData};
    // if(isValidAnswer(value, field_type)) {
      if( data[key]?.subSection[index]) {
        data[key].subSection[index].answer = value;
        data[key].subSection[index].updated = true;
      }
      setFieldData(data);
      updateToParent(data);
    // }
  }

  function handleSingleItemChange(value, key, field_type) {
    let data = {...fieldData};
    if(isValidAnswer(value, field_type)) {
      data[key].answer = value;
      data[key].updated = true;
      setFieldData(data);
      updateToParent(data);
    }
  }

  function handleChipInput (event, key) {
    let chipData = deepClone(inputValue);
    chipData[key] = event.target.value;
    setInputValue(chipData);
  }

  function handleChipKeyUp(event, key) {
    if(event.key === 'Enter') {
      let data = {...fieldData};
      // if(data[key].subSection) {
        data[key].answer.push(event.target.value);
        data[key].updated = true;
      // }
      setFieldData(data);
      let chipData = deepClone(inputValue);
      chipData[key] = '';
      setInputValue(chipData);
      updateToParent(data);
    }
  }

  const handleDelete = (item, key) => () => {
    let data = {...fieldData};
    // if(data[key].subSection) {
      data[key].answer.splice(data[key].answer.indexOf(item), 1);
    // }
    data[key].updated = true;
    setFieldData(data);
  };

  function updateToParent(data) {
    updateDashboardData(data);
  }


  return (
    <div>
      {
        fieldData && Object.keys(fieldData).length > 0 &&
        Object.keys(fieldData).map((key, index) => {
          if(fieldData[key].type === 'single_col') {
            return (
              <div className='primary-theme rounded-8 border border-353535 margin-b25 padding-y25 padding-x35' key={index} id = {key}>
                <Stack spacing={2} direction="row" sx={{alignItems: 'center', marginBottom: 3}}>
                  <IconBox icon={fieldData[key].icon} className="icon-box" /> <span className='form-field-title'>{fieldData[key]?.label || ''}{fieldData[key]?.required && <span className='text-danger'>*</span>}</span>
                </Stack>
                <CustomTextArea 
                  className="border-type1 rounded-8 primary-theme" 
                  placeholder={fieldData[key]?.placeholder ? fieldData[key].placeholder: "Enter Value"} value={fieldData[key].answer || ''} 
                  onChange={e => handleSingleItemChange(e.target.value, key, fieldData[key].field_type)} 
                  fullWidth={true}
                  multiline={fieldData[key]?.field_type === 'textarea' ? true : false}
                  minRows={fieldData[key]?.field_type === 'textarea' ? 3 : ''}
                  maxRows={fieldData[key]?.field_type === 'textarea'  ? 3 : ''}
                  disabled={!fieldData[key].isEditable}
                  size="small"
                  error={fieldData[key]?.error}
                />
                {fieldData[key]?.error && <div className='text-danger text-14 margin-t5'>{fieldData[key]?.error}</div> }
              </div>
            )
          }
          else if(fieldData[key].type === 'chip') {
            return (
              <div className='primary-theme rounded-8 border border-353535 margin-b25 padding-y25 padding-x35' key={index} id = {key}>
                <Stack direction={'row'} sx={{alignItems: 'center', marginBottom: 3}} spacing={2}>
                  <IconBox className="icon-box" icon={fieldData[key].icon}/> <span className='text-26 font-600'>{fieldData[key]?.label || ''}</span>
                </Stack>
                <CustomTextArea 
                  fieldsetBgColor="transparent"
                  disabled={!fieldData[key].isEditable}
                  placeholder={fieldData[key]?.placeholder || ''}
                  error={fieldData[key]?.error}
                  InputProps={{
                    startAdornment: fieldData[key].answer.map((item, index) => (
                        <Chip
                          key={index}
                          tabIndex={-1}
                          label={item}
                          sx={{color: '#fff', zIndex: 1, background: 'rgba(208, 214, 255, 0.3)', marginRight: '5px', borderRadius: '4px', '& .MuiChip-deleteIcon':{color: '#fff', fontSize: 18} }}
                          // className={classes.chip}
                          deleteIcon={<CloseOutlinedIcon color='#fff' sx={{color: '#fff', fontSize: 18}} />}
                          onDelete={handleDelete(item, key)}
                        />
                    )),
                    onChange: event => {
                      handleChipInput(event, key);
                    },
                    onKeyUp: event => {
                      handleChipKeyUp(event, key)
                    }
                  }}
                  value={inputValue[key] || ''}
                  fullWidth
                  size="small"
                />
                {fieldData[key]?.error && <div className='text-danger text-14 margin-t5'>{fieldData[key]?.error}</div> }
                </div>
              )
            }
          else {
            return <DashboardFields sectionId = {key} data={fieldData[key]} key={index} handleUpdate={(ans, i, field_type) => handleUpdate(ans, i, key, field_type)} />
          }
        })
      }
    </div>
  )
}

export default DashboardForm;