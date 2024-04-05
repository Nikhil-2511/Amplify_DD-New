import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { getMetricData, getCompanyData, metricSuccessData, companyDataSuccess, updateCompanyAction, fetchedData, updateDashboardData, getEvalutadData, fetchContactInfo, updateContactInfo, fetchDealsCount,downloadLetter } from "../../slice/ValuationSlice";
import { GET, POST, PUT } from "../../../constants";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* fetchValuationResponse(action) {
  try {
    let data = action.payload, url = ENDPOINT.VALUATION.getValuationApi();
    if(data.companyId) {
      url += `?companyId=${data.companyId}`
    }
    let dataToSend = {
      method: 'GET',
      url,
      hideLoader: data.hideLoader
    }
    const response = yield commonPostData(dataToSend);
      yield put(companyDataSuccess(response?.data))
      if(data?.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    put(companyDataSuccess({message: "Something went bad!!", status: false }));
    if(action?.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchMetricResponse(action) {
  try {
    let data = action.payload, url = ENDPOINT.VALUATION.getMetricApi();
    if(data.companyId) {
      url += `?companyId=${data.companyId}`
    }
    let dataToSend = {
      method: 'GET',
      url,
      hideLoader: data.hideLoader
    }
    const response = yield commonPostData(dataToSend);
      yield put(metricSuccessData(response?.data))
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    put(metricSuccessData({message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* updateCompanyActionData(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.VALUATION.companyAction(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchedData())
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchedData())
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* updateDashboardDataSaga(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      url: ENDPOINT.DASHBOARD.getDashboardApi(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchedData())
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchedData())
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchEvalutadData(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.DASHBOARD.evalutaionApi(),
      data: JSON.stringify({})
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchedData())
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    put(metricSuccessData({message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchingContactInfo(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'GET',
      url: ENDPOINT.DASHBOARD.userFetchAPi(data?.uid, data?.type),
    }
    const response = yield commonPostData(dataToSend);
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    put(metricSuccessData({message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* updatingContactInfo(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: PUT,
      url: ENDPOINT.DASHBOARD.updateContactInfoApi(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    put(metricSuccessData({message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchingDealsCount(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: POST,
      url: ENDPOINT.DEALS.getDealCount(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    put(metricSuccessData({message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}
function* downloadEngagementLetter(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.DASHBOARD.engagementLetter(data?.latest),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
      // yield put(fetchedData())
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    // yield put(fetchedData())
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

export default function* root() {
  yield takeEvery(getCompanyData.type, fetchValuationResponse)
  yield takeEvery(getMetricData.type, fetchMetricResponse)
  yield takeEvery(updateCompanyAction.type, updateCompanyActionData)
  yield takeEvery(updateDashboardData.type, updateDashboardDataSaga)
  yield takeEvery(getEvalutadData.type, fetchEvalutadData)
  yield takeEvery(fetchContactInfo.type, fetchingContactInfo)
  yield takeEvery(updateContactInfo.type, updatingContactInfo)
  yield takeEvery(fetchDealsCount.type, fetchingDealsCount)
  yield takeEvery(downloadLetter.type, downloadEngagementLetter)
}