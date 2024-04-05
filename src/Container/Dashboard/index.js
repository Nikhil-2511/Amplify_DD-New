import React, { useEffect, useState } from 'react';
import InformationBox from '../../CommonComponent/InformationBox';
import DashboardForm from '../../Component/DashboardForm';
import DashboardSections from '../../Component/DashboardSections';
import ValuationModal from '../../Component/ValuationModal';
import { getMetric, getCompanyProfile, globalMessage, filterValue, isValidWebsite, prepareFilterModel, isMobileView, isObjectEmpty } from '../../helper/commonHelper';
import { AgencySchema, D2cSchema, EdTechSchema, FintechSchema, GamingSchema, GenericSchema, listMeInfo, MarketplaceSchema, openToConversationInfo, SaaSSchema } from './DataJson';
import EstimationValueCard from './EstimationValueCard';
import LetterOfIntentCard from './LetterOfIntentCard';
import notListedIcon from '../../assets/icons/notListedIcon.svg'
import chatIcon from '../../assets/icons/chatIcon.svg'
import listedIcon from '../../assets/icons/listedIcon.svg'
import FeaturedIconResignEl from '../../assets/images/featuredIconResignEl.svg'
import { circularProgressClasses } from '@mui/material/CircularProgress';

import './style.scss';
import CustomSwitch from '../../CommonComponent/CustomSwitch';
import { Box, Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { downloadLetter, fetchContactInfo, fetchDealsCount, getEvalutadData, updateCompanyAction, updateDashboardData } from '../../Redux/slice/ValuationSlice';
import { CompanyCommonData } from './CommonModel';
import CueCardSection from './CueCardSection';
import { isAdminUser, isAuthenticated, isSellerUser } from '../../Services';
import UpcomingFeatureSection from './UpcomingFeatureSection';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AGENCY, API_SUCCESS_CODE, CLOSING, COMPANY_NOT_FOUND, DONE_DEAL, ED_TECH, EXPRESS_INTEREST_KEY, FINTECH, GAMING, INTRODUCTION_PENDING_KEY, IS_VALID_COMPANY, MARKET_PLACE, NEGOTIATION, ON_HOLD, OTHERS, SAAS } from '../../constants';
import { getLocalStorage } from '../../utils';
import { GenericButton, OutlineButton } from '../../CommonComponent/CustomButton';
import ContactInformationCard from './ContactInfromationCard';
import SellerDealsCard from './SellerDealsCard';
import ElModal from './ElModal';
import LoiForm from '../LOI/LoiForm';
import { fetchLOIDetails } from '../../Redux/slice/LOISlice';
import { Modal, Button } from '@mui/material';
import { aboutIcon, investorIcon, whiteTickIcon } from '../../assets/icons/svgIcons';
import { useQuery } from '../../helper/customHook';
import RoundedGradientProgressBar from '../../CommonComponent/RoundedGradientProgressBar';
import CircularProgressWithLabel from '../../CommonComponent/CircularProgressBarWithLabel';
import DataRoomCard from './DataRoomCard';
import MoreInfoForm from './MoreInfoForm';
import { trackEvent } from '../../helper/posthogHelper';
import { SELLER_SAVED_ADD_OBJECTIVE, SELLER_CLICKED_ADD_YOUR_TERMS, SELLER_CLICKED_EDIT_INFO, SELLER_CLICKED_SAVE_INFO, SELLER_CLICKED_SIGN_EL, SELLER_CLICKED_VIEW_ALL_DEALS, SELLER_LANDED_DASHBOARD, SELLER_CLICKED_ADD_OBJECTIVE } from '../../constants/posthogEvents';
import { hideHeader } from '../../Redux/slice/CommonSlice';
import IconBox from '../../CommonComponent/IconBox';
import SellerObjectiveModal from '../../Component/SellerObjectiveModal';
import { OBJECTIVE_BANNER_TEXT } from '../../constants/MessageConstants';
import FundingIcon from '../../assets/images/fundingIcon.svg'
import AcqisitionIcon from '../../assets/images/acqisitionIcon.svg'
import { fetchGAData, fetchGASummary } from '../../Redux/slice/SellerSlice';

const style = {
  maxWidth: 500,
  width: '100%',
  bgcolor: '#121212',
  borderRadius: '10px',
  // border: '1px solid #353535',
  outline: 'none',
  color: '#fff',
  p: 4,
};  


