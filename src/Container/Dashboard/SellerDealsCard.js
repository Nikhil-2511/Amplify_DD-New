import React from "react";
import { isMobileView, isObjectEmpty } from "../../helper/commonHelper";
import InformationBox from "../../CommonComponent/InformationBox";
import { GenericButton } from "../../CommonComponent/CustomButton";

function SellerDealsCard({ className, dealsData, handleDeal, tncDetails}) {
  
  function getRectificationMessage() {
    if(tncDetails?.tnc?.rectificationNote) return `EL signature re-sign requested due to: ${tncDetails?.tnc?.rectificationNote}`
    return '';
  }

  return (
    <div className={"upcoming-feature-section " + (className ? className : "")}>
      {
        !isMobileView() &&
        <div className="flex justify-space-between padding-x20 padding-b15 border-b border-282828">
          <div className="text-24">Deal Activity</div>
        </div>
      }
      <div className={"padding-x20 margin-b10 " + (isMobileView() ? '' : 'padding-t20')}>
        <div className="margin-b25">
          <div className="flex align-center justify-space-between margin-b5">
            <span className="text-22 font-500">All Deals</span>
            <span className="upcoming-feature-chip">{dealsData || 0}</span>
          </div>
          <p className="margin-0 font-300 text-14">
            Includes conversations and buyer interests
          </p>
        </div>
        {
          tncDetails?.tncCompleted &&
          <GenericButton className={"primary capitalize-non font-500 w-full" + (isMobileView() ? 'text-12' : 'text14') } fullwidth variant="contained" size="small" onClick={() => handleDeal()} sx={{color: '#fff !important', fontWeight: 500, width: '100%', height: '35px'}}>
            View all deals
          </GenericButton>
        }
        {
          !tncDetails?.tncCompleted && (isObjectEmpty(tncDetails?.tnc) || tncDetails?.tnc?.state === 'resign') &&
            <GenericButton className={"primary capitalize-non font-500 w-full" + (isMobileView() ? 'text-12' : 'text14') } fullwidth variant="contained" size="small" onClick={() => handleDeal()} sx={{color: '#fff !important', fontWeight: 500, width: '100%', height: '35px'}}>
              Sign the EL to Unlock Deal Access
            </GenericButton>
        }
        {
          !tncDetails?.tncCompleted && tncDetails?.tnc?.state === 'resign' &&
          <div className="flex text-FFBC9E align-center padding-t5">
            <InformationBox bodyPosition='left-align-info' content={getRectificationMessage()}  iconClass="w-17px h-17px margin-t3"/>
            <span>Re-sign EL to continue deal access</span>
          </div>
        }
        {
          !tncDetails?.tncCompleted && tncDetails?.tnc?.state === 'awaiting_approval' &&
          <div className="text-FFBC9E tesxt-14">You can access your deals after your EL signature is approved.</div>
        }
      </div>
    </div>
  );
}

export default SellerDealsCard;
