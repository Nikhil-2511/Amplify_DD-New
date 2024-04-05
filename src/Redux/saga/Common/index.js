import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { fetchDataFromServer, fetchDocument, fetchPdf, updateFormToServer, uploadDocument, documentUserValiate, documentQuery, updateDealPitchdeckAccess, fetchBuyerParams } from "../../slice/CommonSlice";
import { API_SUCCESS_CODE, DELETE, GET, POST } from "../../../constants";
import { updateBuyerParams } from "../../slice/BuyerSlice";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* updatingFormData(action) {
  
  try {
    let data = action.payload
    let dataToSend = {
      method: data.method,
      url: data.url,
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

function* fetchingData(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: data.method || GET,
      url: data.url,
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



function* fetchingPdfLink(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: GET,
      url: data.url
    }
    const response = yield commonPostData(dataToSend);
    if(data.callback) {
      data.callback(response?.data);
      // data.callback({data: 'https://www.africau.edu/images/default/sample.pdf', status: '200'});
    }
  } catch (error) {
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}


function* updatingDocuments(action) {
  try {
    let data = action.payload;
    let postBody = new FormData();
    // for (let i = 0 ; i < data?.files?.length ; i++) {
      // postBody.append("files", data.files[i]);
    // }
      
    postBody.append("file", data.file);
    postBody.append('docData', JSON.stringify(data.docData));
    let dataToSend = {
      method: data.method || POST,
      url: data.url,
      data: postBody,
      headers: { "Content-Type": "multipart/form-data" },
      hideLoader: data.hideLoader,
    };
    if(data.onUploadProgress) dataToSend['onUploadProgress'] = data.onUploadProgress;
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



function* fetchingDocuments(action) {
  try {
    let data = action.payload;     
    let dataToSend = {
      method: data.method || POST,
      url: data.url,
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


function* fetchingDocumentsDetails(action) {
  try {
    let data = action.payload;     
    let dataToSend = {
      method: POST,
      url: ENDPOINT.DOCUMENT.query(),
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



function* validatingUser(action) {
  try {
    let data = action.payload;
    let postBody = new FormData();
    postBody.append("file", data.file);
    postBody.append('searchDto', JSON.stringify(data.searchDto));
    let dataToSend = {
      method: data.method || POST,
      url: data.url,
      data: postBody,
      headers: { "Content-Type": "multipart/form-data" },
      hideLoader: data.hideLoader,
    };
    if(data.onUploadProgress) dataToSend['onUploadProgress'] = data.onUploadProgress;
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

function* removingDocAccess(action) {
  try {
    let data = action.payload;
    let dataToSend = {
      method: DELETE,
      url: ENDPOINT.DOCUMENT.removeAccess(),
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

function* fetchingBuyerParams(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: POST,
      data: data.postBody,
      url: ENDPOINT.BUYERPARAMS.getParams()
    }
    const response = yield commonPostData(dataToSend);
    if(response?.data?.status === API_SUCCESS_CODE) {
      yield put(updateBuyerParams(response?.data?.data));
    }

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
  yield takeEvery(updateFormToServer.type, updatingFormData)
  yield takeEvery(fetchDataFromServer.type, fetchingData)
  yield takeEvery(fetchPdf.type, fetchingPdfLink)
  yield takeEvery(uploadDocument.type, updatingDocuments)
  yield takeEvery(fetchDocument.type, fetchingDocuments)
  yield takeEvery(documentQuery.type, fetchingDocumentsDetails)
  yield takeEvery(documentUserValiate.type, validatingUser)
  yield takeEvery(updateDealPitchdeckAccess.type, removingDocAccess)
  yield takeEvery(fetchBuyerParams.type, fetchingBuyerParams)
}