import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BackArrow, RightArrow } from '../../assets/icons';
import { DoneDealWhiteLogo } from '../../assets/icons/svgIcons';
import { API_SUCCESS_CODE, INCORRECT_EMAIL_HELPERTEXT, INCORRECT_OTP_HELPER, SESSION_ID, SOMETHING_WENT_BAD, TOKEN_KEY } from '../../constants';
import NewAuthOtpFlow from '../../Component/NewAuthOtpFlow';
import { deepClone, emailIsValid, handleLoggedInNavigation, isMobileView } from '../../helper/commonHelper';
import LoginFormField from '../../Component/LoginFormField';
import { getPasscode, loginUser, loginUserSuccess } from '../../Redux/slice/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeLocalStorage, setLocalStorage } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { isBuyerUser, reRouteUser } from '../../Services';
import { updateSnackbar } from '../../Redux/slice/CommonSlice';
import { UserBasedProtectedRoutes } from '../../constants/RouteConstants';
import { getAdminUsers, getDealPartner } from '../../helper/actionHelper';
import NewAuthenticationWrapper from '../NewAuthenticationWrapper';
import { fetchBuyerStatus } from '../../Redux/slice/BuyerVerificationStore';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { LOGIN_GA } from '../../constants/GAeventsConstants';
import { setUserTypeProperty, trackGA4Event } from '../../utils/GAevents';
import { updateAppHeaderState, updateSidebarState } from '../../Redux/slice/AppNavigationSlice';
import { trackEvent } from '../../helper/posthogHelper';
import { BUYER_LOGIN } from '../../constants/posthogEvents';

const StepActionTitle = {
    1: 'Verify',
    2: 'Login',
    // 3: 'Login'
}

const intialFieldData = {
    "email": {
        value: '',
        required: true,
        helperText: INCORRECT_EMAIL_HELPERTEXT,
        placeholder: 'Enter your work email'
    },
    "otp": {
        value: '',
        required: true, 
        helperText: INCORRECT_OTP_HELPER,
        placeholder: 'Enter your passcode'
    }
}

