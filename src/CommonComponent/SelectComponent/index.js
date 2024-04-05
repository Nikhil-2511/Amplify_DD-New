import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Select } from '@mui/material';
import { downArrowIcon } from '../../assets/icons/svgIcons';
import './style.scss';

const SelectComp = styled(Select)(() => ({
  '& .MuiSelect-select':{
    '& .MuiSelect-icon': {
      color: '#fff'
    },
    '& .MuiSvgIcon-root': {
      color: '#fff'
    }
  }
}))
function SelectComponent({className, selectedValue, placeholder='', options=[] , onChange, isEditable, size, keyToCompare='optionValue', displayKey='optionText', labelStyle='', error}) {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  function handleClick() {
    if(!isEditable) return;
    setToggleDropdown(!toggleDropdown);
  }

  function renderSelectedValue() {
    let answer = placeholder;
    if(options?.length) {
      let filterData = options.filter((listItem) => listItem[keyToCompare] === selectedValue);
      answer = (filterData[0]?.[displayKey] || placeholder);
    }
    return answer;
  }
  return (
    // <SelectComp className={'select-container primary-theme' + (className ? className : '')} 
    //   IconComponent={KeyboardArrowDownTwoToneIcon}
    //   inputProps={{ 'aria-label': 'Without label' }}
    //   sx={{background: 'red'}}
    //   {...rest}>{children}</SelectComp>
    <>
    <div className={'select-container ' + (className ? className : '') + (toggleDropdown ? ' selected ' : '')} >
      <div className={'flex justify-space-between align-center ' + (size === 'small' ? 'padding-y8 padding-x14' : 'padding-y15 padding-x30')} onClick={handleClick}>
        <div className={'' + labelStyle + ' ' + (selectedValue ? 'text-B5B5B5 ' : 'text-white ') + ( size === 'small' ? 'text-20' : 'text-24')}>{selectedValue ? renderSelectedValue() : placeholder}</div>
        <div className='flex'>{downArrowIcon}</div>
      </div>
      {
        toggleDropdown &&
        <div className='padding-10'>

          <div className='select-container-body'>
            {
              options?.length > 0 &&
              options.map((listItem, index) => {
                return <div className={'select-list-item text-white ' + (size === 'small' ? 'text-18' : 'text-24')} key={index} onClick={() =>{setToggleDropdown(!toggleDropdown); onChange(listItem.optionValue, listItem)}}>{listItem[displayKey] || ''}</div>
              })
            }
          </div>
        </div>
      }
    </div>
    {error && <div className='text-danger text-14 margin-t5'>{error}</div> }
    </>
  )

}

export default SelectComponent;