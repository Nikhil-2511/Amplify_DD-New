import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DealNotesTabModel } from './dealNotesTabModel';
import { handleTitleUpdate } from '../../helper/actionHelper';
import { getCompanyProfile } from '../../helper/commonHelper';
import DealActivityContainer from './dealActivityContainer';
import { ENDPOINT } from '../../config/endpoint';
import { DealCreateNoteModel } from './dealNotesModel';
import NotesComponent from '../../Component/NotesComponent';
import CustomTabs from '../../CommonComponent/BuyerCommon/CustomTabs';
import { updateAppHeaderState } from '../../Redux/slice/AppNavigationSlice';

function DealNotesContainer() {
    const useParamValue = useParams();
    const [selectedTab, setSelectedTab] = useState(DealNotesTabModel()[0]);
    const [companyDetails, setCompanyDetails] = useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        // handleTitleUpdate('Deal Notes');
        dispatch(updateAppHeaderState(true));
        // handleTitleUpdate(`Deal ${useParamValue?.uid}`);
        updateDocumentTitle(`${useParamValue?.uid}`);
        // getSellerDetails();
        
        return () => {
            document.body.style.backgroundColor = '#fff';
            dispatch(updateAppHeaderState(false));
        }
    }, [])

    function getSellerDetails() {
        let uid = useParamValue?.uid;
        if(uid) {
            getCompanyProfile(handleGetDetailsCB, uid);
        }
    }

    function updateDocumentTitle(title) {
        let titlePuffix = ' Deal Notes - Admin'
        document.title = title + titlePuffix;
    }

    function handleGetDetailsCB(res) {
        if(res.status === '200') {
            if(res?.data?.name) {
                setCompanyDetails(res?.data || {})
                handleTitleUpdate(res?.data?.name);
                // updateDocumentTitle(res?.data?.name)
            }
        }
    }

    function handleTabClick(selectedValue) {
        setSelectedTab(selectedValue);
    }
    
    function renderTabBasedSection() {
        switch(selectedTab.label) {
            case 'Activity':
                return <DealActivityContainer parentData={companyDetails} apiUrl={ENDPOINT.ACTIVITY.getActivityApi} defaultFilters={{'deal.id':  parseInt(useParamValue?.uid)}} />
            default:
                return <NotesComponent apiUrl={ENDPOINT.NOTES.getNotesQueryAPi}  noteActionModal={DealCreateNoteModel()} createNoteApi={ENDPOINT.NOTES.createNoteApi()} defaultFilters={{noteIdType: 'deal', primaryid: useParamValue?.uid}}/>
        }
    }

    return (
        <div className='seller-notes-container'>
            <h1 className='text-48 font-600'>{`Deal ${useParamValue?.uid}`}</h1>
            <CustomTabs tabData={DealNotesTabModel()} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" />
            {
                // Object.keys(companyDetails)?.length > 0 &&
                <React.Fragment>
                    {renderTabBasedSection()}
                </React.Fragment>
            }
        </div>
    )
}

export default DealNotesContainer;