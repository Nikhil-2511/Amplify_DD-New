import React, { useEffect, useState } from 'react';
import SuccessIcon from "../../../../assets/images/circularTickIcon.svg";
import { useDispatch } from 'react-redux';
import { deepClone, emailIsValid, getFieldLabelData, getRangeValue, isAlphabetOnly, isPhoneNumberValid, numbersOnly } from '../../../../helper/commonHelper';
import { API_SUCCESS_CODE, CHAR_COUNT_VALUE, POST } from '../../../../constants';
import { ENDPOINT } from '../../../../config/endpoint';
import { updateFormToServer } from '../../../../Redux/slice/CommonSlice';
import ModalWrapper from '../../../../ModalWrapper';
import { Button, FormControl, FormControlLabel, Radio } from '@mui/material';
import { NewButton } from '../../../../CommonComponent/NewCustomButton';
import { CrossIcon } from '../../../../assets/icons';
import NewTextField from '../../../../CommonComponent/NewTextField';
import CustomCheckboxIcon from '../../../../CommonComponent/CustomCheckboxIcon';
import CustomSelect from '../../../../CommonComponent/CustomSelect';
import CustomRangeSlider from '../../../../CommonComponent/CustomRangeSlider';
import { SubsectorMapping } from '../../../../CommonModels/CommonCollection';
import CustomMultiSelect from '../../../../CommonComponent/CustomMultiSelect';
import CustomRadioGroup from '../../../../CommonComponent/CustomRadioGroup';
import { CORPORATE_VC_KEY, FAMILY_OFFICE_KEY, VC_PE_KEY } from '../../../../constants/keyVariableConstants';

