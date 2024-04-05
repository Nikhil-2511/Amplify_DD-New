import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { InputAdornment, TextField } from '@mui/material';
import { isDecimalValue } from '../../../helper/commonHelper';
import CustomRangeSlider from '../../../CommonComponent/CustomRangeSlider';
import { RUPEE_SYMBOL } from '../../../constants';


function RangeFilter({label, className, parentClass, selectedValue=[0, 10], onChange, handleSetRange, minRange = 0, maxRange = 100, step=1, hasChanged, themeBasedParentClass = ' bg-F2F4F7 text-98A2B3 rounded-4'}) {
    const [showDropDown, setShowDropdown] = useState(false);

    // function handleChange(value, key) {
    //     if(isDecimalValue(value) || value === '' || value === 0) {
    //         onChange(value, key);
    //     }
    // }

    return (
        <div className={'filter-dropdwon-container ' + (parentClass || '') + (themeBasedParentClass || '')} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <div className={'filter-label cursor-pointer padding-x8 padding-y10 ' + (className || '') + (hasChanged ? 'text-4E5BA6 font-500' : '')}>
                <span>{label}</span>
                <KeyboardArrowDownIcon sx={{color: '#BABABA', fontSize: '14px'}} />
            </div>
            {
                showDropDown &&
                <div className='filter-body-wrapper slider-filter'>
                    <div className='filter-body padding-y12 padding-x16 bg-white'>
                        <div className='text-1D2939 margin-b10 flex justify-space-between'>
                            <div>Revenue Range</div>
                            <div className='text-2E90FA padding-x10 padding-y5 rounded-8 border border-D0D5DD cursor-pointer text-12' onClick={handleSetRange}>Set Range</div>
                        </div>
                        <div className='padding-x20'>
                            <CustomRangeSlider
                                rangeSliderValue={selectedValue} min={minRange} max={maxRange} onChange={onChange} step={step} disableSwap />
                        </div>
                        <div className='flex col-gap-30'>
                            <div className='flex-1 flex bg-F2F4F7 padding-y8 padding-x16 rounded-8 align-center'>
                                <span className='text-98A2B3 text-12 margin-r8'>{RUPEE_SYMBOL}</span>
                                <span className='text-1D2939'>{`${selectedValue[0]} Crore`}</span>
                                {/* Will add if required */}
                                {/* <TextField
                                    value={selectedValue}
                                    onChange={(e) => handleChange(e.target.value, 'minValue')}
                                    size="small"
                                    InputProps={{
                                    startAdornment: <InputAdornment sx={{ root: { color: '#fff', zIndex: 2 } }} position="start">Rs</InputAdornment>,
                                }}
                                /> */}
                            </div>
                            <div className=' flex flex-1 bg-F2F4F7 padding-y8 padding-x16 rounded-8 align-center'>
                                {/* <TextField
                                    value={selectedValue?.maxValue || ''}
                                    onChange={(e) => onChange(e.target.value, 'maxValue')}
                                    size="small"
                                    InputProps={{
                                    startAdornment: <InputAdornment sx={{ root: { color: '#fff', zIndex: 2 } }} position="start">Rs</InputAdornment>,
                                }}
                                /> */}
                                <span className='text-98A2B3 text-12 margin-r8'>{RUPEE_SYMBOL}</span>
                                <span className='text-1D2939'>{`${selectedValue[1]} Crore`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RangeFilter;