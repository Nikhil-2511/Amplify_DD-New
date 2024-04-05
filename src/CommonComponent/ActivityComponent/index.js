import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { POST } from '../../constants';
import { prepareFilterModel } from '../../helper/commonHelper';
import { fetchDataFromServer } from '../../Redux/slice/CommonSlice';
import RenderListItem from './RenderListItem';
import './style.scss';
import CustomPagination from '../CustomPagination';

function ActivityComponent({apiUrl, defaultFilters}) {
    const [page, setPage] = useState(1);
    const size = 10;
    const dispatch = useDispatch();
    const [dataList, setDataList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({});
    const [filterModel, setFilterModel] = useState(null);

    useEffect(() => {
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

        dataToSend.postBody = prepareFilterModel(newFilter);
        dataToSend.method = POST;
        dataToSend.url = url;
        
        dispatch(fetchDataFromServer(dataToSend));
    }

    function handleGetCB(res) {
        if(res.status === '200') {
            if(res?.data?.elements?.length) 
            {
                setDataList(res.data.elements);
                setTotalPages(res?.data?.totalPages);
            }
            else {
                setDataList([]);
                setTotalPages(0);

            }
            // setPage(page + 1);
        }
        else {

        }
    }

    return (
        <div className='activity-container'>
            <div className='activity-content'>
                <div className='activity-header text-12 text-667085 font-500 bg-F9FAFB'>
                    <div className='width-15 activity-header-item'>Version</div>
                    <div className='width-30 activity-header-item'>Changed By</div>
                    <div className='width-30 activity-header-item'>User</div>
                    <div className='width-15 activity-header-item'>Timestamp</div>
                    <div className='width-10 activity-header-item'>Action</div>
                </div>
                {
                    dataList?.length > 0 &&
                    dataList.map((listItem, index) => {
                        return (
                            <React.Fragment key={`${listItem?.updatedAt} ${index}`}>
                                <RenderListItem listData={listItem} className={index === dataList?.length - 1 ? '' : 'border-b border-D0D5DD'} />
                            </React.Fragment>
                        )
                    })
                }
                {
                    !dataList?.length &&
                    <div className='text-center margin-t20'>No result found</div>
                }
                {
                    // totalPages > 0 &&
                    <CustomPagination page={page} count={totalPages} onChange={handlePageChange} />
                }
            </div>

        </div>
    )
}

export default ActivityComponent;