import React, { useEffect, useState } from 'react';
import { AdminMandateShowPageTabModel, MandateShowPageTabModel } from './MandateShowPageModel';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MandateProfilePage from './MandateProfilePage';
import { updateAppHeaderState } from '../../../Redux/slice/AppNavigationSlice';
import CustomTabs from '../../../CommonComponent/BuyerCommon/CustomTabs';
import RecommendedCompanies from '../../../Component/RecommendedCompanies';
import { AdminRMTableModel, UpdateAdminSellerRMModel, UpdateAmdinSellerRMModalListModel, adminSellerRMModalTableData, adminSellerRMModaltabData } from './AdminRMTableModel';
import { ENDPOINT } from '../../../config/endpoint';
import CompanyInterested from '../BuyerProfile/CompanyInterested';
import { ActiveDealsTableModel, UpdateActiveModelModel } from '../BuyerProfile/ActiveDeals/ActiveDealsTabelModel';
import { CLOSING, DONE_DEAL, EXPRESS_INTEREST_KEY, INTRODUCTION_PENDING_KEY, NEGOTIATION, NOTES, ON_HOLD } from '../../../constants';
import AdminMandateNotesComponent from '../AdminMandates/AdminMandateNotesComponent/AdminMandateNotesComponent';
import { BuyerCreateNoteModel } from '../BuyerProfile/BuyerProfileTableModel';

function MandateDetailsContainer() {
    const [selectedTab, setSelectedTab] = useState(MandateShowPageTabModel()[0]);
    const dispatch = useDispatch();
    const [mandateData, setMandateData] = useState({});
    const useParamValue = useParams();
    const tabData = AdminMandateShowPageTabModel();

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        document.body.style.backgroundColor = '#FDFDFD';
        return () => {
            dispatch(updateAppHeaderState(false));
            document.body.style.backgroundColor = '#fff';
        }
    }, [])

    function updateDocumentTitle(title) {
        let titlePuffix = ' Admin'
        document.title = title + titlePuffix;
    }

    function renderTabBasedSection() {
        switch(selectedTab?.label) {
            case 'Recommendation':
                return renderCompaniesInfo();
            case 'Active Deals':
                return renderDealsInfo();
            case NOTES:
                return <AdminMandateNotesComponent apiUrl={ENDPOINT.NOTES.getNotesQueryAPi} defaultFilters={{noteIdType: 'mandate', primaryid: mandateData?.id}} noteActionModal={BuyerCreateNoteModel()} createNoteApi={ENDPOINT.NOTES.createNoteApi()}/>
            default:
                return <MandateProfilePage updateMandate = {(mandateData) => setMandateData(mandateData)} updateDocumentTitle={updateDocumentTitle} />
        }
    }


    const renderCompaniesInfo = () => {
        return(
            <div>
                <RecommendedCompanies 
                    apiUrl={ENDPOINT.MATCHING.query} 
                    tableModel={AdminRMTableModel()} 
                    UpdateListModel={UpdateAdminSellerRMModel}
                    primaryIdType="mandate"

                    modalTitle="Recommend a Seller"
                    buttonLabel={'Recommend seller'}
                    tabModel={adminSellerRMModaltabData()}
                    updateModel={UpdateAmdinSellerRMModalListModel}
                    modalTableModel={adminSellerRMModalTableData()}

                />
            </div>
        )
    }

    const renderDealsInfo = () => {
        return(
            <CompanyInterested defaultData={{mandateUid: [useParamValue?.uid]}} tableModel={ActiveDealsTableModel()} UpdateListModel={UpdateActiveModelModel} dealStatus={[DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, INTRODUCTION_PENDING_KEY, EXPRESS_INTEREST_KEY, ON_HOLD.key]} />
        )
    }

    function handleTabClick(selectedValue) {
        setSelectedTab(selectedValue);
    }

    return (
        <div className='mandate-container'>
            <h1 className='text-48 font-600 '>{`${(mandateData?.id ? `M${mandateData?.id}: ` : '') + (mandateData?.name || 'Mandate Profile')}`}</h1>
            <CustomTabs tabData={tabData} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" />
            {renderTabBasedSection()}
        </div>
    )
}

export default MandateDetailsContainer;