import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnalyticsOptionsModel, AnalyticsSubsections } from "./AnalyticsModel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import googleAnalyticsIcon from "../../assets/images/googleAnalyticsIcon.svg";
import { fetchGAData } from "../../Redux/slice/SellerSlice";
import { useDispatch } from "react-redux";
import { API_SUCCESS_CODE } from "../../constants";
import { useQuery } from "../../helper/customHook";
import CommonLineChart from "../../CommonComponent/CommonLineChart";
import dayjs from "dayjs";
import { customTimeFromNow, deepClone, formatNumberToTwoDecimalPlaces, isMobileView, isObjectEmpty } from "../../helper/commonHelper";
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import ContinousCircularProgressBar from "../../CommonComponent/ContinousCircularProgressBar";
import MobileNavigationScroll from "../../CommonComponent/MobileNavigationScroll";
import { trackEvent } from "../../helper/posthogHelper";
import { SELLER_LANDED_GRAPHS_GA } from "../../constants/posthogEvents";

const toolTipObj = {
    'totalUsers' : 'Users',
    'totalSessions' : 'Sessions',
    'totalBounceRate': 'Bounce Rate',
    'avgSessionDuration': 'Avg Session Duration (mins)'
}

function MainAnalytics({ data }) {
  const [selectedSection, setSelectedSection] = useState("audience");
  const [selectedSubsection, setSelectedSubsection] = useState("users");
  const [analyticsData, setAnalyticsData] = useState(data);
  const dispatch = useDispatch();
  const dataModel = AnalyticsOptionsModel;
  const Subsections = AnalyticsSubsections;
  const query = useQuery();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackEvent(SELLER_LANDED_GRAPHS_GA);
    if(data) setIsLoading(false);
  }, [data])

