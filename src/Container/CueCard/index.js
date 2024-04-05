import { Button, Divider, FormControlLabel, FormGroup, Grid, Modal, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { customerIcon, financialIcon, questionIcon, reasonToBuyIcon, reasonToSellIcon, teamIcon } from '../../assets/icons/svgIcons';
import IconBox from '../../CommonComponent/IconBox';
import CustomTextArea from '../../CommonComponent/TextArea';
import DashboardSections from '../../Component/DashboardSections';
import EmailIcon from '../../assets/icons/emailIcon.svg';
import './style.scss';
import { emailIsValid, globalMessage } from '../../helper/commonHelper';
import { cuecardAgency, cuecardD2C, cuecardEdTech, cuecardFintech, cuecardGaming, cuecardGenric, cuecardMarketPlace, cuecardSaaS } from './CuecardDataJson';
import { cuecardValuationData } from './CueCardValuation';
import { isAdminUser, isAuthenticated, reRouteUser } from '../../Services';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCueCardData, updateCaptureInterest, updateCaptureView } from '../../Redux/slice/CuecardSlice';
import CustomCheckbox from '../../CommonComponent/CustomCheckbox';
import { AGENCY, ED_TECH, FINTECH, GAMING, MARKET_PLACE, OTHERS, SAAS } from '../../constants';
import { GenericButton } from '../../CommonComponent/CustomButton';