function Dashboard() {

  const [metricData, setMetricData] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [companyDataLoaded, setCompanyDataLoaded] = useState(false);
  const [valuationDataLoaded, setValuationDataLoaded] = useState(false);
  const [dashboardModal, setDashboardModal] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useParamValue = useParams();
  const commonStore = useSelector((state) => state.commonStore);
  const [contactInfo, setContactInfo] = useState({});
  const [dealsData, setDealsData] = useState(0);
  const [showElSignModal, setShowElSignModal] = useState(false);
  const [loiData, setLoiData] = useState({});
  const [editType, setEditType] = useState('');
  const [loiCreated, setLoiCreated] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showResignModal, setShowResignModal] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const query = useQuery();
  const [sellerInfoStep, setSellerInfoStep] = useState(0);
  const [showSellerInfoForm, setShowSellerInfoForm] = useState(false);
  const [openEnhanceModal ,setOpenEnhanceModal] = useState(true);
  const [enagagementLetterPDF, setEnagagementLetterPDF] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [objectiveFlow, setObjectiveFlow] = useState(false);
  const [customFieldsData, setCustomFieldsData] = useState();

  useEffect(() => {
    // Redirect for company data not completed.
    // isCompanyExists(navigate);
    // dispatch(updateRevaluation(false));
    if (isAuthenticated()) {
      if (getLocalStorage(IS_VALID_COMPANY) === COMPANY_NOT_FOUND) {
        navigate('/valq');
        return;
      }
      else {
        getAllData(useParamValue?.companyId);
        // if(!isAdminUser()) handleDownloadLetter();
      }
    }
    else {
      navigate('/login');
    }
   trackEvent(SELLER_LANDED_DASHBOARD);
   dispatch(hideHeader(false));
  }, [])

  useEffect(() => {
    if (companyDataLoaded && customFieldsData) {      
      updateDashboardModal(companyData, customFieldsData);
    }

  }, [companyDataLoaded])

  useEffect(() => {
    if(contactInfo?.firstName && contactInfo?.phone && companyData?.completionPercentage < 70 && isSellerUser()) {
      // setShowUpdateModal(true);
    }
  }, [companyData, contactInfo])

  useEffect(() => {
    if(isSellerUser()) {      
        if(Object?.keys(contactInfo)?.length) {
          if(!(contactInfo?.firstName && contactInfo?.phone)){
            setSellerInfoStep(1);
            setShowUpdateModal(true);
          }else if(!(companyData?.teamSize) && Object?.keys(companyData)?.length){
            setSellerInfoStep(2);
            openEnhanceModal && setShowUpdateModal(true);
          }else{
            setSellerInfoStep(0);
            setShowUpdateModal(false);
          }
        }           
    }
}, [contactInfo,companyData])

