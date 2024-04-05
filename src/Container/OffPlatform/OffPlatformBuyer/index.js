import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchDataFromServer } from '../../../Redux/slice/CommonSlice';
import { API_SUCCESS_CODE, POST } from '../../../constants';
import CustomPagination from '../../../CommonComponent/CustomPagination';
import CustomTableGrid from '../../../Component/CustomTableGrid';
import NewTextField from '../../../CommonComponent/NewTextField';
import { offSellertabData,offBuyertabData } from '../tabModel';

function OffPlatformBuyer({tableModel, apiUrl, updateModel}) {
    const [inputValue, setInputVaue] = useState('');
    const [page, setPage] = useState(1);
    const size = 10;
    const dispatch = useDispatch();
    const [listElement, setListElement] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');
    const [selectedTab, setSelectedTab] = useState(offBuyertabData()[0]);

    useEffect(() => {
        getDataElements(page, size, handleGetCB);
    }, [])

    function handleChange(value) {
        setInputVaue(value)
        setError('');
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        handleOnClick();
      }
    };

    function handleOnClick() {
        // if(inputValue) {
            getDataElements(page, size, handleGetCB);
            
        // }
    }

    function getDataElements(page, size, handleGetCB) {
        // let newFilter = prepareFilterWithSortBy(filters);
        let filterData = {
            criteriaMap: {
                prompt: inputValue || undefined,
                // searchType: selectedTab.searchType,
                primaryIdType: selectedTab.primaryIdType
            }
        };
        let dataToSend = {
            postBody: filterData,
            method: POST,
            url: `${apiUrl(page, size)}`,
            callback: handleGetCB
        };
        dispatch(fetchDataFromServer(dataToSend));
    }


    function handleGetCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.elements?.length) {
                let prepareModel = [];
                prepareModel = res.data.elements.map((elementList) => {
                    return updateModel({dataResponse: elementList, handleRefresh, selectedTab, inputValue});
                })
                setListElement(prepareModel);
                setTotalPages(res?.data?.totalPages);
            }
            else {
                setListElement([]);
                setTotalPages(0);

            }
        }
        else {
            setError(res?.data?.message);
            setListElement([]);
        }
    }

    function handleRefresh() {
        getDataElements(page, size, handleGetCB);
    }

    function handlePageChange (event, value) {
        setPage(value);
        getDataElements(value, size, handleGetCB);
    }

    return (
        <div className='offplatform-container'>
            <div className='relative margin-b16'>
                <NewTextField
                    className="rounded-8 "
                    value={inputValue} 
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyUp={handleKeypress}
                    size="small"
                    fullWidth
                    placeholder={selectedTab?.searchPlaceholder}
                    error={!!error}
                    helperText={error}
                    autoComplete='off'
                />
            </div>
            
            <div className='table-container'>
                <CustomTableGrid tableModel={tableModel} tableData={listElement} />
                {
                    totalPages > 0 &&
                    <CustomPagination page={page} count={totalPages} onChange={handlePageChange} />
                }
            </div>
        </div>
    )
}

export default OffPlatformBuyer;