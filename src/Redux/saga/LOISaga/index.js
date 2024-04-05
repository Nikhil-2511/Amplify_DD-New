import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { POST, PUT } from "../../../constants";
import { fetchLOIDetails, updateLOIData } from "../../slice/LOISlice";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* updatingLOIData(action) {
  try {
    let data = action.payload, method = data.newForm ? POST : PUT;
    let dataToSend = {
      method,
      url: data.newForm ? ENDPOINT.LOI.createLoiApi() : ENDPOINT.LOI.updateLoiApi(),
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

function* fetchLOIResponse(action) {
    try {
      let data = action.payload, url = ENDPOINT.LOI.getLoiApi(data?.companyId);
      let dataToSend = {
        method: 'GET',
        url
      }
      const response = yield commonPostData(dataToSend);
        if(data.callback) {
            data.callback(response?.data);
        }
  
    } catch (error) {
      if(action.payload.callback) {
        action.payload.callback({ message: "Something went bad!!", status: false })
      }
    }
}

export default function* root() {
  yield takeEvery(fetchLOIDetails.type, fetchLOIResponse)
  yield takeEvery(updateLOIData.type, updatingLOIData)
}