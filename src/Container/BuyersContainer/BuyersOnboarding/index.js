import React, { useEffect, useState } from 'react';
import { deepClone, emailIsValid, getRangeValue, isAlphabetOnly, isMobileView, isPhoneNumberValid, numbersOnly } from '../../../helper/commonHelper';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINT } from '../../../config/endpoint';
import { createBuyer, updateBuyerProfileData } from '../../../Redux/slice/BuyerSlice';
import { API_CODE_202, API_SUCCESS_CODE, BUYER_ID, INCORRECT_OTP_HELPER, PUT, SESSION_ID, TOKEN_KEY } from '../../../constants';
import { BackArrow, RightArrow } from '../../../assets/icons';
import { OnboardingStep1, OnboardingStep2, OnboardingStep3, SuccessOnboarding } from './OnboardingStep';
import { OnboardingInitialData, StepTitle } from './OnboardingDataModel';
import WarningCircularIcon from "../../../assets/images/warningCircularIcon.svg";
import './style.scss';
import { getPasscode, getUserDetails, loginUser, loginUserSuccess } from '../../../Redux/slice/LoginSlice';
import { isAuthenticated, reRouteUser } from '../../../Services';
import { Link, useNavigate } from 'react-router-dom';
import { DoneDealWhiteLogo } from '../../../assets/icons/svgIcons';
import { globalAlert, updateFormToServer, updateSnackbar } from '../../../Redux/slice/CommonSlice';
import { getAdminUsers, getDealPartner, verifyEmail } from '../../../helper/actionHelper';
import NewAuthenticationWrapper from '../../NewAuthenticationWrapper';
import { NewButton } from '../../../CommonComponent/NewCustomButton';
import { updateAppHeaderState, updateSidebarState } from '../../../Redux/slice/AppNavigationSlice';
import { useQuery } from '../../../helper/customHook';
import { SubsectorMapping } from '../../../CommonModels/CommonCollection';
import { trackEvent } from '../../../helper/posthogHelper';
import { BUYER_LANDED_SIGNUP_ONBOARDING } from '../../../constants/posthogEvents';

const tncObj = {
    'webTncConsent': {
        value: false,
        step: 1,
        required: true,
        helperText: 'Please accept the terms and conditions.',
        },
     'ndaTncConsent': {
        value: true,
        step: 1
        },
     'pricingTncConsent': {
        value: false,
        step: 1
        },
}

