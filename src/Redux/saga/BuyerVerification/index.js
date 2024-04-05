import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { GET } from "../../../constants";
import { fetchBuyerStatus, fetchBuyerStatusSuccess } from "../../slice/BuyerVerificationStore";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* fetchingBuyerStatus(action) {
  try {
    let data = action?.payload, url = ENDPOINT.BUYERS.buyerStatus();
    let dataToSend = {
      method: GET,
      url,
    }
    const response = yield commonPostData(dataToSend);
    yield put(fetchBuyerStatusSuccess(response?.data?.data));
    if(data?.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    if(action?.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

export default function* root() {
  yield takeEvery(fetchBuyerStatus.type, fetchingBuyerStatus)
}