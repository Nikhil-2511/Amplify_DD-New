import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { fetchDeals, getSellerSlots } from "../../slice/DealsSlice";
import { GET, POST } from "../../../constants";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* fetchingDeals(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: GET,
      url: data.url,
    //   data: JSON.stringify(data.postBody)
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


function* fetchingSellerSlots(action) {
  try {
    let data = action.payload;     
    let dataToSend = {
      method: POST,
      url: ENDPOINT.MEETING.sellerSlot(),
      data: data.postBody,
    };
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
  yield takeEvery(fetchDeals.type, fetchingDeals)
  yield takeEvery(getSellerSlots.type, fetchingSellerSlots)
  
}