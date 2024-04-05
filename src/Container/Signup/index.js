import { Button, FormControlLabel, FormGroup, Stack } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginField from '../../CommonComponent/LoginField';
import { emailIsValid, isMobileView } from '../../helper/commonHelper';
import { getPasscode, loginUser, loginUserSuccess } from '../../Redux/slice/LoginSlice';
import DualGradientWrapper from '../../Component/DualGradientWrapper';
import mailIcon from '../../assets/icons/mailIcon.svg';
import passwordIcon from '../../assets/icons/passwordIcon.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomCheckbox from '../../CommonComponent/CustomCheckbox';
import './style.scss';
import { DoneDealWhiteLogo, rightArrowIcon } from '../../assets/icons/svgIcons';
import { removeLocalStorage, setLocalStorage } from '../../utils';
import { API_SUCCESS_CODE, COMPANY_NOT_FOUND, IS_VALID_COMPANY, SESSION_ID, TOKEN_KEY } from '../../constants';
import { isAuthenticated, reRouteUser } from '../../Services';
import { SocialLoginModel } from '../../SocialLoginModel';
import { trackGA4Event } from '../../utils/GAevents';
import { useQuery } from '../../helper/customHook';
import { updateUtmSorce } from '../../Redux/slice/AppSessionSlice';
import { setSessionStorage } from '../../utils/localStorage';
import CustomTextArea from '../../CommonComponent/TextArea';
import { GenericButton } from '../../CommonComponent/CustomButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ENDPOINT } from '../../config/endpoint';
import { getAdminUsers, verifyEmail } from '../../helper/actionHelper';
import GoBack from '../../Component/GoBack';
import signUpImage from '../../assets/images/signUp.png'
import { hideHeader } from '../../Redux/slice/CommonSlice';
import { SELLER_CLICKED_CONTINUE_EMAIL_VERIFICATION, SELLER_CLICKED_EMAIL_SIGNUP, SELLER_CLICKED_LINKEDIN_SIGNUP } from '../../constants/posthogEvents';
import { trackEvent } from '../../helper/posthogHelper';
import { SIGNUP_MANDATE_ID_KEY } from '../../constants/keyVariableConstants';


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passCodeError, setPassCodeError] = useState('');
  const [passcodeStatus, setPasscodeStatus] = useState('');
  const [isChecked, setIschecked] = useState(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const isMobile = isMobileView();

  useEffect(() => {
    if (isAuthenticated()) {
      reRouteUser(navigate);
      return;
    }
    dispatch(hideHeader(true));
    let source = query.get("utm_source");
    if(source) setSessionStorage('utm_source', source);
    let signupMandateId = query.get("mandate");
    if(signupMandateId) setSessionStorage(SIGNUP_MANDATE_ID_KEY, signupMandateId);

  }, [])

  function renderLeftSection() {
    return (
        <div className='h-[75vh] w-1/2 flex flex-col justify-between items-center px-20'>
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

  // function renderLeftSection() {
  //   return initialMessage();
  // }

  function initialMessage() {
      return (
        <div>
          <div className={'text-white font-500 ' + (isMobile ? 'text-18 margin-b10' : 'text-30 margin-b20')}>Sign up to generate report</div>
          <div className={'text-white ' + (isMobile ? 'text-16' : 'text-20')}>The most secure way to sell your business. Find your valuation, set your terms, and get matched with buyers immediately. 🤝</div>
        </div>
      )
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleEmail(e) {
    setEmailError('');
    setIsValidEmail(false);
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
        email: email,
        userType: 1,
        signup: true
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

  function handleSignup() {
    trackEvent(SELLER_CLICKED_CONTINUE_EMAIL_VERIFICATION);
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
        tncConsent: isChecked
      },
      callback: handleSignupCB
    };
    if (pathname === '/signup') {
      dataTosend.postBody.signup = true;
    }
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


  function renderTermsConditionContent(type) {
    // return <div>By Signing up, I agree to Done Deal’s <a className='text-white underline-decoration' href="#" >Terms & Conditions</a></div>
    return <div className='text-12'>By clicking "Sign Up with {type}", I agree to DoneDeal’s <a className='font-600 underline-decoration' rel="noreferrer" href="https://www.done.deals/t-c" target="_blank">Terms and Conditions</a> and <a className='font-600 underline-decoration' rel="noreferrer" href="https://www.done.deals/privacy-policy" target="_blank">Privacy Policy</a></div>
  }

  function handleCheckboxChange() {
    setIschecked(!isChecked);
  }

  function prepareLink(socialLink) {    
    let {externalLink, clientID, redirectUri, state, scope} = socialLink;
    return `${externalLink}&client_id=${clientID}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  }

  function trackEvents(e) {
    // e.preventDefault();
    trackEvent(SELLER_CLICKED_LINKEDIN_SIGNUP);
    trackGA4Event('linkedin_button_click', {event_category: 'Sign Up', action: 'Sign up'});
  }

  function createLink(socialLink, index) {
    let linkData = socialLink.socialDetails()
    if(isChecked) return  (
      <a className={'text-unset auth-action-link padding-15 !text-[18px] !font-medium ' + (isChecked ? 'active-link ' : 'inactive-link')} href={prepareLink(linkData)} key={`socialLinks${index}`} onClick={trackEvents}>
        { linkData.inActiveIcon &&  <img className='social-image' src={isChecked ? linkData.activeIcon : linkData.inActiveIcon} alt="linkedin Icon" /> } {linkData.label}
      </a>
    )
    return (
      <Button className={' text-unset auth-action-link ' + (isChecked ? 'active-link ' : 'inactive-link')} onClick={() => {}} fullWidth size="small" key={`socialLinks${index}`} startIcon={<img src={linkData.inActiveIcon} alt="linkedin Icon" /> }>
        {linkData.label}
      </Button>
    )
  }

  function handleBack() {
    setPassCodeError('');
    setPasscodeStatus('');
  }

  function handleVerifyEmail() {
    trackEvent(SELLER_CLICKED_EMAIL_SIGNUP);
    if(!emailIsValid(email)) {
      setEmailError("Please register using your professional email ID.");
      return;
    }

    let dataToSend = {
      callback: handleVerifyEmailCb,
      url: ENDPOINT.USER.buyerEmailVerify(email)
    }
    verifyEmail(dataToSend);
  }

  function handleVerifyEmailCb(res) {
    if(res?.status === API_SUCCESS_CODE) {
      if(res?.data) {
        handleGetPasscode();
      }
      else setEmailError('Please enter a valid email');
    }
    else {
      if(res?.data?.message) setEmailError(res?.data?.message)
    }
  }

  function renderRightSection() {
    return (
      <div className='sm:h-[75%] h-[70%] sm:min-w-[500px] w-full bg-[#1B1B1B] flex flex-col py-3 justify-center p-[2em] md:p-[3em] lg:p-[5em] xl:p-[5em] rounded-lg sm:mr-20 seller-onboarding-background-gradient overflow-auto'>
        {
          passcodeStatus !== "passcodeSent" &&
          <React.Fragment>
            <div className='flex flex-direction-coloum'>
              <div>
                <div className='auth-action-cta-container social-btn-container'>
                  {
                    SocialLoginModel?.length > 0 &&
                    SocialLoginModel.map((socialList, index) => {
                      return (
                        createLink(socialList, index)
                      )
                    })
                  }
                </div>
                <div className='margin-t10'>
                  {
                    renderTermsConditionContent('LinkedIn')
                  }
                </div>
              </div>
              <div className='form-divider my-10'>
                <div className='form-divider-content !bg-[#1B1B1B] '>Or</div>
              </div>
              <div>
                <div>
                  <div className={"text-white font-500 margin-b8 " + (isMobile ? 'text-14' : 'text-20')}>Business email address</div>
                  <CustomTextArea 
                      size="large"
                      fullWidth
                      value={email}
                      onChange={handleEmail}
                      // onBlur={handleBlur}
                      error={!!emailError}
                      placeholder="Enter business email"
                  />
                  {emailError && <div className='text-danger text-14 margin-t5'>{emailError}</div> }
                </div>
                <div className='margin-t24'>
                  <GenericButton className={"primary w-full !normal-case !font-medium !text-[18px] " + (email ? '' : 'disabled')} variant="contained" size="medium" onClick={handleVerifyEmail}>
                    Sign up with email
                  </GenericButton>
                  <div className='margin-t10'>
                    {
                      renderTermsConditionContent('Email')
                    }
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        }
        {
          passcodeStatus === 'passcodeSent' &&
          <div>
            <GoBack label="Back" handleGoBack={handleBack} labelClassName={isMobile ? "text-16" : "text-[18px]"} arrowFontSize={isMobile ? "18" : "22"} />
            <div className='padding-y24'>
              <div className={"text-white margin-b8 font-500 " + (isMobile ? 'text-20' : 'text-30')}>Check your email</div>
              <div className='margin-t12 margin-b24'>Please enter the 6 digit verification code we shared with you on <div className='inline-block font-600 grad-text1'>{email}</div></div>
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
            <div className='margin-t24'>
              <GenericButton className={"primary capitalize  w-full " + (password ? '' : 'disabled')} variant="contained" size="medium" onClick={handleSignup}>
                Continue
              </GenericButton>
              <div className='margin-t8'>Passcode missing? Check spam or click here to <span className='font-600 cursor-pointer underline-decoration' onClick={handleGetPasscode}>resend</span></div>
            </div>
          </div>
        }
        {passcodeStatus !== 'passcodeSent' && <Link to="/login" className='text-[16px] mt-5 tracking-wider'>Already have an account ? <span className='font-extrabold cursor-pointer'>Login</span> </Link>}
      </div>
    )
  }
  return (
    <DualGradientWrapper >
        <Stack direction={{ xs: 'coloum', sm: 'row' }} className='flex justify-space-between w-full align-center h-full' columnGap={12}>
          {!isMobile && renderLeftSection()}
          {
            <div className={'w-[90%] sm:w-1/2 h-full flex justify-center flex-col items-center'}>
              {
              isMobile &&
              <div className='margin-b12'>
                <div className='text-18'>Sign up now to connect with investors</div>
              </div>
              }
              {renderRightSection()}
            </div>
          }
        </Stack>
    </DualGradientWrapper>
  )
}

export default Signup;