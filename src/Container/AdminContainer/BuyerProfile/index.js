import React, { useEffect, useState } from 'react';
import CustomTabs from '../../../CommonComponent/BuyerCommon/CustomTabs';
import { BuyerProfileTabData } from './ProfileTabModel';
import { ACTIVE_DEALS, API_SUCCESS_CODE, COMPANIES_INTERESTED, MANDATES, NOTES, PUT, RECOMMENDED_COMPANIES, SHORTLIST, USERS, VIEWED_COMPANIES } from '../../../constants';
import BuyerMandatesTable from './BuyerMandates';
import ActiveDeals from './ActiveDeals';
import CompanyInterested from './CompanyInterested';
import ProfilePage from './ProfilePage';
import FilterComponent from '../../../Component/FilterComponents';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyInterestedTableModel, UpdateCIModel, UpdateVCModel, ViewedCompanyTableModel } from './CompanyInterested/CompanyTableModel';
import NotesComponent from '../../../Component/NotesComponent';
import { ENDPOINT } from '../../../config/endpoint';
import { BuyerCreateNoteModel } from './BuyerProfileTableModel';
import BuyerNotesComponent from './BuyerNotesComponent';
import BuyerActivityContainer from './BuyerActivityContainer';
import RecommendedCompanies from '../../../Component/RecommendedCompanies';
import { RecommendedCompanyTableModel, UpdateRMModel } from '../../../Component/RecommendedCompanies/tablemodel';
import { recommendedSellertabData } from '../../../Component/RecommendedCompanies/RecommendedSeller/TabData';
import { UpdateRecommendedListModel, recommendedSellerTableData } from '../../../Component/RecommendedCompanies/RecommendedSeller/TableData';
import { updateAppHeaderState } from '../../../Redux/slice/AppNavigationSlice';
import CommonTableComponent from '../../../CommonComponent/CommonTableComponent';
import { AdminSubBuyersTableModel, updateUserTableModel } from './BuyerUserTable/BuyerUserTableModel';
import BuyerApprovalContainer from '../../../Component/BuyerApprovalContainer';
import { fetchBuyerProfile } from '../../../Redux/slice/BuyerSlice';
import { getCalculatedValue } from '../../../helper/commonHelper';
import { updateActionState } from '../../../Redux/slice/CommonSlice';
import DelistIcon from '../../../assets/images/delistIcon.svg'
import { NewButton } from '../../../CommonComponent/NewCustomButton';
import ApproveActionModal from '../../../CommonComponent/ApproveActionModal';
import { AdminBuyerDelistReasonModel } from '../AdminSeller/ActionModals/DataModel';
import WarningCircularIcon from '../../../assets/images/warningCircularIcon.svg';

