import React, { useCallback, useEffect, useState } from 'react';
import CustomSelect from '../../../../CommonComponent/CustomSelect';
import { AcquisitionSizeArr, AcquisitionTimeLineArr, CompanySectorArr, OperationArr, RevenueRangeArr, SubsectorMapping } from '../../../../CommonModels/CommonCollection';
import CongratulationIcon from '../../../../assets/images/congratulationImage.png';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import CustomCheckboxIcon from '../../../../CommonComponent/CustomCheckboxIcon';
import { getFieldLabelData, isMobileView, isObjectEmpty } from '../../../../helper/commonHelper';
import NewTextField from '../../../../CommonComponent/NewTextField';
import { NewButton } from '../../../../CommonComponent/NewCustomButton';
import CustomRadioGroup from '../../../../CommonComponent/CustomRadioGroup';
import Lottie from "lottie-react";
import OnboardingSuccessAnimation from './success_ onboarding.json';
import CustomRangeSlider from '../../../../CommonComponent/CustomRangeSlider';
import PencilIcon from '../../../../assets/images/pencilIcon.svg'
import { API_SUCCESS_CODE, BUYER_ID, CHAR_COUNT_VALUE } from '../../../../constants';
import MultiSelectFilter from '../../../../Component/FilterComponents/MultiSelectFilter';
import CustomMultiSelect from '../../../../CommonComponent/CustomMultiSelect';
import { isBuyerUser } from '../../../../Services';
import greyCancel from '../../../../assets/images/greyCancel.svg';
import greyRightTick from '../../../../assets/images/greyRightTick.svg';
import { useDispatch } from 'react-redux';
import { updateEditedEmailAction } from '../../../../Redux/slice/LoginSlice';
import { getLocalStorage } from '../../../../utils';
import { trackEvent } from '../../../../helper/posthogHelper';
import { BUYER_LANDED_ONBOARDING_AQUISITION_CRITERIA, BUYER_LANDED_ONBOARDING_AQUISITION_INTERESTS, BUYER_LANDED_ONBOARDING_PASSWORD_VERIFICATION, BUYER_LANDED_ONBOARDING_THANKS } from '../../../../constants/posthogEvents';
import { globalAlert } from '../../../../Redux/slice/CommonSlice';
import WarningCircularIcon from "../../../../assets/images/warningCircularIcon.svg";
import { getBuyerStatus } from '../../../../helper/actionHelper';

