import React, { useEffect, useState } from 'react';
import CardContainer from '../CardContainer';
import { NewCueCardCommonModel } from './NewCueCardCommonData';
import { useDispatch, useSelector } from 'react-redux';
import { updateCuecardRefresh, updateFobiddenModel, updateLogoutModel, updatePreviousPath, updateSnackbar } from '../../Redux/slice/CommonSlice';
import { deepClone, getCueCardDetails, isMobileView, isObjectEmpty, prepareFilterBody } from '../../helper/commonHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { AGENCY, API_SUCCESS_CODE, CLOSING, DONE_DEAL, DiSCOVERY_KEY, ED_TECH, EXPIRED_LINK, EXPRESS_INTEREST_KEY, FINTECH, GAMING, INTRODUCTION_PENDING_KEY, INVALID_LINK, MARKET_PLACE, NEGOTIATION, ON_HOLD, OTHERS, PASS, SAAS, SHORTLIST } from '../../constants';
import { newCuecardAgency, newCuecardD2C, newCuecardEdTech, newCuecardFintech, newCuecardGaming, newCuecardGenric, newCuecardMarketPlace, newCuecardSaaS } from './NewCueCarDataModel';
import './style.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { updateCompanyInterest } from '../../Redux/slice/SellerSlice';
import SuccessLabel from '../../CommonComponent/SuccessLabel';
import WarningLabel from '../../CommonComponent/WarningLabel';
import CuecardChipInfo from '../CuecardChipInfo';
import { isAdminUser, isAuthenticated, isBuyerUser, isSellerUser } from '../../Services';
import { CuecardModel } from '../EditCuecardModal/editCueCardModel';
import { ENDPOINT } from '../../config/endpoint';
import EditCuecardModal from '../EditCuecardModal';
import CopyLinkIcon from '../../assets/images/newCopyLinkIcon.svg';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { getBuyerParamData, handleCompanyInterest } from '../../helper/actionHelper';
import { getOpenCuecardData } from '../../Redux/slice/CuecardSlice';
import ShareCuecardComponent from '../ShareCuecardComponent';
import { updateAppHeaderState } from '../../Redux/slice/AppNavigationSlice';
import WarningCircularIcon from '../../assets/images/warningCircularIcon.svg';
import CuecardActivity from './CuecardActivity';
import InformationStrip from '../../CommonComponent/InformationStrip';
import CuecardPitchDeck from './CuecardPitchDeck';
import MenuCommonComponent from '../../CommonComponent/MenuCommonComponent';
import { Chip } from '@mui/material';
import CustomTabs from '../../CommonComponent/BuyerCommon/CustomTabs';
import { newCueCardTabModel } from './NewcuecardTabModel';
import { AUDIT_KEY, CAPTABLE_KEY, DATAROOM_KEY, PITCHDECK_KEY } from '../../constants/keyVariableConstants';
import CuecardDefaultSection from './CuecardDefaultSection';
import CuecardDataroom from './CuecardDataroom';
import ConfirmExpressModal from './ConfirmExpressModal';
import MaximumLimitReachedModal from './MaximumLimitReachedModal';
import { fetchCompanyInerested } from '../../Redux/slice/BuyerSlice';
import CustomSelect from '../../CommonComponent/CustomSelect';
import { ActiveDealsStatus } from '../../CommonModels/CommonCollection';
import { trackEvent } from '../../helper/posthogHelper';
import { BUYER_EXPRESS_INTEREST, BUYER_PASS, BUYER_SHORTLIST } from '../../constants/posthogEvents';

// import { PencilIcon } from '../../../assets/icons';
// import PencilIcon from '../../../assets/images/pencilIcon.svg';

const DefaultDealListObj = {
    key: 'all',
    value: 'All',
}

