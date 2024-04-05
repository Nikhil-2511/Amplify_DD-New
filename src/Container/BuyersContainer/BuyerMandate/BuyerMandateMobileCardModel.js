import { AllDealsArr } from "../../../CommonModels/CommonCollection";
import { getCurrencyValueForTable, getDate, getValueFromArr } from "../../../helper/commonHelper";

export function BuyerMandatesCardModel() {
  return {
    header: {
      // icon : '',
      category: "",
      heading: "",
      subheading: "",
      id: "",
      status: "",
      name: "",
      desc: "",
    },
    body: [
      {
        label: "",
        value: "",
        className: "",
      },
    ],
    footer: {
      actionBtn: {
        label: "",
        path: "",
      },
    },
  };
}

export function BuyerUpdateMandateCard(listData = {}) {
  let obj = {
    header: {
      // icon : '',
      category: listData?.category,
      heading: listData?.preferences[0]?.sector,
      subheading: listData?.preferences[0]?.subsector,
      id: "M" + listData?.id,
      // status : listData?.dealStatus,
      name: listData?.name,
      // desc : listData?.sellerDescription,
    },
    body: [
      {
        label: "Prospects",
        value: listData?.viewDealCount,
        className: "",
      },
      {
        label: "Active Deals",
        value: listData?.activeDealCount,
        className: "",
      },
    ],
    footer: {
      actionBtn: {
        label: "View Mandate",
        path: `buyer/mandate/${listData?.uid}`,
      },
    },
    noDataTexts : {
      title : 'No mandates available',
      desc : 'Create a mandate if you have a specific M&A requirement.'
    }
  };
  return obj;
}

export function mandateRecommendedCard(data = {}){
 let listData = data?.objectData;
let obj = {
  header: {
    // icon : '',
    category: listData?.category,
    heading: listData?.category,
    subheading: listData?.subCategory,
    id: "S" + listData?.id,
    status : getValueFromArr(data?.dealStatus, AllDealsArr),
    // name: listData?.about,
    desc : listData?.about,
  },
  body: [
    {
      label: "Revenue (₹ crores)",
      value: getCurrencyValueForTable(listData?.ttmCalculated),
      className: "",
    },
  ],
  footer: {
    actionBtn: {
      label: "View Listing",
      path: `buyer/cue-card/${listData?.companyId}`,
    },
  },
  noDataTexts : {
    title : 'No Recommendations',
    desc : 'Check back later for recommendations or contact your deal partner.'
  }
};
return obj;
}

export function mandateInteresedCard(listData = {}){
 let obj = {
   header: {
     // icon : '',
     category: listData?.category,
     heading: listData?.category,
     subheading: listData?.subCategory,
     id: "S" + listData?.sellerId,
     status : getValueFromArr(listData?.dealStatus, AllDealsArr),
     // name: listData?.about,
     desc : listData?.sellerDescription,
   },
   body: [
     {
       label: "Last Activity",
       value: getDate(listData?.updatedAt),
       className: "",
     },
     {
      label: "Deal ID",
      value: 'D'+ listData?.id,
      className: "",
    },
   ],
   footer: {
     actionBtn: {
       label: "View Listing",
       path: `buyer/cue-card/${listData?.companyId}`,
     },
   },
   noDataTexts : {
    title : 'No Active Deals',
    desc : 'No active deals at the moment.'
  }
 };
 return obj;
 }