function NewLoginContainer({isAdminUser}) {
    const [formData, setFormData] = useState(intialFieldData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const commonStore = useSelector((state => state.commonStore ));
    const [currentStep, setCurrentStep] = useState(1);
    const buyerVerificationState = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));

    useLayoutEffect(() => {
        // if(isAuthenticated()) {
        //     reRouteUser(navigate)
        // }
    })

    useEffect(() => {
        dispatch(updateSidebarState(true));
        dispatch(updateAppHeaderState(true));
        return () => {
            dispatch(updateSidebarState(false));
            dispatch(updateAppHeaderState(false));
        }
    }, [])
    

    function updatePascode(value, key) {
        let formFieldData = deepClone(formData);
        formFieldData[key].value = value;
        if(formFieldData.error) {
            formFieldData[key].error = false;
            formFieldData[key].helperText = INCORRECT_OTP_HELPER;
        }
        setFormData(formFieldData);
    }

    function handleFieldUpdate(value, key) {
        let formFieldData = deepClone(formData);
        formFieldData[key].value = value;
        if(formFieldData[key].error) {
            formFieldData[key].error = false;
            formFieldData[key].helperText = INCORRECT_EMAIL_HELPERTEXT;
        }
        setFormData(formFieldData);
    }

    function renderSections() {
        switch(currentStep) {
            case 2: 
                return <NewAuthOtpFlow formData={formData} updateOtp={updatePascode} />
            default:
                return <LoginFormField formData={formData} updateFormData={handleFieldUpdate} />
        }
    }

    
    function handleVerification() {
       handleSendPasscode(handleSendPasscodeCB);
    }

    function handleVerify(e) {
        e.preventDefault();
        switch(currentStep) {
            case 2: 
                handleVerifyPasscode();
                break;
            default: 
                handleVerification();
                break;
        }
    }

    function handleSendPasscodeCB(res) {
        if(res.status === API_SUCCESS_CODE) {
            setCurrentStep(currentStep + 1);
        }
        else {
            if(res?.data?.code === 'not_registered' && window.location.pathname === '/buyer/login') {
                let message = (<span>You are not registered with this email ID. Click here to <Link className='text-F04438 font-700' to="/buyer/onboarding">Sign up</Link> </span>)
                updateErrorFields(message, 'email');
            }
            else {
                updateErrorFields(res?.data?.message || SOMETHING_WENT_BAD, 'email');
            }
        }
    }

    function handleVerifyPasscode() {
        let formFieldData = deepClone(formData);
        if(!formFieldData?.otp?.value) {
            formFieldData.otp.error = true;
            setFormData(formFieldData);
            return;
        }
        let dataToSend = {
            postBody: {
                email: formData?.email?.value,
                passcode: formData?.otp?.value,
                device: navigator.platform
            },
            callback: handleVerfyPasscodeCB
        }
        dispatch(loginUser(dataToSend))
    }

    function handleVerfyPasscodeCB(res) {
        if(res.status === API_SUCCESS_CODE) {
            handleUserData(res?.data);
            if(isAdminUser) {
                handleLoggedInNavigation(res?.data?.userType, navigate);
            }
            else {
                let dataToSend= {
                    callback: (statusApiRes) => handleStatusApiCB(statusApiRes, res?.data)
                }
                dispatch(fetchBuyerStatus(dataToSend));
            }
        }
        else {
            if(res.data?.message) {
                updateErrorFields(res?.data?.message || SOMETHING_WENT_BAD, 'otp');
            }
        }
    }

    function handleUserData(res) {
        if(!res) return;
        let dataToPrepare = {
            isBuyer: res?.userType === 3,
            isAdmin: res?.userType === 2,
            userType: res?.userType || null,
            email: res?.email,
            sessionId: res?.sessionID
        }

        dispatch(loginUserSuccess(dataToPrepare));
        setLocalStorage(TOKEN_KEY, res?.sessionID);
        removeLocalStorage(SESSION_ID);

        getAdminUsers();
        if(res?.userType === 3) {
            setLocalStorage(BUYER_ID, res?.uid);
            getDealPartner();
            setUserTypeProperty('buyer')
            trackGA4Event(LOGIN_GA, {action: 'click'});
        }
    }

    function handleStatusApiCB(statusApiResponse, userDataResponse) {
        if(statusApiResponse?.status === API_SUCCESS_CODE) {
            if(buyerVerificationState?.onboardingStage === 1) {
                navigate('/buyer/onboarding');
                return;
            }
            if(statusApiResponse?.data?.status !== 'verified'){
                navigate('/buyer/profile');
                return;
            }
        }
        handleLoggedInNavigation(userDataResponse?.userType, navigate);

    }

    function updateErrorFields(message, key) {
        let formFieldData = deepClone(formData);
        formFieldData[key].error = true;
        formFieldData[key].helperText = message;
        setFormData(formFieldData);
    }

    function resetErrorMessage(message, key) {
        let formFieldData = deepClone(formData);
        formFieldData[key].value = '';
        formFieldData[key].error = false;
        formFieldData[key].helperText = message;
        setFormData(formFieldData);
    }

    function handleGoBack() {
        setCurrentStep(currentStep - 1);
        resetErrorMessage(INCORRECT_OTP_HELPER, 'otp');
    }

    function handleSendPasscode(handleCallback) {
        let formFieldData = deepClone(formData);
        if(!emailIsValid(formFieldData?.email?.value || '')) {
            formFieldData.email.error = true;
            setFormData(formFieldData);
            return;
        }
        let userType = window.location.pathname === '/buyer/login' ? 3 : 2;
        let dataToSend = {
            postBody: {
                email: formData?.email?.value || '',
                userType
            },
            callback: handleCallback
        };
        dispatch(getPasscode(dataToSend));
    }

    function resendPasscodeCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            dispatch(updateSnackbar({
                message: "Passcode Sent",
                isOpen: true
            }));
        }
        else {
            dispatch(updateSnackbar({
                message: "Please try again later",
                isOpen: true
            }));
        }
    }

    function handleLogin(action) {
      if (action === "Login") {
        trackEvent(BUYER_LOGIN);
      }
    }

    function renderLeftSection() {
     return (
        <React.Fragment>
            <div className='text-center onboarding-inline-flex col-gap-rem-0_5'>
                <div className='margin-b10'>{DoneDealWhiteLogo}</div>
                <div className='text-rem-2_5 font-600 margin-b20'>Welcome to Done Deal!</div>
                <div className='text-rem-1_375 font-500'>Making Acquisition Easier, Faster and More Transparent</div>
            </div>
            <div className='onoarding-card-container'>
                {/* <img className='' src={CardsCollection} alt="" /> */}
            </div>
            <div className='onboarding-inline-flex col-gap-rem-0_5'>
                <div className='margin-b8 text-rem-1_25'>Let's discover your ideal target</div>
                <div className='text-rem-1'>Identify the ideal startup for your investment or corporate development goals. Specify your requirements and if there's a particular company you're eyeing, let us know.</div>
            </div>
        </React.Fragment>
        ) 
    }

    function renderRightSection() {
        return (
            <form className='h-full flex flex-direction-coloum justify-space-between' onSubmit={handleVerify}>
                <div>
                    {renderSections()}
                </div>
                <div className='buyer-action-container flex justify-space-between align-end'>
                    {
                        currentStep > 1 &&
                        <div>
                            <NewButton className='' color="primary" sx={{padding: '1.25rem 1.5rem', fontSize: '1rem'}} startIcon={<BackArrow />} variant="contained" onClick={handleGoBack}></NewButton>
                        </div>
                    }
                    <div className={currentStep > 1  ? 'text-right' : ''}>
                        {
                            currentStep === 2 &&
                            <div className='text-667085 text-12 text-right margin-b10'>Passcode missing? Check spam or click here to <span className='font-600 cursor-pointer underline-decoration' onClick={() => handleSendPasscode(resendPasscodeCB)}>resend</span></div>
                        }
                        <NewButton onClick={() => handleLogin(StepActionTitle[currentStep])} className='capitalize' endIcon={<RightArrow />} variant="contained" color="primary" sx={{ width: isMobileView() ? '92%' : '17.5rem', justifyContent: 'space-between', padding: '1.25rem 1.5rem',  fontSize: '1rem', lineHeight: '100%'}} type="submit">{StepActionTitle[currentStep]}</NewButton>
                        {
                            currentStep === 1 && window.location.pathname === '/buyer/login' &&
                            <div className='text-344054 margin-t12'><span>Don’t have an account? <Link className='font-700 text-344054' to="/buyer/onboarding">Sign up here</Link> </span></div>
                        }
                    </div>
                </div>
            </form>
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

export default NewLoginContainer;