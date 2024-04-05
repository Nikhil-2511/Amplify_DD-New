import React, { useEffect, useState } from 'react';
import NewAuthenticationWrapper from '../NewAuthenticationWrapper';
import { DoneDealWhiteLogo } from '../../assets/icons/svgIcons';
import { RightArrow } from '../../assets/icons';
import PdfviewComponent from '../../Component/PdfviewComponent.js';
import CustomCheckboxIcon from '../../CommonComponent/CustomCheckboxIcon';
import { deepClone, getFieldLabelData, isMobileView } from '../../helper/commonHelper';
import NewTextField from '../../CommonComponent/NewTextField';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormToServer } from '../../Redux/slice/CommonSlice';
import { useNavigate } from 'react-router-dom';
import { reRouteUser } from '../../Services';
import { API_SUCCESS_CODE, PUT } from '../../constants';
import { ENDPOINT } from '../../config/endpoint';
import SuccessCircularIcon from '../../assets/images/circularTickIcon.svg';
import './style.scss';
import { getBuyerStatus } from '../../helper/actionHelper';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import TncDocument from './newTncDocument.pdf';
import { updateAppHeaderState, updateSidebarState } from '../../Redux/slice/AppNavigationSlice';
import { downloadLetter } from '../../Redux/slice/ValuationSlice.js';
import { trackEvent } from '../../helper/posthogHelper.js';
import { BUYER_LANDED_ONBOARDING_TNC } from '../../constants/posthogEvents.js';


const intialFieldData = {
    "webTncConsent": {
        value: false
    },
    "ndaTncConsent": {
        value: false,
    },
    "pricingTncConsent" : {
        value: false
    },
    "tncCompanyName" : {
        value: '',
        placeholder: `Enter your company's official name`
    },
    "tncName": {
        value: '',
        placeholder: 'Enter your full name'
    }
}

