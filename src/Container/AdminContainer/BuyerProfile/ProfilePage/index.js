import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasicInformationBox from '../BasicInformationBox';
import TargetPreference from '../TargetPreference';
import InternalInformationContainer from '../../../../Component/InternalInformationContainer';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyerProfile, updateBuyerProfileData } from '../../../../Redux/slice/BuyerSlice';
import { API_SUCCESS_CODE, APPROVE, PUT, REJECT, VERIFIED } from '../../../../constants';
import { deepClone, getRangeValue, numbersOnly, getCalculatedValue, isObjectEmpty } from '../../../../helper/commonHelper';
import ApproveActionContainer from '../../../../Component/ApproveActionContainer';
import { AdminBuyerMandateModel, BuyerInformationModel } from '../BuyerProfileTableModel';
import { fetchBuyerParams, updateSnackbar } from '../../../../Redux/slice/CommonSlice';
import CreateMandateIcon from '../../../../assets/images/createMandateIcon.svg';
import CreateMandate from '../../../CreateMandate';
import { isAdminUser, isBuyerUser } from '../../../../Services';
import { updateAppHeaderState } from '../../../../Redux/slice/AppNavigationSlice';
import BuyerDealLimit from '../../../../Component/BuyerDealLimit';
import { dealLimitByPass } from '../../../../Redux/slice/AdminSlice';
import ApproveActionModal from '../../../../CommonComponent/ApproveActionModal';
import CircularSuccessIcon from '../../../../assets/images/circularTickIcon.svg';
import { ENDPOINT } from '../../../../config/endpoint';
import { RemoveLimitDataModel } from './RemoveLimitModel';
import { getDealPartner } from '../../../../helper/actionHelper';
import { checkUserRole } from '../../../../utils/userRole';
import BuyerApprovalContainer from '../../../../Component/BuyerApprovalContainer';

