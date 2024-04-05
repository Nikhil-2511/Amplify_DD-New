import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAdminUser, isAuthenticated, isBuyerUser } from "../../Services";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import onlineAnalysis from "../../assets/images/onlineAnalysis.svg";
import { AccountsModel } from "./AnalyticsModel";
import InputFieldWrapper from "../../HOC/InputFieldsHOC";
import {
  deepClone,
  findValueOfSiblingKey,
  getFieldLabelData,
  isMobileView,
} from "../../helper/commonHelper";
import { NewButton } from "../../CommonComponent/NewCustomButton";
import MainAnalytics from "./MainAnalytics";
import { Button, circularProgressClasses } from "@mui/material";
import { useQuery } from "../../helper/customHook";
import { useDispatch } from "react-redux";
import {
  fetchGAData,
  fetchGASummary,
  getAnalyticsSummary,
} from "../../Redux/slice/SellerSlice";
import { API_SUCCESS_CODE } from "../../constants";
import { updateSnackbar } from "../../Redux/slice/CommonSlice";
import ContinousCircularProgressBar from "../../CommonComponent/ContinousCircularProgressBar";
import BuyerCommonModal from "../../CommonComponent/BuyerCommon/BuyerCommonModal";

function SellerAnalytics({}) {
  const navigate = useNavigate();
  const useParamValue = useParams();
  const [currentAccountsModel, setCurrentAccountsModel] = useState(AccountsModel);
  const [showAnayltics, setShowAnalytics] = useState(false);
  const [summaryData, setSummaryData] = useState({});
  const [analyticsData, setAnalyticsData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showNoDataState, setShowNoDataState] = useState();
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.get("code")) {
      dispatch(
        fetchGASummary({
          postBody: {
            code: query.get("code"),
          },
          callback: handleFetchGASummaryCb,
        })
      );
    } else {
      // dispatch(fetchGAData({callback: handleFetchGADataCb}));
      setIsLoading(true)
      dispatch(
        fetchGAData({ hideLoader: true, callback: handleFetchGADataCb })
      );
    }
    //  dispatch(fetchGAData({hideLoader: true, callback: handleFetchGADataCb}));
  }, []);

  function handleFetchGADataCb(res) {
    setIsLoading(false);
    if (res?.status == API_SUCCESS_CODE) {
      setAnalyticsData(res?.data);
      setShowAnalytics(true);
    } else {
      dispatch(
        getAnalyticsSummary({
          callback: handleFetchGASummaryCb,
        })
      );
      setShowNoDataState("data");
    }
  }

  function removeQueryParams() {
    const urlWithoutParams = window.location.pathname;
    window.history.replaceState({}, document.title, urlWithoutParams);
  }

  function handleGoBack() {
    let path = `/dashboard${
      useParamValue?.uid ? `/${useParamValue?.uid}` : ""
    }`;
    if (isAdminUser()) {
      path = `/admin-user${path}`;
    }
    navigate(path);
  }

  function createsOptionsForDropdown(accounts = [], type = "") {
    let options = [];
    for (let i = 0; i < accounts?.length; i++) {
      let optionObj = {};
      optionObj.optionValue = accounts[i]?.[type];
      optionObj.optionText = accounts[i]?.displayName;
      options.push(optionObj);
    }
    return options;
  }

  function handleFetchGASummaryCb(res) {
    removeQueryParams();
    if (res?.status !== API_SUCCESS_CODE) {
      // dispatch(
      //     updateSnackbar({
      //       message: "Something went wrong",
      //       isOpen: true,
      //       type: "error",
      //     })
      //   );
      setShowNoDataState("summary");
      //   navigate('/dashboard');
    }
    if (res?.status === API_SUCCESS_CODE) {
      if(!res?.data?.accountSummaries?.length) setShowNoDataState("summary");
      let currentData = deepClone(currentAccountsModel);
      currentData.accounts.options = createsOptionsForDropdown(
        res?.data?.accountSummaries || [],
        "account"
      );
      setCurrentAccountsModel(currentData);
      setSummaryData(deepClone(res?.data));
    }
  }

  function handleOnChange(value, key, item = "") {
    let accountsData = deepClone(currentAccountsModel);
    accountsData[key].value = value;

    if (key === "accounts") {
      accountsData["properties"].showField = true;
      accountsData["properties"].options = createsOptionsForDropdown(
        findValueOfSiblingKey(
          summaryData?.accountSummaries,
          "account",
          value,
          "propertySummaries"
        ),
        "property"
      );
    }
    setCurrentAccountsModel(accountsData);
  }

  function handleSaveAccount() {
    if (
      currentAccountsModel?.accounts?.value &&
      currentAccountsModel?.properties?.value
    ) {
      let payload = {
        postBody: {
          projectId: currentAccountsModel?.accounts?.value,
          propertyId: currentAccountsModel?.properties?.value,
        },
        callback: handleSaveAccountCb,
        hideLoader: true
      };
      dispatch(fetchGAData(payload));
      setIsLoading(true);
    }
  }

  function handleSaveAccountCb(res) {
    setIsLoading(false);
    if (res?.status === API_SUCCESS_CODE) {
      setAnalyticsData(res?.data);
      setShowAnalytics(true);
    }else{
          dispatch(
          updateSnackbar({
            message: "Something went wrong",
            isOpen: true,
            type: "error",
          })
        );
    }
  }

  function fetchTitle() {
    if (showNoDataState === "summary") {
      return "No accounts found";
    } else if (showNoDataState === "data") {
      return "No data found";
    } else {
      return "";
    }
  }

  function fetchInnerText() {
    if (showNoDataState === "summary") {
      return `We couldn't find any accounts for the google account you connected with. Request you to check your Google Analytics account once.`;
    } else if (showNoDataState === "data") {
      return `We didn't find any analytics data for the google account you connected with.`;
    } else {
      return "";
    }
  }

  function renderAccountSelection() {
    return (
      <div className="w-full h-full flex justify-between">
       {isMobileView() ? null : <div className="left-section flex flex-col justify-around items-center text-center w-1/3 h-full py-10">
          <div className="text-[24px] font-[500]">
            Choose Google Analytics account to connect
          </div>
          <img className="w-[80%] h-[60%]" src={onlineAnalysis} alt="" />
          <div className="text-[14px] font-[300]">
            Connect your Google Analytics for in-depth insights into website
            performance, covering user behavior, traffic sources, and popular
            content.
          </div>
        </div> }
        <div className={`${isMobileView()? 'w-full ' : 'w-2/5 '} right-section flex justify-end items-center`}>
          <div className="w-full items-start flex flex-col">
         {isMobileView() ? <div className="text-[20px] font-[500] py-3">Choose Google Analytics account to connect</div> : null}
            <div className="border-[1px] bg-[#1B1B1B] border-[#555557] rounded-[12px] w-full p-5">
              {Object.keys(currentAccountsModel)?.map((field, idx) => {
                return (
                  currentAccountsModel?.[field]?.showField && (
                    <React.Fragment key={idx}>
                      <InputFieldWrapper
                        required={false}
                        fieldLabel={currentAccountsModel?.[field]?.label}
                        type={currentAccountsModel?.[field].field_type}
                        error={
                          currentAccountsModel?.[field]?.error
                            ? currentAccountsModel?.[field]?.helperText
                            : ""
                        }
                        placeholder={currentAccountsModel?.[field]?.placeholder}
                        labelStyle="text-20"
                        options={currentAccountsModel?.[field]?.options}
                        isEditable={true}
                        onChange={(ans, item) =>
                          handleOnChange(ans, field, item)
                        }
                        selectedValue={currentAccountsModel?.[field]?.value}
                      />
                    </React.Fragment>
                  )
                );
              })}
            </div>
            <Button
              onClick={handleSaveAccount}
              className={`${
                currentAccountsModel?.accounts?.value &&
                currentAccountsModel?.properties?.value
                  ? "!bg-[#3247FF] !text-white"
                  : "!bg-[#BBBBBB] !text-[#000000]"
              } capitalize !shadow-none font-[500] !mt-10 !px-10 ${isMobileView() ? 'w-full' : ''}`}
              variant="outline"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function renderLoaderComponent() {
    return (
      <div className="w-full h-full flex flex-direction-coloum items-center justify-center row-gap-8">
        <div>
          <ContinousCircularProgressBar
            sx={{
              color: "#3247FF",
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
            size={50}
            thickness={5}
            value={80}
          />
        </div>
        <div className="margin-t8 font-500 text-16">Loading Your Metrics</div>
        <div className="text-16 font-300 text-center">
          We're fetching your metrics. Appreciate your patience as we prepare
          your Google Analytics data.
        </div>
      </div>
    );
  }

  return (
    <div className="seller-analytics-background-container !h-[80vh] w-[100vw] py-5">
      <div className="md:px-20 px-5 h-full w-full">
        <div
          className={"flex col-gap-8 cursor-pointer align-center "}
          onClick={handleGoBack}
        >
          <ArrowBackRoundedIcon fontSize="18" />
          <div className="text-14 font-500">Back to Dashboard</div>
        </div>
        {!showAnayltics ? (
          isLoading ? (
            renderLoaderComponent()
          ) : (
            renderAccountSelection()
          )
        ) : (
          <MainAnalytics data={analyticsData} />
        )}
        {showNoDataState ? (
          <BuyerCommonModal
            type={"error"}
            onClose={() => {}}
            styles={{
              maxWidth: 400,
              backgroundColor: "#353535",
              color: "white",
            }}
            hideCancelAction={true}
            confirmLabel="Go to dashboard"
            onSuccess={() => navigate("/dashboard")}
            actionCtaFullWidth={false}
            title={fetchTitle()}
            btnStyle={` !shadow-none !bg-[#3247FF] !text-white `}
          >
            <div className="text-667085 text-14 margin-t15 margin-b10 text-white">
              {fetchInnerText()}
            </div>
          </BuyerCommonModal>
        ) : null}
      </div>
    </div>
  );
}

export default SellerAnalytics;
