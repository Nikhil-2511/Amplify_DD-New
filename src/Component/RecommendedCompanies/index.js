import React, { useEffect, useState } from "react";
import CustomTableGrid from "../CustomTableGrid";
import CustomPagination from "../../CommonComponent/CustomPagination";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchDataFromServer,
  updateSnackbar,
} from "../../Redux/slice/CommonSlice";
import { ENDPOINT } from "../../config/endpoint";
import { POST } from "../../constants";
import RecommendedSeller from "./RecommendedSeller";
import "./style.scss";
import { recommendedSellertabData } from "./RecommendedSeller/TabData";
import {
  UpdateRecommendedListModel,
  recommendedSellerTableData,
} from "./RecommendedSeller/TableData";
import { updateAppHeaderState } from "../../Redux/slice/AppNavigationSlice";
import RecommendationsButton from "./Recommendations";
import { isMobileView } from "../../helper/commonHelper";
import MobileMandateCard from "../MobileCard";
import {
  BuyerUpdateMandateCard,
  mandateRecommendedCard,
} from "../../Container/BuyersContainer/BuyerMandate/BuyerMandateMobileCardModel";

function RecommendedCompanies({
  tableModel,
  primaryIdType,
  UpdateListModel,
  defaultSortBy = {},
  showCTAs = true,
  MobileComponent,
  cardModelBuilder,
  ...rest
}) {
  const [page, setPage] = useState(1);
  const size = 10;
  const dispatch = useDispatch();
  const [listElement, setListElement] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const useParam = useParams();
  const [filters, setFilters] = useState({});
  const [mobileList, setMobileList] = useState([]);

  useEffect(() => {
    dispatch(updateAppHeaderState(true));
    getDataElements(filters, page, size, handleGetCB);
    return () => dispatch(updateAppHeaderState(false));
  }, []);

  function handlePageChange(event, value) {
    setPage(value);
    getDataElements(filters, value, size, handleGetCB);
  }

  function getDataElements(filters, page, size, handleGetCB) {
    // if(!useParam.buyerId) return;
    let filterData = {
      criteriaMap: {
        primaryUid: useParam?.uid,
        primaryIdType: primaryIdType,
      },
    };

    if (defaultSortBy?.fieldName) {
      filterData.sortCriteria = defaultSortBy;
    }

    let dataToSend = {
      postBody: filterData,
      page,
      url: ENDPOINT.MATCHING.query(page, size),
      method: POST,
      callback: handleGetCB,
    };
    dispatch(fetchDataFromServer(dataToSend));
  }

  function handleGetCB(res) {
    if (res.status === "200") {
      if (res?.data?.elements?.length) {
        let prepareModel = [];
        setMobileList(res?.data?.elements || []);
        prepareModel = res.data.elements.map((elementList) => {
          return UpdateListModel(elementList, handleRefresh);
        });
        setListElement(prepareModel);
        setTotalPages(res?.data?.totalPages);
      } else {
        setListElement([]);
        setTotalPages(0);
      }
      // setPage(page + 1);
    } else {
    }
  }

  function handleRefresh() {
    getDataElements(filters, page, size, handleGetCB);
  }

  return (
    <div className="">
      {showCTAs ? (
        <div className="margin-y16 flex align-center justify-end col-gap-10">
          <div>
            <RecommendationsButton
              buttonLabel="Recommendations"
              criteriaMap={{
                primaryUid: useParam?.uid,
                primaryIdType: primaryIdType,
              }}
            />
          </div>
          <div>
            <RecommendedSeller
              handleRefresh={handleRefresh}
              criteriaMap={{ primaryUid: useParam?.uid, primaryIdType }}
              primaryIdType={primaryIdType}
              {...rest}
            />
          </div>
        </div>
      ) : null}
      <div className="table-container">
        {isMobileView() && MobileComponent ? (
         <MobileComponent listData={mobileList} buildCardData={cardModelBuilder}/>
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

export default RecommendedCompanies;
