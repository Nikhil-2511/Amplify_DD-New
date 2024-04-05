import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { GET, POST, PUT } from "../../../constants";
import { createNewCompany, fetchGAData, fetchGASummary, fetchSellers, getAnalyticsSummary, updateCompanyInterest } from "../../slice/SellerSlice";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* fetchingData(action) {
  try {
    let data = action.payload;
    let dataToSend = {
      method: GET,
      url: data.url,
      // data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
    // yield put(loginUserSuccess(response))
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

function* updatingCompanyInterest(action) {
  try {
    let data = action.payload, url = ENDPOINT.SELLERLISTING.updateInterestApi();
    let dataToSend = {
      method: POST,
      url,
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
    // yield put(loginUserSuccess(response))
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

function* createNewCompanySaga(action) {  
  try {
    let data = action.payload, url = ENDPOINT.SELLER.createCompany();
    let dataToSend = {
      method: POST,
      url,
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
    if(data?.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchGADataFunc(action) { 
  try {
    let data = action.payload, url = ENDPOINT.SELLER.analyticsData();
    let dataToSend = {
      method: POST,
      url,
      data: JSON.stringify(data?.postBody),
      hideLoader: data.hideLoader,
    }
    const response = yield commonPostData(dataToSend);
    if(data?.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchGASummaryFunc(action) { 
  try {
    let data = action.payload, url = ENDPOINT.SELLER.analyticsSummary();
    let dataToSend = {
      method: POST,
      url,
      data: JSON.stringify(data?.postBody)
    }
    const response = yield commonPostData(dataToSend);
    if(data?.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* getGASummaryFunc(action) { 
  try {
    let data = action.payload, url = ENDPOINT.SELLER.summary();
    let dataToSend = {
      method: POST,
      url,
      data: JSON.stringify(data?.postBody)
    }
    const response = yield commonPostData(dataToSend);
    if(data?.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    console.log('error', error);
  }
}

export default function* root() {
  yield takeEvery(fetchSellers.type, fetchingData)
  yield takeEvery(updateCompanyInterest.type, updatingCompanyInterest)
  yield takeEvery(createNewCompany.type, createNewCompanySaga)
  yield takeEvery(fetchGAData.type, fetchGADataFunc)
  yield takeEvery(fetchGASummary.type, fetchGASummaryFunc)
  yield takeEvery(getAnalyticsSummary.type, getGASummaryFunc)
}