export function OnboardingStep1({formData, tncData, handleFieldUpdate, handleTncUpdate, otpValue, otpFlow, updateOtp, handleVerifyEmail, handleVerification, setOriginalEmail, originalEmail, primaryBuyerDetails}) {
    const[isEditEmailMode, setEditEmailMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
     if(otpFlow){
        trackEvent(BUYER_LANDED_ONBOARDING_PASSWORD_VERIFICATION,{
          buyer_type : formData?.type?.value
        });
     }
    },[otpFlow])

    function renderForm() {
        
        if(otpFlow) {
            return renderOtpFlow();
        }
        else {
            return renderformFields();
        }
    }

    function handleBlur() {
        handleVerifyEmail();
    }

   async function handleEmailEdit() {
     await handleVerifyEmail(emailEditCb);
    }

    function emailEditCb() {
    let dataToSend = {
        payload : {
            'profileId' : getLocalStorage(BUYER_ID),
            'newEmail' : formData?.email?.value
        },
        cb : (res) => {
            if(res?.status === API_SUCCESS_CODE) {
                if(!res?.data?.code) {
                    handleVerification();
                    setEditEmailMode(false);
                }
                else {
                    dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: res?.data?.message, title: 'Warning'}));
                }
            }
            else {
                dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: res?.data?.message, title: 'Warning'}));
            }
        }
    }
    dispatch(updateEditedEmailAction(dataToSend))
    }

    function handleCancelEmailEdit() {
      handleFieldUpdate(originalEmail, "email");
      setEditEmailMode(false);
    }

    function validateUser() {
        if(!isObjectEmpty(primaryBuyerDetails) && !primaryBuyerDetails?.primaryMember) return true;
        return false;
    }

    function renderformFields() {
        return (
            <div className='flex flex-direction-coloum row-gap-rem-3'>
                <div className='flex flex-direction-coloum row-gap-rem-1'>
                    <div className='onboarding-step-title'>Start Your Investment Journey</div>
                    <div className='onboarding-step-subtitle'>Let’s start your investment journey and help us in aligning with your objectives.</div>
                </div>
                <div className='flex flex-direction-coloum row-gap-rem-1_5'>
                <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Official Email ID<span className='error-text'>*</span></div>
                        <div className='flex col-gap-10 align-flex-start w-full'>
                            <NewTextField
                                className="rounded-8 "
                                onChange={(e) => {handleFieldUpdate(e.target.value, 'email'); setOriginalEmail(e.target.value)}}
                                // onChange={(e) => {handleFieldUpdate(e.target.value, 'email')}}
                                size="small"
                                fullWidth
                                autoComplete='off'
                                onBlur={handleBlur}
                                disabled={getFieldLabelData(formData, 'email', 'verified') ? true : false}
                                placeholder={getFieldLabelData(formData, 'email', 'placeholder')}
                                value={getFieldLabelData(formData, 'email', 'value')} 
                                error={!!getFieldLabelData(formData, 'email', 'error')}
                                helperText={getFieldLabelData(formData, 'email', 'error') ? getFieldLabelData(formData, 'email', 'helperText') : ''}
                            />
                        </div>
                        <div className='text-667085 text-rem-0_875'>A passcode will be sent to this email for verification.</div>
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Full Name<span className='error-text'>*</span></div>
                        <NewTextField
                            className="rounded-8 "
                            value={getFieldLabelData(formData, 'pocName', 'value')} 
                            onChange={(e) => handleFieldUpdate(e.target.value, 'pocName')}
                            size="small"
                            fullWidth
                            placeholder={getFieldLabelData(formData, 'pocName', 'placeholder')}
                            error={!!getFieldLabelData(formData, 'pocName', 'error')}
                            helperText={getFieldLabelData(formData, 'pocName', 'error') ? getFieldLabelData(formData, 'pocName', 'helperText') : ''}
                            autoComplete='off'
                        />
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Your Company's Name<span className='error-text'>*</span></div>
                        <NewTextField
                            className="rounded-8 "
                            onChange={(e) => handleFieldUpdate(e.target.value, 'companyName')}
                            size="small"
                            fullWidth
                            disabled={validateUser()}
                            placeholder={getFieldLabelData(formData, 'companyName', 'placeholder')}
                            autoComplete='off'
                            value={getFieldLabelData(formData, 'companyName', 'value')} 
                            error={!!getFieldLabelData(formData, 'companyName', 'error')}
                            helperText={getFieldLabelData(formData, 'companyName', 'error') ? getFieldLabelData(formData, 'companyName', 'helperText') : ''}
                        />
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Phone Number<span className='error-text'>*</span></div>
                        <NewTextField
                            className="rounded-8 "
                            onChange={(e) => handleFieldUpdate(e.target.value, 'phone')}
                            size="small"
                            fullWidth
                            autoComplete='off'
                            inputProps={{ maxLength: 10 }}
                            placeholder={getFieldLabelData(formData, 'phone', 'placeholder')}
                            value={getFieldLabelData(formData, 'phone', 'value')} 
                            error={!!getFieldLabelData(formData, 'phone', 'error')}
                            helperText={getFieldLabelData(formData, 'phone', 'error') ? getFieldLabelData(formData, 'phone', 'helperText') : ''}
                        />
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>About your company<span className='error-text'>*</span></div>
                        <div className='flex col-gap-10 align-flex-start w-full'>
                            <NewTextField
                                className="rounded-8 "
                                onChange={(e) => handleFieldUpdate(e.target.value, 'description')}
                                size="small"
                                fullWidth
                                autoComplete='off'
                                multiline={true}
                                minRows={3}
                                maxRows={5}
                                inputProps={{ maxLength: CHAR_COUNT_VALUE }}
                                placeholder={getFieldLabelData(formData, 'description', 'placeholder')}
                                value={getFieldLabelData(formData, 'description', 'value')} 
                                error={!!getFieldLabelData(formData, 'description', 'error')}
                                helperText={getFieldLabelData(formData, 'description', 'error') ? getFieldLabelData(formData, 'description', 'helperText') : ''}
                                disabled={validateUser()}
                            />
                        </div>
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Buyer Type<span className='error-text'>*</span></div>
                        <div className='flex col-gap-10 align-flex-start w-full'>
                            <CustomRadioGroup 
                                handleChange={(value) => handleFieldUpdate(value, 'type')} 
                                selectedValue={getFieldLabelData(formData, 'type', 'value')}
                                error={!!getFieldLabelData(formData, 'type', 'error')}
                                options={getFieldLabelData(formData, 'type', 'options')}
                                helperText={getFieldLabelData(formData, 'type', 'error') ? getFieldLabelData(formData, 'type', 'helperText') : ''}
                                radioProps={{
                                    size: "small",
                                    disabled: validateUser()
                                }}
                            />
                        </div>
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className={`text-14 text-344054 flex align-center`}>
                           <div onClick={() => handleTncUpdate(!getFieldLabelData(tncData, 'webTncConsent', 'value'), 'webTncConsent')}><CustomCheckboxIcon isActive={getFieldLabelData(tncData, 'webTncConsent', 'value')} /></div>
                            <span className='text-344054'>By marking this box, you agree to Done Deal’s
                            <a href="https://done.deals/buyer-t-c" target="_blank" rel="noopener noreferrer" className="underline font-bold cursor-pointer text-black ml-1">Terms & Conditions</a>
                            </span>
                        </div>
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className={`text-14 text-344054 flex align-center`}>
                           <div className={`${validateUser()?'pointer-events-none opacity-40':''}`} onClick={() => handleTncUpdate(!getFieldLabelData(tncData, 'pricingTncConsent', 'value'), 'pricingTncConsent')}><CustomCheckboxIcon disabled={validateUser()} isActive={getFieldLabelData(tncData, 'pricingTncConsent', 'value')} /></div>
                           <span className='text-344054 ml-2'>(Optional) By marking this box, you agree to remit a success fee to Done Deal if you acqui-hire any company, equivalent to 1 month’s CTC of the talent acqui-hired</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function conditionalEmailRender(){
        return (
            <React.Fragment>
           { !isEditEmailMode ?
                <span className='flex items-center'>{getFieldLabelData(formData, 'email', 'value')}<img onClick={() => setEditEmailMode(!isEditEmailMode)} src={PencilIcon} alt="" className={`ml-2 ${isBuyerUser() ? 'disabled': ''} w-4 h-4 cursor-pointer`} /></span>
                : 
                <div className='flex items-center w-full'>
                <NewTextField
                    className="rounded-8"
                    onChange={(e) => {handleFieldUpdate(e.target.value, 'email')}}
                    size="small"
                    autoComplete='off'
                    // onBlur={handleBlur}
                    disabled={false}
                    placeholder={getFieldLabelData(formData, 'email', 'placeholder')}
                    value={getFieldLabelData(formData, 'email', 'value')} 
                    error={!!getFieldLabelData(formData, 'email', 'error')}
                    helperText={getFieldLabelData(formData, 'email', 'error') ? getFieldLabelData(formData, 'email', 'helperText') : ''}
                />
                <div className='flex mx-3 pb-3'>
                <img onClick={handleEmailEdit} className='px-2' src={greyRightTick} alt ='' />
                <img onClick={handleCancelEmailEdit} src={greyCancel} alt ='' />
                </div>
            </div>
           }
            </React.Fragment>
        )
    }

    function renderOtpFlow() {
        return (
            <div className='flex flex-direction-coloum row-gap-rem-1_5'>
                <div className='flex flex-direction-coloum row-gap-rem-1'>
                    <div className='onboarding-step-title'>Check your email</div>
                    <div className='onboarding-step-subtitle text-9BA2B3'>Please enter the 6 digit verification code we shared with you on <span className='text-black'>
                    {conditionalEmailRender()}
                    </span>
                    </div>
                </div>
                <div className='onboarding-field-wrapper'>
                    <div className='onboarding-field-label'>Passcode<span className='error-text'>*</span></div>
                    <NewTextField
                        className="rounded-8 "
                        value={otpValue?.value || ''} 
                        onChange={(e) => updateOtp(e.target.value)}
                        size="small"
                        fullWidth
                        placeholder='Enter your Passcode'
                        error={otpValue?.error || ''}
                        helperText={otpValue?.error ? otpValue?.helperText : ''}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={`steps-container ${isMobileView()?'overflow-scroll h-[77vh] ':''}` + (otpFlow && !isMobileView() ? 'h-420px' : '')}>
            {renderForm()}
        </div>
    )
}

export function OnboardingStep2({formData, handleFieldUpdate, primaryBuyerDetails}) {
    useEffect(()=>{
      trackEvent(BUYER_LANDED_ONBOARDING_AQUISITION_INTERESTS,{
        buyer_type : formData?.type?.value
      });
    },[])

    function getSubSectorOptions(){
        let sectors = getFieldLabelData(formData, 'sector', 'value');
        let subSectorOptions = getFieldLabelData(formData, 'subsector', 'value');
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
        let sectors = getFieldLabelData(formData, 'sector', 'value');
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

    function validateUser() {
        if(!isObjectEmpty(primaryBuyerDetails) && !primaryBuyerDetails?.primaryMember) return true;
        return false;
    }

    function showOpenToLead(){
        let buyerType = formData?.type?.value;
        if(buyerType === 'corporate') return false;
        else if(buyerType === 'family_office' || buyerType === 'corporate_vc' || buyerType === 'vc_pe') return true;
        else return false;
    }

    return (
        <div className={`steps-container ${isMobileView()?'h-[80vh] overflow-scroll':''}`}>
            <div className='flex flex-direction-coloum row-gap-rem-3'>
                <div className='flex flex-direction-coloum row-gap-rem-1'>
                    <div className='onboarding-step-title'>Set your Investment Criteria</div>
                    <div className='onboarding-step-subtitle'>Tell us your preferences to help us find your ideal target.</div>
                </div>
                <div className='flex flex-direction-coloum row-gap-rem-1_5'>
                    {/* <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Investment Purpose <span className='error-text'>*</span></div>
                        <div className='text-14 text-344054 margin-t10 flex align-center' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'openToAcquisition', 'value'), 'openToAcquisition')}>
                            <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'openToAcquisition', 'value')} />
                            <span className='text-344054'>Acquire/Take Majority Stakes in a Company</span>
                        </div>
                        <div className='text-14 text-344054 margin-t10 flex align-center' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'openToFunding', 'value'), 'openToFunding')}>
                            <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'openToFunding', 'value')} />
                            <span className='text-344054'>Invest in Companies</span>
                        </div>
                    </div> */}
                     {showOpenToLead() ? <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Are you open to Lead a Round? <span className='error-text'>*</span></div>
                        <div className='flex col-gap-10 align-flex-start w-full'>
                            <CustomRadioGroup 
                                handleChange={(value) => handleFieldUpdate(value === 'true' ? true : false, 'openToLeadRound')} 
                                selectedValue={getFieldLabelData(formData, 'openToLeadRound', 'value')? 'true' : 'false'}
                                error={!!getFieldLabelData(formData, 'openToLeadRound', 'error')}
                                options={getFieldLabelData(formData, 'openToLeadRound', 'options')}
                                helperText={getFieldLabelData(formData, 'openToLeadRound', 'error') ? getFieldLabelData(formData, 'openToLeadRound', 'helperText') : ''}
                                radioProps={{
                                    size: "small",
                                    disabled: validateUser()
                                }}
                            />
                        </div>
                    </div>  : null}
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Sector Interested in<span className='error-text'>*</span></div>
                        <CustomSelect
                            className="rounded-8 text-rem-1"
                            rootClass="w-full"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            options={CompanySectorArr} 
                            handleSelect={(valueObj) => handleFieldUpdate(valueObj, 'sector')}
                            label={getFieldLabelData(formData, 'sector', 'placeholder')} 
                            error={getFieldLabelData(formData, 'sector', 'error')}
                            errorMessage={getFieldLabelData(formData, 'sector', 'error') ? getFieldLabelData(formData, 'sector', 'helperText') : ''}
                            selectedValue={getFieldLabelData(formData, 'sector', 'value') || []}
                            multiSelect
                        />
                        {/* <div className='text-11 text-344054'>Please list your primary sector here. Additional sectors can be added within the app.</div> */}
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Sub-sectors Interested in</div>
                        <CustomMultiSelect
                            className="rounded-8 text-rem-1"
                            rootClass="w-full"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            options={getSubSectorOptions()} 
                            handleSelect={(valueObj) => handleFieldUpdate(valueObj, 'subsector')}
                            disable={checkForSubSectors()}
                            label={getFieldLabelData(formData, 'subsector', 'placeholder')} 
                            selectedValue={getFieldLabelData(formData, 'subsector', 'value')}
                            multiSelect
                        />
                      
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Preferred Cheque Size Per Deal (₹ crores)<span className='error-text'>*</span></div>
                       
                        <div className='padding-x12 w-full'>
                            <CustomRangeSlider
                                rangeSliderValue={[getFieldLabelData(formData, 'dealsize', 'value')[0], getFieldLabelData(formData, 'dealsize', 'value')[1]]}
                                min={0}
                                max={100}
                                onChange={(value) => handleFieldUpdate(value, 'dealsize')}
                                step={1}
                                valueLabelDisplay="on"
                                style={{ marginTop: '30px' }} 
                            />
                        </div>
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>What's your timeline for making an investment?<span className='error-text'>*</span></div>
                        <CustomSelect
                            className="rounded-8 text-rem-1"
                            rootClass="w-full"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            options={AcquisitionTimeLineArr} 
                            handleSelect={(valueObj) => handleFieldUpdate(valueObj.key, 'intent')}
                            label={getFieldLabelData(formData, 'intent', 'value') || getFieldLabelData(formData, 'intent', 'placeholder')} 
                            error={getFieldLabelData(formData, 'intent', 'error')}
                            errorMessage={getFieldLabelData(formData, 'intent', 'error') ? getFieldLabelData(formData, 'intent', 'helperText') : ''}
                        />
                    </div>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Tell us your investment preferences</div>
                        <div className='flex col-gap-10 align-flex-start w-full'>
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
                                placeholder={getFieldLabelData(formData, 'requirement', 'placeholder')}
                                value={getFieldLabelData(formData, 'requirement', 'value')} 
                                error={!!getFieldLabelData(formData, 'requirement', 'error')}
                                helperText={getFieldLabelData(formData, 'requirement', 'error') ? getFieldLabelData(formData, 'requirement', 'helperText') : ''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function OnboardingStep3({formData, handleFieldUpdate}) {
    useEffect(()=>{
        trackEvent(BUYER_LANDED_ONBOARDING_AQUISITION_CRITERIA,{
          buyer_type : formData?.type?.value
        });
      },[])
    return (
        <div className={`steps-container ${isMobileView()?'h-[80vh]':''}`}>
            <div className='flex flex-direction-coloum row-gap-rem-3'>
                <div className='flex flex-direction-coloum row-gap-rem-1'>
                    <div className='onboarding-step-title'>Detail your Investment Criteria</div>
                    <div className='onboarding-step-subtitle'>Tell us your preferences to help us find your ideal target.</div>
                </div>
                <div className='flex flex-direction-coloum row-gap-rem-1_5'>
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>What's your timeline for making an investment?<span className='error-text'>*</span></div>
                        <CustomSelect
                            className="rounded-8 text-rem-1"
                            rootClass="w-full"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            options={AcquisitionTimeLineArr} 
                            handleSelect={(valueObj) => handleFieldUpdate(valueObj.key, 'intent')}
                            label={getFieldLabelData(formData, 'intent', 'value') || getFieldLabelData(formData, 'intent', 'placeholder')} 
                            error={getFieldLabelData(formData, 'intent', 'error')}
                            errorMessage={getFieldLabelData(formData, 'intent', 'error') ? getFieldLabelData(formData, 'intent', 'helperText') : ''}
                        />
                    </div> 
                   
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Target’s operational status</div>
                        <div className='text-14 text-344054 margin-t10 flex align-center' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'operational', 'value'), 'operational')}>
                            <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'operational', 'value')} />
                            <span className='text-344054'>Show only operational companies</span>
                        </div>
                    </div>
                    
                    <div className='onboarding-field-wrapper'>
                        <div className='onboarding-field-label'>Target’s EBITDA status</div>
                        <div className='text-14 text-344054 margin-t10 flex align-center' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'ebitdaPositive', 'value'), 'ebitdaPositive')}>
                            <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'ebitdaPositive', 'value')} />
                            <span className='text-344054'>Show only EBITDA-positive companies</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function SuccessOnboarding({primaryBuyerDetails}) {
    const navigate = useNavigate();
    useEffect(()=>{
        trackEvent(BUYER_LANDED_ONBOARDING_THANKS);
      },[])
    function handleNavigation() {
        // if(primaryBuyerDetails?.primaryMember) {
        //     navigate("/buyer/tnc-consent");
        // }
        // else navigate("/buyer/profile");
        let dataToSend = {
            callback: handleSuccessOnboardingCb
        }
        getBuyerStatus(dataToSend);
    }

    function handleSuccessOnboardingCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            navigate("/buyer/profile");
        }
    }

    return (
        <div className='onboarding-success-container'>
            <div className='onboarding-success-image-container'>
                {/* <img src={CongratulationIcon} alt="" /> */}
                <Lottie animationData={OnboardingSuccessAnimation} loop={true} style={{height: '350px'}} />
            </div>
            <div className='text-36 font-600 text-101828 margin-b16 relative'>Thank you for signing up!</div>
            <div className='text-344054 text-18 margin-b25 relative'>Check your inbox for our meeting invite for verification. Post-verification, you can access your dashboard.</div>
            <NewButton color="primary" sx={{ display: 'inline-block', marginTop: '23px', fontWeight: 600, width: '240px', lineHeight: '0.75rem' }} size="large" variant="contained" className='capitalize' onClick={handleNavigation}>Go to Dashboard</NewButton>
        </div>
    )
}
