import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { adminFetchSuccess, dealLimitByPass, getAdminListingData } from "../../slice/AdminSlice";
import { POST, PUT } from "../../../constants";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* fetchadminListing(action) {
  try {
    let data = action.payload, url = data.url;
    let dataToSend = {
      method: 'GET',
      url
    }
    const response = yield commonPostData(dataToSend);
      yield put(adminFetchSuccess());
      if(data?.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(adminFetchSuccess());
    if(action?.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}


function* updatingDealLimit(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: PUT,
      data: data.postBody,
      url: ENDPOINT.BUYERPARAMS.updateSpecialParams()
    }
    const response = yield commonPostData(dataToSend);

    if(data.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}


export default function* root() {
  yield takeEvery(getAdminListingData.type, fetchadminListing)
  yield takeEvery(dealLimitByPass.type, updatingDealLimit)
}