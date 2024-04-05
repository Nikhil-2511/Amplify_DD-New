import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { prepareFilterBody, prepareQueryFilter } from '../../../../helper/commonHelper';
import CustomTableGrid from '../../../../Component/CustomTableGrid';
import CustomPagination from '../../../../CommonComponent/CustomPagination';
import { ENDPOINT } from '../../../../config/endpoint';
import { fetchActiveDeals, fetchCompanyInerested } from '../../../../Redux/slice/BuyerSlice';
import { ActiveDealsTableModel, UpdateActiveModelModel } from './ActiveDealsTabelModel';
import { CLOSING, DONE_DEAL, INTRODUCTION_PENDING_KEY, NEGOTIATION, ON_HOLD } from '../../../../constants';
import { updateAppHeaderState } from '../../../../Redux/slice/AppNavigationSlice';

function ActiveDeals({buyerData}) {
    const selectedFilters = useSelector((state) => state.filterStore?.selectedFilters);
    const [page, setPage] = useState(1);
    const size = 10;
    const dispatch = useDispatch();
    const [listElement, setListElement] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const useParam = useParams();
    const [filters, setFilters] = useState({dealStatus: [DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, INTRODUCTION_PENDING_KEY, ON_HOLD.key]});

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        return () => dispatch(updateAppHeaderState(false));
    }, [])

    useEffect(() => {
        if(buyerData?.id) {
            getDataElements(filters, page, size, handleGetCB);
        }
    }, [buyerData])

    function handlePageChange (event, value) {
        setPage(value);
        getDataElements(filters, value, size, handleGetCB);
    }

    function getDataElements(filters, page, size, handleGetCB) {
        let filterData = {}, searchCriteriaList = [];
        let newFilter = {...filters, "buyerId": buyerData?.id}
        searchCriteriaList = prepareFilterBody(newFilter);
        filterData={
            searchCriteriaList,
            dataOption: "all"
        }
        let dataToSend = {
            postBody: filterData,
            page,
            url: ENDPOINT.DEALS.getBuyerDealsApi(page, size),
            callback: handleGetCB
        };
        dispatch(fetchCompanyInerested(dataToSend));
    }

    function handleGetCB(res) {
        if(res.status === '200') {
            if(res?.data?.elements?.length) 
            {
                let prepareModel = [];
                prepareModel = res.data.elements.map((elementList) => {
                    return UpdateActiveModelModel(elementList);
                })
                setListElement(prepareModel);
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

    return (
        <div className='active-deals-container'>
            <div className='table-container'>
                <CustomTableGrid tableModel={ActiveDealsTableModel()} tableData={listElement} />
                {
                    totalPages > 0 &&
                    <CustomPagination page={page} count={totalPages} onChange={handlePageChange} />
                }
            </div>
        </div>
    )
}

export default ActiveDeals;