import React, { useEffect, useLayoutEffect, useState } from 'react';
import './style.scss';
import BuyerListCard from '../BuyerListCard';
import { deepClone, globalMessage, isMobileView, isObjectEmpty, prepareFilterBody } from '../../../helper/commonHelper';
import { useDispatch, useSelector } from 'react-redux';
import { ALL, API_SUCCESS_CODE, HIGH_TO_LOW, MOST_RECENT, POST, RECOMMENDED } from '../../../constants';
import { ENDPOINT } from '../../../config/endpoint';
import { applyFilters, updateSortFilter, updateTotalElements } from '../../../Redux/slice/FilterSlice';
import { updateCompanyInterest } from '../../../Redux/slice/SellerSlice';
import { fetchDataFromServer, updateSnackbar } from '../../../Redux/slice/CommonSlice';
import CustomPagination from '../../../CommonComponent/CustomPagination';
import { getBuyerFilters, handleCompanyInterest, handleTitleUpdate } from '../../../helper/actionHelper';
import FilterComponent from '../../FilterComponents';
import FilterResultStrip from '../../../CommonComponent/FIlterResultStrip';
import { SortByArr } from '../../../CommonModels/CommonCollection';
import { DefaultFilterModels } from '../../../CommonModels/FilterModel';
import CustomTabs from '../../../CommonComponent/BuyerCommon/CustomTabs';
import { BrowseRecommendedTab, BrowseShortListTab, BrowseTabModel, BrowseAllTab } from './BuyerBrowseTabModel';
import MobileCardView from '../../MobileCardView';
import { Box, Button, Chip, Modal, Typography } from '@mui/material';
import BuyerMobileFilters from '../../FilterComponents/BuyerMobileFilters';
import AllFilter from '../../../assets/images/allFilter.svg'
import { checkUserRole } from '../../../utils/userRole';
import { CORPORATE_VC_KEY, VC_PE_KEY } from '../../../constants/keyVariableConstants';
import { trackEvent } from '../../../helper/posthogHelper';
import { BUYER_BROWSE_ALL, BUYER_BROWSE_PAGINATION, BUYER_BROWSE_RECOMMENDED, BUYER_BROWSE_SHORTLISTED, BUYER_CLICKED_COMPANY_DETAILS } from '../../../constants/posthogEvents';
// import InfiniteScroll from 'react-infinite-scroll-component';
  

