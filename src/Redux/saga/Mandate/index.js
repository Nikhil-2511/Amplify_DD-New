import { getPasscode, getPasscodeSuccess, loginUser, loginUserSuccess, logoutUser, logoutUserSuccess } from "../../slice/LoginSlice";
import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { fetchBuyerMandates, fetchMandateDetails } from "../../slice/MandateSlice";
import { GET } from "../../../constants";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* fetchMandates(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.MANDATES.getMandateAPi(data.page, data.size),
      data: JSON.stringify(data.postBody)
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

function* fetchingMandateDetails(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: GET,
      url: ENDPOINT.MANDATES.getMandateDetailsAPi(data?.uid),
    }
    const response = yield commonPostData(dataToSend);
    if(data?.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    if(action.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

export default function* root() {
  yield takeEvery(fetchBuyerMandates.type, fetchMandates)
  yield takeEvery(fetchMandateDetails.type, fetchingMandateDetails)
  
}