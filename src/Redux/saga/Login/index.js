import { getLinkedinAuth, fetchAdminUserSuccess, fetchAdminUsers, fetchDealPartner, fetchDealPartnerSuccess, getPasscode, getPasscodeSuccess, loginUser, loginUserSuccess, logoutUser, logoutUserSuccess, verifyEmailAction, updateEditedEmailAction, getUserDetails } from "../../slice/LoginSlice";
import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { GET, PUT } from "../../../constants";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}

function* fetchLoginResponse(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.LOGIN.loginApiPath(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
    // yield put(loginUserSuccess(response))
    if(data.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    put(logoutUserSuccess({message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchLogoutResponse(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.LOGOUT.logoutApiPath(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);
    yield put(logoutUserSuccess(response.data))
    if(data.callback) {
      data.callback(response.data);
    }

  } catch (error) {
    put(logoutUserSuccess({ message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchPasscodeResponse(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.SIGNUP.getPasscodeApi(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);

    yield put(getPasscodeSuccess(response.data))
    if(data.callback) {
      data.callback(response.data);
    }

  } catch (error) {
    put(getPasscodeSuccess({ message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({ 'status': false, message: 'Something went bad!!'})
    }
    console.log('error', error);
  }
}


function* verifyingEmail(action) {
  try {
    let data = action.payload;
    let dataToSend = {
      method: GET,
      url: data.url
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

function* fetchLinkedinRes(action) {
  try {
    let data = action.payload
    let dataToSend = {
      method: 'POST',
      url: ENDPOINT.LOGIN.linkedinApiPath(),
      data: JSON.stringify(data.postBody)
    }
    const response = yield commonPostData(dataToSend);

    if(data.callback) {
      data.callback(response.data);
    }

  } catch (error) {
    if(action.payload.callback) {
      action.payload.callback({ 'status': false, message: 'Something went bad!!'})
    }
    console.log('error', error);
  }
}

function* fetchingAdminUsers(action) {
  try {
    let dataToSend = {
      method: GET,
      url: ENDPOINT.LOGIN.adminUserAPi()
    }
    const response = yield commonPostData(dataToSend);
    if(response?.data?.data?.length) {
      let modifiedUser = response?.data?.data.map((userList) => {
        return {
          key: userList?.id,
          value: userList?.firstName,
          name: userList?.name
        }
      })      
      yield put(fetchAdminUserSuccess(modifiedUser))
    }
  } catch (error) {
    if(action.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchingDealPartner(action) {
  try {
    let dataToSend = {
      method: GET,
      url: ENDPOINT.LOGIN.dealPartnerApi()
    }
    const response = yield commonPostData(dataToSend);
    if(response?.data?.data) {   
      yield put(fetchDealPartnerSuccess(response?.data?.data))
    }
  } catch (error) {
    // if(action.payload?.callback) {
    //   action.payload.callback({message: "Something went bad!!", status: false });
    // }
    console.log('error', error);
  }
}

function* updateEmailSaga(action) {  
  try {
    let data = action.payload;
    let cb = data?.cb;
    let dataToSend = {
      method: PUT,
      url: ENDPOINT.LOGIN.updateUserEmail(),
      data: data?.payload
    }
    const response = yield commonPostData(dataToSend);   
    cb && cb(response?.data);
  } catch (error) {
    console.log('error', error);
  }
}

function* getUserSaga(action) {
  try {
    let data = action.payload;

    let dataToSend = {
      method: GET,
      url: ENDPOINT.USER.getUserDetails(action?.payload?.email)
    };
    const response = yield commonPostData(dataToSend);
    if(data.callback) {
      data.callback(response.data);
    }
  } catch (error) {
    if(action.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}


export default function* root() {
  yield takeEvery(loginUser.type, fetchLoginResponse)
  yield takeEvery(logoutUser.type, fetchLogoutResponse)
  yield takeEvery(getPasscode.type, fetchPasscodeResponse)
  yield takeEvery(verifyEmailAction.type, verifyingEmail)
  yield takeEvery(fetchAdminUsers.type, fetchingAdminUsers)
  yield takeEvery(fetchDealPartner.type, fetchingDealPartner)
  yield takeEvery(getLinkedinAuth.type, fetchLinkedinRes)
  yield takeEvery(updateEditedEmailAction.type, updateEmailSaga)
  yield takeEvery(getUserDetails.type, getUserSaga)
}