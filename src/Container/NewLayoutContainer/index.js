import React, { useEffect, useLayoutEffect, useState } from 'react';
import { isAuthenticated, isBuyerUser } from '../../Services';
import { useDispatch, useSelector } from 'react-redux';
import { API_SUCCESS_CODE, PREVIOUS_PATH_KEY, PUT } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocationChange } from '../../helper/customHook';
import BuyerCommonModal from '../../CommonComponent/BuyerCommon/BuyerCommonModal';
import DealPartnerInfoContainer from '../DealPartnerInfoContainer';
import { setLocalStorage } from '../../utils';
import { fetchBuyerStatus } from '../../Redux/slice/BuyerVerificationStore';
import { globalAlert, showElDetailsModal, updatePreviousPath, showDelistModal, fetchBuyerParams, updateFormToServer } from '../../Redux/slice/CommonSlice';
import { getBuyerParamData, getBuyerStatus } from '../../helper/actionHelper';
import WarningCircularIcon from '../../assets/images/warningCircularIcon.svg';
import { deepClone, getDate, getFieldLabelData, isMobileView, isObjectEmpty } from '../../helper/commonHelper';
import { SellerDelistReasonModel } from '../AdminContainer/AdminSeller/ActionModals/DataModel';
import { ENDPOINT } from '../../config/endpoint';
import ApproveActionModal from '../../CommonComponent/ApproveActionModal';
import SlotSchedulerModal from '../../Component/NewCueCard/SlotSchedulerModal';
import { toggleSlotSchedular } from '../../Redux/slice/BuyerSlice';
import NotesViewContainer from '../../Component/NotesViewContainer';
import { Button } from '@mui/material';
import ModalWrapper from '../../ModalWrapper';
import CustomCheckboxIcon from '../../CommonComponent/CustomCheckboxIcon';
import CircularSuccessIcon from '../../assets/images/circularTickIcon.svg'

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

