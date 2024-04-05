import React, { useCallback, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomCheckboxIcon from '../../../CommonComponent/CustomCheckboxIcon';
import { getValueFromArr, renderIcon } from '../../../helper/commonHelper';
import CustomChip from '../../../CommonComponent/CommonChip';

function SubsectorFilter({label, options, selectedValue=[], className, parentClass, handleSelect, arrowIcon, themeBasedParentClass = ' bg-F2F4F7 text-98A2B3 rounded-4', multiSelect}) {
    const [showDropDown, setShowDropdown] = useState(false);

    function isSelected(subSectorList, sectorKey) {
        let selected = false;
        if(selectedValue?.length) {
            selectedValue.forEach((preferenceList) => {
                if(preferenceList.sector === sectorKey) {
                    if(preferenceList?.subsectorList?.length) {
                        selected= preferenceList?.subsectorList.includes(subSectorList.key);
                    }
                }
            })
        }
        return selected;
    }

    const hasSubsectors = useCallback(() => checkSubsectors(selectedValue), [selectedValue])

    function checkSubsectors(selectedPreferenecArr) {
        let hasValue = false;
        if(selectedPreferenecArr?.length) {
            selectedPreferenecArr.forEach(preferenceList => {
                if(preferenceList?.subsectorList?.length) {
                    hasValue = true;
                }
            });
        }
        return hasValue;
    }

    function getSubSectorChips(){
        const subsectorStrings = (data) => {
            return data.some(item => item.subsectorList && Array.isArray(item.subsectorList));
        }
        if( selectedValue?.length > 0 && subsectorStrings(selectedValue) ){
            return (
                <div className='flex col-gap-8 margin-t8 flex-wrap row-gap-8'>
                    {
                        selectedValue?.length > 0 &&
                        selectedValue.map((listValue, index) => (
                        listValue.subsectorList?.map((subsector, subIndex) => (
                            <CustomChip
                                key={`${listValue.sector}-${subsector}-${index}-${subIndex}`}
                                disableCross
                                className='bg-B54708'
                                label={subsector}
                            />
                        ))
                        ))
                    }
                </div>
            )
        }
        return ""
    }

    return (
        <>
            <div className={'filter-dropdwon-container ' + (parentClass || '') + (themeBasedParentClass || '')} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                <div className={'filter-label cursor-pointer padding-x8 padding-y10 ' + (className || '')}>
                    <div className={'flex ' + (hasSubsectors() ? 'text-4E5BA6 font-500' : '')}>    
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
                    showDropDown && Object.keys(options)?.length > 0 &&
                    <div className='subsector-filter-body-wrapper'>
                        <div className='subsector-filter-body bg-white'>
                            {
                                Object.keys(options).map((sectorKey, index) => {
                                    return (
                                        <div className={'padding-b10' + (index !== Object.keys(options)?.length -1 ? ' border-b border-F2F4F7 margin-b10' : '')} key={sectorKey + index}>
                                            <div className={'flex col-gap-8 align-center padding-l10 padding-b10 ' + (index > 0 ? 'padding-t10' : '')}>
                                                <div><img className='w-20px' src={renderIcon(sectorKey)} alt="" /></div>
                                                <div className='text-070707 font-500 text-14'>{sectorKey}</div>
                                                
                                            </div>
                                            <div className={`flex row-gap-6 flex-wrap text-344054 text-12 ${multiSelect && 'flex-direction-coloum'}`}>
                                                {
                                                    options[sectorKey]?.length > 0 &&
                                                    options[sectorKey].map((subSectorList, j) => {
                                                        return (
                                                            <div className='cursor-pointer padding-x10 padding-y12 flex align-center cursor-pointer w-33' key={subSectorList.key + j} onClick={() => handleSelect(subSectorList.key, sectorKey)}>
                                                                <CustomCheckboxIcon isActive={isSelected(subSectorList, sectorKey)} />
                                                                {subSectorList?.value || ''}
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            {
                multiSelect && getSubSectorChips()
            }
        </>
    )
}

export default SubsectorFilter;