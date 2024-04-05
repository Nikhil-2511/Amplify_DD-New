import React, { useEffect, useRef, useState } from 'react';
import { renderDependentSteps, sellerOnboardingStep1, sellerStepTitle, subsectorsObj } from './SellerOnboardingSchemas';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { BackArrow, RightArrow } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { deepClone, filterCurrencyValue, getCompanyProfile, getFieldLabelData, globalMessage, isAlphabetOnly, isMobileView } from '../../helper/commonHelper';
import InputFieldWrapper from '../../HOC/InputFieldsHOC';
import { API_SUCCESS_CODE, COMPANY_NOT_FOUND, IS_VALID_COMPANY, SINGLEDROPDOWN } from '../../constants';
import './style.scss'
import { useDispatch } from 'react-redux';
import { createNewCompany } from '../../Redux/slice/SellerSlice';
import { DoneDealWhiteLogo, newCheckedIcon, newUnCheckedIcon } from '../../assets/icons/svgIcons';
import companyDetailsImage from '../../assets/images/companyDetails.png'

import { fetchContactInfo, updateDashboardData } from '../../Redux/slice/ValuationSlice';
import { setLocalStorage } from '../../utils';
import { hideHeader } from '../../Redux/slice/CommonSlice';
import { trackEvent } from '../../helper/posthogHelper';
import { SELLER_CLICKED_SUBMIT_ONBOARDING, SELLER_LANDED_SIGNUP_ONBOARDING, SELLER_LANDED_STEP1_ONBOARDING, SELLER_LANDED_STEP2_ONBOARDING, SELLER_LANDED_STEP3_ONBOARDING } from '../../constants/posthogEvents';
import { FormControlLabel } from '@mui/material';
import CustomCheckbox from '../../CommonComponent/CustomCheckbox';
import { SIGNUP_MANDATE_ID_KEY } from '../../constants/keyVariableConstants';
import { getSessionStorage, removeLocalStorage } from '../../utils/localStorage';

