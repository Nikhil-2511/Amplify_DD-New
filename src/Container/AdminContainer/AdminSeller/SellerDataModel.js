import { Stack } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getAppBaseUrl, getBgColor, getColor, getDate, getValueFromArr, getAuthBasedUrl, findValueOfSiblingKey } from "../../../helper/commonHelper";
// import { Link } from "react-router-dom";
import { EbitdaPositiveArr, OnboardingStageFilterOptions, PriorityArr, SellerVerificationStatusArr } from "../../../CommonModels/CommonCollection";
import ActionModals from "./ActionModals";
import store from "../../../Redux";
import { API_SUCCESS_CODE, HIGH, NORMAL } from "../../../constants";
import { showDelistModal, showElDetailsModal } from "../../../Redux/slice/CommonSlice";
import { showTncDetails } from "../../../helper/actionHelper";
import nonDiscoverableIcon from '../../../assets/images/nonDiscoverableIcon.svg'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import NoteViewIcon from '../../../assets/images/noteViewIcon.svg';
import ThreeDots from '../../../assets/images/threeDots.svg'
import { useState } from "react";
import MenuCommonComponent from "../../../CommonComponent/MenuCommonComponent";
import VerifiedBuilding from '../../../assets/images/verifiedBuilding.svg';
import GreenPencilIcon from '../../../assets/images/greenPencilIcon.svg';
import fundingIcon from '../../../assets/images/fundingIcon.svg'
import acqisitionIcon from '../../../assets/images/acqisitionIcon.svg'
import { ASSETS_URL } from "../../../config";

export const SELLERDATAMODEL = {
    'name': '',
    'priorties' : '',
    'ttmNet': '',
    'ebitda': '',
    'askPrice': '',
    'deals': '',
    'status': ''
}

function handleCb({res, uid, handleRefresh,state}) {
    if(res?.status === API_SUCCESS_CODE) {
        let dataArr = [];
        dataArr.push({label: 'Seller Name on EL', value: res?.data?.tnc?.tncName});
        dataArr.push({label: 'Seller Company Name on EL', value: res?.data?.tnc?.tncCompanyName});
        dataArr.push({label: 'EL Signature Timestamp', value: res?.data?.tnc?.createdAt, type: 'date'});
        store.dispatch(showElDetailsModal({isOpen: true, dataList: dataArr, title: 'Seller EL Signature Log', type: 'seller', uid, handleRefresh, state}));
    }
    else {

    }
}

const handleDeList = (companyId, handleRefresh) => {
    store.dispatch(showDelistModal({isOpen:true, companyId, handleRefresh}));
};

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

  function decideTitle(dataResponse) {    
    if (!!dataResponse?.openToOtherObjective) {
        if (dataResponse?.objective === 'funding') {
            return 'Primarily looking for Funding, Open for Acquisition';
        } else if (dataResponse?.objective === "acquisition") {
            return 'Primarily looking for Acquisition, Open for Funding';
        }
    } else {
        if (dataResponse?.objective === 'funding') {
            return 'Primarily looking for Funding';
        } else if (dataResponse?.objective === "acquisition") {
            return 'Primarily looking for Acquisition';
        }
    }
}