function CueCard(props) {
  const [companyData, setCompanyData] = useState(cuecardD2C);

  const [reasonContent, setReasonContent] = useState(cuecardValuationData)
  const [valuationData, setValuationData] = useState({});
  const [firstLoad, setFirstLoad] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [companyId, setCompanyId] = useState();
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const useParamValue = useParams();
  const [isChecked, setIschecked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCompanyId();
  }, [])

  function getCompanyId() {
    if(useParamValue?.companyId) {
      setCompanyId(useParamValue.companyId);
      if(isAdminUser()) {
        setFirstLoad(false);
        getCueCardDetails(useParamValue?.companyId);
      }
    }
    // else {
    //   if(isAuthenticated()) {
    //     reRouteUser();
    //   }
    //   redirect('/login');
    // }
  }

  function handleModalOk() {
    if(!emailIsValid(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if(!isChecked && !email) return;
    setEmailError('');
    let dataToSend = {
      postBody: {
        companyId: companyId,
        buyerEmail: email
      },
      callback: captureViewCb
    }
    dispatch(updateCaptureView(dataToSend))
  }

  function captureViewCb(res) {
    if(res?.status === '200') {
      // getCompanyProfile(getDataCallback);
      getCueCardDetails(companyId);
      setFirstLoad(false);
    }
    else {
      if(res?.message) globalMessage(res.message);
    }
  }

  function getCueCardDetails(companyId) {
    let dataToSend = {
      companyId: companyId,
      callback: getDataCallback
    }
    dispatch(getCueCardData(dataToSend))
  }

  const getDataCallback = (res) => {
    if(res.status === '200') {
      setValuationData(res?.data);
      let businessType = res?.data?.category;
      switch(businessType) {
        case FINTECH:
          setCompanyData(cuecardFintech);
          break;
        case SAAS:
          setCompanyData(cuecardSaaS);
          break;
        case MARKET_PLACE:
          setCompanyData(cuecardMarketPlace);
          break;
        case GAMING:
          setCompanyData(cuecardGaming);
          break;
        case OTHERS:
          setCompanyData(cuecardGenric);
          break;
        case ED_TECH:
          setCompanyData(cuecardEdTech);
          break;
        case AGENCY:
          setCompanyData(cuecardAgency);
          break;
        default:
          setCompanyData(cuecardD2C);
      }
    }
    else if(res?.message) {
      globalMessage(res.message);
    }
  }

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function getAnswer(key) {
    if(valuationData && valuationData[key]) {
      return valuationData[key];
    }
    else return ''
  }

  function handleClick(status) {
    let dataToSend = {
      postBody: {
        companyId,
        buyerEmail: email,
        isInterested: status
      },
      callback: captureInterestCb
    }
    dispatch(updateCaptureInterest(dataToSend));
  }

  function captureInterestCb(res) {
    if(res?.status === '200') {
      setValuationData(res?.data);
    }
    else {
      globalMessage(res.message);
    }
  }

  function renderTermsConditionContent() {
    // return <div>By Signing up, I agree to Done Deal’s <a className='text-white underline-decoration' href="#" >Terms & Conditions</a></div>
    return <div className='font-300 heading3'>By Signing up, I agree to Done Deal’s <a className='underline-decoration' href="https://www.done.deals/t-c" target="_blank" >Terms & Conditions</a></div>
  }

  function handleCheckboxChange() {
    setIschecked(!isChecked);
  }

  function getCategoryValue() {
    let str = '';
    if(valuationData.category) str += valuationData.category;
    if(valuationData.subCategory) str += ` ${valuationData.subCategory}`;
    return str;
  }

  return (
    <div className='cue-card-container'>
      <div className={'container ' + (firstLoad ? 'blur-background' : '')}>
        <div className='gradient-mask-top-right'>
          <div className='gradient-image-background'></div>
        </div>
        <div className='cue-card-content primary-theme'>
          <div className='font-600 text-28'>{getCategoryValue()}</div>
          <div></div>
          <div className='cue-card-content-decription '>{valuationData.about}</div>
          <div>
            <Stack spacing={2} direction="row" sx={{alignItems: 'center', marginBottom: '16px'}}>
                <IconBox icon={questionIcon} className= "icon-box"/>
                <span className='text-26 font-500 '>{'Expected Valuation' || ''}</span>
            </Stack>
            <div className='cue-card-price-container grad-text1'>
              {`${valuationData.askPrice || 'To be discussed'}`}
            </div> 
          </div>
          <React.Fragment>
            {
              Object.keys(companyData).map((key, index) => {
                return <DashboardSections 
                        key={index} 
                        dashboardSectionData={companyData[key]} 
                        className="cue-card-sections border-b border-282828" 
                        labelClass= "margin-b15 "
                        itemClassLabel = "padding-b15"
                        subsectionStackClass="margin-left62"
                        valuation={valuationData} 
                        iconClass= "icon-box"
                        showCount={false} />
              })
            }
          </React.Fragment>
          <div className=''>
            <Stack spacing={6} direction={{xs: 'column', md: 'row'}} sx={{marginTop: '48px'}}>
              <Grid container>
                <Grid xs={12} md={6}>
                  <Stack direction={'row'} spacing = {2} sx={{alignItems: 'center'}}>
                    <IconBox className= "icon-box" icon={reasonContent?.buyReason?.icon}/>
                    <span className='text-26 font-500 '>{reasonContent?.buyReason?.label || ''}</span>
                  </Stack>
                  <div className='margin-t16 margin-left62'>{getAnswer(reasonContent?.buyReason?.qk_key)}</div>
                </Grid>
                <Grid xs={12} md={6}>
                  <Stack direction={'row'} spacing = {2} sx={{alignItems: 'center'}}>
                    <IconBox className= "icon-box" icon={reasonContent?.sellReason?.icon}/>
                    <span className='text-26 font-500 '>{reasonContent?.sellReason?.label || ''}</span>
                  </Stack>
                  <div className='margin-t16 margin-left62'>{getAnswer(reasonContent?.sellReason?.qk_key)}</div>
                </Grid>
              </Grid>
            </Stack>
          </div>
          {
            !isAdminUser() &&
            <Stack spacing={6} direction={{xs: 'column', md: 'row'}} sx={{paddingTop: '48px', maxWidth: '80%', margin: '0 auto'}}>
                <GenericButton  className="primary capitalize w-full text-30 font-600" onClick={() => handleClick('YES')} size="small">Interested</GenericButton>
                <GenericButton className="accent capitalize w-full text-30 font-600" onClick={() => handleClick('NO')}>Not Interested</GenericButton>
            </Stack>
          }
        </div>
      </div>
      <Modal 
        open={firstLoad}
        onClose={() => {}}>
          <div className='cue-modal-container primary-theme '>
            <div className='cue-modal-header'>Get Access to Company Details</div>
            <div className='cue-modal-messaage'>
              <div className='flex align-center margin-b10'>
                <span className='cue-modal-icon margin-r10'><img src={EmailIcon} alt="" /></span><span className='text-B5B5B5'>Enter Email</span>
              </div>
              <div>
                <CustomTextArea value={email} onChange={handleChange} placeholder="vivek@example.com" fullWidth />
                { emailError && <div className="text-danger text-14 font-600 padding-l5 padding-t5">{emailError}</div>}
              </div>
            </div>
            {
              <div className='padding-b20'>
                <FormGroup className=''>
                  <FormControlLabel 
                    className='text-white' 
                    label={renderTermsConditionContent()} labelPlacement="end"
                    control={<CustomCheckbox checked={isChecked} 
                      size="small"
                      sx={{color: '#fff', '&.Mui-checked': {color: 'white'}}} 
                      onChange={(e) => handleCheckboxChange(e)} value={isChecked} />} 
                    />
                </FormGroup>
              </div>
            }
            <div className=''>
              <GenericButton className={'cue-modal-cta primary grad-cta ' + (email && isChecked ? '' : 'disabled')} sx={{borderRadius: '8px'}} fullWidth={true} variant='contained' size="large" onClick={handleModalOk}>Get Access</GenericButton>
            </div>
          </div>
        </Modal>
    </div>
  )
}

export default CueCard;