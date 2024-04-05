import React, { useEffect, useState } from 'react';
import FilterComponent from '../FilterComponents';
import CustomPagination from '../../CommonComponent/CustomPagination';
import { fetchCompanyInerested } from '../../Redux/slice/BuyerSlice';
import { ENDPOINT } from '../../config/endpoint';
import { prepareFilterBody, prepareFilterModel, prepareQueryFilter } from '../../helper/commonHelper';
import { useDispatch } from 'react-redux';
import NotesListCard from '../NotesListCard';
import { GET, POST } from '../../constants';
import { fetchDataFromServer } from '../../Redux/slice/CommonSlice';
import NotesActionModalContainer from './NotesActionModalContainer';
import CreateNoteIcon from '../../assets/images/createNoteCircularIcon.svg';
import { updateAppHeaderState } from '../../Redux/slice/AppNavigationSlice';

function NotesComponent({apiUrl, defaultFilters={}, hasPageFilter, getRequest, noteActionModal, createNoteApi}) {
    const [page, setPage] = useState(1);
    const size = 10;
    const dispatch = useDispatch();
    const [listElement, setListElement] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({});
    const [filterModel, setFilterModel] = useState(null);

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        getDataElements(filters, page, size, handleGetCB);
    }, [])

    function handlePageChange (event, value) {
        setPage(value);
        getDataElements(filters, value, size, handleGetCB);
    }

    function getDataElements(filters, page, size, handleGetCB) {
        // if(!useParam.buyerId) return;
        let dataToSend = {
            callback: handleGetCB
        }, url = '';
        let newFilter = {...filters};
        newFilter = Object.assign(filters, defaultFilters);
        url = apiUrl(page, size);

        if(!getRequest) {
            dataToSend.postBody = prepareFilterModel(newFilter);
            dataToSend.method = POST;
        }
        else {
            url += prepareQueryFilter(newFilter);
            dataToSend.method = GET;
        }
        dataToSend.url = url;
        
        dispatch(fetchDataFromServer(dataToSend));
    }

    function handleGetCB(res) {
        if(res.status === '200') {
            if(res?.data?.elements?.length) 
            {
                setListElement(res.data.elements);
                setTotalPages(res?.data?.totalPages);
            }
            else {
                setListElement([]);
                setTotalPages(0);

            }
            // setPage(page + 1);
        }
        else {

        }
    }

    function handleRefreshApi() {
        getDataElements(filters, page, size, handleGetCB);
    }

    return (
        <div className='notes-container'>
            <div className='notes-filter-container flex col-gap-24 margin-b24'>
                <div className='flex-1'></div>
                <div>
                    <NotesActionModalContainer 
                        apiUrl={createNoteApi} 
                        modelData={noteActionModal} 
                        defaultData={defaultFilters}
                        icon={CreateNoteIcon}
                        handleApprovalAction={handleRefreshApi} 
                        title={'Create Note'} />
                </div>
            </div>
            <div className=''>
                <NotesListCard noteLists={listElement} handleRefreshApi={handleRefreshApi} />
                {/* {
                    !disableNavigationFilter && hasPageFilter &&
                    <FilterComponent defaultValue={navigationFilters} filterUpdateCallback={handleUpdateFilter} filterModel={filterModel} />
                } */}
                {
                    totalPages > 0 &&
                    <CustomPagination page={page} count={totalPages} onChange={handlePageChange} />
                }
            </div>
        </div>
    )
}

export default NotesComponent;