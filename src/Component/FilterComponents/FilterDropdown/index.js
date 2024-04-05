import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function FilterDropdown({label, options=[], className, parentClass, handleSelect, selectedValue, themeBasedParentClass = ' bg-F2F4F7 text-98A2B3 rounded-4'}) {
    const [showDropDown, setShowDropdown] = useState(false);
    return (
        <div className={'filter-dropdwon-container ' + (parentClass || '') + (themeBasedParentClass || '')} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <div className={'filter-label cursor-pointer padding-x8 padding-y10 ' + (className || '') + (selectedValue ? 'text-4E5BA6 font-500' : '')}>
                <span>{label}</span>
                <KeyboardArrowDownIcon sx={{color: '#BABABA', fontSize: '14px', marginLeft: '10px'}} />
            </div>
            {
                showDropDown && options?.length > 0 &&
                <div className='filter-body-wrapper'>
                    <div className='filter-body bg-white'>
                        {
                            options.map((optionList, index) => {
                                return (
                                    <div className='filter-list-item text-14 ' key={optionList.value + index} onClick={() => {setShowDropdown(false); handleSelect(optionList)}}>{optionList.value}</div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default FilterDropdown;