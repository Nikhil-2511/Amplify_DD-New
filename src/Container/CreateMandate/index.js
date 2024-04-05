import React, { useState } from 'react';
import ModalWrapper from '../../ModalWrapper';
import { Button, FormControlLabel, Switch } from '@mui/material';
import { deepClone, getFieldLabelData } from '../../helper/commonHelper';
import { Stack } from '@mui/system';
import CustomCheckboxIcon from '../../CommonComponent/CustomCheckboxIcon';
import CustomSelect from '../../CommonComponent/CustomSelect';
import { API_SUCCESS_CODE, POST, RANGE_MULTIPLICATION } from '../../constants';
import { useDispatch } from 'react-redux';
import { reloadPage, updateFormToServer } from '../../Redux/slice/CommonSlice';
import { CrossIcon } from '../../assets/icons';
import { SubsectorMapping } from '../../CommonModels/CommonCollection';
import CustomRangeSlider from '../../CommonComponent/CustomRangeSlider';
import { ENDPOINT } from '../../config/endpoint';
import MandateCircularIcon from '../../assets/images/mandateCircularIcon.svg';
import NewTextField from '../../CommonComponent/NewTextField';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { isAdminUser, isBuyerUser } from '../../Services';
import { fetchBuyerMandates } from '../../Redux/slice/MandateSlice';
import { trackEvent } from '../../helper/posthogHelper';
import { BUYER_MANDATE_CREATED } from '../../constants/posthogEvents';

