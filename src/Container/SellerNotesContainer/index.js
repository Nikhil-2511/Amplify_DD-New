import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NotesComponent from '../../Component/NotesComponent';
import { ENDPOINT } from '../../config/endpoint';
import { handleTitleUpdate } from '../../helper/actionHelper';
import { useDispatch } from 'react-redux';
import { getCompanyProfile, getQueryParamFromUrl } from '../../helper/commonHelper';
import CustomTabs from '../../CommonComponent/BuyerCommon/CustomTabs';
import { RecommendedSellertListingTabData, SellerNotesTabModel } from './sellerNotesTabModel';
import SellerActivityContainer from './SellerActivityContainer';
import { SellerCreateNoteModel } from './sellerNotesModel';
import RecommendedCompanies from '../../Component/RecommendedCompanies';
import { RecommendedSellerListingTableData, SellerRecommendedTableModel, UpdateRecommendedListModel, UpdateSellerNotesRecommendedListModel, UpdateSellerRMModel } from './sellerNotesDataModel';
import { updateAppHeaderState } from '../../Redux/slice/AppNavigationSlice';
import NewCueCard from '../../Component/NewCueCard';
import SellerNotesCuecard from './SellerNotesCuecard';
import MenuCommonComponent from '../../CommonComponent/MenuCommonComponent';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { showDelistModal } from '../../Redux/slice/CommonSlice';
import DelistIcon from '../../assets/images/delistIcon.svg'
function SellerNotesContainer() {
    const useParamValue = useParams();
    const [selectedTab, setSelectedTab] = useState(SellerNotesTabModel()[0]);
    const [companyDetails, setCompanyDetails] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        document.body.style.backgroundColor = '#FDFDFD';
        handleTitleUpdate('Seller Notes');
        getSellerDetails();
        
        return () => {
            dispatch(updateAppHeaderState(false));
            document.body.style.backgroundColor = '#fff';
        }
    }, [])

    function getSellerDetails() {
        let uid = useParamValue?.uid;
        if(uid) {
            getCompanyProfile(handleGetDetailsCB, uid);
        }
    }

    function updateDocumentTitle(title) {
        let titlePuffix = '  Notes - Admin'
        document.title = title + titlePuffix;
    }

    function handleGetDetailsCB(res) {
        if(res.status === '200') {
            if(res?.data?.name) {
                setCompanyDetails(res?.data || {})
                handleTitleUpdate(res?.data?.name);
                updateDocumentTitle(res?.data?.name)
            }
        }
    }

    function handleTabClick(selectedValue) {
        dispatch(updateAppHeaderState(true));
        setSelectedTab(selectedValue);
    }

   
    
    function renderTabBasedSection() {
        switch(selectedTab.label) {
            case 'Activity':
                return <SellerActivityContainer parentData={companyDetails} apiUrl={ENDPOINT.ACTIVITY.getActivityApi} defaultFilters={{'company.uid':  useParamValue?.uid}} />
            case 'Recommended Buyers': 
                return <RecommendedCompanies 
                            apiUrl={ENDPOINT.MATCHING.query} 
                            tableModel={SellerRecommendedTableModel()} 
                            UpdateListModel={UpdateSellerRMModel} 
                            primaryIdType="seller"

                            modalTitle="Recommend a Buyer"
                            buttonLabel={'Recommend Buyer'}
                            criteriaMap={{primaryUid: useParamValue?.uid, primaryIdType: 'seller'}}
                            updateModel={UpdateSellerNotesRecommendedListModel}
                            tabModel={RecommendedSellertListingTabData()}
                            modalTableModel={RecommendedSellerListingTableData()}
                        />
            case 'Cue card': 
                return <SellerNotesCuecard />
            default:
                return <NotesComponent apiUrl={ENDPOINT.NOTES.getNotesQueryAPi}  noteActionModal={SellerCreateNoteModel()} createNoteApi={ENDPOINT.NOTES.createNoteApi()} defaultFilters={{noteIdType: 'seller', primaryid: companyDetails?.id}}/>
        }
    }

    function handleDeList(){
        if(companyDetails.verificationStatus !== 'delist'){
            dispatch(showDelistModal({isOpen:true, companyId: companyDetails.companyId}));
        }
    }

    return (
        <div className='seller-notes-container'>
        <div className='flex align-center justify-space-between'>
             <h1 className='text-48 font-600'>{`${(companyDetails?.id? `S${companyDetails?.id}: `: '') + companyDetails?.name || 'Notes'}`}</h1>
             {
                companyDetails.verificationStatus && 
                <NewButton className={`admin-cue-card-edit custom-caps custom-color-${companyDetails.verificationStatus === "delist" ? 'grey' : 'red'} flex justify-center align-center gap-5`} variant={'contained'} onClick={handleDeList}>
                <img src={DelistIcon} className='delist-icon'/>
                <span>{companyDetails.verificationStatus === "delist" ? 'Seller De-listed' : 'De-list Seller'}</span> 
                </NewButton>
             }
            
        </div>
           
            <CustomTabs tabData={SellerNotesTabModel()} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" />
            {
                Object.keys(companyDetails)?.length > 0 &&
                <React.Fragment>
                    {renderTabBasedSection()}
                </React.Fragment>
            }
        </div>
    )
}

export default SellerNotesContainer;