import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import CustomTabs from '../../CommonComponent/BuyerCommon/CustomTabs';
import NewTextField from '../../CommonComponent/NewTextField';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_SUCCESS_CODE, POST } from '../../constants';
import { fetchDataFromServer } from '../../Redux/slice/CommonSlice';
import CustomTableGrid from '../CustomTableGrid';
import CustomPagination from '../../CommonComponent/CustomPagination';


const style = {
    maxWidth: 800,
    maxHeight: '68vh',
    overflowY: 'auto',
    width: '100%',
    bgcolor: '#fff',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    color: '#101828',
    boxShadow: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
    padding: '24px 32px'
};  

function RecommendedModal({onClose, onSuccess, modalTitle, hideTabs, tabModel, modalTableModel, criteriaMap={}, updateModel}) {
    const [inputValue, setInputVaue] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const size = 20;
    const [listingData, setListingData] = useState([]);
    const [selectedTab, setSelectedTab] = useState(tabModel[0]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const useParam = useParams();

    
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
        if(inputValue) {
            getDataElements(page, size, handleGetCB);
            
        }
    }

    function handleRefresh() {
        getDataElements(page, size, handleGetCB);
    }

    function getDataElements(page, size, handleGetCB) {
        // let newFilter = prepareFilterWithSortBy(filters);
        if(!inputValue) return;
        let filterData = {
            criteriaMap: {
                ...criteriaMap,
                prompt: inputValue,
                searchType: selectedTab.searchType
            }
        };
        let dataToSend = {
            postBody: filterData,
            method: POST,
            url: `${selectedTab.url(page, size)}`,
            callback: handleGetCB
        };
        setIsLoading(true);
        dispatch(fetchDataFromServer(dataToSend));
    }

    function handleGetCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.elements?.length) 
            {
                let prepareModel = [];
                prepareModel = res.data.elements.map((elementList) => {
                    return updateModel(elementList, handleRefresh, selectedTab, inputValue);
                })
                setListingData(prepareModel);
                setTotalPages(res?.data?.totalPages);
            }
            else {
                setListingData([]);
                setTotalPages(0);

            }
        }
        else {
            setError(res?.data?.message);
            setListingData([]);
        }
        setIsLoading(false);
    }

    function handleClose() {
        onClose();
    }

    function handleTabClick(selectedValue) {
        setSelectedTab(selectedValue);
        setListingData([]);
        setInputVaue('');
        setError('');
    }

    function handlePageChange (event, value) {
        setPage(value);
        getDataElements(value, size, handleGetCB);
    }

    return (
        <Modal
            open={true}
            onClose={() => {}}
        >
            <div className='global-modal-container'>
                <Box className='' sx={style}>
                    <div className='flex flex-direction-coloum row-gap-20'>

                        <div className='text-101828 font-500 text-20'>{modalTitle || ''}</div>
                        {
                            !hideTabs &&
                            <div>
                                <CustomTabs tabData={tabModel} selectedTab={selectedTab} tabClick={handleTabClick} />
                            </div>
                        }
                        <div>
                            <div className='relative'>
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
                        </div>
                        <div>
                        {
                            <React.Fragment>
                                <CustomTableGrid tableModel={modalTableModel} tableData={listingData} />
                                {
                                    totalPages > 1 &&
                                    <CustomPagination page={page} count={totalPages} onChange={handlePageChange} />
                                }
                            </React.Fragment>
                        }
                        </div>
                        <div className='flex justify-end align-center col-gap-8'>
                            <Button className='capitalize' sx={{color: '#1D2939', fontWeight: 500}} variant='text' size="large" onClick={() =>handleClose()}>
                                {'Cancel'}
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
        </Modal>
    )
}

export default RecommendedModal;