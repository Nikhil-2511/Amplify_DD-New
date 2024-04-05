import store from "../Redux";
import { fetchBuyerFilters, fetchBuyers, toggleSlotSchedular } from "../Redux/slice/BuyerSlice";
import { fetchBuyerStatus } from "../Redux/slice/BuyerVerificationStore";
import { fetchDocument, fetchPdf, globalAlert, updatePageTitle, updateSnackbar, fetchBuyerParams, updateCuecardRefresh } from "../Redux/slice/CommonSlice";
import { fetchAdminUsers, fetchDealPartner, logoutAction, verifyEmailAction } from "../Redux/slice/LoginSlice";
import { fetchSellers, updateCompanyInterest } from "../Redux/slice/SellerSlice";
import { fetchContactInfo } from "../Redux/slice/ValuationSlice";
import { API_SUCCESS_CODE, EXPRESS_INTEREST_KEY, PASS, SHORTLIST } from "../constants";
import WarningCircularIcon from '../assets/images/warningCircularIcon.svg';
import { ENDPOINT } from "../config/endpoint";
import { dowanloadPdfUsingBase64 } from "./commonHelper";

export function handleLogoutUser(redirectPath) {
    store.dispatch(logoutAction({hasLogout: true, redirectUrl: redirectPath}));
}

export function verifyEmail(dataToSend) {
    store.dispatch(verifyEmailAction(dataToSend));
}

export function fetchSellerListing(dataToSend) {
    store.dispatch(fetchSellers(dataToSend));
  }
  
  export function handleTitleUpdate(pageTitle = '') {
    store.dispatch(updatePageTitle(pageTitle));
  }
  
  export function fetchBuyerListing(dataToSend) {
    store.dispatch(fetchBuyers(dataToSend));
  }

  export function getAdminUsers() {
    store.dispatch(fetchAdminUsers());
  }

  export function getDealPartner() {
    store.dispatch(fetchDealPartner());
  }

  export function getPdfData(dataToSend) {
    store.dispatch(fetchPdf(dataToSend));
  }

  export function getBuyerStatus(dataToSend) {
    store.dispatch(fetchBuyerStatus(dataToSend));
  }

  export function getBuyerFilters(dataToSend) {
    store.dispatch(fetchBuyerFilters(dataToSend));
  }

//   Common apis to get buyer data before going to buyer routes
  export function commonLoginFetch() {
    getDealPartner();
  }

  export  function handleCompanyInterest({action, id, callback, companyUid, shortlisted}) {
    if(action === EXPRESS_INTEREST_KEY) {
      store.dispatch(toggleSlotSchedular({open : true, companyUid: companyUid, companyId: id}));
      return;
    }
    let dataObj = {
      companyId: id,
      stage: action
    }  
    if(shortlisted) {
      dataObj['shortlisted'] = shortlisted === 'yes' ? true : false;
    }
    let dataToSend = {
        postBody: {...dataObj},
        callback: (res) => handleActionCB(res, action, callback, companyUid, id)
    }
    store.dispatch(updateCompanyInterest(dataToSend))
}

function handleActionCB(res, action, callback, companyUid, companyId) {  
    if(res?.status === API_SUCCESS_CODE) {
        callback(action, res);
       if(!!res?.data?.meetingBookingRequired && action === EXPRESS_INTEREST_KEY){
        store.dispatch(toggleSlotSchedular({open : true, companyUid: companyUid, companyId}));
       }
        let message = '';
        switch(action) {
            case EXPRESS_INTEREST_KEY: 
                message = 'Interest sent to company. Awaiting their response.';
                break;
            case SHORTLIST:
                message = 'Company marked as shortlisted for your future reference.';
                break;
            case PASS:
                message = 'Company marked as passed. They won’t be notified.';
                break;
            default: 
                message = 'Processed successfully';
                break;
        }

        store.dispatch(updateSnackbar({
            message,
            isOpen: true
        }));

    }
    else {
      if(res?.data?.code === 'max_active_threshold_reached') {
        store.dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: res?.data?.message, title: 'Maximum Deal Limit Reached'}));
      }
    }
}


export function showTncDetails({id, type, callback}) {
  let dataToSend = {
      callback: callback,
      uid: id,
      type
  }
  store.dispatch(fetchContactInfo(dataToSend));
}

export function downloadDocument(filters) {
  let dataToSend = {
      postBody: filters,
      callback: handleDownloadCb,
      url: ENDPOINT.DOCUMENT.download()
  }
  store.dispatch(fetchDocument(dataToSend))
}

function handleDownloadCb(res) {
  if(res?.status === API_SUCCESS_CODE) {
      if(res?.data?.userDocArray?.length) {
          let pitchdeckObj = res?.data?.userDocArray[res?.data?.userDocArray?.length - 1];
          let fileName = pitchdeckObj.fileName;
          dowanloadPdfUsingBase64(pitchdeckObj?.content, fileName);
      }
  }
  else {
    store.dispatch(updateSnackbar({
          message: res?.data?.message,
          isOpen: true,
          type: 'error'
      }));
  }
}


export function viewDocument({filters, cb}) {
  let dataToSend = {
      postBody: filters,
      callback: cb,
      url: ENDPOINT.DOCUMENT.download()
  }
  store.dispatch(fetchDocument(dataToSend))
}

export function getBuyerParamData({cb}) {
  let dataToSend = {
    postBody: {},
    callback: cb
  }
  store.dispatch(fetchBuyerParams(dataToSend))
}