function NewCueCard({isOpenUrl}) {
    const [cueCardData, setCueCardData] = useState({});
    const [cueCardModel, setCueCardModel] = useState(newCuecardD2C);
    const dispatch = useDispatch();
    const useParamValue = useParams();
    const [companyId, setCompanyId] = useState('');
    const cueCardStore = useSelector((state) => state.cuecardStore);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateCuecardLink, setShowCreateCuecardLink] = useState(false);
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.authorizationStore?.loginResponse);
    
    const tabModel = newCueCardTabModel();
    const [selectedTab, setSelectedTab] = useState(tabModel[0]);
    const buyerParams = useSelector((state) => state.buyerStore?.buyerParams);
    const [confirmExpressInterest, setConfirmExpressInterest] = useState(false);
    const [showLimitReached, setShowLimitReached] = useState(false);
    const [dealLists, setDealLists] = useState([DefaultDealListObj]);
    const [selectedDeal, setSelectedDeal] = useState('all');
    const [firstLoad, setFirstLoad] = useState(true);
    const [pageRefresh, setPageRefresh] = useState(false);
    const commonStore = useSelector((state) => state.commonStore);

    useEffect(() => {
        // if(isSellerUser()) {
        //     navigate('/deals');
        // }
        // else {
            dispatch(updateAppHeaderState(true));
            getCompanyId();
        // }
        return () => dispatch(updateAppHeaderState(false));
    }, [])

    useEffect(() => {
        if(commonStore?.cueCardRefresh) {
            setPageRefresh(true);
            dispatch(updateCuecardRefresh(false));
        }
    }, [commonStore])

    useEffect(() => {
        if(pageRefresh) {
            getCompanyId();
            setPageRefresh(false);
        }
    }, [pageRefresh])

    function updateDocumentTitle(title) {
        let titlePuffix = ' - Done Deal'
        if(isAdminUser()) {
            titlePuffix = ' - Cue Card - Admin'
        }
        document.title = title + titlePuffix;
    }

    function getCompanyId() {
        if(useParamValue?.uid) {
            setCompanyId(useParamValue.uid);
            if(!isOpenUrl) {
                fetchDetails(useParamValue?.uid, selectedDeal);
            }
            else {
                let dataToSend = {
                    uid:useParamValue?.uid,
                    callback: getDataCallback,
                }
                dispatch(getOpenCuecardData(dataToSend));
            }
        }
      }

    function fetchDetails(companyId, selectedDeal) {
        let dealid = selectedDeal !== 'all' ? selectedDeal : '';
        getCueCardDetails(companyId, getDataCallback, dealid);
    }

    function fetchBuyerDealsList(cueCardData) {
        let filterData = {}, searchCriteriaList = [];
        let newFilter = {
            "sellerId": cueCardData?.id,
            ...ActiveDealsStatus
        };
        searchCriteriaList = prepareFilterBody(newFilter);
        filterData={
            searchCriteriaList,
            dataOption: "all"
        }
        let dataToSend = {
            postBody: filterData,
            url: ENDPOINT.DEALS.getBuyerDealsApi(1, 20),
            callback: handleGetCompanyInterestedCB
        };
        dispatch(fetchCompanyInerested(dataToSend));
    }

    function handleGetCompanyInterestedCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.elements?.length) {
                let newData = res?.data?.elements.map((listData) => {
                    return {
                        key: listData?.id,
                        value: `D${listData?.id} ${listData?.buyerName}`
                    }
                })
                setDealLists([DefaultDealListObj, ...newData]);
            }
        }
        else {
            setDealLists([{...DefaultDealListObj}])
        }
    }
    
      const getDataCallback = (res) => {
        if(res?.status === API_SUCCESS_CODE) {
            setCueCardData(res?.data);
            updateDocumentTitle(res?.data?.title);
            if(isAdminUser() && firstLoad) {
                fetchBuyerDealsList(res?.data);
                setFirstLoad(false);
            }
          let businessType = res?.data?.category;
          switch(businessType) {
            case FINTECH:
              setCueCardModel(newCuecardFintech);
              break;
            case SAAS:
              setCueCardModel(newCuecardSaaS);
              break;
            case MARKET_PLACE:
              setCueCardModel(newCuecardMarketPlace);
              break;
            case GAMING:
              setCueCardModel(newCuecardGaming);
              break;
            case OTHERS:
              setCueCardModel(newCuecardGenric);
              break;
            case ED_TECH:
              setCueCardModel(newCuecardEdTech);
              break;
            case AGENCY:
              setCueCardModel(newCuecardAgency);
              break;
            default:
              setCueCardModel(newCuecardD2C);
          }
        }
        else {
            if(res?.data?.code === 'cue_card_link_not_valid' || res?.data?.code === 'cue_card_link_expired') {
                let title = 'Link expired', message = EXPIRED_LINK;
                if(res?.data?.code === 'cue_card_link_not_valid') {
                    title = 'Invalid link';
                    message = INVALID_LINK;
                }
                if(isAuthenticated()) {
                    dispatch(updateFobiddenModel({ isOpen: true, icon: WarningCircularIcon, title, message }));
                }
                else {
                    dispatch(updateLogoutModel({ isOpen: true, icon: WarningCircularIcon, title, message }));
                }
            }
        //   globalMessage(res.message);
        }
      }


    function handleAction(action) {
        // let newAction = '';
        // if(!cueCardData?.dealStatus) {
        //     newAction = action;
        // }
        if(action === SHORTLIST){
            trackEvent(BUYER_SHORTLIST);
        }
        if(action === PASS){
            trackEvent(BUYER_PASS);
        }
        if(action === EXPRESS_INTEREST_KEY) {
            if(!isObjectEmpty(buyerParams) && !buyerParams?.dealLimitBypass && (buyerParams?.interestDealCount === buyerParams?.totalInterestDealCount - 1)) {
                setConfirmExpressInterest(true);
                return;
            }
            if(!isObjectEmpty(buyerParams) && !buyerParams?.dealLimitBypass && (buyerParams?.interestDealCount - buyerParams?.totalInterestDealCount >= 0)) {
                !getDealsStatus(SHORTLIST) && handleCompanyInterest({action: SHORTLIST, id: cueCardData?.id, callback: handleActionCb, companyUid : cueCardData?.companyId});
                setShowLimitReached(true);
                return;
            }
            trackEvent(BUYER_EXPRESS_INTEREST);
        }

        handleCompanyInterest({action, id: cueCardData?.id, callback: handleActionCb, companyUid : cueCardData?.companyId});
    }

    function handleActionCb(action) {
        let cueCardDetals = deepClone(cueCardData);
        if(confirmExpressInterest) setConfirmExpressInterest(false);
        if(action === EXPRESS_INTEREST_KEY) {
            getBuyerParamData(() => {});
        }
        cueCardDetals.dealStatus = action;
        setCueCardData(cueCardDetals);
    }


    function getStatus() {
        switch(cueCardData?.dealStatus) {
            case EXPRESS_INTEREST_KEY:
                return 'Awaiting Seller Response';
            case SHORTLIST:
                return 'Shortlisted';
            case PASS:
                return 'Passed';
            case 'negotiation':
            case 'closing':
            case INTRODUCTION_PENDING_KEY: 
                return 'In conversation';
            case 'done_deal': 
                return 'Done Deal';
            case 'seller_rejected': 
                return 'Seller Rejected Interest';   
            case ON_HOLD.key:
                return ON_HOLD.value;
            default:
                return 'Not Relevant';
        }
    }

    function handleSuccessAction() {
        setTimeout(() => {
            fetchDetails(companyId, selectedDeal);
            setShowEditModal(false);
        }, 200)
    }

    function getCueCardUrl() {
        return `/buyer/cue-card/${cueCardData?.companyId || ''}`;
    }

    function handleLinkCopy() {
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.origin + getCueCardUrl())
            .then(() => {
                dispatch(updateSnackbar({
                    message: "Cue card link copied to clipboard.",
                    isOpen: true,
                }));
            })
            .catch(() => {
                dispatch(updateSnackbar({
                    message: "Please try again",
                    isOpen: true,
                }));
            });
        }
    }

    function getDealsStatus(dealStatusState) {
        return cueCardData?.dealStatus === dealStatusState;
    }

    function renderDescription() {
        return `${cueCardData?.activeDealCount} active deals with this company.`
    }

    function handleTabClick(selectedTabValue) {
        setSelectedTab(selectedTabValue);
    }

    function renderTabBasedData() {
        switch(selectedTab?.key) {
            case DATAROOM_KEY:
                return renderDataRoomSection();
            default :
                return renderDefaultSection();
        }
    }

    function handleDataroomView() {
        handleTabClick(tabModel[1])
    }

    function renderDefaultSection() {
        return (
            <CuecardDefaultSection cueCardModel={cueCardModel} cueCardData={cueCardData} handleAction={handleAction} handleDataroomView={handleDataroomView} />
        )
    }

    function renderDataRoomSection() {
        return (
            <CuecardDataroom cuecardData={cueCardData}  handleAction={handleAction} />
        )
    }
    
    function handleSendInterest() {
        setConfirmExpressInterest(false);
        handleCompanyInterest({action: EXPRESS_INTEREST_KEY, id: cueCardData?.id, callback: handleActionCb, companyUid : cueCardData?.companyId});
    }

    function handleSelectedDeal(valueObj) {
        setSelectedDeal(valueObj?.key);
        fetchDetails(companyId, valueObj?.key);
    }

    return (
        <div className={'buyer-cuecard-container ' + (isMobileView() ? 'margin-t20' : '')}>
            {
                isAuthenticated() && isBuyerUser() &&
                <div className='water-mark noselect'>{loggedInUser?.email}</div>
            }
            {
                !cueCardStore.isLoading &&
                <React.Fragment>
                    <div className={'' + (isMobileView() ? 'padding-l16' : '')}>
                        <div className='flex col-gap-10'>
                            {cueCardData?.verificationStatus === 'verified' && <SuccessLabel className="list-label success-label" label={"Verified"} /> }
                            {cueCardData?.dealStatus && cueCardData?.dealStatus !== DiSCOVERY_KEY && <WarningLabel className='list-label warning-label' label={getStatus()} />}
                            {!!cueCardData?.mandateName && <Chip  sx={{padding: '16px 5px', background: '#EAECF0', height: '22px', color: '#1D2939', fontWeight: 500, fontSize: '12px'}} label={`Mandate: ${cueCardData?.mandateName || ''}`} />}
                        </div>
                        <div className='flex justify-space-between col-gap-15'>
                            <div className='text-48 text font-600 margin-b8'>{cueCardData?.title || ''}</div>
                            {
                                isAdminUser() &&
                                <div>
                                    <div className='margin-b5'>Show cue card of</div>
                                    <CustomSelect
                                        className="rounded-8"
                                        parentClass={'bg-white text-101828 border border-D0D5DD min-width352'}
                                        label={selectedDeal || 'Select Range'} 
                                        options={dealLists} 
                                        handleSelect={handleSelectedDeal}
                                    />
                                </div>
                            }
                        </div>
                        <CuecardChipInfo chipData={cueCardData} />
                    </div>
                
                    {
                        isAdminUser() &&
                        <div className='text-right margin-b30 flex align-center justify-end col-gap-12'>
                            <div className='new-cue-card-copy-link' onClick={() => handleLinkCopy()}>
                                <div className='text-16'>Copy cue card link</div>
                                <div className='icon-container'>
                                    <img src={CopyLinkIcon} alt="" />
                                </div>
                            </div>
                            <NewButton className='admin-cue-card-edit capitalize' color="secondary" variant={'contained'} onClick={() => setShowEditModal(true)}>Edit Cue Card</NewButton>
                            <NewButton className='admin-cue-card-edit capitalize' color="secondary" variant={'contained'} onClick={() => setShowCreateCuecardLink(true)}>Share Cue Card</NewButton>
                        </div>
                    }
                    {
                        isBuyerUser() && cueCardData?.activeDealCount > 0 &&
                        <div className={isMobileView() ? '' : 'cuecard-activity-section'}>
                            <InformationStrip imageClassName={'' + (isMobileView() ? 'max-w20px h-20px' : '')} parentClassName={'bg-E0F2FE margin-b16 ' + (isMobileView() ? 'padding-8 rounded-6 col-gap-8' : 'padding-x30 padding-y12 rounded-12 margin-b30 col-gap-20')} descriptionClassName={'text-026AA2 ' + (isMobileView() ? 'text-12' : 'text-18')} description={renderDescription()} />
                        </div>
                    }
                    {
                        <CustomTabs tabData={tabModel} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" />

                    }
                    <div className='flex col-gap-30 new-cuecard-section'>
                        {
                            renderTabBasedData()
                        }
                    </div>
                </React.Fragment>
            }
            {
                showEditModal &&
                <EditCuecardModal 
                    cueCardData={cueCardData} 
                    editCueCardModel={CuecardModel} 
                    onCancel={() => setShowEditModal(false)} 
                    onSuccess={() => handleSuccessAction()} 
                    url={ENDPOINT.CUECARD.cueCardUpdate()} 
                    cancelLabel="Discard Changes"
                />
            }
            {
                showCreateCuecardLink &&
                <ShareCuecardComponent 
                    sellerData={cueCardData}
                    handleClose={() => setShowCreateCuecardLink(false)}
                />
            }
            {
                confirmExpressInterest &&
                <ConfirmExpressModal 
                    handleClose={() => setConfirmExpressInterest(false)}
                    handleSendInterest={handleSendInterest}
                />
            }
            {
                showLimitReached &&
                <MaximumLimitReachedModal 
                    handleClose={() => setShowLimitReached(false)}
                />
            }
        </div>
    )
}

export default NewCueCard;