function NewLayoutContainer({children}) {
    const dispatch = useDispatch();
    const [blockSite, setBlockSite] = useState(false);
    const [tncState, setTncState] = useState(tncObj);
    const navigate = useNavigate();
    const currentPageLocation = useLocation();
    const [buyerStatusLoaded, setBuyerStatusLoaded] = useState(true);
    const buyerVerificationState = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));
    const showElDetails = useSelector((state) => state.commonStore.showElDetails);
    const showDelist = useSelector((state) => state.commonStore.showDelist);
    const buyerParams = useSelector((state) => state.buyerStore?.buyerParams);
    const isSlotSchedulerModalOpen = useSelector((state) => state.buyerStore?.isSlotSchedulerModalOpen || {});
    const noteModelView = useSelector((state) => state.commonStore?.noteModelView);

    // for every route change and to detect previous path
    useLocationChange((location, previousLocation) => {        
        // if(previousLocation?.pathname && location?.pathname !== previousLocation?.pathname) {
        //     dispatch(updatePreviousPath(previousLocation.pathname))
        // }
        if(isAuthenticated() && isBuyerUser() && (buyerVerificationState?.status !== 'verified' || !buyerVerificationState?.tncCompleted) && location?.pathname !== '/buyer/tnc-consent') {
            let dataToSend = {
                callback: handleBuyerStatusCB
            }
            getBuyerStatus(dataToSend);
        }
        if(isAuthenticated() && isBuyerUser() && location?.pathname !== '/buyer/tnc-consent' && location?.pathname !== '/buyer/onboarding' && !buyerParams?.dealLimitBypass) {
            getBuyerParamData(() => {});
        }
    })

    useEffect(() => {
        // if(window.innerWidth <=1024 && !window.location.pathname?.includes('/buyer/view-cue-card')) {
        //     dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: 'For optimal browsing, we recommend accessing our platform on a desktop or laptop.', title: 'Optimized for Larger Screens'}));
        // }
    }, [])

    function handleBuyerStatusCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            let tncData = deepClone(tncState);  
            if(res?.data?.primaryMember)
            tncData.pricingTncConsent.value = false;
            else tncData.pricingTncConsent.value = res?.data?.tnc?.pricingTncConsent
            // if(res?.data?.status !== 'verified')  {
            //     // navigate('/buyer/profile');
            // }
            // if(res?.data) {
            //     if(!res.data?.onboardingCompleted) setBlockSite(true);
            //     else setBlockSite(false);
            // }
            setTncState(tncData);
        }
        else {

        }
        setBuyerStatusLoaded(true);
    } 

    function handleSuccess() {
        setBlockSite(false);
        navigate('/buyer/profile');
    }

    function handleTncUpdate(value, key){
        let tncData = deepClone(tncState);
        tncData[key].value = value;
        if(tncData[key].error) {
            tncData[key].error = false;
        }
        setTncState(tncData);
    }

    function createPayload(){
        let data = {};
        if(Object.keys(tncState)?.length) {
            Object.keys(tncState).forEach(fieldKey => {
                let fieldData = tncState[fieldKey];
                    data[fieldKey] = fieldData.value;
            })
        }
        return data;
    }

    function handleTncConfirm(){
     if(!tncState?.webTncConsent?.value) return;
     let data = createPayload();
     let dataToSend = {
         postBody: {"tnc": data},
         method: PUT,
         url: ENDPOINT.TNC.updateTnc(),
         callback: handleTncCB
     }
     dispatch(updateFormToServer(dataToSend))
    }

    function handleTncCB(res){
     if(res?.status === API_SUCCESS_CODE){
        let dataToSend = {
            // callback: handleBuyerStatusCB
        }
        getBuyerStatus(dataToSend);
      }
     }
    
    function renderTncTerms(){
        return ( 
            <div className='pt-3'>
                   <div className='onboarding-field-wrapper mb-3'>
                        <div className={`text-14 text-344054 flex align-center`}>
                           <div onClick={() => handleTncUpdate(!getFieldLabelData(tncState, 'webTncConsent', 'value'), 'webTncConsent')}><CustomCheckboxIcon isActive={getFieldLabelData(tncState, 'webTncConsent', 'value')} /></div>
                            <span className='text-344054'>By marking this box, you agree to Done Deal’s
                            <a href="https://done.deals/buyer-t-c" target="_blank" rel="noopener noreferrer" className="underline font-bold cursor-pointer text-black ml-1">Terms & Conditions</a>
                            </span>
                        </div>
                    </div>
                    <div className='onboarding-field-wrapper mb-3'>
                        <div className={`text-14 text-344054 flex align-center`}>
                           <div className={`${!buyerVerificationState?.primaryMember?'pointer-events-none opacity-40':''} w-[40px]`} onClick={() => handleTncUpdate(!getFieldLabelData(tncState, 'pricingTncConsent', 'value'), 'pricingTncConsent')}><CustomCheckboxIcon disabled={!buyerVerificationState?.primaryMember} isActive={getFieldLabelData(tncState, 'pricingTncConsent', 'value')} /></div>
                           <span className='text-344054 ml-3'>(Optional) By marking this box, you agree to remit a success fee to Done Deal if you acqui-hire any company, equivalent to 1 month’s CTC of the talent acqui-hired</span>
                        </div>
                    </div>
                <Button onClick={handleTncConfirm} className={`${!tncState?.webTncConsent?.value ? 'pointer-events-none opacity-30' : ''} w-full !bg-black !text-white !mt-5 !py-3 !normal-case rounded-[8px] !font-bold !text-[18px]`}>Confirm</Button>    
            </div>
        )
    }

    return (
        <React.Fragment>
            {children}
            {
                blockSite &&
                <BuyerCommonModal
                    type ={'error'}
                    onClose={() =>{}}
                    styles={{maxWidth: 400}}
                    hideCancelAction={true}
                    confirmLabel="Go to Profile"
                    onSuccess={handleSuccess}
                    actionCtaFullWidth={true}
                    title={"Onboarding incomplete"}
                >
                    <div className='text-667085 text-14 margin-t15 margin-b10'>
                        To view sellers, please go to your profile and set your target preferences
                    </div>    
                </BuyerCommonModal>
            }
            {
                isAuthenticated() && 
                isBuyerUser() && 
                currentPageLocation?.pathname !== '/buyer/onboarding' && 
                buyerVerificationState?.status === 'verified' && 
                currentPageLocation?.pathname !== '/buyer/tnc-consent' && 
                !currentPageLocation?.pathname?.includes('/buyer/view-cue-card') &&
                !isMobileView() &&
                <DealPartnerInfoContainer />
            }
            {
                showElDetails?.isOpen &&
                <BuyerCommonModal
                    hideIcon={true}
                    styles={{maxWidth: 640}}
                    title={showElDetails?.title}
                    handleSaveAction={true}
                    hideAction={showElDetails?.state === 'awaiting' ? false : true}
                    onClose={() => dispatch(showElDetailsModal({isOpen: false, dataList: [], title: ''}))}
                >
                    <div className='margin-t30 flex flex-direction-coloum row-gap-32'>
                        {
                            showElDetails?.dataList?.length > 0 &&
                            showElDetails?.dataList.map((listItem) => {
                                return (
                                    <div className='flex col-gap-12 align-center'>
                                        <div className='flex-1 text-344054 font-500 text-14'>{listItem.label}</div>
                                        <div className='flex-1 text-667085'>{listItem?.type === 'date' ? getDate(listItem.value) : listItem.value}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </BuyerCommonModal>
            }
            {
                showDelist?.isOpen &&
                <ApproveActionModal
                    isopen={true} 
                    title="Are you sure you want to de-list this Seller?" 
                    handleOnClose={() => dispatch(showDelistModal({isOpen: false, companyId: ''}))} 
                    icon={WarningCircularIcon} 
                    data={SellerDelistReasonModel}
                    apiMethod={PUT}
                    handleSuccess={() => {dispatch(showDelistModal({isOpen: false, companyId: ''}));window.location.reload();}}
                    customObj={{companyId: showDelist?.companyId, verificationStatus: 'delist'}}
                    apiUrl={ENDPOINT.SELLERLISTING.verifySellerApi()}
                    successButtonText='De-list'
                    successBtnBackgroundColor='#D92D20'
                />
            }
            {
                isSlotSchedulerModalOpen?.open &&
                <SlotSchedulerModal
                    handleClose={() => {}}
                    companyUid={isSlotSchedulerModalOpen?.companyUid}
                    companyId={isSlotSchedulerModalOpen?.companyId}
                />
            }
            {
                noteModelView?.isOpen &&
                <NotesViewContainer />
            }
            {!isObjectEmpty(buyerVerificationState) && !buyerVerificationState?.tncCompleted && isBuyerUser() && currentPageLocation?.pathname !== '/buyer/onboarding' &&  ModalWrapper(renderTncTerms, 'Our Terms & Conditions', CircularSuccessIcon, '')()}
        </React.Fragment>
    )
}

export default NewLayoutContainer;