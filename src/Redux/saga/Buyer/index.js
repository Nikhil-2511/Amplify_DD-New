import { takeEvery, put } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { GET, POST, PUT, RANGE_KEY, RANGE_MULTIPLICATION } from "../../../constants";
import { createBuyer, fetchActiveDeals, fetchAvailableSlots, fetchBuyerFilters, fetchBuyerProfile, fetchBuyers, fetchCompanyInerested, setSlots, updateBuyerProfileData } from "../../slice/BuyerSlice";
import { updateSelectedFilter } from "../../slice/FilterSlice";
import store from "../..";
import { updateSnackbar } from "../../slice/CommonSlice";

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
    let data = action.payload, url = ENDPOINT.BUYERS.getBuyerListApi(data.page, data.size);
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


function* fetchingProfileData(action) {
  try {
    let data = action.payload, url = ENDPOINT.BUYERS.buyerProfileApi(data.buyerID);
    let dataToSend = {
      method: GET,
      url
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

function* fetchingInterestedCompaniesData(action) {
  try {
    let data = action.payload;
    let dataToSend = {
      method: POST,
      url: data.url,
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

function* fetchingActiveDeals(action) {
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

function* updatingProfileData(action) {
  try {
    let data = action.payload, url = ENDPOINT.BUYERS.updateBuyer();
    let dataToSend = {
      method: PUT,
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

function* creatingBuyer(action) {
  try {
    let data = action.payload, url = ENDPOINT.BUYERS.createBuyerApi();
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

function* fetchingBuyerFilters(action) {
  try {
    let data = action.payload, url = ENDPOINT.BUYERS.getFilterApi();
    let dataToSend = {
      method: GET,
      url
    }
    const response = yield commonPostData(dataToSend);
    if(response?.data) {
      if(response?.data?.data?.searchCriteriaList?.length) {
        let searchCriteriaList = response?.data?.data?.searchCriteriaList, filterData = {}, rangeFilter = {};
        searchCriteriaList.forEach(searchList => {
          // if(searchList.filterKey === 'preferences.sector') {
          //   let sectorArray = [];
          //   if(searchList?.valueList?.length) {
          //     sectorArray = searchList?.valueList.map((preferenceList) => preferenceList.sector)
          //   }
          //   filterData[searchList.filterKey] = sectorArray;
          // }
          if(searchList.filterKey === 'ttmCalculated') {
            if(searchList?.value) {
              let value = searchList.value / RANGE_MULTIPLICATION;
              if(searchList.operation === 'ge') {
                rangeFilter['min'] = value;
              }
              if(searchList.operation === 'lt') {
                rangeFilter['max'] = value;
              }
            }
          }
          else {
            filterData[searchList.filterKey] = searchList.operation === 'in' ? searchList?.valueList : searchList.value;
          }
        });

        if(rangeFilter?.min || rangeFilter?.max) {
          let minValue, maxValue;
          minValue = rangeFilter?.min || 0;
          maxValue = rangeFilter?.max || 50;
          filterData[RANGE_KEY] = {
            hasChanged: true,
            type: 'range',
            value: [minValue, maxValue]
          }
        }
        yield put(updateSelectedFilter(filterData));
        if(data?.callback) {
          data.callback(response?.data, filterData);
        }
      }
    }
    
  } catch (error) {
    if(action.payload?.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchingAvailableSlots(action) {
  try {
    let data = action.payload, url = ENDPOINT.BUYERS.fetchAvailableTimeSlots();
    let dataToSend = {
      method: POST,
      url,
      data: JSON.stringify(data?.payload)
    }
    const response = yield commonPostData(dataToSend);
    if(data?.callback) {
      data.callback(response?.data);
    }
  } catch (error) {
    if(action.payload.callback) {
      action.payload.callback({message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* settingSlots(action) {
  try {
    let data = action.payload, url = ENDPOINT.BUYERS.bookSlots();
    let dataToSend = {
      method: POST,
      url,
      data: JSON.stringify(data?.payload)
    }
    const response = yield commonPostData(dataToSend);
    if(data?.callback) {
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
  yield takeEvery(fetchBuyers.type, fetchingData)
  yield takeEvery(fetchBuyerProfile.type, fetchingProfileData)
  yield takeEvery(fetchCompanyInerested.type, fetchingInterestedCompaniesData)
  yield takeEvery(updateBuyerProfileData.type, updatingProfileData)
  yield takeEvery(fetchActiveDeals.type, fetchingActiveDeals)
  yield takeEvery(createBuyer.type, creatingBuyer)
  yield takeEvery(fetchBuyerFilters.type, fetchingBuyerFilters)
  yield takeEvery(fetchAvailableSlots.type, fetchingAvailableSlots)
  yield takeEvery(setSlots.type, settingSlots)
}