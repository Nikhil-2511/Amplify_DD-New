import { Button } from '@mui/material';
import React, { useState } from 'react';
import { API_SUCCESS_CODE, DROPDOWN, POST } from '../../constants';
import CustomSelect from '../../CommonComponent/CustomSelect';
import { useDispatch } from 'react-redux';
import { updateFormToServer } from '../../Redux/slice/CommonSlice';
import { deepClone, getFieldLabelData, getFieldValue } from '../../helper/commonHelper';
import CuecardChipInfo from '../CuecardChipInfo';
import NewTextField from '../../CommonComponent/NewTextField';
import { NewButton } from '../../CommonComponent/NewCustomButton';

function EditCuecard({cueCardData, editCueCardModel={}, onCancel, onSuccess, url, method, confirmLabel, cancelLabel}) {
    const [formData, setFormData] = useState(cueCardData);
    const [modelData, setModelData] = useState(editCueCardModel);
    const dispatch = useDispatch();

    function renderFormField(modelFieldObj, key) {
        switch(modelFieldObj.fieldType) {
            case DROPDOWN: 
                return renderDropdown(modelFieldObj, key);
            default:
                return renderTextArea(modelFieldObj, key);
        }
    }

    function handleFieldUpdate(value, key) {
        let newFormData = deepClone(formData);
        newFormData[key] = value;
        setFormData(newFormData);
    }

    function renderDropdown(formField, key) {
        return (
            <CustomSelect
                className="rounded-8"
                parentClass={'bg-white text-101828 border border-D0D5DD'}
                options={formField.optionData} 
                handleSelect={(valueObj) => handleFieldUpdate(valueObj.key, key)}
                label={getFieldValue(formData, key) || getFieldValue(formField, 'placeholder')} 
                error={getFieldLabelData(formField, key, 'error')}
                // errorMessage={getFieldLabelData(formData, 'error') ? getFieldValue(formData, 'helperText') : ''}
            />
        )
    }

    function renderTextArea(formField, key) {
        return (
            <NewTextField
                className="rounded-8 "
                onChange={(e) => handleFieldUpdate(e.target.value, key)}
                size="small"
                fullWidth
                autoComplete='off'
                multiline={true}
                minRows={getFieldValue(formField, 'minRow') || 3}
                maxRows={getFieldValue(formField, 'maxRow') || 5}
                inputProps={{ maxLength: getFieldValue(formField, 'maxLength') || 60 }}
                placeholder={getFieldValue(formField, 'placeholder')}
                value={getFieldValue(formData, key)} 
                error={!!getFieldValue(formField, 'error')}
                // helperText={getFieldValue(formField, 'error') ? getFieldValue(formData, 'helperText') : ''}
            />
        )
    }

    function handleSubmit() {
        let {error, data} = prepareBodyObj();
        if(error) return;
        let dataToSend= {
            url,
            postBody: {companyId: formData.companyId, ...data,},
            method: method || POST,
            callback: handleCallback
        }

        dispatch(updateFormToServer(dataToSend));
    }

    function handleCallback(res) {
        if(res.status === API_SUCCESS_CODE) {
            if(onSuccess) onSuccess(res);
        }
    } 

    function prepareBodyObj() {
        let data = {}, error = false, modifiedModelField = deepClone(modelData);
        Object.keys(modifiedModelField).forEach((cueCardKey) => {
            let fieldData = modifiedModelField[cueCardKey];
            if(fieldData.required && !formData[cueCardKey]) {
                error = true;
                modifiedModelField[cueCardKey].error = true;
            }
            else {
                modifiedModelField[cueCardKey].error = false;
            }
            if(!error) {
                data[cueCardKey] = formData[cueCardKey];
            }
        })
        setModelData(modifiedModelField);
        return {data, error};
    }

    return (
        <div className='edit-cuecard-container'>
            <CuecardChipInfo chipData={cueCardData} />
            <div className='border-b border-D0D5DD'></div>
            {
                modelData && Object.keys(modelData)?.length > 0 &&
                Object.keys(modelData).map((modelFieldKey, index) => {
                    let modelFieldObj = modelData[modelFieldKey];
                    return <div className='flex justify-space-between col-gap-50 padding-y25 border-b border-F2F4F7 align-center' key={modelFieldKey + index}>
                        <div className='flex-1'>
                            <div className='text-344054 text-14'>{modelFieldObj.label}</div>
                            {!!modelFieldObj?.supportiveText && <div className='text-667085 text-14 margin-t5'>{modelFieldObj?.supportiveText}</div>}
                        </div>
                        <div className='flex-1'>
                            {renderFormField(modelFieldObj, modelFieldKey)}
                        </div>

                    </div>
                })
            }
            <div className='modal-action-container flex col-gap-10 justify-end padding-t20'>
                <Button className='capitalize' sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={() => onCancel()}>
                    {cancelLabel || 'Cancel'}
                </Button>
                <NewButton className='capitalize' color="secondary" sx={{fontWeight: 500}} variant="contained" onClick={() => handleSubmit()}>
                    {confirmLabel || 'Save & Close'}
                </NewButton>
            </div>
        </div>
    )
}

export default EditCuecard;