function BuyerListing () {
    const [buyerLists, setBuyerLists] = useState([]);
    const [page, setPage] = useState(1);
    const size = 10;
    const [isLoading, setIsLoading] = useState(false);
    const [pageResponse, setPageResponse] = useState({totalElements: 0, totalPages: 1});
    const [selectedFilters, setSelectedFilters] = useState({});
    const defaultSortBy = {direction: 'DESC', fieldName: 'ttmCalculated'};
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [firstLoad, setFirstLoad] = useState(true);
    const dispatch = useDispatch();
    const [tabModel, setTabModel] = useState([]);
    const [selectedTab, setSelectedTab] = useState({});
    const [browseScreenSortByArr, setBrowseScreenSortByArr] = useState(SortByArr);
    const [sortByArrModified, setSortByArrModified] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const [isLoadingContent, setisLoadingContent] = useState(false);
    const buyerVerificationStore = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));
    const [hasMoreVal, setHasMoreVal] = useState(true);

    useLayoutEffect(() => {
        handleTitleUpdate('Browse Companies️');
    }, [])
   
    // useEffect(() => {
        // let filters = prepareFilters(selectedFilters, selectedTab);
        // fetchBuyerFilters(selectedTab);
    // }, [])

    useEffect(() => {
        if(!isObjectEmpty(buyerVerificationStore)) {
            let tabModelData = [], selectedTabData = {};
            if(buyerVerificationStore?.type === VC_PE_KEY || buyerVerificationStore?.type === CORPORATE_VC_KEY) {
                tabModelData = [{...BrowseAllTab}, { ...BrowseRecommendedTab }, { ...BrowseShortListTab }];
                selectedTabData = tabModelData[0];
            }
            else {
                tabModelData = BrowseTabModel();
                selectedTabData = tabModelData[1];
            }
            setTabModel(tabModelData);
            setSelectedTab(selectedTabData);
            handleTabClick(selectedTabData);
            if(firstLoad) setFirstLoad(false);
            setisLoadingContent(true);
        }
    }, [buyerVerificationStore])

    function getFilterCallback(res, filterData, selectedTabValue, sortBy) {
        function handleGetCBWrapper(res){
            handleGetCB(res, selectedTabValue)
        }
        if(res?.status === API_SUCCESS_CODE) {
            setSelectedFilters(filterData);
            let filters = prepareFilters(filterData, selectedTabValue);
            getSellerListing(filters, page, size, handleGetCBWrapper, sortBy);
        }
        else {
            
        }
    }

    function prepareFilters(selectedFilters, selectedTabValue) {
        let modifyFilter = deepClone(selectedFilters);
        if(selectedTabValue?.value) {
            modifyFilter[selectedTabValue.key] = selectedTabValue?.operation ? {operation: selectedTabValue?.operation, value: selectedTabValue.value} : selectedTabValue.value;
        }
        if(selectedTabValue?.preSelectedFilters && Object.keys(selectedTabValue?.preSelectedFilters)?.length > 0) {
            modifyFilter = {
                ...modifyFilter,
                ...selectedTabValue.preSelectedFilters
            }
        }
        return modifyFilter;
    }

    function getSellerListing(filters, page, size, handleGetCB, sortBy, customApiUrl) {
        // let newFilter = prepareFilterWithSortBy(filters);
        let filterData = {}, searchCriteriaList = [];
            searchCriteriaList = prepareFilterBody(filters);
            filterData={
                searchCriteriaList,
                dataOption: "all"
            }
            if(sortBy?.fieldName) {
                filterData.sortCriteria = sortBy;
            }
            
        let dataToSend = {
            postBody: filterData,
            method: POST,
            url: customApiUrl || ENDPOINT.BUYERS.buyerListing(page, size),
            callback: handleGetCB
        };
        setIsLoading(true);
        dispatch(fetchDataFromServer(dataToSend));
    }

   /* line 108 - 111 -> If it's the first page load and the selected tab is "Recommended" with an empty list,
     switch to the "All" tab. */

    function handleGetCB(res, targetTab = '') {         
        if(res.status === '200') {
            let elements = res?.data?.elements || [];
            setBuyerLists(elements);
            if (firstLoad) {
              if (selectedTab?.label === RECOMMENDED && !elements?.length && targetTab?.label !== tabModel[0]?.label){
                setSortBy(defaultSortBy);
                setBrowseScreenSortByArr(SortByArr);
                handleTabClick(tabModel[0]);
              }
            }
            setPageResponse({
                totalPages: res?.data?.totalPages,
                totalElements: res?.data?.totalElements
            });
            dispatch(updateTotalElements(res?.data?.totalElements || 0));
        }
        else {
            setPageResponse({
                totalPages: 1,
                totalElements: 0
            });
            dispatch(updateTotalElements(0));
        }
        setIsLoading(false);
    }

    function handleCompanyAction(action, disableCB, index, shortlisted) {
        handleCompanyInterest({action, id: buyerLists[index]?.id, callback: handleActionCb, shortlisted});
    }

    function handleActionCb(action, res) {
        // if(res.status === API_SUCCESS_CODE) {
            let filters = prepareFilters(selectedFilters, selectedTab);
            getSellerListing(filters, page, size, handleGetCB, sortBy);
        // }
    }

    function handlePageChange (event, value) {
        setPage(value);
        let filters = prepareFilters(selectedFilters, selectedTab);
        getSellerListing(filters, value, size, handleGetCB, sortBy);
        window.scrollTo(0, 0);
        trackEvent(BUYER_BROWSE_PAGINATION);
    }

    function handleGetScrollCB(res) {
        if(res.status === API_SUCCESS_CODE) {
            if(res?.data?.elements?.length) {
                setBuyerLists((preData) => [...preData, ...res?.data?.elements]);
            }
        }
        else {
            if(res?.daa?.message) globalMessage(res.data.message, 'Warning');
        }
    }

    function updateSortBy(value) {
        setSortBy(value);
        let filters = prepareFilters(selectedFilters, selectedTab);
        getSellerListing(filters, 1, size, handleGetCB, value);
    }

    
    function handleUpdateFilter(filterValue) {
        setSelectedFilters(filterValue);
        setPage(1);
        setHasMoreVal(true);
        let filters = prepareFilters(filterValue, selectedTab);
        getSellerListing(filters, 1, size, handleGetCB, sortBy);
    }

    function handleTabClick(selectedValue) {
        setSelectedTab(selectedValue);
        setSelectedFilters({});
        setPage(1);
        setHasMoreVal(true);
        let newSortBy = sortBy;
        if(sortByArrModified) {
            newSortBy = defaultSortBy;
            setSortBy(newSortBy);
            setBrowseScreenSortByArr(SortByArr);
            setSortByArrModified(false);
        }
        // if(selectedValue?.label === 'All') {
        //    fetchBuyerFilters(selectedValue, newSortBy);
        // }
        if(selectedValue.label === 'Recommended') {
            trackEvent(BUYER_BROWSE_RECOMMENDED);
            let filters = prepareFilters({}, selectedValue);
            let sortBy = {
                direction: 'DESC',
                fieldName: 'recommendationId',
                value: 'Suggested Date \u2193'
            }
            let sortByArr = [...SortByArr, sortBy];
            setSortBy(sortBy);
            setBrowseScreenSortByArr(sortByArr);
            setSortByArrModified(true);
            getSellerListing(filters, 1, size, handleGetCB, sortBy);
        }
        else if(selectedValue?.label === 'Shortlisted') {
            trackEvent(BUYER_BROWSE_SHORTLISTED);
            let filters = prepareFilters({}, selectedValue);
            getSellerListing(filters, 1, size, handleGetCB, newSortBy)
        }
        else {
            trackEvent(BUYER_BROWSE_ALL);
            fetchBuyerFilters(selectedValue, newSortBy);
            // getSellerListing({}, 1, size, handleGetCB, newSortBy);
        }
    }

    function fetchBuyerFilters(selectedTab, sortBy) {
        let dataToSend = {
            callback: (res, filterData) => getFilterCallback(res, filterData, selectedTab, sortBy)
        }
        getBuyerFilters(dataToSend);
    }

    function getFiltersCount() {
        let count = (Object.keys(selectedFilters)?.length);
        let subsectorCount = 0;
        if(selectedFilters?.['preferences.sector']) {
          let preferenceSector = selectedFilters?.['preferences.sector'];
          for(let i=0; i <preferenceSector?.length; i++) {
            let sectorList = preferenceSector[i];
            if(sectorList?.subsectorList?.length) {
              subsectorCount = 1;
              break;
            }
          }
        }
        return count + subsectorCount;
    }

    function handleEventClick(){
        trackEvent(BUYER_CLICKED_COMPANY_DETAILS,{
          source: `browse_${selectedTab?.label}`
        })
      }

    function fetchMoreData(){
        if(buyerLists.length >= pageResponse.totalElements){
          setHasMoreVal(false);
          return;
        }
        handlePageChange(page+1);
    }

    return (
        <div>
            {
                isLoadingContent &&
                <React.Fragment>
                    <CustomTabs tabData={tabModel} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" />
                    {
                        !isMobileView() &&
                        <div className='padding-b10'>
                            {
                                selectedTab.hasFilters &&
                                <FilterComponent defaultValue={selectedFilters} filterUpdateCallback={handleUpdateFilter} filterModel={DefaultFilterModels} />
                            }
                            <div className='text-24 font-600 margin-t16 margin-b8'></div>
                            <div>
                                <FilterResultStrip sortBy={sortBy} handleSortSelect={updateSortBy} sortByArr={browseScreenSortByArr} />
                            </div>
                        </div>
                    }
                    {
                        isMobileView() && selectedTab?.label === 'All' && 
                        <>
                            <div className='custom-all-filter'>
                                <div className='flex all-filter' onClick={handleOpenModal}>
                                    <img src={AllFilter} style={{width: '20px'}}/>
                                    {/* <span style={{color: 'white'}}>All Filter</span> */}
                                    {
                                        getFiltersCount() > 0 &&
                                        <span className="badge-container margin-l5">{getFiltersCount()}</span>
                                    }
                                </div>
                            </div>
                            { open && 
                                <BuyerMobileFilters defaultValue={selectedFilters} handleCloseModal={handleCloseModal} filterUpdateCallback={handleUpdateFilter} filterModel={DefaultFilterModels} />
                            }
                        </>
                    }
                    <div className={`${isMobileView()?'overflow-y-scroll pb-[60px]':''}`}>
                    {
                        ((!selectedTab?.noResultHeading && buyerLists?.length === 0) || buyerLists?.length > 0) &&
                        // <InfiniteScroll 
                        //     dataLength={buyerLists.length} 
                        //     next={fetchMoreData} 
                        //     hasMore={hasMoreVal}
                        //     loader={<h4>Loading...</h4>}>
                            <div className={`buyer-listing-container margin-b30`}>
                                {
                                    buyerLists?.length > 0 &&
                                    buyerLists.map((listItem, index) => {
                                        return (
                                            <div className='list-card-container' key={`listItem ${index}`}>
                                                {
                                                    (listItem?.mandateName || listItem?.activeDealCount > 0) &&
                                                    <div className={'flex col-gap-8 ' + (isMobileView() ? '': 'margin-b10')}>
                                                        {
                                                            listItem?.mandateName &&
                                                            <Chip  sx={{padding: '2px 5px', background: '#EAECF0', height: '22px', color: '#1D2939', fontWeight: 500, fontSize: '12px'}} label={`Mandate: ${listItem?.mandateName || ''}`} />
                                                        }
                                                        {
                                                            listItem?.activeDealCount > 0 &&
                                                            <Chip  sx={{padding: '2px 5px', background: '#E0F2FE', height: '22px', color: '#026AA2', fontWeight: 500, fontSize: '12px'}} label={`In ${listItem?.activeDealCount || 0} active deals`} />
                                                        }
                                                    </div>
                                                }
                                                {
                                                    isMobileView() ?
                                                    <MobileCardView listData = {listItem} handleCompanyAction={(action, disableCB, shortlisted) => handleCompanyAction(action, disableCB, index, shortlisted)} handleEventClick={handleEventClick}/>
                                                    :
                                                    <BuyerListCard listData = {listItem} handleCompanyAction={(action, disableCB, shortlisted) => handleCompanyAction(action, disableCB, index, shortlisted)} handleEventClick={handleEventClick} />
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        // </InfiniteScroll>
                    }
                    {
                        selectedTab?.noResultHeading && buyerLists?.length === 0 &&
                        <div className='text-center'>
                            <div className="text-32 text-344054 font-600 lh-70">{selectedTab?.noResultHeading}</div>
                            <div className="text-20 text-667085 lh-30">{selectedTab?.norResultSubheading}</div>
                        </div>
                    }
                    {
                        pageResponse?.totalPages > 1 &&
                        <CustomPagination page={page} count={pageResponse?.totalPages} onChange={handlePageChange} />
                    }
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default BuyerListing;