export function UpdateSellerModel(dataResponse, handleRefresh, tabLabel) {
    let nameKey = (<Stack direction={'column'} >
    <div className="flex justify-space-between align-center w-full">
        <div className="w-[70%]">
            <div className="text-14">
                    <span className="text-2E90FA">
                        <a href={`${getAppBaseUrl()}admin-user/dashboard/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{dataResponse?.name || ''}</a>
                    </span>
                    <span className="margin-l8 text-667085">{`S${dataResponse?.id}`}</span>
            </div>
            <div className="text-667085 font-600 text-14">{`${dataResponse?.category || ''} ${dataResponse?.subCategory || ''} ${dataResponse?.othersSubCategory || ''}`}</div>
        </div>
        <div className="flex items-center justify-between w-[30%]">
        { 
            !dataResponse.discoverable && (tabLabel === 'Verified Sellers' || tabLabel === HIGH || tabLabel === NORMAL)&& (
              <BootstrapTooltip
                title='Non-discoverable Seller'
                placement="top"
              >
                <img src={nonDiscoverableIcon} style={{width: '15px', marginLeft:"10px"}} />
              </BootstrapTooltip>
            )
        }

      { 
           (dataResponse?.hasOwnProperty('openToOtherObjective') || dataResponse?.objective) && (
              <BootstrapTooltip
                title={decideTitle(dataResponse)}
                placement="top"
                className={`${!dataResponse?.openToOtherObjective? 'capitalize' : ''}`}
              >
                <img src={dataResponse?.objective==='funding'? fundingIcon : acqisitionIcon} style={{width: '25px'}} />
              </BootstrapTooltip>
            )
        }    
        </div>    
    </div>
   
       
    </Stack>);

    let priortiesKey = <div className={`custom-chip bg-${getBgColor(dataResponse.priority)}`}>
        <FiberManualRecordIcon sx={{color: getColor(dataResponse.priority), fontSize: '12px', marginRight: '3px', verticalAlign: 'middle'}} />
        <span className="text-12 font-500 " style={{color: getColor(dataResponse.priority)}}>
            {getValueFromArr(dataResponse?.priority, PriorityArr)}
        </span>
    </div>

    let cueCard = <div className={`custom-chip bg-${getBgColor(dataResponse.priority)}`}>
        <a href={`${getAuthBasedUrl()}cue-card/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-12 font-500" style={{color: getColor(dataResponse.priority)}}>
            View
        </a>
    </div>
    let ebitaPositive = getValueFromArr(dataResponse.ebitda, EbitdaPositiveArr);
    let notes = (
      <div className="flex align-center gap-10">
        <div className={`custom-chip bg-ECFDF3`}>
          <a
            className="text-12 font-500 text-green"
            href={`${getAuthBasedUrl()}notes/${dataResponse.companyId}`}
            rel="noreferrer"
            target="_blank"
          >
            View
          </a>
        </div>
        {/* {(tabLabel === "Verified Sellers" || tabLabel === HIGH || tabLabel === NORMAL) && <MenuCommonComponent threeDots={ThreeDots} dataList={[{id: 1, value: 'De list seller'}]} handleParentClick={() => handleDeList(dataResponse.companyId, handleRefresh)} />} */}
      </div>
      
    );

    let tncState = (
        <div>
            {
                dataResponse?.tncState === "signed" ? <span className="text-2E90FA cursor-pointer" onClick={() => showTncDetails({id: dataResponse?.companyId, type: 'seller', callback: (res) => handleCb({res, uid: dataResponse?.companyId, handleRefresh, state:"yes"})})}>Yes</span>: 
                dataResponse?.tncState === "resign" ? <span className="text-2E90FA cursor-pointer"  onClick={() => showTncDetails({id: dataResponse?.companyId, type: 'seller', callback: (res) => handleCb({res, uid: dataResponse?.companyId, handleRefresh, state: "resign"})})}>Re-Sign</span>:
                dataResponse?.tncState === "awaiting_approval" ? <span className="text-2E90FA cursor-pointer" onClick={() => showTncDetails({id: dataResponse?.companyId, type: 'seller', callback: (res) => handleCb({res, uid: dataResponse?.companyId, handleRefresh, state:"awaiting"})})}>Review</span>
                :<span>No</span>
            }
        </div>
    )

    let prospectElement = (
      <div className="prospects-recommended">
        <span> {dataResponse?.viewedDealCount || 0}</span>
        {
          dataResponse?.suggestedBuyers && 
          <BootstrapTooltip
              title="Seller has suggested buyers"
              placement="top"
            >
              <img className="w-[20px] h-[20px] cursor-pointer" src={VerifiedBuilding}/>
          </BootstrapTooltip>
        }
      </div>
  );

  let updatedData = (
    <div className="prospects-recommended">
        <span>{getDate(dataResponse.updatedAt)}</span>
        {
          dataResponse?.changed && 
          <BootstrapTooltip
              title="Seller has updated text fields"
              placement="top"
            >
              <img className="w-[12px] h-[20px] cursor-pointer" src={GreenPencilIcon}/>
          </BootstrapTooltip>
        }
      </div>
    )

    let createdAt = (
      <div className="prospects-recommended">
        <span>{getDate(dataResponse.createdAt)}</span>
        {
          dataResponse?.signupMandateId &&
          <BootstrapTooltip
            title={`Mandate M${dataResponse?.signupMandateId}`}
            placement="top"
          >
            <a
              className="text-12 font-500 text-green w-[14px]"
              href={`${getAuthBasedUrl()}mandate/${dataResponse.signupMandateUid}`}
              rel="noreferrer"
              target="_blank"
            >

            <img className="cursor-pointer" src={`${ASSETS_URL}greenMandateIcon.svg`} />
          </a>
          </BootstrapTooltip>
        }
      </div>
    )
    let onboardingStage = (
      <span className={`text-14 px-2 py-1 rounded-xl font-bold ${dataResponse?.onboardingStage === 3? 'text-[#027A48] bg-[#ECFDF3]' : 'text-[#B54708] bg-[#FFFAEB]'}`}>{dataResponse?.onboardingStage ? findValueOfSiblingKey(OnboardingStageFilterOptions,'key', dataResponse?.onboardingStage, 'value') : '-'}</span>
    )


    return {
        'name': nameKey,
        'priorties' : priortiesKey,
        'ttmCalculated': dataResponse.ttmCalculated,
        'ebitda': ebitaPositive,
        'askPrice': dataResponse.askPrice,
        'deals': dataResponse.activeDealCount,
        'verificationStatus': getValueFromArr(dataResponse.verificationStatus, SellerVerificationStatusArr),
        'cueCard': cueCard,
        'awaitingAction': <ActionModals actionData={dataResponse} handleRefresh={handleRefresh} />,
        'createdAt': createdAt,
        'updatedAt': updatedData,
        'navigationId': dataResponse?.companyId,
        'founderName': dataResponse?.founderName,
        'tncState': tncState,
        'notes': notes,
        "viewedDealCount":  prospectElement,
        "description": dataResponse?.about,
        'onboardingStage': onboardingStage
    }
}
