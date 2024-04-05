import { Stack, styled } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getBgColor, getColor, getDate, getValueFromArr } from "../../../helper/commonHelper";
import { isAdminUser } from "../../../Services";
import { BuyerTypeArr, PriorityArr } from "../../../CommonModels/CommonCollection";
import store from "../../../Redux";
import { Link } from "react-router-dom";
import { showTncDetails } from "../../../helper/actionHelper";
import { API_SUCCESS_CODE } from "../../../constants";
import { showElDetailsModal } from "../../../Redux/slice/CommonSlice";
import VerifiedStatusIcon from '../../../assets/images/verifiedStatusIcon.svg';
import InfoIcon from '../../../assets/images/infoIcon.svg';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import NewUserIcon from '../../../assets/images/newAddedUserIcon.svg';
import openToBothIcon from '../../../assets/images/openToBothIcon.svg'
import acqisitionIcon from '../../../assets/images/acqisitionIcon.svg'
import fundingIcon from '../../../assets/images/fundingIcon.svg'

function handleCb(res) {
    if(res?.status === API_SUCCESS_CODE) {
        let dataArr = [];
        dataArr.push({label: 'Buyer Name on T&C', value: res?.data?.tnc?.tncName});
        dataArr.push({label: 'Buyer Company Name T&C', value: res?.data?.tnc?.tncCompanyName});
        dataArr.push({label: 'T&C Signing Timestamp', value: res?.data?.tnc?.createdAt , type: 'date'});
        store.dispatch(showElDetailsModal({isOpen: true, dataList: dataArr, title: 'Buyer T&C Signature Log', showCancelBtn: true}));
    }
    else {

    }
}

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      padding: '10px',
    },
  }));

  const getTooltipTitle = (preferencesArr) =>{
    var output = [];

    
    preferencesArr.forEach(function(entry, index) {
        var sector = entry.sector;
        if(entry?.subsectorList?.length){
            entry?.subsectorList.forEach(function(subsector, subIndex) {
              output.push(sector + " > " + subsector + (subIndex < entry.subsectorList.length - 1 ? ", " : ""));
            });
          
          }
        else {
          output.push(sector);
        } 
        if (index < preferencesArr?.length - 1) {
          output.push(" | ");
        }
      });
    return output 
  }

  function decideInvestmentPref(data){
   let prefObj = {};
   if(data?.openToAcquisition && data?.openToFunding){
    prefObj.img = openToBothIcon;
    prefObj.label = 'Investment Purpose is Acquisition & Fundraising'
   }else if(data?.openToAcquisition && !data?.openToFunding){
    prefObj.img = acqisitionIcon;
    prefObj.label = 'Investment Purpose is Acquisition'
   }else if(!data?.openToAcquisition && data?.openToFunding){
    prefObj.img = fundingIcon;
    prefObj.label = 'Investment Purpose is Fundraising'
   }
   return prefObj;
  }

export function UpdateBuyerModel(dataResponse) {
    let nameKey = <div className="flex justify-between">
     <div className="w-1/2">
        {
            // isAdminUser() &&
            <div className="text-14">
                <Link to={`profile-page/${dataResponse.uid}`} target="_blank" className="text-2E90FA font-500">{dataResponse?.companyName || ''}</Link>
            </div>
        }
        <div className="text-667085 text-14">{`B${dataResponse.id}`}</div>
    </div>
    <div className="w-1/2 flex justify-center">
     <BootstrapTooltip
                title={decideInvestmentPref(dataResponse)?.label}
                placement="top"
              >
                <img src={decideInvestmentPref(dataResponse)?.img} style={{width: '25px'}} />
    </BootstrapTooltip> 
    </div>
    </div>

    let priortiesKey = <div className={"custom-chip " + (`bg-${getBgColor(dataResponse.priority)}`)}>
        <FiberManualRecordIcon sx={{color: getColor(), fontSize: '12px', marginRight: '3px', verticalAlign: 'middle'}} />
        <span className="text-12 font-500 " style={{color: getColor(dataResponse.priority)}}>
            {getValueFromArr(dataResponse?.priority, PriorityArr)}
        </span>
    </div>

    let preferences = "";
    let tooltipFlag = false;
    if(dataResponse?.preferences?.length) {
      if(dataResponse?.preferences?.length > 1 || dataResponse.preferences[0]?.subsectorList?.length >1){
          tooltipFlag = true;
      }
      preferences = `${dataResponse.preferences[0].sector}${dataResponse.preferences[0].subsectorList?.length ? ` > ${dataResponse.preferences[0].subsectorList[0]}` : ""}`;
    }

    let preferencesView = (
        <div className="flex align-center">
          {
            preferences &&
            <div style={{ background: "#F9F5FF", color: "#6941C6" , borderRadius:"13px"}}  className="text-12 font-500 padding-x10 padding-y5">
              <span className="text-12 font-500 " style={{color: "#6941C6" }}>
              {preferences}
              </span>
            </div>
          }
          { tooltipFlag && <BootstrapTooltip
              title={getTooltipTitle(dataResponse?.preferences)}
              placement="top"
            >
              <img src={InfoIcon} style={{width: '15px', marginLeft:"10px"}} />
          </BootstrapTooltip>}
        </div>
    )

    let tncCompleted = (
        <div>
            {
                dataResponse?.tncCompleted ? 
                <span className="text-2E90FA cursor-pointer" onClick={() => showTncDetails({id: dataResponse?.uid, type: 'buyer', callback: handleCb})}>Yes</span>
                :
                <span>No</span>
            }
        </div>
    )

    let prospectElement=(
        <div className="prospects-recommended">
          <span> {dataResponse?.viewedDealCount || 0}</span>
          {
            dataResponse.newRecommendations && <img className="w-[25px] h-[25px]" src={VerifiedStatusIcon} width='20px' height='20px' />
          }
        </div>
    )

    let buyerMemberDetails = (
      <div className="prospects-recommended">
          <span> {dataResponse?.buyerMemberCount || 0}</span>
          {
            dataResponse.additionalUnverified && <img className="w-[13px]" src={NewUserIcon} width='20px' height='20px' />
          }
        </div>
    )

    let buyerStatus = (
      <div className="text-14 text-[#B42318] font-medium bg-[#FEF3F2] rounded-xl py-1 px-2 capitalize w-[6rem] text-center">{dataResponse?.status==='delist'?'De-listed':dataResponse?.status}</div>
    )

    return {
        'name': nameKey,
        'phone' : isAdminUser() ? dataResponse.phone : 'NA',
        'priorties' : priortiesKey,
        'preferences': preferencesView,
        'owner': getValueFromArr(dataResponse.owner, (store.getState()?.authorizationStore?.adminUsersList || [])),
        'activeMandates': dataResponse?.mandateCount || 0,
        'activeDealCount': dataResponse?.activeDealCount || 0,
        'navigationId': dataResponse.uid,
        'tncCompleted': tncCompleted,
        'viewedDealCount':prospectElement,
        'createdAt': getDate(dataResponse.createdAt),
        'updatedAt': getDate(dataResponse.updatedAt),
        "type": getValueFromArr(dataResponse?.type, BuyerTypeArr),
        'buyerMemberCount': buyerMemberDetails,
        'status': buyerStatus
        // 'awaitingAction': <AwaitingActionContainer buyerData={dataResponse} />
    }
}