function BuyerProfile() {
    const [selectedTab, setSelectedTab] = useState(BuyerProfileTabData()[0]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [page, setPage] = useState(1);
    const size = 10;
    const useParamValue = useParams();
    const [buyerData, setBuyerData] = useState({});
    const dispatch = useDispatch();
    const commonStore = useSelector((state) => state.commonStore);
    const [showDelistModal, setShowDelistModal] = useState(false);

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        document.body.style.backgroundColor = '#FDFDFD';
        
        return () => {
            dispatch(updateActionState({}));
            dispatch(updateAppHeaderState(false));
            document.body.style.backgroundColor = '#fff';
        }
    }, [])

    function handleTabClick(selectedValue) {
        setSelectedTab(selectedValue);
        setPage(1);
        // fetchBuyerProfileSellerData(selectedFilter, 1, size, handleGetCB);
    }

    function renderTabBasedSection() {
        switch(selectedTab.label) {
            case MANDATES:
                return <BuyerMandatesTable />
            case 'Interested Companies':
                if(buyerData?.id) return <CompanyInterested defaultData={{buyerId: buyerData?.id}} tableModel={CompanyInterestedTableModel()} UpdateListModel={UpdateCIModel} dealStatus={['express_interest']} key={'companyInterested'} />
                return '';
            case ACTIVE_DEALS:
                return <ActiveDeals buyerData={buyerData} />
            case VIEWED_COMPANIES:
                if(buyerData?.id)  return <CompanyInterested defaultData={{buyerId: buyerData?.id}}  tableModel={ViewedCompanyTableModel()} UpdateListModel={UpdateVCModel} dealStatus={['discovery', SHORTLIST]} key={'viewedCompany'} />
                return ''
            case NOTES:
                return <BuyerNotesComponent apiUrl={ENDPOINT.NOTES.getNotesQueryAPi} defaultFilters={{noteIdType: 'buyer', primaryid: buyerData?.id}} noteActionModal={BuyerCreateNoteModel()} createNoteApi={ENDPOINT.NOTES.createNoteApi()}/>
            case RECOMMENDED_COMPANIES:
                return <RecommendedCompanies 
                    apiUrl={ENDPOINT.MATCHING.query} 
                    tableModel={RecommendedCompanyTableModel()} 
                    UpdateListModel={UpdateRMModel}
                    primaryIdType="buyer"

                    modalTitle="Recommend a Seller"
                    buttonLabel={'Recommend seller'}
                    tabModel={recommendedSellertabData()}
                    updateModel={UpdateRecommendedListModel}
                    modalTableModel={recommendedSellerTableData()}

                />
                
            case 'Activity':
                return <BuyerActivityContainer parentData={buyerData} apiUrl={ENDPOINT.ACTIVITY.getActivityApi} defaultFilters={{'buyer.uid':  buyerData?.uid}} />
            case USERS:
                return <CommonTableComponent tableModel={AdminSubBuyersTableModel()} apiResponse={buyerData?.buyerMemberList} modifyResponseElement={updateUserTableModel} />
            default:
                return <ProfilePage parentData={buyerData} buyerId={useParamValue?.uid} getBuyerObj={(buyerData) => setBuyerData(buyerData)}/>
        }
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
          setBuyerData(apiData);
        }
        else {

        }
      }

      function renderDelistModal(uid){
        return (
            <ApproveActionModal
            isopen={true} 
            title="Are you sure you want to de-list this investor?" 
            handleOnClose={() => setShowDelistModal(false)} 
            icon={WarningCircularIcon} 
            data={AdminBuyerDelistReasonModel}
            apiMethod={PUT}
            handleSuccess={() => {setShowDelistModal(false); getBuyer(uid)}}
            customObj={{uid: uid, status: 'delist'}}
            apiUrl={ENDPOINT.BUYERS.verifyBuyerAPi()}
            successButtonText='De-list'
            successBtnBackgroundColor='#D92D20'
        />
        )
      }

    return (
        <div className='buyer-profile-container'>
             <div className='flex align-center justify-space-between'>
             <h1 className='text-48 font-600'>{`${(buyerData?.id ? `B${buyerData?.id}: `: '') + (buyerData?.companyName || 'Buyers Profile')}`}</h1>
             {
                (buyerData?.status === 'verified' || buyerData?.status === 'delist') && 
                <NewButton onClick={() => buyerData?.status === 'verified' && setShowDelistModal(true)} className={`admin-cue-card-edit custom-caps custom-color-${buyerData.status === "verified" ? 'red' : buyerData.status === "delist" ? 'grey' : ''} flex justify-center align-center gap-5`} variant={'contained'} >
                <img src={DelistIcon} className='delist-icon'/>
                <span>{buyerData.status === "verified" ? 'De-list Investor' : buyerData.status === "delist" ? 'Investor De-listed' : null}</span> 
                </NewButton>
             }
        </div>
            <CustomTabs tabData={BuyerProfileTabData()} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" buyerData={buyerData} />
            {/* <FilterComponent /> */}
            {renderTabBasedSection()}
            {
              commonStore?.actionState?.state &&
              <BuyerApprovalContainer actionState={commonStore?.actionState.state} formData={{...commonStore?.actionState?.formData, owner: buyerData?.owner, priority: buyerData?.priority, description: buyerData?.description}} handleRefresh={getBuyer} />
            }
            {showDelistModal && renderDelistModal(buyerData?.uid)}
        </div>
    )
}

export default BuyerProfile;