function TncConsentContainer() {
    const [formData, setFormData] = useState(intialFieldData);
    const dispatch = useDispatch();
    const buyerVerificationState = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));
    const navigate = useNavigate();
    const [enagagementLetterPDF, setEnagagementLetterPDF] = useState(null);
    // `data:application/pdf;base64,${tncDocument}`

    useEffect(() => {
        dispatch(updateSidebarState(true));
        dispatch(updateAppHeaderState(true));
        if(buyerVerificationState?.tncCompleted) {
            reRouteUser(navigate);
        }
        if(!buyerVerificationState?.primaryMember) navigate('/buyer/profile');
        if(!buyerVerificationState?.tncCompleted && buyerVerificationState?.primaryMember) handleDownloadLetter();
        trackEvent(BUYER_LANDED_ONBOARDING_TNC,{
            buyer_type : buyerVerificationState?.type
        });
        return () => {
            dispatch(updateSidebarState(false));
            dispatch(updateAppHeaderState(false));
        }
    }, [])


  const handleDownloadLetter = () => {
    
    let dataToSend = {
      postBody: {},
      callback: downloadEngagementCallback,
    };
    // setIsLoading(true);
    dispatch(downloadLetter(dataToSend));
  };

  const downloadEngagementCallback = (res) => {
    if (res?.status === API_SUCCESS_CODE) {
        setEnagagementLetterPDF(res.data);
    }
  };

    function handleFieldUpdate(value, key) {
        let newFormData = deepClone(formData);
        newFormData[key].value = value;
        if(newFormData[key].error) {
            newFormData[key].error = false;
        }

        setFormData(newFormData);
    }

    function renderLeftSection() {
        return (
           <React.Fragment>
               <div className='text-center flex flex-col items-center'>
                   <div className='margin-b10'>{DoneDealWhiteLogo}</div>
                   <div className='text-36 font-600 margin-b20'>Welcome to Done Deal!</div>
                   <div className='text-22 font-500'>Discover some of the fastest growing startups exploring strategic acquisitions and growth capital</div>
               </div>
               <div className='onoarding-card-container'>
                   {/* <img className='' src={CardsCollection} alt="" /> */}
               </div>
               <div>
                   <div className='margin-b8 text-20'>Let's discover your ideal target</div>
                   <div className=''>Use Done Deal to find the best companies tailored to your investment strategy and objectives.</div>
               </div>
           </React.Fragment>
           ) 
       }

       function handleVerify() {
        let { error, data } = isDataNotValid();
        if(error) return ;
        let dataToSend = {
            postBody: {"tnc": data},
            method: PUT,
            url: ENDPOINT.TNC.updateTnc(),
            callback: handleUpdateCB
        }
        dispatch(updateFormToServer(dataToSend))
       }

       function isDataNotValid() {
        let newFormData = deepClone(formData), error = false, data = {};
        if(Object.keys(newFormData)?.length) {
            Object.keys(newFormData).forEach(fieldKey => {
                let fieldData = newFormData[fieldKey];
                if(!fieldData?.value) {
                    error = true;
                    if(fieldKey === 'tncCompanyName' || fieldKey === 'tncName') {
                        newFormData[fieldKey].error = true;
                    }
                }
                else {
                    data[fieldKey] = fieldData.value;
                }
            })
        }
        if(error) setFormData(newFormData);
        return {error, data};
       }

       function handleUpdateCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            let dataToSend = {
                callback: handleStatusCB
            }
            getBuyerStatus(dataToSend);
        }
        else {
            if(res?.data?.message) {
                alert(res.data.message);
            }
        }
       }

       function handleStatusCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.status !== 'verified'){
                navigate('/buyer/profile');
                return;
            }
            reRouteUser(navigate);
        }
        else {
            if(res?.data?.message) {
                alert(res.data.message);
            }
            reRouteUser(navigate);
        }
       }

       function checkDisabled() {
        if(!formData?.tncCompanyName?.value || !formData?.tncName?.value || !formData?.webTncConsent?.value || !formData?.pricingTncConsent?.value || !formData?.ndaTncConsent?.value) {
            return true
        }
       }

       function renderComponent() {
        return (
            <div>
                <div className='text-14 text-344054 margin-t10 flex align-center cursor-pointer' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'webTncConsent', 'value'), 'webTncConsent')}>
                    <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'webTncConsent', 'value')} />
                    <span className='text-344054'>By marking this box, you agree to Done Deal’s <a className='underline-decoration text-344054 text-14' target="_blank" rel="noreferrer" href="https://www.done.deals/buyer-t-c">Terms & Conditions</a></span>
                </div>
                <div className='text-14 text-344054 margin-t10 flex align-center cursor-pointer' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'ndaTncConsent', 'value'), 'ndaTncConsent')}>
                    <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'ndaTncConsent', 'value')} />
                    <span className='text-344054'> By marking this box, you agree to the non- disclosure obligations against sellers’ information as set out in the Additional Terms for Buyers above.</span>
                </div>
                <div className='text-14 text-344054 margin-t10 flex align-center cursor-pointer' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'pricingTncConsent', 'value'), 'pricingTncConsent')}>
                    <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'pricingTncConsent', 'value')} />
                    <span className='text-344054'>By marking this box, you agree to remitting a success fee equivalent to one month’s CTC to DoneDeal in the event of an acquihire as set out in the Additional Terms for Buyers above.</span>
                </div>
                <div className='text-18 font-500 lh-28 margin-t8'>
                    Please enter your name to approve the acceptance of interest. <span className='text-green'>This will serve as your digital signature.</span>
                </div>
                <div className='margin-t10'>
                    <NewTextField
                        className="rounded-8 "
                        onChange={(e) => handleFieldUpdate(e.target.value, 'tncName')}
                        size="small"
                        fullWidth
                        autoComplete='off'
                        placeholder={getFieldLabelData(formData, 'tncName', 'placeholder')}
                        value={getFieldLabelData(formData, 'tncName', 'value')} 
                        error={!!getFieldLabelData(formData, 'tncName', 'error')}
                        helperText={getFieldLabelData(formData, 'tncName', 'error') ? getFieldLabelData(formData, 'tncName', 'helperText') : ''}
                    />
                </div>
                <div className='margin-t10'>
                    <NewTextField
                        className="rounded-8 "
                        onChange={(e) => handleFieldUpdate(e.target.value, 'tncCompanyName')}
                        size="small"
                        fullWidth
                        autoComplete='off'
                        placeholder={getFieldLabelData(formData, 'tncCompanyName', 'placeholder')}
                        value={getFieldLabelData(formData, 'tncCompanyName', 'value')} 
                        error={!!getFieldLabelData(formData, 'tncCompanyName', 'error')}
                        helperText={getFieldLabelData(formData, 'tncCompanyName', 'error') ? getFieldLabelData(formData, 'tncCompanyName', 'helperText') : ''}
                    />
                </div>
            </div>
        )
    }

       function renderRightSection() {
        return (
            <div className='h-full flex flex-direction-coloum justify-space-between'>
                {
                    <PdfviewComponent tncDocument={`data:application/pdf;base64,${enagagementLetterPDF?.content}`} bottomComponent={renderComponent} />
                }
            </div>
        )
    }

    function renderHeaderSection() {
        return (
            <div className='pdf-header-container padding-y20'>
                <div className='flex align-center col-gap-10'>
                    <img className='w-48px' src={SuccessCircularIcon} alt="" />
                    <div className='text-18 lh-28 font-500'>Our terms and conditions</div>
                </div>
                <div className='margin-t10 text-667085 text-14'>Kindly read our website’s <a className='underline-decoration text-667085 text-14' href="https://www.done.deals/buyer-t-c" target="_blank">Terms & Conditions</a> and the below document to proceed.</div>
            </div>
        )
    }

    function renderFooterSection() {
        return (
            <div className='buyer-action-container flex justify-space-between align-end padding-y20'>
                <NewButton size="large" className={`capitalize ${isMobileView()?'w-[21rem]':'w-[17.5rem]'}`} endIcon={<RightArrow />} disabled={checkDisabled()} variant="contained" color="primary" sx={{justifyContent: 'space-between', padding: '1.25rem 1.5rem', fontSize: '1rem'}} onClick={handleVerify}>Save & Continue</NewButton>
            </div>
        )
    }

    return (
        <NewAuthenticationWrapper 
            renderLeftSection={renderLeftSection}
            renderRightSection={renderRightSection}
            renderHeaderSection={renderHeaderSection}
            renderFooterSection={renderFooterSection}
            rightSectionClassName={isMobileView() ? "padding-20" : "padding-x48 padding-y20"}
            rightSectionContentClassName="buyer-onboarding-step-content"
        />
    )
}

export default TncConsentContainer;