function CreateBuyerForm({model, onClose, onSuccess, defaultData={}}) {
    const [buyerModel, setBuyerModel] = useState(model);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [sectorOptions, setSectorOptions] = useState(model?.preferences[0]?.sector?.options);

    useEffect(()=>{
       let model = deepClone(buyerModel);
       setBuyerModel(model);
    },[])

    function handleFieldUpdate(value, key) {
        let newBuyerModel = deepClone(buyerModel);
        if(key === 'phone') {
            if(value !== 0 && value !== '')
            if(!numbersOnly(value)) {
                return;
            } 
        }
        newBuyerModel[key].value = value;
        if(newBuyerModel[key].error) newBuyerModel[key].error = false;
        setBuyerModel(newBuyerModel);
    }
  
    function handleClick() {
        if(isNextActive()){
            let {error, data} = prepareData();
            if(error) return;
            data = {
                ...data,
                ...defaultData
            }
            let dataToSend = {
                postBody: data,
                method: POST,
                url: ENDPOINT.BUYERS.createBuyerApi(),
                callback: handleCallback
            };
    
            dispatch(updateFormToServer(dataToSend));
        }
    }

    function handleCallback(res) {
        onSuccess(res);
    }

    function prepareData() {
        let data = {}, error = false, newBuyerData = deepClone(buyerModel);
        if(!showOpenToLead()) delete newBuyerData.openToLeadRound
        Object.keys(newBuyerData).forEach(keyName => {
            let fieldData = newBuyerData[keyName];
            if(keyName === 'preferences') {
                let modifyData = fieldData, preferenceData = [];
                modifyData.forEach((preferenceField, index) => {
                    if(!preferenceField?.sector?.value) {
                        error = true;
                        modifyData[index].sector.error = true;
                        return;                    
                    }
                    else {
                        if(SubsectorMapping[preferenceField?.sector?.value] && !preferenceField?.subsector?.value) {
                            error = true;
                            modifyData[index].subsector.error = true;
                            return;
                        }
                    }
                    preferenceData.push({sector: preferenceField?.sector?.value, subsectorList:  preferenceField?.subsector?.value ? preferenceField?.subsector?.value : null});
                })
                if(error) newBuyerData.preferences = modifyData;
                if(!error) data[keyName] = preferenceData;
            }
            else if(keyName === 'phone') {
                if(!isPhoneNumberValid(fieldData?.value || '')) {
                    error = true;
                    newBuyerData[keyName].error = true;
                }
                else {
                    data[keyName] = fieldData.value || null;
                }
            }
            else if(keyName === 'email') {
                if(!emailIsValid(fieldData?.value || '')) {
                    error = true;
                    newBuyerData[keyName].error = true;
                }
                else {
                    data[keyName] = fieldData.value || null;
                }
            }
            else if(keyName === 'pocName') {
                if(!isAlphabetOnly(fieldData?.value)) {
                    error = true;
                    newBuyerData[keyName].error = true;
                    newBuyerData[keyName].helperText = 'No special character allowed';
                }
                else {
                    data[keyName] = fieldData.value || null;
                }
            }
            else if(keyName === 'dealsize' || keyName === 'revenue'){
                data[keyName] = {
                    min: getRangeValue(newBuyerData[keyName].value[0]),
                    max: getRangeValue(newBuyerData[keyName].value[1])
                }
            }
            else {
                if (fieldData.required && fieldData.value !== false && !fieldData.value) {
                    error = true;
                    newBuyerData[keyName].error = true;
                }                
                else {
                    data[keyName] = (fieldData.value === '' || fieldData.value === undefined) ? null : fieldData.value;
                }
            }
        });
        if(error) setBuyerModel(newBuyerData);
        return {error, data};
    }

      function handlePreference(values, key, index = 0) {
        let newBuyerData = deepClone(buyerModel);
        let preferences = newBuyerData?.preferences
        preferences = preferences?.filter((preference)=>values?.includes(preference?.sector?.value))
        newBuyerData.preferences = preferences;
        for (let i = 0; i < values?.length; i++) {
          let obj = deepClone(model?.preferences[0]);
          const sector = values[i];
          obj[key].value = sector;
          if(preferences[i]?.sector?.value !== sector)
          newBuyerData.preferences.push(obj);
        }
        setBuyerModel(newBuyerData);
      }

      function handleSubSelector(values, key, index = 0) {
        let newBuyerData = deepClone(buyerModel);
        let subSectorsObj = getSubSectorOptions();
        for (let i = 0; i < newBuyerData?.preferences?.length; i++) {
          const obj = newBuyerData?.preferences[i];
          let sectorList = subSectorsObj[obj?.sector?.value]?.map(
            (subsectorItem) => subsectorItem?.key
          );
          if (sectorList?.length) {
            let filteredValues = values?.filter((val) =>
              sectorList?.includes(val)
            );
            newBuyerData.preferences[i][key].value = filteredValues;
          }
        }
        setBuyerModel(newBuyerData);
      }

    function getSubSectorOptions() {
      let sectors = collectSelected("sector");
      let subSectorObj = {};
      if (sectors?.length) {
        sectors.forEach((sector) => {
          if (SubsectorMapping[sector]) {
            subSectorObj[sector] = SubsectorMapping[sector];
          }
        });
      }
      return subSectorObj;
    }

    function collectSelected(key) {
      let selectedSectors = buyerModel?.preferences?.map(
        (preference) => preference[key]?.value
      );
      selectedSectors = Array.from(new Set(selectedSectors));
      selectedSectors = selectedSectors?.filter((sector) => !!sector);
      return selectedSectors;
    }

    function collectSubSelected(key) {
      let selectedSubSectors = [];
      let pref = buyerModel?.preferences;
      for (let i = 0; i < pref?.length; i++) {
        let subsector = pref[i][key]?.value;
        selectedSubSectors.push(...subsector);
      }
      selectedSubSectors = Array.from(new Set(selectedSubSectors));
      selectedSubSectors = selectedSubSectors?.filter((sector) => !!sector);
      return selectedSubSectors;
    }

    function showOpenToLead(){
        if((buyerModel?.type?.value === FAMILY_OFFICE_KEY && !!buyerModel?.openToFunding?.value) || buyerModel?.type?.value === VC_PE_KEY || buyerModel?.type?.value === CORPORATE_VC_KEY){
            return true
        }else{
            return false;
        }
    }

    function showPreference(){
        if(buyerModel?.type?.value === FAMILY_OFFICE_KEY){
            return true;
        }else{
            return false;
        }
    }

    function isNextActive(){
        if(showPreference() && (!buyerModel?.openToAcquisition?.value && !buyerModel?.openToFunding?.value)){
         return false;
        }else{
         return true;
        }
    }

    return (
        <div className='create-mandate-screen'>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b6'>Buyer Company Name <span className='text-danger'>*</span></div>
                <NewTextField
                    className="rounded-8 "
                    onChange={(e) => handleFieldUpdate(e.target.value, 'companyName')}
                    size="small"
                    fullWidth
                    autoComplete='off'
                    // inputProps={{ maxLength: 10 }}
                    placeholder={getFieldLabelData(buyerModel, 'companyName', 'placeholder')}
                    value={getFieldLabelData(buyerModel, 'companyName', 'value')} 
                    error={!!getFieldLabelData(buyerModel, 'companyName', 'error')}
                    helperText={getFieldLabelData(buyerModel, 'companyName', 'error') ? getFieldLabelData(buyerModel, 'companyName', 'helperText') : ''}
                />
            </div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b6'>Buyer POC Name <span className='text-danger'>*</span></div>
                <NewTextField
                    className="rounded-8 "
                    onChange={(e) => handleFieldUpdate(e.target.value, 'pocName')}
                    size="small"
                    fullWidth
                    autoComplete='off'
                    // inputProps={{ maxLength: 10 }}
                    placeholder={getFieldLabelData(buyerModel, 'pocName', 'placeholder')}
                    value={getFieldLabelData(buyerModel, 'pocName', 'value')} 
                    error={!!getFieldLabelData(buyerModel, 'pocName', 'error')}
                    helperText={getFieldLabelData(buyerModel, 'pocName', 'error') ? getFieldLabelData(buyerModel, 'pocName', 'helperText') : ''}
                />
            </div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b6'>Buyer POC Phone Number <span className='text-danger'>*</span></div>
                <NewTextField
                    className="rounded-8 "
                    onChange={(e) => handleFieldUpdate(e.target.value, 'phone')}
                    size="small"
                    fullWidth
                    autoComplete='off'
                    inputProps={{ maxLength: 10 }}
                    placeholder={getFieldLabelData(buyerModel, 'phone', 'placeholder')}
                    value={getFieldLabelData(buyerModel, 'phone', 'value')} 
                    error={!!getFieldLabelData(buyerModel, 'phone', 'error')}
                    helperText={getFieldLabelData(buyerModel, 'phone', 'error') ? getFieldLabelData(buyerModel, 'phone', 'helperText') : ''}
                />
            </div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b6'>Buyer POC Email ID <span className='text-danger'>*</span></div>
                <NewTextField
                    className="rounded-8 "
                    onChange={(e) => handleFieldUpdate(e.target.value, 'email')}
                    size="small"
                    fullWidth
                    autoComplete='off'
                    // inputProps={{ maxLength: 10 }}
                    placeholder={getFieldLabelData(buyerModel, 'email', 'placeholder')}
                    value={getFieldLabelData(buyerModel, 'email', 'value')} 
                    error={!!getFieldLabelData(buyerModel, 'email', 'error')}
                    helperText={getFieldLabelData(buyerModel, 'email', 'error') ? getFieldLabelData(buyerModel, 'email', 'helperText') : ''}
                />
            </div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b6'>Buyer Type <span className='text-danger'>*</span></div>
                <CustomRadioGroup 
                    handleChange={(value) => handleFieldUpdate(value, 'type')} 
                    selectedValue={getFieldLabelData(buyerModel, 'type', 'value')}
                    error={!!getFieldLabelData(buyerModel, 'type', 'error')}
                    options={getFieldLabelData(buyerModel, 'type', 'options')}
                    helperText={getFieldLabelData(buyerModel, 'type', 'error') ? getFieldLabelData(buyerModel, 'type', 'helperText') : ''}
                    radioProps={{
                        size: "small"
                    }}
                />
            </div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b10'>Primary Sector & Subsector <span className='text-danger'>*</span></div>
                <div className='text-12 text-475467 margin-b10'>Choose the main sector and subsector for the buyer. These will be set as their default filters.</div>
                {
                    sectorOptions?.length > 0 &&
                    <div
                    className="flex col-gap-15"
                  >
                    <CustomSelect
                      rootClass="flex-1"
                      className="rounded-8"
                      fullWidth
                      parentClass={
                        "bg-white text-101828 border border-D0D5DD"
                      }
                      label={"Select Sector"}
                      options={sectorOptions}
                      error={getFieldLabelData(buyerModel?.preferences[0], 'sector', 'error')}
                      handleSelect={(values) =>
                        handlePreference(
                          values,
                          "sector"
                        )
                      }
                      multiSelect
                      selectedValue={ collectSelected('sector') }
                      errorMessage={getFieldLabelData(buyerModel?.preferences?.[0], 'sector', 'helperText')}
                    />
         <CustomMultiSelect
            className="rounded-8"
            rootClass="flex-1"
            parentClass={'bg-white text-101828 border border-D0D5DD'}
            options={getSubSectorOptions()} 
            handleSelect={(valueObj) => handleSubSelector(valueObj, 'subsector')} 
            label={"Select Sub-sector"}
            selectedValue={collectSubSelected('subsector')}
            multiSelect
        />
                    </div>
                }
            </div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b10'>Acquisition Preferences</div>
                <div className='text-12 text-475467 margin-b10'>Define the buyer's acquisition preferences. These will show on their profile and be set as default filters.</div>
                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>Acquisition Size (₹ crores)<span className='error-text'>*</span></div>
                    <div className='flex-1'>
                        <CustomRangeSlider
                            rangeSliderValue={[getFieldLabelData(buyerModel, 'dealsize', 'value')[0], getFieldLabelData(buyerModel, 'dealsize', 'value')[1]]}
                            min={0}
                            max={100}
                            onChange={(value) => handleFieldUpdate(value, 'dealsize')}
                            step={1}
                            valueLabelDisplay="on"
                            style={{ marginTop: '30px' }} 
                        />
                    </div>
                </div>
                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>Revenue Range</div>
                    <div className='flex-1'>
                        <CustomRangeSlider
                            rangeSliderValue={[getFieldLabelData(buyerModel, 'revenue', 'value')[0], getFieldLabelData(buyerModel, 'revenue', 'value')[1]]}
                            min={0}
                            max={50}
                            onChange={(value) => handleFieldUpdate(value, 'revenue')}
                            step={1}
                            valueLabelDisplay="on"
                            style={{ marginTop: '30px' }} 
                        />
                    </div>
                </div>
                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>Acquisition Timeline</div>
                    <div className='flex-1'>
                        <CustomSelect
                            rootClass={'flex-1'}
                            className="rounded-8"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            options={buyerModel?.intent?.options} 
                            handleSelect={(valueObj) => handleFieldUpdate(valueObj.key, 'intent')}
                            label={getFieldLabelData(buyerModel, 'intent', 'value') || getFieldLabelData(buyerModel, 'intent', 'placeholder')} 
                            error={getFieldLabelData(buyerModel, 'intent', 'error')}
                            errorMessage={getFieldLabelData(buyerModel, 'intent', 'error') ? getFieldLabelData(buyerModel, 'intent', 'helperText') : ''}
                        />
                    </div>
                </div>

               {showPreference() && <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>Investment Purpose <span className='text-danger'>*</span></div>
                    <div className='flex-1'>
                    <div className=' flex cursor-pointer justify-start' onClick={() => handleFieldUpdate(!buyerModel?.openToAcquisition?.value, 'openToAcquisition')}>
                        <CustomCheckboxIcon className='cursor-pointer' isActive={buyerModel?.openToAcquisition?.value} />
                        <span className='text-344054 text-16 font-500'>Acquire/Take Majority Stakes in a Company</span>
                    </div>
                    <div className=' flex cursor-pointer justify-start' onClick={() => handleFieldUpdate(!buyerModel?.openToFunding?.value, 'openToFunding')}>
                        <CustomCheckboxIcon className='cursor-pointer' isActive={buyerModel?.openToFunding?.value} />
                        <span className='text-344054 text-16 font-500'>Invest in Companies</span>
                    </div>
                    </div>
                </div> }

               {showOpenToLead() && <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                        <div className='text-14 text-344054 font-500 flex-1'>Are you open to Lead a Round? <span className='error-text'>*</span></div>
                        <div className='flex-1'>
                            <CustomRadioGroup 
                                handleChange={(value) => handleFieldUpdate(value === 'true' ? true : false, 'openToLeadRound')} 
                                selectedValue={getFieldLabelData(buyerModel, 'openToLeadRound', 'value') ? 'true' : 'false'}
                                error={!!getFieldLabelData(buyerModel, 'openToLeadRound', 'error')}
                                options={getFieldLabelData(buyerModel, 'openToLeadRound', 'options')}
                                helperText={getFieldLabelData(buyerModel, 'openToLeadRound', 'error') ? getFieldLabelData(buyerModel, 'openToLeadRound', 'helperText') : ''}
                                radioProps={{
                                    size: "small",
                                    // disabled: validateUser()
                                }}
                            />
                        </div>
                    </div> }
             
                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>Revenue Status</div>
                    <div className=' flex cursor-pointer justify-start w-1/2' onClick={() => handleFieldUpdate(!buyerModel?.revenueGenerating?.value, 'revenueGenerating')}>
                        <CustomCheckboxIcon className='cursor-pointer' isActive={buyerModel?.revenueGenerating?.value} />
                        <span className='text-344054 text-16 font-500'>Revenue generating only</span>
                    </div>
                </div>

                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                        <div className='text-14 text-344054 font-500 flex-1'>Any other criteria</div>
                        <div className='flex cursor-pointer justify-start w-1/2'>
                            <NewTextField
                                className="rounded-8 "
                                onChange={(e) => handleFieldUpdate(e.target.value, 'requirement')}
                                size="small"
                                fullWidth
                                autoComplete='off'
                                multiline={true}
                                minRows={3}
                                maxRows={5}
                                inputProps={{ maxLength: CHAR_COUNT_VALUE }}
                                placeholder={getFieldLabelData(buyerModel, 'requirement', 'placeholder')}
                                value={getFieldLabelData(buyerModel, 'requirement', 'value')} 
                                error={!!getFieldLabelData(buyerModel, 'requirement', 'error')}
                                helperText={getFieldLabelData(buyerModel, 'requirement', 'error') ? getFieldLabelData(buyerModel, 'requirement', 'helperText') : ''}
                            />
                        </div>
                    </div>

            </div>
            <div className='modal-action-container flex col-gap-10 justify-end'>
                <Button className='capitalize' fullWidth sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={onClose}>
                    Cancel
                </Button>
                <NewButton className={`capitalize ${(isNextActive())? '' : 'pointer-events-none opacity-30'}`} fullWidth sx={{fontWeight: 500}} color="secondary" variant="contained" onClick={handleClick}>
                    Next
                </NewButton>
            </div>
        </div>
    )
}

export default ModalWrapper(CreateBuyerForm, 'Create Buyer', SuccessIcon, {maxWidth: 650, height: '96vh', overflowY: 'auto'});