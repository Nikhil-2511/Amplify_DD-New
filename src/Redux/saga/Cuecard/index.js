import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { addCueCardEmail, createCuecardLink, fetchSuccess, getCueCardData, getOpenCuecardData, updateCaptureInterest, updateCaptureView } from "../../slice/CuecardSlice";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* updateCaptureViewData(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.CUECARD.captureViewApi(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchSuccess());
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchSuccess());
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* updateCaptureInterestData(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.CUECARD.captureInterestApi(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchSuccess());
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchSuccess());
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}


function* fetchCueCardData(action) {
  try {
    let data = action.payload, url = ENDPOINT.CUECARD.getCuecardApi();
    if(data.companyId) url += `?companyId=${data.companyId}`;
    if(data?.dealId) url += `${data.companyId ? '&' : '?'}dealId=${data?.dealId}`;
    let dataToSend = {
      method: 'GET',
      url
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchSuccess());
      if(data?.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchSuccess());
    if(action?.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchOpenCueCardData(action) {
  try {
    let data = action.payload, url = ENDPOINT.CUECARD.openCueCardApi(data.uid);
    let dataToSend = {
      method: 'GET',
      url
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchSuccess());
      if(data?.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchSuccess());
    if(action?.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* creatingCuecardLink(action) {
  try {
    let data = action.payload, url = ENDPOINT.CUECARD.cueCardLinkCreate(data.uid);
    let dataToSend = {
      method: 'POST',
      url,
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchSuccess());
      if(data?.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchSuccess());
    if(action?.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}


function* updateCueCardEmail(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.CUECARD.shareCueCardApi(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchSuccess());
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchSuccess());
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}


export default function* root() {
  yield takeEvery(updateCaptureInterest.type, updateCaptureInterestData)
  yield takeEvery(updateCaptureView.type, updateCaptureViewData)
  yield takeEvery(getCueCardData.type, fetchCueCardData)
  yield takeEvery(addCueCardEmail.type, updateCueCardEmail)
  yield takeEvery(getOpenCuecardData.type, fetchOpenCueCardData)
  yield takeEvery(createCuecardLink.type, creatingCuecardLink)
}