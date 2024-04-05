import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MenuItem, Select } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomCheckboxIcon from '../CustomCheckboxIcon';
import { getValueFromArr, renderIcon } from '../../helper/commonHelper';
import CustomChip from '../CommonChip';
import useOutsideClick from '../../helper/useDetectClickOutside';

function CustomMultiSelect ({label, options, className, parentClass='bg-F2F4F7 text-98A2B3 rounded-4', handleSelect, caretIcon, disable, error, errorMessage, rootClass, multiSelect, selectedValue=[], keyToCompare='key', displayKey='value', themeBasedParentClass = ' rounded-4 ', theme = 'light', filterBodyClass}) {
    const [showDropDown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();
    useOutsideClick(dropdownRef, () => setShowDropdown(false));

   

    function renderSelectValue() {
        if(multiSelect) return label;
        let selectedValue = label;
        if(Object.keys(options)?.length) {
            Object.keys(options).forEach(optionEle => {
                if(optionEle[keyToCompare] === label ) selectedValue =  optionEle[displayKey];
            });
        }

        return selectedValue;
    }

    function handleClick() {
        if(disable) return;
        setShowDropdown(!showDropDown)
    }

    function handleMultiListClick(optionList, sectorKey) {
        let newSelectedValue = [...selectedValue];
        if(newSelectedValue.includes(optionList[keyToCompare])) {
            newSelectedValue.splice(newSelectedValue.indexOf(optionList[keyToCompare]), 1);
        }
        else {
            newSelectedValue.push(optionList[keyToCompare]);
        }
        handleSelect(newSelectedValue, sectorKey);
    }

    
    function isSelected(optionList) {
        let index = -1;
        if(selectedValue?.length) index = selectedValue?.findIndex(element => element === optionList[keyToCompare]);
        return index > -1;
    }

    return (
        <div className={'' + (rootClass || '')} ref={dropdownRef}>
            <div className={'filter-dropdwon-container ' + (themeBasedParentClass || '') + (parentClass || '') + (error ? ' border-error' : '')}>
                <div className={'filter-label  padding-x8 padding-y10 ' + (className || '') + (disable ? '' : ' cursor-pointer ')} onClick={handleClick}>
                    <span className={'text-16 font-400 ' + (theme === 'dark' ? 'text-white' : 'text-667085')}>{renderSelectValue()}</span>
                    {
                        !!caretIcon && <React.Fragment>{caretIcon}</React.Fragment>
                    }
                    {
                        !caretIcon &&
                        <KeyboardArrowDownIcon sx={{color: '#BABABA', fontSize: '16px', marginLeft: '10px'}} />
                    }
                </div>
                {
                    showDropDown && Object.keys(options)?.length > 0 &&
                    <div className='filter-body-wrapper'>
                        <div className={'filter-body max-scroll-dropdown ' + (theme === 'dark' ? 'primary-theme ' : 'bg-white ') + (filterBodyClass || '')}>
                            {
                                multiSelect &&
                                Object.keys(options).map((sectorKey, index) => {
                                    return (
                                        <div key={sectorKey + index}>
                                            <div className={'flex col-gap-8 align-center padding-10 ' + (index > 0 ? 'padding-t10' : '')}>
                                                    <div><img className='w-20px' src={renderIcon(sectorKey)} alt="" /></div>
                                                    <div className='text-070707 font-500 text-14'>{sectorKey}</div>
                                                    
                                            </div>
                                            {
                                                options[sectorKey]?.length > 0 &&
                                                options[sectorKey].map((subSectorList, j) => {
                                                    return (
                                                        <div className='filter-list-item text-14 flex align-center cursor-pointer' key={subSectorList.key + j} onClick={() => handleMultiListClick(subSectorList, sectorKey)}>
                                                            <CustomCheckboxIcon isActive={isSelected(subSectorList, sectorKey)} />
                                                            {subSectorList?.value || ''}
                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            {
                error && errorMessage &&
                <div className='error-text text-14 margin-t5 font-400'>{errorMessage}</div>
            }
            {
                multiSelect && selectedValue?.length > 0 &&
                <div className='flex col-gap-8 margin-t8 flex-wrap row-gap-8'>
                    {   Object.keys(options).map((sectorKey, index) => (
                            <React.Fragment key={index}>
                            {
                                selectedValue?.length > 0 &&
                                selectedValue.map((listValue, index) => {
                                    return ( getValueFromArr(listValue, options[sectorKey]) && 
                                        <CustomChip disableCross key={listValue + index} className='bg-B54708' label={getValueFromArr(listValue, options[sectorKey])} />
                                    )
                                })
                            }
                            </React.Fragment>
                        ))

                    }
                </div>
            }
        </div>
    )
}

export default CustomMultiSelect;