function fetchSellerAnalytics(compData) {
  if(query.get('code')){
    dispatch(fetchGASummary({
      postBody : {
        code : query.get('code')
      },
      callback: handleFetchSummaryCb
    }))
   }
   else{
    dispatch(fetchGAData({callback: (res) => handleFetchGADataCb(res, compData)}));
   } 
}

  /* We need this in future */
  // useEffect(() => {
  //   if(companyDataLoaded && commonStore?.firstTimeUser) {
  //     dispatch(updateCongratulationModal(
  //       {
  //         isOpen: true, 
  //         description: 'Boost your profile with more details for better buyer matches', 
  //         title: 'Welcome Aboard!',
  //         actionLabel: 'ok', 
  //         actionCta: () => dispatch(updateCongratulationModal({})) 
  //       }
  //     ));
  //   }
  // }, [companyDataLoaded])

  function handleFetchGADataCb(res, compData){    
    if(res?.status == API_SUCCESS_CODE){      
      setCustomFieldsData((prev) => ({...prev, 'customerFieldsData' : res?.data}))
      updateDashboardModal(compData,{...customFieldsData, customerFieldsData : res?.data })
    }else{
      updateDashboardModal(compData);
    }
  }

  function handleFetchSummaryCb(res){
    if(res?.status == API_SUCCESS_CODE){
      navigate('/analytics');
    }
  }

  function updateDashboardModal(companyData, customFieldsData) {
    let categoryData = {}, commonData = CompanyCommonData(companyData);
    switch (companyData.category) {
      case FINTECH:
        categoryData = new FintechSchema(companyData, customFieldsData);
        break;
      case SAAS:
        categoryData = new SaaSSchema(companyData, customFieldsData);
        break;
      case MARKET_PLACE:
        categoryData = new MarketplaceSchema(companyData, customFieldsData);
        break;
      case GAMING:
        categoryData = new GamingSchema(companyData, customFieldsData);
        break;
      case OTHERS:
        categoryData = new GenericSchema(companyData, customFieldsData);
        break;
      case ED_TECH:
        categoryData = new EdTechSchema(companyData, customFieldsData);
        break;
      case AGENCY:
        categoryData = new AgencySchema(companyData, customFieldsData);
        break;
      default:
        categoryData = new D2cSchema(companyData, customFieldsData);
    }
    setDashboardModal({ ...categoryData.companyCategory, ...commonData });
  }

  const companyProfileData = (companyId = "") => {
    // setIsLoading(true);
    getCompanyProfile(getDataCallback, companyId);
  }

  const getMetricData = (companyId = "") => {
    getMetric(metricCallback, companyId);
  }

  const getAllData = (companyId = "") => {
    companyProfileData(companyId);
    // getMetricData(companyId);
    getContactInfo({companyId, callback: handleContactInfoCB});
    getDealCount(companyId);
    getLoiData(companyId);
  }

  function updateDocumentTitle(title) {
    let titlePuffix = ' Dashboard - Admin'
    document.title = title + titlePuffix;
  }

  function getDealCount(companyId) {
    let filterData = {
        'dealStatus': [EXPRESS_INTEREST_KEY, INTRODUCTION_PENDING_KEY, DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, ON_HOLD.key]
      };

    if(companyId) {
      filterData['companyUid'] = [companyId];
    }
    let filterBody = prepareFilterModel(filterData);
    let dataToSend = {
      postBody: filterBody,
      companyId,
      callback: handleGetDealCountCB
    }
    dispatch(fetchDealsCount(dataToSend));
  }

  function handleGetDealCountCB(res) {
    if(res?.status === API_SUCCESS_CODE) {
      setDealsData(res?.data);
    }
    else {

    }
  }

  function getContactInfo({companyId, callback}) {
    let dataToSend = {
      callback: callback,
      uid: companyId,
      type: 'seller'
    }
    dispatch(fetchContactInfo(dataToSend));
  }

  function handleContactInfoCB(res) {
    if(res.status === '200') {
      if(firstLoad) {
        let elvisible = query.get("elvisible");
        if(elvisible === 'true') setShowElSignModal(true);
        setFirstLoad(false);
      }
      setContactInfo(res.data);
      // if(res?.data?.tnc?.state === 'resign') {
      //   setShowResignModal(true);
      // }
    }
  }

  const getDataCallback = (res) => {
    if (res.status === '200') {
      setCompanyData(res?.data);
      setCompanyDataLoaded(true);      
      // if(res?.data?.completionPercentage < 70 && isSellerUser()) {
      //   setShowUpdateModal(true);
      // }
      if(isAdminUser()) updateDocumentTitle(res?.data?.name)
      if(res?.data?.onboardingStage !== 3 && !isAdminUser()) navigate('/valq');
      fetchSellerAnalytics(res?.data);
    }
    else if (res?.data?.message) {
      globalMessage(res.data.message);
    }
    // setIsLoading(false);
  }

  const metricCallback = (res) => {
    if (res?.status === '200') {
      setMetricData(res.data);
      setValuationDataLoaded(true);
    }
    else if (res?.data?.message) {
      globalMessage(res.data.message);
    }
    // {
    //   valuationDataLoaded &&
    //   // setIsLoading(false);
    // }
  }

  function handleViewFullReport() {
    if(!checkProfileCompletion()) return;
    setShowViewModal(true);
  }

  function handleClose() {
    setShowViewModal(false);
  }

  function handleEditMode(type) {
    if(type === 'loi') {
      if(!checkProfileCompletion()) return;
    }
   !loiCreated && trackEvent(SELLER_CLICKED_ADD_YOUR_TERMS);
    setEditMode(true);
    setEditType(type);
  }
 
  function handleSectionEdit(type, sectionId) {
    setSelectedSectionId(sectionId);
    setFormLoading(true);
    setEditMode(true);
    setEditType(type);
    trackEvent(SELLER_CLICKED_EDIT_INFO, {'modal_type': sectionId});
  }

  function handleSave() {
    resetAllError();
    let { dataJson, error } = getUpdatedData();
    if (error){
      trackEvent(SELLER_CLICKED_SAVE_INFO, {status: 'error'});
      return;
    } 
    handleUpdateDashboard({payload: dataJson, callback: handleSaveCb});
  }

  const handleUpdateDashboard = ({payload, callback}) => {
    let dataToSend = {
      postBody: {
        "companyId": companyData.companyId,
        "profileId": companyData.profileId,
        ...payload
      },
      callback
    }
    dispatch(updateDashboardData(dataToSend));
  }

  function resetAllError() {
    let dashboardModalLocal = { ...dashboardModal }, errorExists = false;
    Object.keys(dashboardModalLocal).map((key) => {
      let obj = dashboardModalLocal[key];
      if(obj.type === 'object_pair') {
        if (obj.error) {
          errorExists = true;
          obj.error = '';
        }
      }
      else if (obj.type === 'chip') {
        if (obj.error) {
          errorExists = true;
          obj.error = '';
        }
      }
      else if (obj.type !== 'chip' && obj?.subSection?.length) {
        obj.subSection.forEach(element => {
          if (element.error) {
            element.error = '';
            errorExists = true;
          }
        })
      }
      else {
        if (obj.error) {
          errorExists = true;
          obj.error = '';
        }
      }
    })
    if (errorExists) {
      setDashboardModal(dashboardModalLocal);
    }
  }

  function getUpdatedData() {
    let dataObj = {}, error = false, dashboardModalLocal = { ...dashboardModal };
    let selectedSectionId = '';
    Object.keys(dashboardModalLocal).map((key) => {
      let obj = dashboardModalLocal[key];
      if(obj.type === 'object_pair') {
        if(obj?.subSection?.length) {
          let getObjectPairData = {}, hasModified = false, percentageCalculation = 0, percentFieldModified = false;
          obj.subSection.forEach(element => {
            if(element.hasContribution) {
              percentageCalculation+= element.answer ? parseFloat(element.answer) : 0;
            }

            if(element.updated || (element.required && !element.answer)) {
              if (!element.answer) {
                error = true;
                element.error = 'Please fill this in';
                if(error && !selectedSectionId) selectedSectionId = key;
                return;
              }
              if (element.field_type === 'percentage' && parseFloat(element.answer) > 100) {
                error = true;
                element.error = 'Please enter a valid percentage between 0 and 100';
                if(error && !selectedSectionId) selectedSectionId = key;
                return;
              }
              let keyPair = element.qk_key.split('.');
              if(keyPair[1]) {
                let filterAnswer = filterValue(element);
                getObjectPairData[keyPair[1]] = element.hasContribution ? parseFloat(filterAnswer) : filterAnswer;
                hasModified = true;
                if(element.hasContribution) percentFieldModified = true;
                
              }
            }
          })
          if(obj.hasPercentCalc && percentFieldModified) {
            if(percentageCalculation > 100) {
              error = true;
              obj.error = 'Invalid input. The total percentage of Direct Online Sales, Marketplace Sales, and Offline Sales must be less than 100%';
              if(error && !selectedSectionId) selectedSectionId = key;
              return;
            }
          }
          if(hasModified) dataObj[key] = getObjectPairData;
        }
      }
      else if (obj.type !== 'chip' && obj?.subSection?.length) {
        obj.subSection.forEach(element => {
          if (element.updated || ((element.required && !element.answer))) {
            if (!element.answer && element.field_type !== 'checkbox' ) {
              error = true;
              element.error = 'Please fill this in'
              if(error && !selectedSectionId) selectedSectionId = key;
              return;
            }
            if(element.field_validate === 'website') {
              if(!isValidWebsite(element.answer)) {
                error = true;
                element.error = 'Please enter valid website';
                if(error && !selectedSectionId) selectedSectionId = key;
                return;
              }
            }
            dataObj[element.qk_key] = filterValue(element);
          }
        });
      }
      else if (obj.type === 'chip') {
        if (obj.updated) {
          if (obj?.answer?.length > 0) dataObj[obj.qk_key] = obj.answer.join(",");
          else {
            error = true;
            obj.error = 'Please fill this in'
            if(error && !selectedSectionId) selectedSectionId = key;
            return;
          }
        }
      }
      else {
        if (obj.updated || (obj.required && !obj.answer)) {
          if (!obj.answer) {
            error = true;
            obj.error = 'Please fill this in';
            if(error && !selectedSectionId) selectedSectionId = key;
            return;
          }
          dataObj[obj.qk_key] = filterValue(obj);
        }
      }
    })
    if (error) {
      setSelectedSectionId(selectedSectionId);
      setDashboardModal(dashboardModalLocal);
    }
    return { dataJson: dataObj, error };
  }

  function handleSaveCb(res) {
    if (res.status === '200') {
      // getMetricData();
      if(res?.data?.completionPercentage < 70 && isSellerUser()) {
        // setShowUpdateModal(true);
      }
      setCompanyData(res.data);      
      updateDashboardModal(res.data, customFieldsData);
      setEditMode(false);
      setEditType('');
      trackEvent(SELLER_CLICKED_SAVE_INFO, {status: 'success'});
    }
    else {
      if (res?.data?.message) {
        globalMessage(res.data.message);
        trackEvent(SELLER_CLICKED_SAVE_INFO, {status: 'error'});
      }
    }
  }

  function handleUpdate(data) {
    setDashboardModal(data);
  }

  function handleRefresh() {
    if(!checkProfileCompletion()) return;
    let dataToSend = {
      postBody: {},
      callback: evalCallback
    }
    dispatch(getEvalutadData(dataToSend));
  }

  function evalCallback(res) {
    if (res.status === '200') {
      setMetricData(res.data);
    }
    else {
      if (res?.message)
        alert(res.message);
    }
  }

  function handleModalCancel(cb="") {
    setEditMode(false)
    setEditType('');
    // if(companyData?.completionPercentage < 70 && isSellerUser()) {
    //   setShowUpdateModal(true);
    // }
    if(cb) cb();
  }

  function handleDeals() {
    if(!checkProfileCompletion()) return;
   if(contactInfo?.tncCompleted) {
    trackEvent(SELLER_CLICKED_VIEW_ALL_DEALS);
    let path = `/deals${useParamValue?.companyId ? `/${useParamValue?.companyId}` : ''}`
    if(isAdminUser()) path+= `?sid=${companyData?.id}`
    navigate(path);
   }
   else {
    trackEvent(SELLER_CLICKED_SIGN_EL);
    setShowElSignModal(true);
   }
  }

  function handleSuccess() {
    getContactInfo({callback: handleContactInfoCB});
    setShowElSignModal(false);
    setObjectiveFlow(false);
    // navigate('/deals');
  }

  
  function getLoiData(companyId) {
    let dataToSend = {
      callback: handleGetLoiDataCB,
      companyId
    } 
    dispatch(fetchLOIDetails(dataToSend));
  }

  function handleGetLoiDataCB(res) {
    if(res?.status === API_SUCCESS_CODE) {
      if(res?.data) {
        setLoiData(res?.data);
        setLoiCreated(true);
      }
    }
  }

  function handleUpdateModalClick() {
    // handleEditMode('company');
    setShowSellerInfoForm(true);
    setShowUpdateModal(false);
  }

  function checkElSignModal() {
    /* Will pick this later */
    // let showTnc = query.get("showTnc");
    // if(showTnc === 'yes' && isSellerUser()) {
    //   setShowElSignModal(true);
    // }
    return false;
  }

  function handleResign() {
    setShowResignModal(false);
    setShowElSignModal(true);
  }

  function renderProgressbarLabel() {
    return (
      <div className='text-white flex flex-direction-coloum lh-15 align-center'>
        <span className='text-10'>Profile</span>
        <span className='text-18 font-500'>{`${companyData?.completionPercentage}%`}</span>
      </div>
    )
  }

  function isProfileUnlocked() {
    return companyData?.completionPercentage >= 70;
  }

  function checkProfileCompletion() {    
    if(!isProfileUnlocked()) {
      setShowUpdateModal(true);
      return false;
    }
    return true;
  }

  function handleSetCompanyData() {
    getCompanyProfile(updateCompanyDataCb, useParamValue?.companyId);
  }

  function updateCompanyDataCb(res) {
    if (res.status === API_SUCCESS_CODE) {
      setCompanyData(res.data);      
      updateDashboardModal(res.data, customFieldsData);
    }
    else {
      if (res?.data?.message) {
        globalMessage(res.data.message);
      }
    }
  }

  function handlePrimaryObjective() {
    trackEvent(SELLER_CLICKED_ADD_OBJECTIVE);
    setShowObjectiveModal(true);
  }

  function handleSubmitObjectiveModal(payload) {
    trackEvent(SELLER_SAVED_ADD_OBJECTIVE, { type: payload?.openToOtherObjective ? 'yes' : 'no'});
    handleUpdateDashboard({payload: payload, callback: handleSubmitObjectiveCb});
  }

  function handleSubmitObjectiveCb(res) {
    if(res?.status === API_SUCCESS_CODE) {
      setCompanyData(res.data);
      updateDashboardModal(res.data);
      setShowObjectiveModal(false);
      getContactInfo({callback: handleObjectiveSubmitCb});
    }
    else {
      if (res?.data?.message) {
        globalMessage(res.data.message);
      }
    }
  }

  function handleObjectiveSubmitCb(res) {
    if(res?.status === API_SUCCESS_CODE) {
      setContactInfo(res.data);
      let tncData = res?.data;
      if(tncData?.tncCompleted && ((!tncData?.minRequiredTncSigned && tncData?.tnc?.state === 'signed') || (tncData?.minRequiredTncSigned && tncData?.tnc?.state === 'resign'))) {
        handleObjectiveEl();
      }
    }
    else {
      
    }
  }

  function getObjectiveAction({label, action}) {
    return <div className={'border border-B5B5B5 cursor-pointer padding-x14 padding-y8 rounded-8 font-500 text-12 min-width160 text-center ' + (isMobileView() ? '' : '')} onClick={action}>
      {label}
    </div>
  }

  function handleObjectiveEl() {
    setShowElSignModal(true);
    setObjectiveFlow(true);
  }

  function renderObjectiveBanner() {
    let bannerText = '', actionType = '';
    if(isObjectEmpty(companyData) || isAdminUser()) return '';
    if(!companyData?.hasOwnProperty('openToOtherObjective')) {
      bannerText = OBJECTIVE_BANNER_TEXT;
      actionType = getObjectiveAction({label: 'Add Objective', action: handlePrimaryObjective})
    }
    
    else if(contactInfo?.bannerText) {
      bannerText = contactInfo?.bannerText || '';
      if(contactInfo?.tncCompleted) {
        if(contactInfo?.minRequiredTncSigned) {
          if(contactInfo?.tnc?.state === 'resign') {
            actionType = getObjectiveAction({label: 'Resign Engagement Letter', action: handleObjectiveEl});
          }
        }
        else {
          if(contactInfo?.tnc?.state === 'signed') actionType = getObjectiveAction({label: 'Sign Engagement Letter', action: handleObjectiveEl})
        }
      }
    }
    if(!bannerText) return '';
    return (
      <div className={'user-details-section ' + (isMobileView() ? '' : 'margin-r30')}>
        <div className='user-detail-section-1'>
          <div className={'flex col-gap-8 justify-space-between primary-theme padding-y12 padding-x8 rounded-8 ' + (isMobileView() ? 'flex-direction-coloum row-gap-12' : 'align-center ')}>
              <div className={'flex col-gap-12 align-center '}>
                <IconBox icon={investorIcon} className={"bg-3247FF square-24"} />
                <div className='text-12'>{bannerText}</div>
              </div>
              <React.Fragment>{actionType}</React.Fragment>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className='dashboard-container'>
      {
        companyDataLoaded &&
        <div className='container'>
          {
            !editMode &&
            <React.Fragment>
              <div className='flex justify-space-between align-center margin-b20'>
                <div>
                  <div className={`flex col-gap-12 align-center font-600 ${!isMobileView() ? 'text-40' : 'text-30'}`}>Hi {companyData.name} 
                    { !isObjectEmpty(companyData) && <img className='w-[40px]' src={companyData?.objective ==='funding' ? FundingIcon : AcqisitionIcon} alt='' />}
                  </div>
                    {
                      companyData?.completionPercentage !== 100 &&
                      !isMobileView() &&
                      <div className='text-18 text-white'>Complete your profile and populate your data room to increase chances of a Done Deal.</div>
                    }
                </div>
             

                {
                  !isMobileView() &&
                  // <RoundedGradientProgressBar label="" />
                  <CircularProgressWithLabel 
                    value={companyData?.completionPercentage || 0} 
                    label={renderProgressbarLabel()}
                    thickness={5} 
                    size= {100}
                    sx={{color: '#3247FF', 
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        }
                    }} 
                />
                }
              </div>
              
              {
                isMobileView() &&
                <div className='flex flex-direction-coloum row-gap-8'>
                  <div className='text-16 text-white font-500'>Your Profile is <span className='grad-text1'>{`${companyData?.completionPercentage || 0}%`}</span> complete</div>
                  <div className='flex col-gap-30 user-profile-container'>
                    <div className='user-profile-status primary-theme user-section relative h-6px'>
                      <div className='dashboard-progress-bar ' style={{ width: `${companyData?.completionPercentage || 0}%` }}>
                      </div>
                    </div>
                  </div>
                  <div className='relative'>
                  {
                    companyData?.completionPercentage !== 100 &&
                      <div className='text-B5B5B5 text-12'>Complete your profile to improve discoverability</div>
                  }
                   
                  </div>
                </div>
              }
              {
                renderObjectiveBanner() 
              } 
              <div className='user-details-section col-gap-30'>
                <div className='user-detail-section-1'>
                  <React.Fragment>
                    {
                      Object.keys(dashboardModal).map((key, index) => {
                        return <DashboardSections
                          key={index}
                          dashboardSectionData={dashboardModal[key]}
                          className="margin-b20 user-section user-details-content"
                          handleEditClick={(sectionId) => handleSectionEdit('company', sectionId)}
                          valuation={companyData}
                          labelClass={isMobileView() ? '' : "margin-b16 "}
                          itemClassLabel="padding-b5"
                          iconClass="icon-box"
                          // canEdit={true} 
                          canEdit={!isAdminUser()}
                          sectionId={key}
                          showCount={true} />
                      })
                    }
                    { isMobileView() && 
                      <ContactInformationCard 
                      className="primary-theme margin-b20 user-section padding-y20"
                      contactInfo={contactInfo}
                      getContactInfo={() => getContactInfo({callback: handleContactInfoCB})}
                      completionPercentage={companyData?.completionPercentage >=70}
                    />
                  }
                  </React.Fragment>
                </div>
                <div className='user-detail-section-2'>
                  {
                    <SellerDealsCard
                      className="primary-theme margin-b20 user-section padding-y20"
                      handleDeal={handleDeals}
                      dealsData={dealsData}
                      tncDetails={contactInfo}
                    />
                  }
                  {
                    <DataRoomCard
                      className="primary-theme margin-b20 user-section padding-y20"
                      checkProfileCompletion={checkProfileCompletion}
                    />
                  }
                  {
                    !isMobileView() && valuationDataLoaded && !metricData?.notPossibleToCompute &&
                    <EstimationValueCard className="primary-theme margin-b20 user-section padding-y20"
                      valuationData={companyData}
                      handleViewFullReport={handleViewFullReport}
                      handleRefresh={handleRefresh}
                      hightlightRefresh={metricData?.isLatest}
                      metricData={metricData}
                    />
                  }
                  {
                    !isMobileView() &&
                    <React.Fragment>
                      <LetterOfIntentCard className="primary-theme margin-b20 user-section padding-y20" loiCreated={loiCreated} handleEditMode={() => handleEditMode('loi')} />
                    
                    </React.Fragment>
                  }
                  {
                    !isMobileView() && 
                      <ContactInformationCard 
                      className="primary-theme margin-b20 user-section padding-y20"
                      contactInfo={contactInfo}
                      getContactInfo={() => getContactInfo({callback: handleContactInfoCB})}
                      completionPercentage={companyData?.completionPercentage >=70}
                    />
                  }
                 
                  {/* {
                    !isAdminUser() &&
                    <UpcomingFeatureSection className="primary-theme margin-b20 user-section padding-y20" />
                  } */}
                </div>
              </div>
            </React.Fragment>
          }
          {
            editMode && editType === 'company' &&
            <div className=''>
              <DashboardForm companyData={dashboardModal} metricData={metricData} updateDashboardData={handleUpdate} selectedSectionId={selectedSectionId} resetSelectedSectionId={() => setSelectedSectionId('')} />
            </div>
          }
          {
            editMode && editType === 'loi' &&
            <div classname=''>
              <LoiForm loiCreated={loiCreated} loiData={loiData} handleSaveLoi={(formData) => handleModalCancel(() => getLoiData())} handleLoiBack={() => handleModalCancel()} />
            </div>
          }
        </div>
      }
      {/* {
        isLoading &&
        <Loader isOpen={isLoading} />
      } */}
      {
        showViewModal &&
        <ValuationModal open={showViewModal} handleClose={handleClose} valuationData={companyData} metricData={metricData} />
      }
      {
        editMode && editType === 'company' &&
        <div className='dashboard-edit-action-cta'>
          <Stack direction='row' spacing={6} sx={{ justifyContent: 'space-between', maxWidth: '400px', width: '100%' }}>
            <OutlineButton className={"capitalize "} size="medium" fullWidth onClick={() => handleModalCancel(() => updateDashboardModal(companyData, customFieldsData))}>Cancel</OutlineButton>
            <GenericButton className='primary capitalize' variant="contained" size="large" fullWidth onClick={handleSave}>Save</GenericButton>
          </Stack>
        </div>
      }
      {
        // (showElSignModal || checkElSignModal()) &&
        showElSignModal &&
        <ElModal 
          tncDetails={contactInfo?.tnc}
          companyId= {useParamValue?.companyId}
          handleClose={() => {setShowElSignModal(false); setObjectiveFlow(false);}}
          objectiveFlow={objectiveFlow}
          handleSuccess={handleSuccess} />    
      }
      {
        showUpdateModal &&
        <Modal
            open={showUpdateModal}
            onClose={() => {}}
        >
            <div className='global-modal-container'>
                <Box sx={style}>
                    <div className='flex row-gap-20 flex-direction-coloum margin-b20'>
                        <div className='flex col-gap-20 align-center'>
                            <div className='icon-box rounded-full'>
                                {whiteTickIcon}
                            </div>
                            <div className={'text-22'}>Enhance Your Visibility</div>
                        </div>
                        <div className={'font-300 ' + (isMobileView() ? 'text-14' : 'text-16')}>Please update your contact information and key details regarding your company here. This data will help us connect you with vetted buyers.</div>
                    </div> 
                    <Stack direction={'row'} columnGap={1} justifyContent={'flex-end'}>
                        <GenericButton className="capitalize" color='modalButton' onClick={handleUpdateModalClick} variant="contained" sx={{fontWeight: 400, padding: '11px 34px'}}>Update Details</GenericButton>
                    </Stack>
                </Box>
            </div>
        </Modal>
      }
      {showResignModal && (
            <Modal
              open={true}
              sx={{ zIndex: 100001 }}
              disableAutoFocus={true}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="resignEl-modal-container modal-action-container flex">
                <div className='text-resignEl-cnt'>
                  <div className='flex re-signTitle'>
                      <img className='featuredIconResignEl' src={FeaturedIconResignEl} alt=''/>
                      <div className='title-resignEl'>Re-Sign Your Engagement Letter</div>
                  </div>
                  
                    <p className='para-resignEl'>The Engagement Letter (EL) you previously signed needs your signature again because:</p>
                    <p className='para-resignEl'>{contactInfo?.tnc?.rectificationNote}</p>
                    <p className='para-resignEl'>Without this step, accessing and managing your deals on our platform will be on hold.</p>
                </div>
                <div className='flex justify-end button-cnt col-gap-8'>
                    <Button className="capitalize" sx={{ borderRadius: "8px" }} variant="contained"
                      onClick={() => setShowResignModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="orange-btn capitalize" sx={{ borderRadius: "8px" }} variant="contained" onClick={handleResign}> Re-sign EL</Button>
                </div>
              </div>
            </Modal>
          )}
          {showSellerInfoForm && <MoreInfoForm  className="primary-theme margin-b20 user-section padding-y20"
                                   contactInfo={contactInfo}
                                   getContactInfo={() => getContactInfo({callback: handleContactInfoCB})}
                                   sellerInfoStep = {sellerInfoStep}
                                   showSellerInfoForm = {showSellerInfoForm}
                                   setOpenEnhanceModal = {setOpenEnhanceModal}
                                   setShowSellerInfoForm = {setShowSellerInfoForm}
                                   companyData = {companyData}
                                   fetchCompanyData = {handleSetCompanyData}
           />} 
           {
            showObjectiveModal &&
            <SellerObjectiveModal
              handleClose={() => setShowObjectiveModal(false)}
              handleSubmit = {handleSubmitObjectiveModal}
              companyData={companyData}
            />
           }
    </div>
  )
}

export default Dashboard;