function ProfilePage({buyerId, hideRightSection, getBuyerObj, parentData}) {
    // const [buyerID, setBuyerID] = useState(buyerId);
    const [formData, setFormData] = useState(parentData);
    const dispatch = useDispatch();
    const [saveError, setSaveError] = useState('');
    const [showMandate, setShowMandate] = useState(false);
    const [buyerParams, setBuyerParams] = useState({})
    const [removLimitModal, setRemovLimitModal] = useState(false);
    const partnerInfo = useSelector((state => state.authorizationStore?.dealPartnerDetails ));

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        getBuyer(buyerId);
        getBuyerParam();
        return () => dispatch(updateAppHeaderState(false));
    }, [])

  useEffect(() => {
    setFormData(parentData);
  }, [parentData]);

    function getBuyerParam() {
      let dataToSend = {
        postBody: {uid: isAdminUser() ? buyerId : null},
        callback: handleParamCallback
      }
      dispatch(fetchBuyerParams(dataToSend))
    }

    function handleParamCallback(res) {
      if(res.status === API_SUCCESS_CODE) {
        setBuyerParams(res?.data);
      }
      else {

      }
    }

    function updateDocumentTitle(title) {
      let titlePuffix = ' Profile - Admin'
      document.title = title + titlePuffix;
    }

      function getBuyer(id) {
        let dataToSend = {
          callback: handleGetCallback
        }

        if(id) dataToSend.buyerID = id;

        dispatch(fetchBuyerProfile(dataToSend));
      }

      function handleGetCallback(res) {
        if(res.status === API_SUCCESS_CODE) {
          let apiData = res?.data;
          if(isBuyerUser() && apiData?.owner !== partnerInfo?.id) {
            /**
             * If previous deal partner is not same as ower then refetch the deal partner
             */
            getDealPartner();
          }
          if(apiData?.dealsize) {
            apiData['dealsize'] = {
              ...getCalculatedValue('dealsize', res?.data)
            }
          }
          if(apiData?.revenue) {
            apiData['revenue'] = {
              ...getCalculatedValue('revenue', res?.data)
            }
          }
          setFormData(apiData);
          if(getBuyerObj) getBuyerObj(res.data);
          if(isAdminUser()) updateDocumentTitle(res.data?.companyName);
        }
        else {

        }
      }

      function handleFormField(value, key) {
        let newFormData = deepClone(formData);
        if(key === 'dealsize' || key === 'revenue'){
          newFormData[key] = {
            min: value[0],
            max: value[1]
          }
        }
        else if(key === 'phone') {
          if(value !== 0 && value !== '')
          if(!numbersOnly(value)) {
              return;
          }
          newFormData[key] = value; 
        }
        else{
          newFormData[key] = value;
        }
        setFormData(newFormData);
      }

      function handleRevenueChange(event, newValue, activeThumb) {
        if (!Array.isArray(newValue)) {
          return;
        }

        // if (activeThumb === 0) {
        //   setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        // } else {
        //   setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        // }
      }

      function handleSaveAction(formType) {    
        setSaveError('');
        let { error, preparedData } = prepareData(formType);
        if(error) {
          setSaveError(formType);
          return;
        }
        if(!preparedData?.openToFunding) preparedData.openToLeadRound = false
        let dataToSend={
          postBody: preparedData,
          callback: (res) => handleUpdateCB(res, formType)
        }
        dispatch(updateBuyerProfileData(dataToSend))
      }

      function handleUpdateCB(res, formType) {
        if(res.status !== API_SUCCESS_CODE) {
          // getBuyer(id);
          setSaveError(formType);
        }
      }

      function prepareData(formType = '') {        
        let newData = deepClone(formData), error = false;
        if(formType !== 'basicInfo'){
          if(newData?.preferences?.length ) {
            newData.preferences.map((preferencesList) => {
              if(!preferencesList?.sector) error = true;
            })
          }
          else {
            error = true;
          }
        }
        if(newData?.dealsize){
          newData['dealsize'] = {
              min: getRangeValue(newData?.dealsize?.min),
              max: getRangeValue(newData?.dealsize?.max)
          }
        }
        if(newData?.revenue){
          newData['revenue'] = {
              min: getRangeValue(newData?.revenue?.min),
              max: getRangeValue(newData?.revenue?.max)
          }
        }
        newData = {
          ...newData,
          // ebitdaPositive: newData?.ebitdaPositive ? true : null
        }
        /* Will add this logic later */
        return {error, preparedData: newData};
        // return formData;
      }

      function handleCreateMandateClick() {
        setShowMandate(true);
      }

      function handleClose() {
        setShowMandate(false);
      }

      function handleSubmit() {
        setShowMandate(false);
        dispatch(updateSnackbar({
            message: "Mandate created successfully",
            isOpen: true
        }));
    }

    function getDescription() {
      if(isAdminUser()) {
        if(buyerParams?.dealLimitBypass) return 'The total number of deals available for this buyer.';
        return 'The total number of deals available for this buyer.';
      }
      return "This includes both interests you've expressed, and your active conversations with sellers.";
    }

    function handleRemoveLimit() {
      let dataToSend = {
        postBody: {
          uid: buyerId,
          dealLimitBypass: true,
          callback: handleRemoveLimitCb
        },
      }

      dispatch(dealLimitByPass(dataToSend))
    }

    function handleRemoveLimitCb (res) {
      if(res?.status === API_SUCCESS_CODE) {
        getBuyerParam()
      }
      else {

      }
    } 

    function handleRemoveLimitModal() {
      setRemovLimitModal(true);
    }

    function handleRemoveLimitSuccess() {
      setRemovLimitModal(false);
      getBuyerParam();
    }

    return (
        <div className='profile-page-container justify-space-between'>
            <div className='profile-page-form-section flex-1'>
                <BasicInformationBox handleFormField={handleFormField} formData={formData} handleRevenueChange={handleRevenueChange} handleSaveAction={() => handleSaveAction('basicInfo')} errorCta={saveError === 'basicInfo'} />
                <TargetPreference handleFormField={handleFormField} formData={formData} handleSaveAction={() => handleSaveAction('preference')} errorCta={saveError === 'preference'}/>
            </div>
            {
              !hideRightSection &&
              <div className='other-information-section max-width420 w-full'>
                {
                  isAdminUser() &&
                  <React.Fragment>
                    {
                      formData?.status === VERIFIED && checkUserRole('mandate', formData?.type) &&
                      <div className='box-shadow-type1 rounded-8 padding-16'>
                        <div className='flex col-gap-20 align-center'>
                            <div className='max-w64px w-full h-64px flex flex-center bg-F4EBFF rounded-8'>
                              <img className='max-w20px' src={CreateMandateIcon} alt=""/>
                            </div>
                            <div className='flex'>
                              <h6 className='text-18 font-500 margin-0 padding-b10 text-2E90FA cursor-pointer' onClick={handleCreateMandateClick}>{'Create a mandate'}</h6>
                            </div>
                        </div>
                      </div>
                    }
                      <React.Fragment>
                        {
                          formData.status === 'not_verified' &&
                          <ApproveActionContainer uid={buyerId} handleRefresh={getBuyer} formData={formData} />
                        }
                        <InternalInformationContainer handleFormField={handleFormField} cardData={formData} cardModel={BuyerInformationModel()} />
                      </React.Fragment>
                  </React.Fragment>
                }
                {
                  formData?.status === VERIFIED && !isObjectEmpty(buyerParams) &&
                  <div className='buyer-deal-count-container'>
                    {
                      isBuyerUser() &&
                      <div>
                        <BuyerDealLimit 
                          currentCount={buyerParams?.interestDealCount}
                          totalCount={buyerParams?.totalInterestDealCount}
                          title={'Deal Limit'}
                          typographyColor={'#101828'}
                          description={getDescription()}
                          hideProgressbar={buyerParams?.dealLimitBypass}
                        />
                        <div className='margin-t16 text-green font-500'>To upgrade your limit, please contact your deal partner.</div>
                      </div>
                    }
                    <div>
                      {
                        isAdminUser() &&
                        <div className='flex justify-space-between align-center'>
                          <div>
                            <div className='font-600'>
                              Deal Limit:
                              <span className='text-green margin-l5'>{buyerParams?.totalInterestDealCount}</span>
                            </div>
                            <div className='text-475467 text-12'>
                              You have used {buyerParams?.interestDealCount} deals
                            </div>
                          </div>
                          <div>
                            {
                              <div className='cursor-pointer remove-limit-cta ' onClick={handleRemoveLimitModal}>Edit Limit</div>
                            }
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            }
            {
              showMandate &&
              <CreateMandate model={AdminBuyerMandateModel()} onClose={handleClose} onSuccess={handleSubmit} confirmLabel={'Create a Mandate'} defaultData={{buyerid: formData?.id, buyerUid: formData?.uid}} source='mandate' />
            }
            {
              removLimitModal &&
              <ApproveActionModal 
                  isopen={true} 
                  title="Edit Deal Limit"
                  handleOnClose={() =>setRemovLimitModal(false)} 
                  icon={CircularSuccessIcon} 
                  data={RemoveLimitDataModel}
                  apiMethod={PUT}
                  handleSuccess={handleRemoveLimitSuccess}
                  customObj={{uid: buyerId}}
                  apiUrl={ENDPOINT.BUYERPARAMS.updateSpecialParams()}
                  successButtonText="Update Limit"
              />
            }
        </div>
    )
}

export default ProfilePage;