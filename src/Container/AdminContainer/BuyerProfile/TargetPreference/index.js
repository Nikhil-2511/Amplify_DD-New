import React, { useState } from 'react';
import TitleBox from '../../../../Component/TitleBox';
import { Button, Chip } from '@mui/material';
import PencilIcon from '../../../../assets/images/pencilIcon.svg';
import CustomSelect from '../../../../CommonComponent/CustomSelect';
import { AcquisitionSizeArr, AcquisitionTimeLineArr, CompanySectorArr, RevenueRangeArr, SubsectorMapping, OperationArr } from '../../../../CommonModels/CommonCollection';
import SaveIcon from '../../../../assets/images/saveIcon.svg';
import CustomCheckboxIcon from '../../../../CommonComponent/CustomCheckboxIcon';
import { getValueFromArr, isMobileView } from '../../../../helper/commonHelper';
import CustomRangeSlider from '../../../../CommonComponent/CustomRangeSlider';
import CustomMultiSelect from '../../../../CommonComponent/CustomMultiSelect';
import NewTextField from '../../../../CommonComponent/NewTextField';
import { isAdminUser } from '../../../../Services';

function TargetPreference({formData, handleFormField, handleSaveAction, handleAcquisitionChange, handleRevenueChange, errorCta}) {
    const [isEditable, setIsEditable] = useState(false);

    function handleOnClick() {
        if(isEditable) {
            handleSaveAction();
            setTimeout(() => {
                setIsEditable(false)
            }, 200);
        }
        else setIsEditable(true);
    }

    // function handleSectorChange(value, key, index) {
    //     let preferencesArr = formData?.preferences || [];
    //     let preferenceObj = preferencesArr?.[index] || {sector: '', subsectorList: []};
    //     preferenceObj[key] = value;
    //     if(key === 'sector') preferenceObj['subsectorList'] = [];
    //     preferencesArr.splice(index, 1, preferenceObj);
    //     handleFormField(preferencesArr, 'preferences')
    // }
    function handleSectorChange(value, key, index) {
        let preferencesArr = formData?.preferences || [];

        for (let i = preferencesArr.length - 1; i >= 0; i--) {
            const existingSector = preferencesArr[i].sector;

            if (!value.includes(existingSector)) {
                preferencesArr.splice(i, 1);
            }
        }

        value.forEach(sector => {
            // If the sector is not in the existing preferencesArr, add a new preference object
            if (!preferencesArr.some(pref => pref.sector === sector)) {
                preferencesArr.push({ sector, subsectorList: [] });
            }
        });

        handleFormField([...preferencesArr], 'preferences');
    }

    function handleSubSectorChange(value, key, sectorKey){        
        let preferencesArr = formData?.preferences || [];

        let subSectorLists = SubsectorMapping[sectorKey];
        let subSectorKeyList = subSectorLists.map(item => item.key);
        let arr = [];

        value.forEach(subSector => {
            if(subSectorKeyList.includes(subSector)){
                arr.push(subSector);
            }
        });

        for (let i = preferencesArr.length - 1; i >= 0; i--) {
            const existingSector = preferencesArr[i].sector;
            if(sectorKey === existingSector){
                preferencesArr[i].subsectorList = arr;
            }
            
        }
        handleFormField([...preferencesArr], 'preferences');
    }
    
    

    function getSectorOptions() {
        let arr = [];
        formData?.preferences.map((item)=>{
            arr.push(item.sector);
        })
        return arr;
    }

    function getSubSectorOptions(){
        let sectors = getSectorOptions();
        let subSectorArr = {};
        if(sectors?.length) {
            sectors.forEach((sectorList) => {
                if(SubsectorMapping[sectorList]){
                    subSectorArr[sectorList] = SubsectorMapping[sectorList];
                }
            })
        }
        
        return subSectorArr;
    }

    function checkForSubSectors(){
        let sectors = getSectorOptions();
        let flag = true;
        if(sectors?.length) {
            sectors.forEach((sectorList) => {
                if(SubsectorMapping[sectorList]){
                    flag = false;
                }
            })
        }
        return flag;
    }

    function getSubSectorSelectedValues() {
        let arr = [];
        formData?.preferences.map((item)=>{
            if(item?.subsectorList?.length){
                arr.push(...item.subsectorList);
            }
        })
        return arr;
    }


    return (
        <div className={`target-preference-container ${isMobileView()?'pb-[50px]':''}`}>
            <div className='flex justify-space-between align-center basic-information-header padding-b30 padding-l10'>
                <TitleBox title="Target Preference" desc="Share key details about the company you're interested in acquiring." descClassName="maxWidth-420 text-667085 text-14 margin-t0 margin-b0" className="text-18 font-500 margin-t0 margin-b10" />
                {
                    !isMobileView() &&
                    <Button className='capitalize' 
                        size="small" 
                        variant="outlined" 
                        sx={{color: '#000', borderRadius: '8px', border: errorCta ? '1px solid #B42318' : '1px solid #D0D5DD', boxShadow: '0px 1px 2px 0px #1018280D', height: '36px', padding: '3px 20px'}} 
                        startIcon={isEditable ? <img src={SaveIcon} alt="" /> : <img src={PencilIcon} alt="" />} 
                        onClick={handleOnClick}
                    >
                        {isEditable ? 'Save Changes' : 'Edit Section'}
                    </Button>
                }
            </div>
            <div className='padding-l12 margin-b30 padding-r12'>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Sectors Interested in</div>
                        {!isMobileView() && <div className='text-667085 text-14'>Create a mandate if you have a specific M&A requirement</div>}
                        
                    </div>
                    <div className='flex-1'>
                        {
                            !isEditable &&
                            <div>
                                {
                                    formData?.preferences?.length > 0 &&
                                    formData.preferences.map((preferenceList, index) => (
                                        <Chip
                                            key={'preferenceList' + index}
                                            label={preferenceList.sector}
                                            className='text-12 font-500'
                                            sx={{background: '#F9F5FF', color: '#6941C6' , marginRight: '10px'}}
                                        />
                                    ))
                                }
                            </div>
                        }

                        {
                            isEditable &&
                            // formData?.preferences?.length > 0 &&
                            // formData.preferences.map((preferenceList, index) => {
                                <CustomSelect
                                    className="rounded-8"
                                    parentClass={'bg-white text-101828 border border-D0D5DD'}
                                    label={'Select Sector'} 
                                    options={CompanySectorArr} 
                                    handleSelect={(valueObj) => handleSectorChange(valueObj, 'sector', 0)}
                                    selectedValue={getSectorOptions()}
                                    multiSelect
                                />
                            // })
                        }
                    </div>
                </div>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Sub sector Interested in</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email Address </div> */}
                    </div>
                    <div className='flex-1'>
                        {
                            !isEditable &&
                            <div>
                                {
                                    formData?.preferences?.length > 0 &&
                                    formData.preferences.map((preferenceList, i) => {
                                        if(preferenceList.subsectorList?.length > 0) {
                                            return <div className='flex col-gap-8 align-center row-gap-10 flex-wrap' key={"subSector " + i}>
                                                {
                                                    preferenceList.subsectorList.map((subSectorListItem, index) => {
                                                        return <Chip
                                                            key={'subsectorList' + index}
                                                            label={getValueFromArr(subSectorListItem, SubsectorMapping[formData?.preferences[i]?.sector])}
                                                            className='text-12 font-500'
                                                            sx={{background: '#F9F5FF', color: '#6941C6', marginBottom: '10px'}}
                                                        />
                                                    })
                                                }
                                            </div>
                                        }
                                        return ''
                                    })
                                }
                            </div>
                        }

                        {
                            isEditable &&
                                <CustomMultiSelect
                                    className="rounded-8"
                                    rootClass="w-full"
                                    parentClass={'bg-white text-101828 border border-D0D5DD'}
                                    options={getSubSectorOptions()} 
                                    handleSelect={(valueObj, sectorKey) => handleSubSectorChange(valueObj, 'subsectorList', sectorKey)}
                                    disable={checkForSubSectors()}
                                    label={'Select Sub-sector'} 
                                    // selectedValue={getFieldLabelData(formData, 'subsector', 'value')}
                                    selectedValue={getSubSectorSelectedValues()}
                                    multiSelect
                                />
                        }
                    </div>
                </div>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Preferred Cheque Size Per Deal (₹ crores)</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email Address</div> */}
                    </div>
                    <div className='flex-1'>
                        {   isEditable ? (
                                <CustomRangeSlider
                                    rangeSliderValue={[parseInt(formData?.dealsize?.min || 0), parseInt(formData?.dealsize?.max || 10)]}
                                    min={0}
                                    max={100}
                                    onChange={(value) => handleFormField(value, 'dealsize')}
                                    step={1}
                                    valueLabelDisplay="on"
                                    disabled={!isEditable}
                                    disableSwap
                                />
                            ) : (
                                <div>
                                    <Chip
                                        label={`₹${parseInt(formData?.dealsize?.min || 0)} - ₹${parseInt(formData?.dealsize?.max || 10)} crores`}
                                        className='text-12 font-500'
                                        sx={{background: '#ECFDF3', color: '#027A48'}}
                                    />
                                </div>
                            )

                        }
                        {/* <CustomSelect
                            className="rounded-8"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            label={formData?.dealsize || 'Select Range'} 
                            options={AcquisitionSizeArr} 
                            handleSelect={(valueObj) => handleFormField(valueObj.key, 'dealsize')}
                            disable={!isEditable}
                        /> */}
                    </div>
                </div>

                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Age of Operations</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email Address</div> */}
                    </div>
                    <div className='flex-1'>
                        <CustomSelect
                            className="rounded-8"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            label={formData?.operation || 'Select Range'} 
                            options={OperationArr} 
                            handleSelect={(valueObj) => handleFormField(valueObj.key, 'operation')}
                            disable={!isEditable}
                        />
                    </div>
                </div>
                
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Revenue Range(₹ crores)</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email number</div> */}
                    </div>
                    <div className='flex-1'>
                        {/* <CustomSelect
                            className="rounded-8"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            label={formData?.revenue || 'Select revenue range'} 
                            options={RevenueRangeArr} 
                            handleSelect={(valueObj) => handleFormField(valueObj.key, 'revenue')}
                            disable={!isEditable}
                        /> */}
                        {   isEditable ? (
                                <CustomRangeSlider
                                    rangeSliderValue={[parseInt(formData?.revenue?.min || 0), parseInt(formData?.revenue?.max || 10)]}
                                    min={0}
                                    max={50}
                                    onChange={(value) => handleFormField(value, 'revenue')}
                                    step={1}
                                    valueLabelDisplay="on"
                                    disabled={!isEditable}
                                    disableSwap
                                />
                            ) : (
                                <div>
                                    <Chip
                                        label={`₹${formData?.revenue?.min || 0} - ₹${formData?.revenue?.max || 10} crores`}
                                        className='text-12 font-500'
                                        sx={{background: '#ECFDF3', color: '#027A48'}}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>EBITDA Preference</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email number</div> */}
                    </div>
                    <div className='flex-1'>
                        {
                            !isEditable &&
                            <Chip
                                label={formData?.ebitdaPositive ? 'EBITDA Positive companies only' : 'Open to all'}
                                className='text-12 font-500'
                                sx={{background: '#EEF4FF', color: '#3538CD'}}
                            />
                        }
                        {
                            isEditable &&
                            <div className='cursor-pointer text-344054 text-14 font-500 flex' onClick={() =>handleFormField(!formData?.ebitdaPositive, 'ebitdaPositive')}>
                                <CustomCheckboxIcon isActive={formData?.ebitdaPositive} />
                               <span>EBITDA Positive Only</span>
                            </div>

                        }
                    </div>
                </div>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Acquisition Timeline</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email number</div> */}
                    </div>
                    <div className='flex-1'>
                        {
                            !isEditable &&
                            <Chip
                                label={getValueFromArr(formData?.intent, AcquisitionTimeLineArr) || 'Open to all'}
                                className='text-12 font-500'
                                sx={{background: '#EEF4FF', color: '#3538CD'}}
                            />
                        }
                        {
                            isEditable &&
                            <CustomSelect
                                className="rounded-8"
                                parentClass={'bg-white text-101828 border border-D0D5DD'}
                                label={formData?.intent || 'Select Type'} 
                                options={AcquisitionTimeLineArr} 
                                handleSelect={(valueObj) => handleFormField(valueObj.key, 'intent')}
                                disable={!isEditable}
                            />
                        }
                    </div>
                </div>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Operational</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email number</div> */}
                    </div>
                    <div>
                        {
                            !isEditable &&
                            <Chip
                                label={formData?.operational ? 'Operational companies only' : 'Open to all'}
                                className='text-12 font-500'
                                sx={{background: '#EEF4FF', color: '#3538CD'}}
                            />
                        }
                        {
                            isEditable &&
                            <div className='cursor-pointer text-14 text-344054 font-500 flex' onClick={() => handleFormField(!formData?.operational, 'operational')}>
                                <CustomCheckboxIcon isActive={formData?.operational} />
                               <span>Show Operational Only</span> 
                            </div>
                        }
                    </div>
                </div>
                {
                    // (formData?.primaryMember || isAdminUser()) &&
                    <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                        <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                            <div>Any Other Criteria</div>
                            {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email Address</div> */}
                        </div>
                        <div className='flex-1'>
                            <NewTextField 
                                size="small" 
                                value={formData?.requirement || ''}
                                fullWidth 
                                variant="outlined"
                                disabled={!isEditable}
                                onChange={(e) => handleFormField(e.target.value, 'requirement')} 
                                placeholder={'Specify additional acquisition criteria not listed above (e.g., presence in India & US, pedigree founders).'}
                                multiline={true}
                                minRows={2}
                                maxRows={5}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default TargetPreference;