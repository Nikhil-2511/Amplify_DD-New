import { Button, FormControlLabel, FormGroup, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginField from '../../CommonComponent/LoginField';
import { emailIsValid, getCompanyProfile, isMobileView, isObjectEmpty } from '../../helper/commonHelper';
import { getPasscode, loginUser, loginUserSuccess } from '../../Redux/slice/LoginSlice';
import DualGradientWrapper from '../../Component/DualGradientWrapper';
import mailIcon from '../../assets/icons/mailIcon.svg';
import passwordIcon from '../../assets/icons/passwordIcon.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomCheckbox from '../../CommonComponent/CustomCheckbox';
import './style.scss';
import { DoneDealWhiteLogo, rightArrowIcon } from '../../assets/icons/svgIcons';
import { removeLocalStorage, setLocalStorage } from '../../utils';
import { COMPANY_NOT_FOUND, IS_VALID_COMPANY, SESSION_ID, TOKEN_KEY } from '../../constants';
import { isAuthenticated, reRouteUser } from '../../Services';
import { getAdminUsers } from '../../helper/actionHelper';
import { UserBasedProtectedRoutes } from '../../constants/RouteConstants';
import CustomTextArea from '../../CommonComponent/TextArea';
import { GenericButton } from '../../CommonComponent/CustomButton';
import signUpImage from '../../assets/images/signUp.png'
import { hideHeader } from '../../Redux/slice/CommonSlice';
import { trackEvent } from '../../helper/posthogHelper';
import { SELLER_CLICKED_GET_PASSCODE, SELLER_CLICKED_LOGIN, SELLER_LANDED_LOGIN } from '../../constants/posthogEvents';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passCodeError, setPassCodeError] = useState('');
  const [passcodeStatus, setPasscodeStatus] = useState('');
  const [isChecked, setIschecked] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const commonStore = useSelector((state => state.commonStore ));
  const isMobile = isMobileView();

  useEffect(() => {
    if (isAuthenticated()) {
      reRouteUser(navigate);
    }
    dispatch(hideHeader(true));
    trackEvent(SELLER_LANDED_LOGIN);
  }, [])

  function renderLeftSection() {
    return (
        <div className='h-[75vh] w-full flex flex-col justify-between items-center px-20'>
            <React.Fragment>
                <div className='text-center flex flex-col items-center justify-center'>
                    <div className='margin-b10'>{DoneDealWhiteLogo}</div>
                    <div className='text-rem-2_5 font-600 margin-b20'>Welcome to Done Deal</div>
                    <div className='text-rem-1_375 font-500'>Helping founders scale faster through Strategic Acquisitions, Smart capital & Tactical partnerships</div>
                </div>
                <div className='onoarding-card-container w-1/2'>
                    <img className='' src={signUpImage} alt="" />
                </div>
                <div className='text-center flex flex-col items-center justify-center'>
                    <div className='margin-b8 text-rem-1_25'>Introduce your company to potential investors and strategic acquirers with a completely anonymous overview showcasing key details and unique features of your company</div>
                    {/* <div className='text-rem-1'>Use Done Deal to find the best companies tailored to your investment strategy and objectives.</div> */}
                </div>
            </React.Fragment>
        </div>
    )
}

  function initialMessage() {
    return (
      <div>
        <div className={'text-white font-600 ' + (isMobile ? 'text-18 margin-b8' : 'text-28 margin-b16')}>Welcome back!</div>
        <div className={'text-white ' + (isMobile ? 'text-16' : 'text-20')}>Please login to your account to continue</div>
      </div>
    )
  }

  function updateMessage() {
    return (
      <div className='login-info-container'>
        <div className={'text-white font-600 ' + (isMobile ? 'text-20 margin-b8' : 'text-28 margin-b16')}>We have sent a passcode to your email.</div>
        <div className={`text-white ${isMobile ? 'text-16' : 'text-20'}`}>Passcode missing? Check spam or <span className='underline-decoration cursor-pointer font-500' onClick={handleGetPasscode}>click here</span> to resend.</div>
      </div>
    )
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleGetPasscode() {
    setEmailError('');
    if (!emailIsValid(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    let dataTosend = {
      postBody: {
        email: email
      },
      callback: handleGetPasscodeCB
    };
    dispatch(getPasscode(dataTosend));
  }

  function handleGetPasscodeCB(res) {
    if (res?.status === '200') {
      setPasscodeStatus('passcodeSent');
    }
    else if (res?.data?.message) {
      setEmailError(res.data.message);
    }
  }

  function handleVerify(e) {
    if(!email) return;
    switch(passcodeStatus) {
      case 'passcodeSent': 
        handleSignup();
        trackEvent(SELLER_CLICKED_GET_PASSCODE);
        break;
      default: 
        handleGetPasscode();
        trackEvent(SELLER_CLICKED_LOGIN);
        break;
    }
    e.preventDefault();
  }

  function handleSignup() {
    setEmailError('');
    setPassCodeError('');
    if (!emailIsValid(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!password) {
      setPassCodeError('Invalid passcode');
      return;
    }

    let dataTosend = {
      postBody: {
        email: email,
        passcode: password,
        tncConsent: isChecked,
        device: navigator.platform
      },
      callback: handleSignupCB
    };
    dispatch(loginUser(dataTosend))
  }

  function handleSignupCB(res) {
    if (res?.status === '200') {
      let dataToPrepare = {
        isAdmin: res?.data?.userType === 2 ? true : false,
        userType: res?.data?.userType || null,
        email: res?.data?.email,
        sessionId: res?.data?.sessionID
      }
      dispatch(loginUserSuccess(dataToPrepare));
      setLocalStorage(TOKEN_KEY, res?.data?.sessionID);
      removeLocalStorage(SESSION_ID);
      getAdminUsers();
      if(res?.data?.onboardingStage !== 3){
        navigate('/valq');
        return;
      }
      if (res?.data?.code && res.data.code === COMPANY_NOT_FOUND) {
        setLocalStorage(IS_VALID_COMPANY, res.data.code);
        navigate('/valq');
        return;
      }
      else {
        setLocalStorage(IS_VALID_COMPANY, res.data.code);
      }
      if (pathname === '/signup') {
        if (res?.data?.userType === 2) {
          navigate('/admin/seller');
        }
        navigate('/valuation')
      }
      else {
        let userRoutes = UserBasedProtectedRoutes[res?.data?.userType];
        if((commonStore?.previousPath && userRoutes?.length && userRoutes.includes(commonStore?.previousPath))) {
          navigate(commonStore?.previousPath);
          return;
        }
        if (res?.data?.userType === 2) {
          navigate('/admin/seller');
        }
        else {
          navigate('/dashboard');
        }
      }
    }
    else if (res?.data?.message) {
      setPassCodeError(res?.data?.message);
    }
  }


  function renderRightSection() {
    return (
      <form className='bg-[#1B1B1B] w-[90%] sm:w-[80%] sm:min-w-[500px] rounded-lg sm:h-[55vh] min-h-[40vh] flex flex-col py-3 justify-center p-[2em] md:p-[3em] lg:p-[5em] xl:p-[5em] seller-onboarding-background-gradient' onSubmit={handleVerify}>
        <div className="margin-t10">
          <div className={"text-white font-500 margin-b8 " + (isMobile ? 'text-14' : 'text-20')} >Email Address</div>
          <CustomTextArea 
              size="large"
              fullWidth
              value={email}
              onChange={handleEmail}
              error={!!emailError}
              placeholder="Enter email"
          />
          {emailError && <div className='text-danger text-14 margin-t5'>{emailError}</div> }
        </div>
        {
          passcodeStatus === 'passcodeSent' &&
          <div className='mt-5'>
            <div className={"text-white font-500  margin-b8 font-500 text-20 " + (isMobile ? 'text-14' : 'text-20')}>Passcode</div>
            <CustomTextArea 
                    size="large"
                    fullWidth
                    value={password}
                    onChange={handlePassword}
                    error={!!passCodeError}
                    placeholder="Enter passcode"
                />
            {passCodeError && <div className='text-danger text-14 margin-t5'>{passCodeError}</div> }
          </div>
        }
        <div className='auth-action-cta-container mt-[40px]'>
          <GenericButton fullWidth className={"primary capitalize w-full  !font-bold " + (email ? '' : 'disabled')} variant="contained" size="large" type="submit" >
            {passcodeStatus !== 'passcodeSent' ? 'Get passcode' : 'Login' }
          </GenericButton>
        </div>
        {!isAuthenticated() &&   <Link to="/signup" className='text-[16px] mt-5 tracking-wider'>Don't have an account ? <span className='font-extrabold cursor-pointer'>Sign up</span> </Link>}

      </form>
    )
  }
  
  return (
    <DualGradientWrapper >
      <div className={'flex items-center h-full w-full justify-center'}>
      { !isMobile && <div className={'w-1/2'}>
          {renderLeftSection()}

        </div> }
        <div className={isMobile ? 'w-full flex flex-col justify-center items-center' : 'w-1/2 flex items-center justify-center'}>
        { isMobile &&
            <div className='margin-b12'>
              <div className='text-24'>Welcome Back</div>
              <div className='text-18'>Please login to your account to continue</div>
            </div> }
          {renderRightSection()}
        </div>
      </div>
    </DualGradientWrapper>
  )
}

export default Login;