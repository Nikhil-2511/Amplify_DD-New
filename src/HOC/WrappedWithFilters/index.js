import React, { useEffect, useState } from 'react';
import CustomTabs from '../../CommonComponent/BuyerCommon/CustomTabs';
import CustomTableGrid from '../../Component/CustomTableGrid';
import { useDispatch, useSelector } from 'react-redux';
import { isMobileView, prepareFilterBody, prepareQueryFilter } from '../../helper/commonHelper';
import { applyFilters, updateTotalElements } from '../../Redux/slice/FilterSlice';
import { API_SUCCESS_CODE, GET, POST } from '../../constants';
import CustomPagination from '../../CommonComponent/CustomPagination';
import FilterComponent from '../../Component/FilterComponents';
import { fetchDataFromServer, reloadPage } from '../../Redux/slice/CommonSlice';
import { handleTitleUpdate } from '../../helper/actionHelper';
import FilterResultStrip from '../../CommonComponent/FIlterResultStrip';
import { Button } from '@mui/material';
import MobileCardView from '../../Component/MobileCardView';
import CreateMandateCTA from '../../Container/BuyersContainer/CreateMandateCTA';

/**
 * If row is clickable then make sure if your table cell has actions then stopped event bubbling
 */

function WrappedWithFilters({pageTitle, tabData, apiUrl, modifyResponseElement, hasPageFilter, hasNavigation, path, hasRefreshApi, hideSortBy, hidePagination, sortByArr, defaultSortBy={}, defaultFilterData={}, hideTabs, hasCustomAction, customActionComponent, resetSortByOnSearch, mobileViewComponent, rawData, renderNoMandatePage, showCreateMandateCTA = false}) {
    const [selectedTab, setSelectedTab] = useState(tabData[0]);
    // const selectedFilters = useSelector((state) => state.filterStore?.selectedFilters);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [page, setPage] = useState(1);
    const size = 10;
    const dispatch = useDispatch();
    const [tableModel, setTableModel] = useState(tabData[0]?.tableModel || {});
    const [dataList, setDataList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [disableNavigationFilter, setDisableNavigationFilter] = useState(tabData[0]?.disableFilter);
    const filterStore = useSelector((state) => state.filterStore);
    const [filterModel, setFilterModel] = useState(null);
    const [navigationFilters, setNavigationFilters] = useState({});
    const [pageRefresh, setPageRefresh] = useState(false);
    const [sortBy, setSortBy] = useState(tabData[0]?.defaultSortBy || defaultSortBy);
    const refreshPage = useSelector((state) => state.commonStore?.refreshPage);

    useEffect(() => {
        let modifyFilter = prepareTabChangeFilter(selectedTab);
        setFilterModel(selectedTab?.filterModel);
        setNavigationFilters(selectedTab?.preSelectedFilters || {});
        setSelectedFilters(modifyFilter);
        fetchData(modifyFilter, page, size, handleGetCB, selectedTab, sortBy);
    }, [])
    
    useEffect(() => {
        handleTitleUpdate(pageTitle);
    }, [pageTitle])

    useEffect(() => {
        if(pageRefresh || refreshPage) {
            handleDataRefresh();
            setPageRefresh(false);
            dispatch(reloadPage(false));
        }
    }, [pageRefresh, refreshPage])

    useEffect(() => {
        if(filterStore?.applyFilters) {            
            let modifyFilter = prepareTabChangeFilter(selectedTab);
            modifyFilter = {
                ...modifyFilter,
                ...selectedFilters
            }
            setPage(1);
            fetchData(modifyFilter, 1, size, handleGetCB, selectedTab, sortBy);
            dispatch(applyFilters(false));
        }
    }, [filterStore])

    function prepareTabChangeFilter(selectedTabValue) {
        if(!selectedTabValue) return;
        let modifyFilter = {};
        if(selectedTabValue?.value) {
            modifyFilter[selectedTabValue.key] = selectedTabValue?.operation ? {operation: selectedTabValue?.operation, value: selectedTabValue.value} : selectedTabValue.value;
        }
        if(selectedTabValue?.preSelectedFilters && Object.keys(selectedTabValue?.preSelectedFilters)?.length > 0) {
            modifyFilter = {
                ...modifyFilter,
                ...selectedTabValue.preSelectedFilters
            }
        }
        if(selectedTabValue?.multiPayload && Object.keys(selectedTabValue?.multiPayload)?.length) {
            Object.keys(selectedTabValue?.multiPayload).forEach((multiPayloadkeyName) => {
                let multiPayloadList = selectedTabValue.multiPayload[multiPayloadkeyName];
                if(multiPayloadList?.operation) {
                    modifyFilter[multiPayloadkeyName] = multiPayloadList
                }
                else {
                    modifyFilter[multiPayloadkeyName] = multiPayloadList.value;
                }
            })
        }
        return modifyFilter;
    }

    function handleTabClick(selectedValue) {
        setSelectedTab(selectedValue);
        let modifyFilter = {};
        modifyFilter = prepareTabChangeFilter(selectedValue);
        if(selectedValue?.preSelectedFilters) {
            setNavigationFilters(selectedValue?.preSelectedFilters);
        }
        else {
            setNavigationFilters({});
        }
        if(selectedValue?.tableModel) {
            setTableModel(selectedValue.tableModel);
        }
        else {
            if(tabData[0]?.tableModel) {
                setTableModel(tabData[0].tableModel);
            }
        }
        if(selectedValue.filterModel) {
            setDisableNavigationFilter(false);
            setFilterModel(selectedValue.filterModel);
        }
        else {
            setDisableNavigationFilter(true);
            setFilterModel({});
        }
        setSelectedFilters(modifyFilter);
        setPage(1);
        let sortByValue = sortBy;
        if(selectedValue?.defaultSortBy) {
            sortByValue = selectedValue?.defaultSortBy;
            setSortBy(sortByValue);
        }
        else if(!hideSortBy) {
            sortByValue = defaultSortBy;
            setSortBy(defaultSortBy);
        }
        
        fetchData(modifyFilter, 1, size, handleGetCB, selectedValue, sortByValue);
    }

    function fetchData(filterValue, page, size, handleCB, selectedValue, sortBy) {
        let dataToSend = {
            callback: (res) => handleCB(res, selectedValue)
        }, url = '';
        let filters = {
            ...filterValue,
            ...defaultFilterData
        }
        if(selectedValue?.url) {
            url += selectedValue?.url(page, size);
        }
        else {
            url = apiUrl(page, size, filters?.searchString);
        }
        if(!selectedValue?.getRequest) {
            let filterData = {}, searchCriteriaList = [];
            searchCriteriaList = prepareFilterBody(filters);
            filterData={
                searchCriteriaList,
                dataOption: "all"
            }
            if(!hideSortBy && sortBy?.fieldName) {
                filterData.sortCriteria = sortBy;
            }
            if(selectedValue?.criteriaMap) {
                filterData.criteriaMap = selectedValue?.criteriaMap;
            }
            dataToSend.postBody= filterData;
            dataToSend.method = POST;
        }
        else {
            url += prepareQueryFilter(filters, selectedValue);
            dataToSend.method = GET;
        }
        dataToSend.url = url;
        
        dispatch(fetchDataFromServer(dataToSend));
    }

    function handleGetCB(res, selectedTabData) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.elements?.length) 
            {
                let prepareModel = [];
                let pageRefreshHandle = hasRefreshApi ? () => setPageRefresh(true) : null;
                if(isMobileView() && rawData) {
                    prepareModel = res.data.elements;
                }
                else {
                    prepareModel = res.data.elements.map((elementList) => {
                        return  selectedTabData?.modifyTableModel ? selectedTabData?.modifyTableModel(elementList, pageRefreshHandle) : modifyResponseElement(elementList, pageRefreshHandle, selectedTabData.label);
                    })
                }
                setDataList(prepareModel);
                setTotalPages(res?.data?.totalPages);
                dispatch(updateTotalElements(res?.data?.totalElements));
            }
            else {
                setDataList([]);
                setTotalPages(0);
                dispatch(updateTotalElements(0));
            }
            // setPage(page + 1);
        }
        else {

        }
    }

    function handlePageChange (event, value) {
        setPage(value);
        fetchData(selectedFilters, value, size, handleGetCB, selectedTab, sortBy);
    }

    function handleDataRefresh() {
        fetchData(selectedFilters, page, size, handleGetCB, selectedTab, sortBy);
    }

    function handleUpdateFilter(filterValue) {
        let modifyFilter = {};
        if(selectedTab?.value) {
            if(filterValue.seller_status){
                modifyFilter = {verificationStatus: [filterValue.seller_status]}
            }else{
                modifyFilter = prepareTabChangeFilter(selectedTab);
            }
        }
        setNavigationFilters(filterValue);
        const { seller_status, ...filteredFilterValue } = filterValue;
        modifyFilter = {
            ...modifyFilter,
            ...filteredFilterValue
        }
        setSelectedFilters(modifyFilter);
        let newSortByValue = sortBy;
        if(filterValue?.searchString && resetSortByOnSearch) {
            let newValue = {
                direction: 'DESC',
                fieldName: 'ttmCalculated',
            }
            newSortByValue = newValue;
            setSortBy(newValue);
        }
        setPage(1);
        fetchData(modifyFilter, 1, size, handleGetCB, selectedTab, newSortByValue);
    }

    function updateSortBy(value) {
        setSortBy(value);
        fetchData(selectedFilters, 1, size, handleGetCB, selectedTab, value);
    }

    return (
        <div className='buyer-deals-container'>
            {
                !hideTabs &&
                <CustomTabs tabData={tabData} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" />
            }
            {
                !disableNavigationFilter && hasPageFilter &&
                <FilterComponent defaultValue={navigationFilters} filterUpdateCallback={handleUpdateFilter} filterModel={filterModel} tabLabel={selectedTab.label} />
            }
            {
                <div className='margin-t16 flex align-center'>
                    <div className='flex-1'>
                        {
                            !hideSortBy &&
                            <FilterResultStrip sortByArr={selectedTab?.sortByArr || sortByArr} sortBy={sortBy} handleSortSelect={updateSortBy} hideSortByFilter={hideSortBy} />
                        }
                    </div>
                    <div>
                        {
                            customActionComponent &&
                            customActionComponent()
                        }
                    </div>
                </div>
            }
            <div className={'margin-t16 ' + (selectedTab?.noResultHeading && dataList?.length === 0 ? '': 'table-container ') + (isMobileView() ? 'pb-[60px]': ' border border-EAECF0')}>
                {
                    ((!selectedTab?.noResultHeading && dataList?.length === 0) || dataList?.length > 0) &&
                    <React.Fragment>
                        {
                            isMobileView() && mobileViewComponent ?
                            <div className='flex flex-direction-coloum row-gap-24'>
                                {
                                    dataList?.length > 0 ?
                                    dataList.map((listItem, index) => {
                                        return (
                                            <React.Fragment  key={'listItem ' + index} >
                                                {mobileViewComponent({listData: listItem, selectedTab})}
                                            </React.Fragment>
                                        )
                                    }) : 
                                    renderNoMandatePage && renderNoMandatePage()
                                }
                            </div>
                            :
                            <CustomTableGrid tableModel={tableModel} tableData={dataList} path={path} hasNavigation={hasNavigation} />
                        }
                        {
                            totalPages > 0 && !hidePagination &&
                            <CustomPagination page={page} count={totalPages} onChange={handlePageChange} />
                        }
                    </React.Fragment>
                }
                {
                    selectedTab?.noResultHeading && dataList?.length === 0 &&
                    <div className='text-center'>
                        <div className="text-30 text-344054 font-600 lh-70">{selectedTab?.noResultHeading}</div>
                        <div className="text-20 text-667085 lh-30">{selectedTab?.norResultSubheading}</div>
                    </div>
                }
            </div>
           {showCreateMandateCTA ? <CreateMandateCTA source={pageTitle}/> : null }
        </div>
    )
}

export default WrappedWithFilters;