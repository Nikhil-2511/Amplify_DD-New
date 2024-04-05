import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyInterestedTableModel, UpdateCIModel } from './CompanyTableModel';
import CustomTableGrid from '../../../../Component/CustomTableGrid';
import CustomPagination from '../../../../CommonComponent/CustomPagination';
import { ENDPOINT } from '../../../../config/endpoint';
import { isMobileView, prepareFilterBody, prepareQueryFilter } from '../../../../helper/commonHelper';
import { fetchCompanyInerested } from '../../../../Redux/slice/BuyerSlice';
import { useParams } from 'react-router-dom';
import { updateAppHeaderState } from '../../../../Redux/slice/AppNavigationSlice';
import { mandateInteresedCard, mandateRecommendedCard } from '../../../BuyersContainer/BuyerMandate/BuyerMandateMobileCardModel';
import MobileMandateCard from '../../../../Component/MobileCard';

function CompanyInterested({buyerData, tableModel, UpdateListModel, dealStatus, defaultData, userType, MobileComponent, cardModelBuilder}) {
    const selectedFilters = useSelector((state) => state.filterStore?.selectedFilters);
    const [page, setPage] = useState(1);
    const size = 10;
    const dispatch = useDispatch();
    const [listElement, setListElement] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const useParam = useParams();
    const [filters, setFilters] = useState({dealStatus});
    const [mobileList, setMobileList] = useState([]);

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        return () => dispatch(updateAppHeaderState(false));
    }, [])

    useEffect(() => {
        // if(buyerData?.id) {
            getDataElements(filters, page, size, handleGetCB);
        // }
    }, [])

    function handlePageChange (event, value) {
        setPage(value);
        getDataElements(filters, value, size, handleGetCB);
    }

    function getDataElements(filters, page, size, handleGetCB) {
        // if(!useParam.buyerId) return;
        let filterData = {}, searchCriteriaList = [];
        let newFilter = {...filters, ...defaultData}
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
                setMobileList(res?.data?.elements || []);
                prepareModel = res.data.elements.map((elementList) => {
                    return UpdateListModel(elementList, userType);
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
      <div className="company-intrested-container">
        <div className="table-container">
          {isMobileView() && MobileComponent ? (
            <MobileComponent listData={mobileList}  buildCardData={cardModelBuilder}/>
          ) : (
            <CustomTableGrid tableModel={tableModel} tableData={listElement} />
          )}
          {totalPages > 0 && (
            <CustomPagination
              page={page}
              count={totalPages}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    );
}

export default CompanyInterested;