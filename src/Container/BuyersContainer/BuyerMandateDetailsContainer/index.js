import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMandateDetails } from '../../../Redux/slice/MandateSlice';
import { API_SUCCESS_CODE, CLOSING, DONE_DEAL, EXPRESS_INTEREST_KEY, INTRODUCTION_PENDING_KEY, NEGOTIATION, ON_HOLD } from '../../../constants';
import MandateProfilePage from '../../AdminContainer/MandateDetailsContainer/MandateProfilePage';
import { isAdminUser } from '../../../Services';
import { updateAppHeaderState } from '../../../Redux/slice/AppNavigationSlice';
import CustomTabs from '../../../CommonComponent/BuyerCommon/CustomTabs';
import { MandateShowPageTabModel } from '../../AdminContainer/MandateDetailsContainer/MandateShowPageModel';
import { ENDPOINT } from '../../../config/endpoint';
import RecommendedCompanies from '../../../Component/RecommendedCompanies';
import { BuyerMandateTableModel, UpdateBuyerMandateCITableModel, UpdateBuyerMandateTableModel } from '../../AdminContainer/MandateDetailsContainer/BuyerMandateTableModel';
import CompanyInterested from '../../AdminContainer/BuyerProfile/CompanyInterested';
import { ActiveDealsTableModel, UpdateActiveModelModel } from '../../AdminContainer/BuyerProfile/ActiveDeals/ActiveDealsTabelModel';
import MobileCardWrapper from '../../../Component/MobileCardWrapper';
import { mandateInteresedCard, mandateRecommendedCard } from '../BuyerMandate/BuyerMandateMobileCardModel';

function BuyerMandateDetailsContainer() {
    const dispatch = useDispatch();
    const [mandateData, setMandateData] = useState({});
    const [selectedTab, setSelectedTab] = useState(MandateShowPageTabModel()[0]);
    const useParamValue = useParams();
    const tabData = MandateShowPageTabModel();

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        document.body.style.backgroundColor = '#FDFDFD';
        return () => {
            dispatch(updateAppHeaderState(false));
            document.body.style.backgroundColor = '#fff';
        }
    }, [])
      
    function updateDocumentTitle(title) {
        let titlePuffix = ' - Done Deal'
        document.title = title + titlePuffix;
    }

    function handleTabClick(selectedValue) {
      setSelectedTab(selectedValue);
    }

    const renderCompaniesInfo = () => {
        return(
            <div>
                <RecommendedCompanies 
                    apiUrl={ENDPOINT.MATCHING.query} 
                    tableModel={BuyerMandateTableModel()} 
                    UpdateListModel={UpdateBuyerMandateTableModel}
                    primaryIdType="mandate"
                    showCTAs={false}
                    MobileComponent={MobileCardWrapper}
                    cardModelBuilder= {mandateRecommendedCard}
                />
            </div>
        )
    }

    const renderDealsInfo = () => {
        return(
            <CompanyInterested MobileComponent={MobileCardWrapper} cardModelBuilder= {mandateInteresedCard} defaultData={{mandateUid: [useParamValue?.uid]}} tableModel={ActiveDealsTableModel()} UpdateListModel={UpdateBuyerMandateCITableModel} dealStatus={[DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, INTRODUCTION_PENDING_KEY, EXPRESS_INTEREST_KEY, ON_HOLD.key]} userType = 'buyer' />
        )
    }

    function renderTabBasedSection() {
        switch(selectedTab?.label) {
            case 'Recommendation':
                return renderCompaniesInfo();
            case 'Active Deals':
                return renderDealsInfo();
            default:
                return <MandateProfilePage updateMandate = {setMandateData} hideRightSection updateDocumentTitle={updateDocumentTitle} />
        }
    }

    return (
        <div>
            <h1 className='text-48 font-600 margin-b30'>{`${mandateData?.name || 'Mandate Profile'}`}</h1>
            <CustomTabs tabData={tabData} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" />
            {renderTabBasedSection()}
        </div>
    )
}

export default BuyerMandateDetailsContainer;