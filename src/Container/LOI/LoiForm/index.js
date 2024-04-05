import React, { useEffect, useState } from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { isAdminUser } from '../../../Services';
import { useNavigate, useParams } from 'react-router-dom';
import DoneDealFormField from '../../../CommonComponent/DoneDealFormField';
import { API_SUCCESS_CODE, RADIO_KEY } from '../../../constants';
import { FormControlLabel, FormGroup } from '@mui/material';
import CustomRadio from '../../../CommonComponent/CustomRadio';
import { acquihireModel, acquisitionModel, formSaleModel } from './loiDataModel';
import './style.scss'
import { useDispatch } from 'react-redux';
import { updateLOIData } from '../../../Redux/slice/LOISlice';
import { deepClone } from '../../../helper/commonHelper';
import { GenericButton } from '../../../CommonComponent/CustomButton';
import { updateSnackbar } from '../../../Redux/slice/CommonSlice';
import { trackEvent } from '../../../helper/posthogHelper';
import { SELLER_SAVE_TERMS_SUCCESS } from '../../../constants/posthogEvents';

function LoiForm({loiData={}, handleSaveLoi, loiCreated, handleLoiBack}) {
    const navigate = useNavigate();
    const useParamValue = useParams();
    const count = 1;
    const [dataModel,  setDataModel] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        prepareDateModel(loiData);
    }, [loiData])

    function prepareDateModel(newDataResponse) {
        let formSale = formSaleModel(newDataResponse), updatedDataModel = [];
        updatedDataModel.push(formSale);
        if(formSale?.value === 'acquisition') {
            updatedDataModel.push(...acquisitionModel(newDataResponse));
        }
        else if(formSale?.value === 'acquihire') {
            updatedDataModel.push(acquihireModel(newDataResponse));
        }
        else {
            updatedDataModel.push(...acquisitionModel(newDataResponse));
            updatedDataModel.push(acquihireModel(newDataResponse));
        }
        setDataModel(updatedDataModel);
    }

    function renderFieldLabel(index, label) {
        return (
            <div className='flex align-center'><span className='form-field-number'>{index}</span><span className='text-20 text-white font-500'>{label}</span></div>
        )
    }

    function handleChange(e, index, fieldName) {
        if(isAdminUser()) return;
        if(fieldName === 'formOfSale') {
            let dataResponse = {
                formOfSale: e.target.value
            }
            prepareDateModel(dataResponse)
        }
        else {
            let newFieldModel = deepClone(dataModel);
            if(newFieldModel[index]) {
                newFieldModel[index].value = e.target.value;
            }
            setDataModel(newFieldModel);
        }
    }


    function handleSaveData() {
        if(isAdminUser()) return;
        let formData = prepareBody()
        let dataToSend = {
            postBody: formData,
            newForm: !loiCreated,
            callback: handleCalback
        }
        dispatch(updateLOIData(dataToSend))
    }

    function handleCalback(res) {
        if(res?.status === API_SUCCESS_CODE) {
            handleSaveLoi();
            trackEvent(SELLER_SAVE_TERMS_SUCCESS);
        }
        else {
            dispatch(updateSnackbar({
                message: res?.data?.message || 'Please try again later !!',
                isOpen: true,
            }));
        }
    }

    function prepareBody() {
        let data = {}, newDataModel = deepClone(dataModel);
        if(newDataModel?.length) {
            newDataModel.forEach((dataModelList) => {
                if(dataModelList?.type === RADIO_KEY) {
                    data[dataModelList.keyName] = dataModelList?.value || null;
                }
                else {
                    if(Object.keys(dataModelList?.options)?.length) {
                        Object.keys(dataModelList?.options).forEach((keyName) => {
                            let fieldData = dataModelList?.options[keyName];
                            data[fieldData.keyName] = fieldData?.value;
                        })
                    }
                }
            })
        }
        return data;
    }

    function handleFieldChange(value, parentIndex, keyname) {
        if(isAdminUser()) return;
        let newDataModel = deepClone(dataModel);
        if(newDataModel[parentIndex].options) {
            newDataModel[parentIndex].options[keyname].value = value; 
        }
        setDataModel(newDataModel);
    }


    return (
        <div className='loi-edit-form margin-b48'>
            <div className='flex text-B5B5B5 col-gap-10 margin-b48'>
                <div className='flex col-gap-8 cursor-pointer align-center' onClick={handleLoiBack}>
                    <ArrowBackRoundedIcon fontSize='18' />
                    <div className='text-14 font-500'>Back to Dashboard</div>
                </div>
            </div>
            <div className='primary-theme border border-353535 padding-48 rounded-8'>
                <div>
                    <div className='text-30 text-white'>Set your Expected Terms</div>
                    <div className='text-16 text-6B6B6B margin-t8'>Use the below tool to share your ask with potential investors, detailing these will help us match you with relevant parties and help you reduce your negotiation timelines</div>
                </div>
                {
                    dataModel?.length > 0 && 
                    dataModel.map((modelField, index) => {
                        return (
                            <div className={'flex row-gap-16 flex-direction-coloum margin-t48 ' + (index !== dataModel?.length - 1 ? ' border-b border-353535 padding-b48 ' : '')} key={modelField?.label + index}>
                                {renderFieldLabel(count + index, modelField?.label)}
                                <div className='text-16 text-6B6B6B'>{modelField?.supportiveText}</div>
                                {
                                    modelField?.type === RADIO_KEY &&
                                    <div className='flex col-gap-16'>
                                        {
                                            modelField?.options?.length > 0 &&
                                            modelField.options.map((listItem, k) => (
                                                // <FormControl sx={{ mx: '10px' }} component="fieldset" variant="standard" fullWidth={true}>
                                                    <FormGroup className='flex-1' key={k}>
                                                        <FormControlLabel key={k} sx={{marginLeft: 0, marginRight: 0}} className='bg-black rounded-10 padding-x15 padding-y5' control={<CustomRadio checked={modelField?.value === listItem.key} sx={{ color: '#fff', '&.Mui-checked': { color: '#3247FF' } }} onChange={(e) => handleChange(e, index, modelField?.keyName)} value={listItem.key} />} label={listItem.displayText} labelPlacement="end" />
                                                    </FormGroup>
                                                // </FormControl>
                                            ))
                                        }
                                    </div>
                                }
                                {
                                    modelField?.type === 'multi_text_field' &&
                                    <div className='flex row-gap-16 flex-direction-coloum'>
                                        {
                                           Object.keys(modelField?.options)?.length > 0 &&
                                           Object.keys(modelField.options).map((fieldKey, k) => {
                                                let fieldData = modelField.options[fieldKey];
                                                return (
                                                    <div className='flex col-gap-16 align-center' key={fieldData?.label + k}>
                                                        <div className='w-250px text-20 text-white'>{fieldData.label}</div>
                                                        <div className='flex-1'>
                                                            <DoneDealFormField
                                                                className="rounded-8"
                                                                fullWidth={true}
                                                                fieldsetBgColor="#121212"
                                                                size = 'small'
                                                                placeholder={fieldData?.placeholder}
                                                                answer={fieldData.value}
                                                                isEditable={isAdminUser() ? false : true}

                                                                updateAnswer={(value) => handleFieldChange(value, index, fieldKey)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })

                                        }
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className='margin-t48'>
                    <GenericButton className={"" + (isAdminUser() ? 'disabled-button' : '')} fullWidth={true} variant="contained" sx={{color: '#282828', background: '#D0D6FF', "&:hover": {background: '#D0D6FF'}}} onClick={handleSaveData}>Save Expected Terms</GenericButton>
                </div>
            </div>
        </div>
    )
}

export default LoiForm;