function CreateMandate({model, onClose, onSuccess, defaultData={},source}) {
    const [mandateModel, setMandateModel] = useState(model);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [isActive, setIsActive] = useState(false);

    function handleFieldUpdate(value, key) {
        let newMandateModel = deepClone(mandateModel);
        newMandateModel[key].value = value;
        if(newMandateModel[key].error) newMandateModel[key].error = false;
        setMandateModel(newMandateModel);
    }

    function handleClick() {
        let {error, data} = prepareData();
        if(error) return;
        data = {
            ...data,
            ...defaultData
        }
        let dataToSend = {
            postBody: data,
            method: POST,
            url: ENDPOINT.MANDATES.createMandate(),
            callback: handleCallback
        };

        dispatch(updateFormToServer(dataToSend));
    }

    function handleCallback(res) {
        if(res?.status === API_SUCCESS_CODE) {
            trackEvent(BUYER_MANDATE_CREATED,{
                source : source
            })
            onSuccess('success');
            dispatch(reloadPage(true));
        }
        else {

        }
    }

    function prepareData() {
        let data = {}, error = false, newMandateData = deepClone(mandateModel);
        Object.keys(newMandateData).forEach(keyName => {
            let fieldData = newMandateData[keyName];
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
                    preferenceData.push({sector: preferenceField?.sector?.value, subsector:  preferenceField?.subsector?.value});
                })
                if(error) newMandateData.preferences = modifyData;
                if(!error) data[keyName] = 
                data[keyName] = preferenceData;
            }
            else if(keyName === 'targets') {
                data[keyName] = fieldData.value?.join(',') || '';
            }
            else if(keyName === 'revenueMin'){
                data[keyName] = fieldData.value;
            }
            else if(keyName === 'revenueMax'){
                data[keyName] = fieldData.value;
            }
            else if(keyName === 'status') {
                data[keyName] = fieldData.value;
            }
            else {
                if(fieldData.required && !fieldData.value) {
                    error = true;
                    newMandateData[keyName].error = true;
                }
                else {
                    data[keyName] = fieldData.value || null;
                }
            }
        });
        if(error) setMandateModel(newMandateData);
        return {error, data};
    }

    function handleChipInput (event) {
        setInputValue(event.target.value);
      }
    
      function handleChipKeyUp(event, key) {
        if(event.key === 'Enter') {
          let data = deepClone(mandateModel), newCompanies = data?.targets?.value || [];
            newCompanies.push(event.target.value);
            data.targets.value = newCompanies;
          setMandateModel(data);
          setInputValue('');
        }
      }

      function hadleChipDelete(key, index) {
        let data = deepClone(mandateModel);
        if(data?.targets?.value?.length) {
            data.targets?.value.splice(index, 1);
            setMandateModel(data);
        }
      }

      function handlePreference(value, key, index) {
        let newMandateData = deepClone(mandateModel);
        if(newMandateData.preferences[index])
        newMandateData.preferences[index][key].value = value;
        if(newMandateData.preferences[index][key].error) newMandateData.preferences[index][key].error = false;
        if(key === 'sector')  newMandateData.preferences[index]['subsector'].value = ''; 
        setMandateModel(newMandateData);
      }

      function hanleRangeFiltere(value) {
        if(value && Array.isArray(value) && value?.length) {
            let newMandateData = deepClone(mandateModel);
            newMandateData['revenueMin'].value = value[0];
            newMandateData['revenueMax'].value = value[1];
            setMandateModel(newMandateData);
        }
      }

      const handleChange = () => {
        setIsActive(!isActive);
        handleFieldUpdate(!isActive, 'status')
      };
    
    return (
        <div className='create-mandate-screen'>
            <div className='text-667085 text-14 margin-b30'>Specify a buyer’s detailed acquisition preferences</div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b6'>Mandate Name <span className='text-danger'>*</span></div>
                <NewTextField
                    className="rounded-8 "
                    onChange={(e) => handleFieldUpdate(e.target.value, 'name')}
                    size="small"
                    fullWidth
                    autoComplete='off'
                    inputProps={{ maxLength: 30 }}
                    placeholder={getFieldLabelData(mandateModel, 'name', 'placeholder')}
                    value={getFieldLabelData(mandateModel, 'name', 'value')} 
                    error={!!getFieldLabelData(mandateModel, 'name', 'error')}
                    helperText={getFieldLabelData(mandateModel, 'name', 'error') ? getFieldLabelData(mandateModel, 'name', 'helperText') : ''}
                />
            </div>
            { isAdminUser() && 
                <div>
                    <div className='text-16 text-344054 font-500 margin-b10'>Mandate Status</div>
                    <div className='text-12 text-475467 margin-b10'>Active mandates mean buyers actively seeking deals; passive mandates indicate buyers open to opportunities.</div>
                    <div
                    className='flex align-center margin-b10'>
                        <div>Passive</div>
                        <FormControlLabel
                            value="toggle"
                            control={
                            <Switch
                                color="primary"
                                checked={isActive}
                                onChange={handleChange}
                            />
                            }
                            labelPlacement="start"
                            label=""
                            style={{ marginRight: "16px" }}
                        />
                        <div>Active</div>
                    </div>
                </div>
            }
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b10'>Target sectors <span className='text-danger'>*</span></div>
                <div className='text-12 text-475467 margin-b10'>Each mandate covers one sector and sub-sector. For multiple sectors, create separate mandates.</div>
                {
                    mandateModel?.preferences?.length > 0 &&
                    <div>
                        {
                            mandateModel.preferences.map((preferenceItem, index) => {
                                return (
                                    <div className='flex col-gap-15' key={"preferenceItem" + index}>
                                        <CustomSelect
                                            rootClass="flex-1"                                 
                                            className="rounded-8"
                                            fullWidth
                                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                                            options={preferenceItem?.sector?.options} 
                                            handleSelect={(valueObj) => handlePreference(valueObj.key, 'sector', index)}
                                            label={getFieldLabelData(preferenceItem, 'sector', 'value') || getFieldLabelData(preferenceItem, 'sector', 'placeholder')} 
                                            error={getFieldLabelData(preferenceItem, 'sector', 'error')}
                                            errorMessage={getFieldLabelData(preferenceItem, 'sector', 'error') ? getFieldLabelData(preferenceItem, 'sector', 'helperText') : ''}
                                        />
                                        <CustomSelect
                                            className="rounded-8"
                                            rootClass="flex-1"
                                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                                            options={SubsectorMapping[preferenceItem?.sector?.value]} 
                                            handleSelect={(valueObj) => handlePreference(valueObj.key, 'subsector', index)}
                                            label={getFieldLabelData(preferenceItem, 'subsector', 'value') || getFieldLabelData(preferenceItem, 'subsector', 'placeholder')} 
                                            error={getFieldLabelData(preferenceItem, 'subsector', 'error')}
                                            errorMessage={getFieldLabelData(preferenceItem, 'subsector', 'error') ? getFieldLabelData(preferenceItem, 'subsector', 'helperText') : ''}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b10'>Mandate guardrails</div>
                <div className='text-12 text-475467 margin-b10'>Specify the guidelines or conditions that define the scope and limitations of your mandate.</div>
                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>Revenue Range</div>
                    <div className='flex-1'>
                    <CustomRangeSlider
                        rangeSliderValue={[mandateModel?.revenueMin?.value, mandateModel?.revenueMax?.value]} 
                        min={0} max={50} 
                        onChange={hanleRangeFiltere} 
                        step={0.5} 
                        disableSwap 
                        valueLabelFormat={value => <div className=''>{`${value} CR`}</div>}
                        valueLabelDisplay="on"
                    />
                    </div>
                </div>
                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>EBITDA Status</div>
                    <div className=' flex cursor-pointer justify-start w-1/2' onClick={() => handleFieldUpdate(!mandateModel?.ebidta?.value, 'ebidta')}>
                        <CustomCheckboxIcon className = 'cursor-pointer' isActive={mandateModel?.ebidta?.value} />
                        <span className='text-344054 text-16 font-500'>EBITDA Positive only</span>
                    </div>
                </div>
                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>Age of Company</div>
                    <CustomSelect
                        rootClass={'flex-1'}
                        className="rounded-8"
                        parentClass={'bg-white text-101828 border border-D0D5DD'}
                        options={mandateModel?.operation?.options} 
                        handleSelect={(valueObj) => handleFieldUpdate(valueObj.key, 'operation')}
                        label={getFieldLabelData(mandateModel, 'operation', 'value') || getFieldLabelData(mandateModel, 'operation', 'placeholder')} 
                        error={getFieldLabelData(mandateModel, 'operation', 'error')}
                        errorMessage={getFieldLabelData(mandateModel, 'operation', 'error') ? getFieldLabelData(mandateModel, 'operation', 'helperText') : ''}
                    />
                </div>
                <div className='padding-y8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500'>Operational Status</div>
                    <div className=' flex justify-start cursor-pointer w-1/2' onClick={() => handleFieldUpdate(!mandateModel?.operational?.value, 'operational')}>
                        <CustomCheckboxIcon className='cursor-pointer' isActive={mandateModel?.operational?.value} />
                        <span className='text-344054 text-16 font-500'>Operational companies only</span>
                    </div>
                </div>
                <div className='padding-t8 flex col-gap-10 justify-space-between align-center'>
                    <div className='text-14 text-344054 font-500 flex-1'>Any other criteria</div>
                    <div className='flex-1'>
                        <NewTextField
                            className="rounded-8 flex-1"
                            onChange={(e) => handleFieldUpdate(e.target.value, 'others')}
                            size="small"
                            fullWidth
                            autoComplete='off'
                            multiline
                            minRows={3}
                            maxRows={3}
                            inputProps={{ maxLength: 240 }}
                            placeholder={getFieldLabelData(mandateModel, 'others', 'placeholder')}
                            value={getFieldLabelData(mandateModel, 'others', 'value')} 
                            error={!!getFieldLabelData(mandateModel, 'others', 'error')}
                            helperText={getFieldLabelData(mandateModel, 'others', 'error') ? getFieldLabelData(mandateModel, 'others', 'helperText') : ''}
                        />
                    </div>
                </div>
            </div>
            {/* Will pick this later */}
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b6'>Buyer’s preferred deal structure</div>
                <NewTextField
                    className="rounded-8 "
                    onChange={(e) => handleFieldUpdate(e.target.value, 'dealConstruct')}
                    size="small"
                    fullWidth
                    autoComplete='off'
                    placeholder={getFieldLabelData(mandateModel, 'dealConstruct', 'placeholder')}
                    value={getFieldLabelData(mandateModel, 'dealConstruct', 'value')} 
                    error={!!getFieldLabelData(mandateModel, 'dealConstruct', 'error')}
                    helperText={getFieldLabelData(mandateModel, 'dealConstruct', 'error') ? getFieldLabelData(mandateModel, 'dealConstruct', 'helperText') : ''}
                />
            </div>
            <div className='margin-b30'>
                <div className='text-16 text-344054 font-500 margin-b6'>Companies Suggested by Buyer</div>
                <div className='text-12 text-475467 margin-b10'>Mention any company both within and outside the platform</div>
                <NewTextField 
                //   fieldsetBgColor="transparent"                  
                    onChange= {handleChipInput}
                    onKeyUp = {event => {
                        handleChipKeyUp(event, 'targets')
                    }}
                    placeholder={getFieldLabelData(mandateModel, 'targets', 'placeholder')}
                  value={inputValue}
                  fullWidth
                  size="small"
                />
                <div className='flex col-gap-15 margin-t10 flex-wrap'>
                    {
                        mandateModel?.targets?.value?.length > 0 &&
                        mandateModel.targets?.value?.map((companiesList, index) => {
                            return <div className='flex align-center text-344054 bg-F2F4F7 padding-y2 padding-x8 rounded-16' key={companiesList + index}>
                                <span>{companiesList}</span>
                                <CrossIcon sx={{fontSize: '14px', marginTop: '1px', marginLeft: '4px', cursor: 'pointer'}} onClick={() => hadleChipDelete('targets', index)} />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='modal-action-container flex col-gap-10 justify-end'>
                <Button className='capitalize' fullWidth sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={onClose}>
                    Cancel
                </Button>
                <NewButton className='capitalize' fullWidth sx={{fontWeight: 500}} color="secondary" variant="contained" onClick={handleClick}>
                    Create Mandate
                </NewButton>
            </div>
        </div>
    )
}

export default ModalWrapper(CreateMandate, 'Create Mandate', MandateCircularIcon, {maxWidth: 620, height: '96vh', overflowY: 'auto'});