import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomCheckboxIcon from '../../../CommonComponent/CustomCheckboxIcon';
import CustomChip from '../../../CommonComponent/CommonChip';
import { getValueFromArr } from '../../../helper/commonHelper';

/*
 Selected value is a collection of options key.
*/
function MultiSelectFilter({label, options, selectedValue=[], className, parentClass, handleSelect, arrowIcon, bodyClassName, themeBasedParentClass = ' bg-F2F4F7 text-98A2B3 rounded-4', multiSelect}) {
    const [showDropDown, setShowDropdown] = useState(false);

    
    function isSelected(optionList) {
        let index = -1;
        index = selectedValue?.findIndex(element => element === optionList.key);
        return index > -1;
    }

    return (
        <>
            <div className={'filter-dropdwon-container ' + (parentClass || '') + (themeBasedParentClass || '')} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                <div className={'filter-label cursor-pointer padding-x8 padding-y10 ' + (className || '')}>
                    <div className={'flex ' + (selectedValue?.length > 0 ? 'text-4E5BA6 font-500' : '')}>    
                        <span>{label}</span>
                    </div>
                    {
                        arrowIcon && 
                        <span>{arrowIcon}</span>
                    }
                    {
                        !arrowIcon &&
                        <KeyboardArrowDownIcon sx={{color: '#BABABA', fontSize: '14px'}} />
                    }
                </div>
                {
                    showDropDown && options?.length > 0 &&
                    <div className='filter-body-wrapper'>
                        <div className={'filter-body bg-white ' + (bodyClassName || '')}>
                            {
                                options.map((optionList, index) => {
                                    return (
                                        <div className='filter-list-item flex align-center cursor-pointer' key={optionList.value + index} onClick={() => handleSelect(optionList)}>
                                            <CustomCheckboxIcon isActive={isSelected(optionList)} />
                                            {optionList.value}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            {
                multiSelect && selectedValue?.length > 0 &&
                <div className='flex col-gap-8 margin-t8 flex-wrap row-gap-8'>
                    {
                        selectedValue?.length > 0 &&
                        selectedValue.map((listValue, index) => {
                            return <CustomChip disableCross key={listValue + index} className='bg-B54708' label={getValueFromArr(listValue, options)} />
                        })
                    }
                </div>
            }
        </>
    )
}

export default MultiSelectFilter;