//   useEffect(() => {
//     if (query.get("id")) {
//       dispatch(fetchGAData({ callback: handleFetchGADataCb }));
//     }
//   }, []);

  function handleFetchGADataCb(res) {
    if (res?.status === API_SUCCESS_CODE) setAnalyticsData((res?.data));
    else navigate('/dashboard');
  }
    
  const getVerticalHeight = (listCount) => listCount > 1 ? 11 + (52 * (listCount - 1) + 10 * (listCount - 1)) : 14;
  
  const handleSelectedSubsection = (subsectionListItem) => {
    if (selectedSubsection === subsectionListItem.key) return;
    setSelectedSubsection("");
    setTimeout(() => setSelectedSubsection(subsectionListItem.key), 100);
  };
  
  const handleSectionClick = (selectedValue) => {
    if (selectedValue.key !== selectedSection) setSelectedSection(selectedValue.key);
    else setSelectedSection("");
  };
  
  const getTimeFromNow = (timestamp) => customTimeFromNow(timestamp);
  
  const getMonthName = (monthNumber = 1) => dayjs().month(monthNumber - 1).format('MMM');
  
  const transformDataForChart = (allData = [], type='') => {
    let data = deepClone(allData)?.reverse();
    let manipulatedData = data?.map(curr => ({
      'month-year': `${getMonthName(curr?.month)} ${curr?.year?.toString().slice(-2)}`,
      [type]: curr?.[type] ? formatNumberToTwoDecimalPlaces(parseFloat(curr?.[type])) : 0
    }));
    return manipulatedData;
  };

  function renderLeftSection() {
    return (
      <div className="w-1/4 h-full flex flex-col">
        <img className="w-20 h-20" src={googleAnalyticsIcon} alt="" />
        <div className="data-room-left-navigation !min-w-[200px] !bg-[#161616] !static">
          <div className="data-rom-left-navigation-content">
            {Object.keys(dataModel)?.length > 0 && Object.keys(dataModel).map((sectionKey, index) => {
              const sectionListItem = dataModel[sectionKey];
              return (
                <div className="" key={sectionKey}>
                  <div className={"flex align-center justify-space-between cursor-pointer padding-x16 padding-y14 " + (selectedSection === sectionListItem?.key ? "selected-section" : "")}>
                    <div className={"flex align-center col-gap-8"}>
                      {/* <div className="square-30 bg-3247FF rounded-full text-white text-16 font-600">{index + 1}</div> */}
                      <div>{sectionListItem?.label}</div>
                    </div>
                    {/* <KeyboardArrowDownIcon className={selectedSection === sectionListItem?.key ? "rotate_180deg" : ""} sx={{ color: "#B5B5B5", fontSize: "22px" }} /> */}
                  </div>
                  {selectedSection === sectionListItem?.key && Object.keys(Subsections[selectedSection])?.length > 0 && (
                    <div className="flex flex-direction-coloum row-gap-8 sub-section margin-t12 margin-l16 relative">
                      <div className="vertical-bar" style={{ height: `${getVerticalHeight(Object.keys(Subsections[selectedSection])?.length)}px` }}></div>
                      {Object.keys(Subsections[sectionListItem.key]).map((subsectionKey, index) => {
                        const subsectionListItem = Subsections[sectionListItem.key][subsectionKey];
                        return (
                          <div className={`relative padding-x16 padding-y14 ${selectedSubsection === subsectionListItem?.key ? "selected-section" : "text-ffffff66 padding-y14 padding-x16 cursor-pointer"}`} onClick={() => handleSelectedSubsection(subsectionListItem)} key={subsectionListItem?.key}>
                            <div className="section-marker"></div>
                            {subsectionListItem?.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function renderChart() {
    return <React.Fragment>
        <div className="flex items-center md:justify-end justify-between w-full">
        {isMobileView() ? <img className="w-20 h-20" src={googleAnalyticsIcon} alt="" /> : null }
        <div className="text-12 underline">Last updated {analyticsData?.updatedAt ? getTimeFromNow(analyticsData?.updatedAt) : ''}</div>
        </div>
        {isMobileView() ? <MobileNavigationScroll tabs={Object.values(Subsections?.audience)} handleTabClick={handleSelectedSubsection}/> : null}
        <div className={`${isMobileView()?'w-full':'w-5/6'} md:h-[75%] h-[50%] md:min-h-[400px] min-h-[250px] min-w-[300px] md:min-w-[400px] rounded-lg border-[#353535] border-[1px] bg-[#161616] mt-14`}>
        <div className="text-[20px] font-[600] md:px-[40px] md:py-[20px] pl-[30px] pt-[10px]">{Subsections?.[selectedSection]?.[selectedSubsection]?.label}</div>
          <CommonLineChart toolTipText = {toolTipObj?.[Subsections?.[selectedSection]?.[selectedSubsection]?.helperKey]} dataKey={Subsections?.[selectedSection]?.[selectedSubsection]?.helperKey} xAxisKey='month-year' data = {transformDataForChart((analyticsData?.monthWiseUserMetricData || []), Subsections?.[selectedSection]?.[selectedSubsection]?.helperKey)} className='!w-full !h-full text-[#7C8DB5] '/>
        </div>
    </React.Fragment>
  }

  function renderLoaderComponent() {
    return (

    <div className="w-[336px] flex flex-direction-coloum row-gap-8">
      <div>
        <ContinousCircularProgressBar
          sx={{color: '#3247FF', 
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                },
            }}
          size={50}
          thickness={5}
          value={80}
        />
      </div>
      <div className="margin-t8 font-500 text-16">Loading Your Metrics</div>
      <div className="text-16 font-300">We're fetching your metrics. Appreciate your patience as we prepare your Google Analytics data.</div>
    </div>
    )
  }
  
  function renderRightSection() {
    return (
      <div className={`${isMobileView()?'w-full':'md:w-3/4'} flex flex-col md:items-end items-center` + (isLoading ? 'justify-center text-center' : '')}>
        {
          false ?
          renderLoaderComponent()
          :
          renderChart()
        }
      </div>
    );
  }

  return (
    <div className="flex !h-[80vh] w-[calc(100% - 80px)] py-5">
      {isMobileView() ? null : renderLeftSection()}
      {renderRightSection()}
    </div>
  );
}

export default MainAnalytics;
