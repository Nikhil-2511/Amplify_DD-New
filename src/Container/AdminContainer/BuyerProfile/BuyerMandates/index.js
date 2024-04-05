import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBuyerMandates } from '../../../../Redux/slice/MandateSlice';
import CustomTableGrid from '../../../../Component/CustomTableGrid';
import { Button, Pagination } from '@mui/material';
import { BackArrow, RightArrow } from '../../../../assets/icons';
import CustomPagination from '../../../../CommonComponent/CustomPagination';
const mandateList = {};

function BuyerMandatesTable() {
    const [page, setPage] = useState(1);
    const size = 10;
    const dispatch = useDispatch();
    const [totalPages, setTotalPages] = useState(0);
    const [tableModel, setTableModel] = useState({})


    useEffect(() => {
        getBuyerMandates();
    }, [])


    function getBuyerMandates(page) {
        let filterData = {}, searchCriteriaList = [];
        // searchCriteriaList = prepareFilterData(filters);
        filterData={
            searchCriteriaList,
            dataOption: "all"
        }

        let dataToSend = {
            page,
            size,
            postBody: filterData
        }
        dispatch(fetchBuyerMandates(dataToSend));
    }

    function handlePageChange (event, value) {
        setPage(value);
        // fetchSellerData(selectedFilters, value, size, handleGetCB);
    }

    return (
        <div className='mandates-table-container'>
            <div className='table-container'>
                <CustomTableGrid tableModel={tableModel} tableData={mandateList} />
                {
                    totalPages > 0 &&
                    <CustomPagination page={page} count={totalPages} onChange={handlePageChange} />
                }
            </div>
        </div>
    )
}

export default BuyerMandatesTable;