function SellerOnboarding() {
    const [currentStep, setCurrentStep] = useState(1);
    const [currentOnboardingModel, setCurrentOnboardingModel] = useState(sellerOnboardingStep1);
    const [companyData, setCompanyData] = useState({});
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
       getCompanyProfile((res) => handleActionCB(res, true));
       dispatch(hideHeader(true));
       trackEvent(SELLER_LANDED_SIGNUP_ONBOARDING);
    }, [])

    useEffect(() => {
        if(currentStep === 1){
            trackEvent(SELLER_LANDED_STEP1_ONBOARDING);
        }
        if(currentStep === 2){
            trackEvent(SELLER_LANDED_STEP2_ONBOARDING);
        }
        if(currentStep === 3){
            trackEvent(SELLER_LANDED_STEP3_ONBOARDING);
        }
        updateCurrentModel();
        containerRef?.current && containerRef.current.scrollIntoView({behavior: 'smooth'});
    }, [currentStep]);

    function updateCurrentModel() {
        if (currentStep === 1) {
            setCurrentOnboardingModel(sellerOnboardingStep1);
        } else {
            setCurrentOnboardingModel(renderDependentSteps(companyData?.category, currentStep));
        }
    }

    function getContactInfo() {
        let dataToSend = {
          callback: handleContactInfoCB,
          type: 'seller'
        }
        dispatch(fetchContactInfo(dataToSend));
      }

      function handleContactInfoCB(response){
        let presentModel = deepClone(currentOnboardingModel);
        let fields = presentModel?.fields;
        if(!fields?.['firstName']?.value || !fields?.['lastName']?.value){
            fields['firstName'].value = response?.data?.firstName;
            fields['lastName'].value = response?.data?.lastName;
        }
        presentModel.fields = fields;
        setCurrentOnboardingModel(presentModel)
      }

      function handleOnChange(value, key, item = '') {
        let onboardingData = deepClone(currentOnboardingModel);
        if(key === 'revenueGenerating' && currentStep === 2){
            let allFields = onboardingData?.fields
            if(value === 'no'){
            Object.keys(allFields)?.forEach((fieldKey) => {
                let field = allFields?.[fieldKey];
                if (fieldKey !== 'revenueGenerating') {
                    allFields[fieldKey].value = '';
                    allFields[fieldKey].showField = false;
                }
            });
            }else{
                Object.keys(allFields)?.forEach((fieldKey) => {
                     if(fieldKey !== 'ttmEbitda') allFields[fieldKey].showField = true;
                });
            }
        }
        if(key === 'ebitda' && value) onboardingData.fields['ttmEbitda'].showField = true;
        if (key === 'sector') {
            let subsectors = subsectorsObj?.[value]?.subsectors
            if (!!subsectors?.length) {
                onboardingData.fields['subsector'].options = subsectors;
                onboardingData.fields['subsector'].showField = true;
            } else {
                onboardingData.fields['subsector'].showField = false;
            }
        }
        if (key === 'subsector' && onboardingData?.fields?.sector?.value === 'Others') {
            onboardingData.fields[key].key = 'othersSubCategory';
        }
        if (key === "firstName" || key === "lastName") {
            if (value !== 0 && value !== "") {
                if (!isAlphabetOnly(value)) {
                    return;
                }
            }
        }
        onboardingData.fields[key].value = value;
        if (onboardingData.fields?.[key].error) {
            onboardingData.fields[key].error = false;
        }
        setCurrentOnboardingModel(onboardingData);
    }

    function handleContinue() {
        if (!validateData()) {
            let payload = createPayload(currentOnboardingModel?.fields)
            payload.onboardingStage = currentStep;
            let dataToSend = {
                callback: (res) => handleActionCB(res)
            }
            if (currentStep === 1 && !companyData?.category) {
                dataToSend.postBody = payload;
                let signupMandateId = getSessionStorage(SIGNUP_MANDATE_ID_KEY);
                if(signupMandateId) payload.signupMandateId = signupMandateId;
                dispatch(createNewCompany(dataToSend));
            } else {
                payload.companyId = companyData?.companyId
                dataToSend.postBody = payload
                dispatch(updateDashboardData(dataToSend));
            }
            trackEvent(SELLER_CLICKED_SUBMIT_ONBOARDING);
        }
    }

    function handleBackAction() {
        getCompanyProfile((res) => handleActionCB(res, true, 'backward'));
        setCurrentStep(currentStep - 1);
    }

    function handleActionCB(response, refresh = false, actionType = 'forward') {
        if (response?.status === API_SUCCESS_CODE) {
            setCompanyData(response?.data)
            if(actionType === 'forward' && currentStep < 3){
                response?.data?.onboardingStage && setCurrentStep(response?.data?.onboardingStage + 1);
                !response?.data?.onboardingStage && setCurrentStep(1);
            }
            if (actionType === 'backward') {
                autofillFields(response?.data, currentStep - 1);
                setCurrentStep(currentStep - 1);
            }
            if (response?.data?.onboardingStage === 3) {
                dispatch(hideHeader(false));
                setLocalStorage(IS_VALID_COMPANY, true);
                navigateTo('/dashboard');
            }
            let signupMandateId = getSessionStorage(SIGNUP_MANDATE_ID_KEY);
            if(signupMandateId) removeLocalStorage(SIGNUP_MANDATE_ID_KEY);

        } else {
            if(response?.data?.code === COMPANY_NOT_FOUND){
                getContactInfo();
                return;
            }
            !refresh && globalMessage(response?.data?.message);
        }
    }

    function autofillFields(data, step) {
        let currentDisplayedModel = {};
        if (step === 1) {
            currentDisplayedModel = deepClone(sellerOnboardingStep1);
            if (!!data?.subCategory) {
                let subsectors = subsectorsObj?.[data?.category]?.subsectors;
                currentDisplayedModel.fields['subsector'] = { options: subsectors, showField: true, value: data?.subCategory };
            }
        } else if (step === 2) {
            currentDisplayedModel = renderDependentSteps(data?.category, step);
            let currentFields = currentDisplayedModel?.fields;
            if (data?.revenueGenerating === "yes") {
                currentFields.revenueGenerating.isEditable = false;
                Object.keys(currentFields).forEach(key => currentFields[key].showField = true);
            } else if (data?.revenueGenerating === "no") {
                Object.keys(currentFields).forEach(key => key !== 'revenueGenerating' && (currentFields[key].showField = false));
            }
            currentFields.ttmEbitda.showField = true;
        } else {
            currentDisplayedModel = renderDependentSteps(data?.category, step);
        }
        let currentFields = currentDisplayedModel?.fields;
        for (let key in currentFields) {
            let actualKey = currentFields?.[key]?.key;
            currentFields[key].value = data?.[actualKey];
        }
        currentDisplayedModel.fields = currentFields;
        setCurrentOnboardingModel(currentDisplayedModel);
    }
    

    function createPayload(fieldsObj) {
        let payload = Object.values(fieldsObj)?.reduce((acc, curr) => {
            let value = curr.value;
            if(curr?.field_type === 'currency') value = filterCurrencyValue(value);
            acc[curr.key] = value;
            return acc;
        }, {});
        return payload;
    }

    function validateData() {
        let error = false,
            newFieldModel = deepClone(currentOnboardingModel);
        let allFields = newFieldModel?.fields;
        Object.keys(allFields)?.forEach((fieldKey) => {
            let field = allFields?.[fieldKey];
            if (field?.required && !field?.value && !!field?.showField && field?.value !== false) {
                error = true;
                allFields[fieldKey].error = true;
            }
        });
        newFieldModel.fields = allFields;
        setCurrentOnboardingModel(newFieldModel);
        return error;
    }

    function isFieldDropdown(field) {
        if (field === 'sector' || field === 'subsector' || field === 'objective') {
            return true;
        } else {
            return false;
        }
    }

    function fieldsToShow(currentModel, step){
    let fields = currentModel?.fields;
     if(step === 2 && (fields?.revenueGenerating?.value === 'no' || !fields?.revenueGenerating?.value)){
         return {revenueGenerating : fields?.revenueGenerating}
     }else
     {
        return fields;
     }
    }

    function renderCheckboxLabel(fields, dependentKey) {
        if(fields && fields[dependentKey]?.value) {
            return fields[dependentKey]?.value === 'acquisition' ? 'Are you open to funding as well ?' : 'Are you open to inbound interest from strategic acquirers ?'
        }
        return false
    }


    function renderFields(fields) {
        return (
            <React.Fragment>
                {
                    fields && Object.keys(fields)?.map((field, idx) => {
                        return isFieldDropdown(field) ? (!!getFieldLabelData(fields, field, 'showField') && (
                            <React.Fragment key={idx}>
                                <InputFieldWrapper
                                    required={getFieldLabelData(fields, field, 'required')}
                                    fieldLabel={getFieldLabelData(fields, field, 'label')}
                                    type={getFieldLabelData(fields, field, 'field_type')}
                                    error={getFieldLabelData(fields, field, 'error') ? getFieldLabelData(fields, field, 'helperText') : ''}
                                    placeholder={getFieldLabelData(fields, field, 'placeholder')}
                                    labelStyle='text-20'
                                    options={getFieldLabelData(fields, field, 'options')}
                                    isEditable={true}
                                    onChange={(ans, item) => handleOnChange(ans, field, item)}
                                    selectedValue={getFieldLabelData(fields, field, 'value')}
                                />
                            </React.Fragment>
                        )) : (!!getFieldLabelData(fields, field, 'showField') &&
                            <React.Fragment key={idx}>
                                {
                                    field === 'openToOtherObjective' ?
                                    <React.Fragment>
                                        {
                                            !!renderCheckboxLabel(fields, fields[field]?.dependentOn) &&
                                            <div>
                                                <FormControlLabel className='text-12' 
                                                    sx={{marginLeft: '5px', '& .MuiTypography-root': {paddingLeft: '5px', fontSize: '14px'}}} 
                                                    control={<CustomCheckbox 
                                                                // sx={{padding: 0, '& .MuiSvgIcon-root': { padding: 0 } }} 
                                                                checked={getFieldLabelData(fields, field, 'value')} 
                                                                onChange={(e) => {handleOnChange(!getFieldLabelData(fields, field, 'value'), field)}} 
                                                                uncheckedIcon={newUnCheckedIcon}
                                                                checkedIcon={newCheckedIcon}
                                                            />} 
                                                    label={renderCheckboxLabel(fields, fields[field]?.dependentOn)} labelPlacement="end"
                                                />
                                            </div>
                                        }
                                    </React.Fragment>
                                    :
                                    <InputFieldWrapper
                                        required={getFieldLabelData(fields, field, 'required')}
                                        fieldLabel={getFieldLabelData(fields, field, 'label')}
                                        type={getFieldLabelData(fields, field, 'field_type')}
                                        error={getFieldLabelData(fields, field, 'error') ? getFieldLabelData(fields, field, 'helperText') : ''}
                                        placeholder={getFieldLabelData(fields, field, 'placeholder')}
                                        labelStyle='text-20'
                                        updateAnswer={(ans) => handleOnChange(ans, field)}
                                        isEditable={getFieldLabelData(fields, field, 'isEditable')}
                                        answer={getFieldLabelData(fields, field, 'value')}
                                        showCharCount = {true}
                                        multiline = {fields?.[field]?.field_type === 'number' ? false : true}
                                    />
                                }
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }

    function renderLeftSection() {
        return (
            <div className='h-[85vh] w-1/2 flex flex-col justify-between items-center mx-20 px-10'>
                <React.Fragment>
                    <div className='text-center flex flex-col items-center justify-center'>
                        <div className='margin-b10'>{DoneDealWhiteLogo}</div>
                        <div className='text-rem-2_5 font-600 margin-b20'>Welcome to Done Deal</div>
                        <div className='text-rem-1_375 font-500'>Helping founders scale faster through Strategic Acquisitions, Smart capital & Tactical partnerships</div>
                    </div>
                    <div className='onoarding-card-container'>
                        <img className='h-full' src={companyDetailsImage} alt="" />
                    </div>
                    <div className='text-center flex flex-col items-center justify-center'>
                        <div className='margin-b8 text-rem-1_25'>Introduce your company to potential investors and strategic acquirers with a completely anonymous overview showcasing key details and unique features of your company</div>
                    </div>
                </React.Fragment>
            </div>
        )
    }

    function renderRightSection() {
        return (
            <div className={`bg-[#1B1B1B] sm:min-w-[400px] rounded-lg h-[85vh] mr-0 ${isMobileView()?'w-full':'w-1/2'} sm:mr-20 flex flex-col py-3 justify-between seller-onboarding-background-gradient seller-onboarding-background-gradient-right`}>
                <div className='h-full overflow-y-scroll p-5 sm:p-10 custom-scrollbar flex flex-col justify-between'>
                    <div>
                        {
                            currentStep <= 3 &&
                            <div ref={containerRef} className='margin-rem-b1_5 '>
                                <div>{`Step ${currentStep} of 3`}</div>
                                <div className='font-bold'>{currentOnboardingModel?.label}</div>
                                <div className='step-progress-container mt-3'>
                                    {
                                        Object.keys(sellerStepTitle).map((stepNumber, index) => {
                                            return <div key={sellerStepTitle[stepNumber] + index} className={'step-progress ' + (currentStep >= parseInt(stepNumber) ? 'active-step-new bg-[#FFBC9E]' : '')}></div>

                                        })
                                    }
                                </div>
                            </div>
                        }
                        {renderFields(fieldsToShow(currentOnboardingModel, currentStep))}
                    </div>
                    <div className={`padding-rem-t3 padding-rem-b0_875`}>
                        {
                            currentStep !== 4 &&
                            <div className={`buyer-action-container flex ${currentStep == 3 ? 'justify-between' : 'justify-end'} col-gap-10`}>
                               {(currentStep > 2) && <div className={'' + (isMobileView() ? 'flex' : '')}>
                                <NewButton onClick={() => currentStep > 0 && handleBackAction()} className='!shadow-none !font-[600]' color="primary" sx={{ padding: '1.25rem 1.5rem', fontSize: '1rem', background: "#3247FF", "&:hover": { background: "#1570EF" } }} startIcon={<BackArrow />} variant="contained" ></NewButton>
                                </div> }
                                <NewButton onClick={() => handleContinue()} className={'capitalize !shadow-none !font-[600] ' + ((isMobileView() && currentStep !==3) ? '!w-full' : '')} color="primary" endIcon={currentStep !== 3 ? <RightArrow /> : null} variant="contained" sx={{ width: '17.5rem', justifyContent: `${currentStep !== 3 ? 'space-between' : ''}`, padding: '1.25rem 1.5rem', background: "#3247FF", "&:hover": { background: "#1570EF" } }} >{currentStep === 3 ? 'Submit' : 'Continue'}</NewButton>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="onboarding-container seller-onboarding-background-container flex items-center bg-cover bg-center bg-gradient-to-tr" >
            {!isMobileView() && renderLeftSection()}
            {renderRightSection()}
        </div>
    )
}
export default SellerOnboarding;