import { Stack } from "@mui/material";
import { RUPEE_SYMBOL } from "../../../constants";
import { getAppBaseUrl, getAuthBasedUrl, getDate, getValueFromArr } from "../../../helper/commonHelper";
import { AllDealsArr } from "../../../CommonModels/CommonCollection";

export function BuyerMandateTableModel() {
  return {
    headers: [
      {
        label: "Seller",
        sx: {},
        className: "",
        style: {},
      },
      {
        label: "Description",
        sx: { width: "25%" },
        className: "",
        style: {},
      },
      {
        label: `Revenue(${RUPEE_SYMBOL} crores)`,
        sx: {},
        className: "",
        style: {},
      },
      {
        label: `Deal Status`,
        sx: {},
        className: "",
        style: {},
      },
    ],
    tableContent: [
      {
        key: "sellerName",
        hasCustomData: true,
      },
      {
        key: "description",
        hasCustomData: true,
      },
      {
        key: "ttmNet",
        hasCurrency: true,
      },
      {
        key: "dealStatus",
      },
    ],
  };
}

export function UpdateBuyerMandateTableModel(dataResponse, handleRefresh) {
    let sellerDetail = (<Stack direction={'column'} >
    <div className="text-14">
        <span className="text-2E90FA">
        <a href={`${getAuthBasedUrl()}cue-card/${dataResponse?.objectData?.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`S${dataResponse?.sellerId}`}</a>
        </span>
    </div>
    <div className="text-667085 text-14"><span className="text-667085 font-600">{dataResponse?.objectData?.category}</span> <span>{dataResponse?.objectData?.subCategory}</span></div>
    </Stack>);

    return {
        'sellerName': sellerDetail,
        'description': dataResponse?.objectData?.about,
        'ttmNet': dataResponse?.objectData?.ttmCalculated,
        'dealStatus': getValueFromArr(dataResponse?.dealStatus, AllDealsArr),
    }
}


export function UpdateBuyerMandateCITableModel(dataResponse, userType = "") {
  let idKey = (<Stack direction={'column'} >
      <div className="text-14">
          <span className="text-2E90FA">
              <a href={`${getAuthBasedUrl()}cue-card/${dataResponse.companyId}`} rel="noreferrer" target="_blank"  className="text-2E90FA font-500">{`D${dataResponse?.id}`}</a>
          </span>
      </div>
  </Stack>);

  let sellerDetail =  ((<Stack direction={'column'} >
      <div className="text-14">
          <span className="text-2E90FA">
              <div className="text-667085 font-500">{`${userType === 'buyer' ? 'S' + dataResponse?.sellerId : dataResponse?.sellerName }`}</div>
          </span>
      </div>
      <div className="text-667085 text-14"><span className="text-667085 font-600">{dataResponse.category}</span> <span>{dataResponse.subCategory}</span></div>
  </Stack>))
  // Will use in future 
  let description = (
      <Stack direction={'column'} >
      <div className="text-14">
          <span className="margin-l8 text-black">{`S${dataResponse?.id}`}</span>
      </div>
      <div className="text-667085 font-600 text-14">{dataResponse.sellerDescription}</div>
  </Stack>
  )

  return {
      'id': idKey,
      'sellerDetails': sellerDetail,
      'description': dataResponse.sellerDescription,
      'dealStatus': getValueFromArr(dataResponse.dealStatus, AllDealsArr),
      // 'dealMaker': dataResponse.dealMaker,
      'updatedAt': getDate(dataResponse.updatedAt)
  }
}