function BuyersOnboarding() {
    const [currentStep, setCurrentStep] = useState(1);
    const [buyerOnboardingData, setBuyerOnboardingData] = useState(OnboardingInitialData);
    const [otpFlow, setOtpFlow] = useState(false);
    const [passcode, setPasscode] = useState({value: '', required: true, helperText: INCORRECT_OTP_HELPER});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [existingUser, setExistingUser] = useState(false);
    const [originalEmail, setOriginalEmail] = useState('')
    const query = useQuery();
    const [primaryBuyerDetails, setPrimaryBuyerDetails] = useState({});
    const [tncState, setTncState] = useState(tncObj);
    const buyerVerificationState = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));

    useEffect(() => {
        dispatch(updateSidebarState(true));
        dispatch(updateAppHeaderState(true));
        if(buyerVerificationState?.onboardingStage === 1) {
            setCurrentStep(2);
        }
        else {
            if(isAuthenticated()) {
                reRouteUser(navigate)
            }
            if(getLocalStorage(BUYER_ID) && getLocalStorage(TOKEN_KEY)) {
                navigate('/buyer/browse');
            }
        }
        trackEvent(BUYER_LANDED_SIGNUP_ONBOARDING);
        return () => {
            dispatch(updateSidebarState(false));
            dispatch(updateAppHeaderState(false));
        }
    }, [])

    function updatePascode(value) {
        let passcodeData = {...passcode};
        passcodeData.value = value;
        if(passcodeData.error) {
            passcodeData.error = false;
            passcodeData.helperText = INCORRECT_OTP_HELPER;
        }
        setPasscode(passcodeData);
    }

    function filterSubsectors(sectorArray, subsectorList) {
        return sectorArray.reduce((result, sector) => {
            const validSubsectors = SubsectorMapping[sector]
                ? subsectorList.filter(subsector =>
                    SubsectorMapping[sector].some(mapping => mapping.key === subsector)
                )
                : [];
            return result.concat(validSubsectors);
        }, []);
    }

    function handleFieldUpdate(value, key) {
        let onboardingData = deepClone(buyerOnboardingData);
        if(key === 'phone') {
            if(value !== 0 && value !== '')
            if(!numbersOnly(value)) {
                return;
            } 
        }
        onboardingData[key].value = value;
        if(onboardingData[key].error) {
            onboardingData[key].error = false;
            if(key === 'pocName') onboardingData[key].helperText = 'Please fill in'
        }
        if(key === 'sector' && onboardingData['subsector']?.value?.length) {
            onboardingData['subsector'].value = filterSubsectors(onboardingData['sector'].value, onboardingData['subsector']?.value);
        }
        setBuyerOnboardingData(onboardingData);
    }

    function handleTncUpdate(value, key){
        let tncData = deepClone(tncState);
        tncData[key].value = value;
        if(tncData[key].error) {
            tncData[key].error = false;
        }
        setTncState(tncData);
    }

    function createTncPayload(data){
     let dataObj = {}
     if(Object.keys(data)?.length) {
        Object.keys(data).forEach(fieldKey => {
            let fieldData = data[fieldKey];
            dataObj[fieldKey] = fieldData.value;
        })
    }
    return dataObj;
    }

    function handleSaveData() {
        let buyerId = getLocalStorage(BUYER_ID),
        url = buyerId && buyerId !== null ? ENDPOINT.BUYERS.updateBuyer(buyerId) : ENDPOINT.BUYERS.createBuyerApi(),
        {error, data} = prepareData();
        if(!error) {
            let dataToSend = {
                callback: handleSaveCB,
                url,
                postBody: {
                    ...data, 
                    uid: buyerId,
                    onboardingStage: currentStep
                }
            };
            if(buyerId) {
                dispatch(updateBuyerProfileData(dataToSend));
            }
            else {
                dispatch(createBuyer(dataToSend));
            }
    
        }  
    }

    function handleVerifyEmail(cb='') {      
        let newOnboardingData = deepClone(buyerOnboardingData);
        if(!emailIsValid(newOnboardingData?.email?.value)) {
            newOnboardingData.email.error = true;
            setBuyerOnboardingData((prevData) => ({...prevData, email : {...prevData?.email, error : true}}));
            return;
        }
        let dataToSend = {
            callback: (res) => {handleVerifyEmailCB(res); cb && cb() },
            url: ENDPOINT.USER.buyerEmailVerify(newOnboardingData?.email?.value)
        }
        verifyEmail(dataToSend);
    }

    function handleVerifyEmailCB(res) {
        let newOnboardingData = buyerOnboardingData;
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data) {
                newOnboardingData.email['verified'] = true;
                getUserBasedOnEmail();
            }
            else newOnboardingData.email.error = true;
        }
        else {
            newOnboardingData.email.error = true;
        }
        setBuyerOnboardingData(newOnboardingData);
    }

    function getUserBasedOnEmail() {
        let dataToSend = {
            email: buyerOnboardingData?.email?.value,
            callback: handleGetUserBasedEmailCb
        }
        dispatch(getUserDetails(dataToSend))
    }

    function handleGetUserBasedEmailCb(res) {
        
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data) {
                let newOnboardingData = deepClone(buyerOnboardingData);
                setPrimaryBuyerDetails(res?.data);
                if(res?.data?.companyName)newOnboardingData.companyName.value = res.data.companyName;
                if(res?.data?.description)newOnboardingData.description.value = res.data.description;
                if(res?.data?.type)newOnboardingData.type.value = res.data.type;
                newOnboardingData.email['verified'] = true;
                setBuyerOnboardingData(newOnboardingData);
        
                let tncData = deepClone(tncState);
                tncData.pricingTncConsent.value = res?.data?.tnc?.pricingTncConsent;
                setTncState(tncData);                
            }
        }
        else {

        }
    }

    function showOpenToLead(){        
        let buyerType = buyerOnboardingData?.type?.value;
        if(buyerType === 'corporate') return false;
        else if(buyerType === 'family_office' || buyerType === 'corporate_vc' || buyerType === 'vc_pe') return true;
        else return false;
    }

    function prepareData() {
        let data = {}, error = false, onboardingData = deepClone(buyerOnboardingData);
        if(!showOpenToLead() || !primaryBuyerDetails?.primaryMember) delete onboardingData?.openToLeadRound
        if(Object.keys(onboardingData)?.length) {
            Object.keys(onboardingData).forEach((formField) => {
                let fieldValue = onboardingData[formField];
                if(currentStep !== fieldValue.step || formField === 'subsector') return;
                if (fieldValue?.required && (
                    (Array.isArray(fieldValue?.value) && fieldValue?.value.length === 0) || 
                    fieldValue.value === undefined || 
                    fieldValue.value === null || 
                    fieldValue.value === '' || 
                    (typeof fieldValue.value === 'boolean' && fieldValue.value !== false && !fieldValue.value)
                )) {
                    error = true;
                    onboardingData[formField].error = true;
                }
                
                if(formField === 'phone') {
                    if(!isPhoneNumberValid(fieldValue?.value || '')) {
                        error = true;
                        onboardingData[formField].error = true;
                    }
                }
                if(formField === 'email') {
                    if(!emailIsValid(fieldValue?.value || '')) {
                        error = true;
                        onboardingData[formField].error = true;
                    }
                }
                if(formField === 'pocName') {
                    if(!isAlphabetOnly(fieldValue?.value)) {
                        error = true;
                        onboardingData[formField].error = true;
                        onboardingData[formField].helperText = 'No special character allowed';
                    }
                }
                if(!error && formField === 'sector') {
                    let tempData = {
                        "sector": fieldValue?.value || '',
                        "subsectorList": onboardingData['subsector']?.value || []
                    };
                    const result = tempData.sector.map(sector => ({
                        sector,
                        subsectorList: SubsectorMapping[sector]
                            ? tempData.subsectorList.filter(subsector =>
                                SubsectorMapping[sector].some(mapping => mapping.key === subsector)
                            )
                            : []
                    }));
                    data.preferences = result;
                }
                if(!error && formField === 'dealsize' || formField === 'revenue'){
                    data[formField] = {
                        min: getRangeValue(buyerOnboardingData[formField].value[0]),
                        max: getRangeValue(buyerOnboardingData[formField].value[1])
                    }
                }
                if(!error && formField !== 'sector' && formField !== 'subsector' && formField !== 'dealsize' && formField !== 'revenue'){
                    data[formField] = fieldValue?.value === '' ? null : fieldValue?.value;
                }
            })
        }
        setBuyerOnboardingData(onboardingData);
        return {error, data};
    }

    function handleSaveCB(res) {
        if(res.status === API_SUCCESS_CODE) {
            if(!getLocalStorage(BUYER_ID)) {
                setLocalStorage(BUYER_ID, res.uid);
            }
            setCurrentStep(currentStep + 1);
        }
        else {

        }
    }

    function handleGoBack() {
        setCurrentStep(currentStep - 1);
    }

    function renderSteps() {
        switch(currentStep) {
            case 2:
                return <OnboardingStep2 handleFieldUpdate={handleFieldUpdate} formData={buyerOnboardingData} primaryBuyerDetails={primaryBuyerDetails}/>;
            // case 3:
            //     return <OnboardingStep3 handleFieldUpdate={handleFieldUpdate} formData={buyerOnboardingData} />
            case 3: 
                return <SuccessOnboarding primaryBuyerDetails={primaryBuyerDetails} />
            default:
                return <OnboardingStep1 handleFieldUpdate={handleFieldUpdate} handleTncUpdate = {handleTncUpdate} formData={buyerOnboardingData} otpFlow={otpFlow} otpValue={passcode} updateOtp={updatePascode} handleVerifyEmail={handleVerifyEmail} handleVerification={handleVerification} setOriginalEmail={setOriginalEmail} originalEmail={originalEmail} primaryBuyerDetails={primaryBuyerDetails} tncData = {tncState} />;
        }
    }

    function handleNext() {
        handleSaveData();
    }

    function handleVerification() {
        let {error, data} = prepareData();
        if(error) return;
        let source = query.get("utm_source");
        let dataToSend = {
            postBody: {
                email: buyerOnboardingData?.email?.value || '',
                signup: true,
                userType: 3,
                source: source || undefined
            },
            callback: (res) => handleSendPasscodeCB(res, data)
        };
        dispatch(getPasscode(dataToSend));
    }

    function handleResend() {
        let dataToSend={
            postBody: {
                email: buyerOnboardingData?.email?.value || '',
                signup: true,
                userType: 3
            },
            callback: handleResendCallback
        }
        dispatch(getPasscode(dataToSend));
    }

    function handleResendCallback(res) {
        if(res?.status === API_SUCCESS_CODE) {
            dispatch(updateSnackbar({
                message: "Passcode Sent",
                isOpen: true
            }));
        }
    }

    function handleSendPasscodeCB(res, data) {
        if(res.status === API_SUCCESS_CODE) {
           let dataObj = deepClone(data);
           dataObj['tnc'] = createTncPayload(tncState);
           dataObj['onboardingStage'] = currentStep;
            let dataToSend = {
                callback: handlerCreateBuyerCB,
                postBody: dataObj
            };
            dispatch(createBuyer(dataToSend));
        }
        else {
            if(res?.data?.code === 'already_registered') {
                // alert(res?.data?.message);
                dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: res?.data?.message, title: 'Warning'}));
                // navigate('/buyer/login');
            }
            else if(res?.data?.message) {
                alert(res?.data?.message);
            }
        }
    }

    function handlerCreateBuyerCB(res) {
        if(res.status === API_SUCCESS_CODE) {
            setLocalStorage(BUYER_ID, res?.data?.uid);
            setOtpFlow(true);
            if(res?.data?.openToLeadRound === true || res?.data?.openToLeadRound === false){
                let onboardingData = deepClone(buyerOnboardingData);
                onboardingData.openToLeadRound.value = res?.data?.openToLeadRound ;
                setBuyerOnboardingData(onboardingData);
            }
        }
        else if(res.status === API_CODE_202) {
            setExistingUser(true);
            setOtpFlow(true);
            if(res?.data?.specificParameter?.uid) {
                setLocalStorage(BUYER_ID, res.data.specificParameter.uid);
            }
        }
        else {
            
        }
    }

    function handleVerifyPasscode() {
        if(!passcode?.value) {
            setPasscode({...passcode, error: true});
            return;
        }
        let dataToSend = {
            postBody: {
                email: buyerOnboardingData?.email?.value,
                passcode: passcode?.value,
                tncConsent: true,
                signup: true,
                // uid: getLocalStorage(BUYER_ID) || ''
            },
            callback: handleVerfyPasscodeCB
        }
        dispatch(loginUser(dataToSend))
    }

    function handleVerfyPasscodeCB(res) {
        if(res.status === API_SUCCESS_CODE) {
            if(existingUser) {
                handleSaveData();
                setExistingUser(false);
            }
            let dataToPrepare = {
                isBuyer: res?.data?.userType === 3 ? true : false,
                userType: res?.data?.userType || null,
                email: res?.data?.email,
                sessionId: res?.data?.sessionID
            }
            dispatch(loginUserSuccess(dataToPrepare));
            setLocalStorage(TOKEN_KEY, res?.data?.sessionID);
            removeLocalStorage(SESSION_ID);
            getAdminUsers();
            getDealPartner();
            setCurrentStep(currentStep + 1);
        }
        else {
            if(res.data?.message) {
                setPasscode({...passcode, helperText: res?.data?.message, error: true});
            }
        }
    }

    function renderLeftSection() {
        return (
            <React.Fragment>
                <div className='text-center onboarding-inline-flex col-gap-rem-0_5'>
                    <div className='margin-b10'>{DoneDealWhiteLogo}</div>
                    <div className='text-rem-2_5 font-600 margin-b20'>Welcome to Done Deal!</div>
                    <div className='text-rem-1_375 font-500'>Discover some of the fastest growing startups exploring strategic acquisitions and growth capital</div>
                </div>
                <div className='onoarding-card-container'>
                    {/* <img className='' src={CardsCollection} alt="" /> */}
                </div>
                <div className='onboarding-inline-flex col-gap-rem-0_5'>
                    <div className='margin-b8 text-rem-1_25'>Let’s discover your ideal target</div>
                    <div className='text-rem-1'>Use Done Deal to find the best companies tailored to your investment strategy and objectives.</div>
                </div>
            </React.Fragment>
        )
    }

    function renderRightSection() {
        return (
            <React.Fragment>
                {
                    currentStep <= 2 &&
                    <div className='margin-rem-b1_5 '>
                       
                        <div className='step-progress-container'>
                            {
                                Object.keys(StepTitle).map((stepNumber, index) => {
                                    return <div key={StepTitle[stepNumber] + index} className={'step-progress ' + (currentStep >= parseInt(stepNumber) ? 'active-step' : '')}></div>
                                    
                                })
                            }
                        </div>
                    </div>
                }
                {renderSteps()}
                <div className={`padding-rem-t3 padding-rem-b0_875`}>
                    {
                    currentStep > 1 &&  currentStep !== 3 &&
                        <div className='buyer-action-container flex justify-space-between col-gap-10'>
                            <div className={'' + (isMobileView() ? 'flex' : '')}>
                                {/* {
                                    currentStep === 3 &&
                                    <NewButton className='' color="primary" sx={{ padding: '1.25rem 1.5rem',  fontSize: '1rem'}} startIcon={<BackArrow />} variant="contained" onClick={handleGoBack}></NewButton>
                                } */}
                            </div>
                            <NewButton className={'capitalize ' + (isMobileView() ? 'flex-1' : '')} color="primary" endIcon={<RightArrow />} variant="contained" sx={{ width: '17.5rem', justifyContent: 'space-between', padding: '1.25rem 1.5rem'}} onClick={handleNext}>{currentStep === 2 ? 'Sign up' : 'Continue'}</NewButton>
                        </div>
                    }
                    {
                        currentStep === 1 &&
                        <React.Fragment>
                            {
                                otpFlow &&
                                <div>
                                    <div className='text-667085 text-12 margin-b10 flex justify-end'>Passcode missing? Check spam or click here to <span className='font-600 cursor-pointer underline-decoration ml-1' onClick={handleResend}>resend</span></div>
                                    <div className={`${isMobileView()?'':'flex align-center justify-end'}`}>
                                        
                                        <NewButton className={`capitalize ${isMobileView()?'w-[21rem]':'w-[17.5rem]'}`} endIcon={<RightArrow />} variant="contained" disabled={!passcode?.value} color="primary" sx={{justifyContent: 'space-between', padding: '1.25rem 1.5rem', fontSize: '1rem'}} onClick={handleVerifyPasscode}>Continue</NewButton>
                                    </div>
                                </div>
                            }
                            {
                                !otpFlow &&
                                <div className='btn-container'>
                                    <NewButton className={`capitalize ${isMobileView()?'w-[21rem]':'w-[17.5rem]'}`} endIcon={<RightArrow />} variant="contained" color="primary" sx={{justifyContent: 'space-between', padding: '1.25rem 1.5rem', fontSize: '1rem', lineHeight: '100%'}} disabled={!(buyerOnboardingData?.email?.verified && tncState?.webTncConsent?.value)} onClick={handleVerification}>Verify Email & Continue</NewButton>
                                    <div className='text-344054 margin-t12 font-400'><span>Already have an account? <Link className='font-700 text-344054' to="/buyer/login">Login</Link> </span></div>
                                </div>
                            }
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        )
    }

    return (
        <NewAuthenticationWrapper 
            renderLeftSection={renderLeftSection}
            renderRightSection={renderRightSection}
            rightSectionClassName={isMobileView() ? "padding-rem-x1 padding-rem-y2" : "padding-rem-3"}
            rightSectionContentClassName="h-full"
        />
    )
}

export default BuyersOnboarding;