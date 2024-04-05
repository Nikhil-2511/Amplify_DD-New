import axios from "axios";
// import uuid from "react-native-uuid";
import { API_BASE_URL } from "../config";
import { SESSION_ID, TOKEN_KEY } from "../constants";
import store from "../Redux";
import { setLoader, updateFobiddenModel, updateLogoutModel } from "../Redux/slice/CommonSlice";
import { isAuthenticated } from "../Services";
import { getLocalStorage, setLocalStorage } from "./localStorage";

const defaultOptions = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000 // need to change according to requirement
};

const api = axios.create(defaultOptions);

api.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = "*";
  if (isAuthenticated()) {
    config.headers.Authorization = getLocalStorage(TOKEN_KEY);
    config.headers[SESSION_ID] = getLocalStorage(TOKEN_KEY);
  }
  else {
    if (getLocalStorage(SESSION_ID) && getLocalStorage(SESSION_ID) !== 'undefined' && getLocalStorage(SESSION_ID) !== 'null') {
      config.headers[SESSION_ID] = getLocalStorage(SESSION_ID);
    }
  }
  if (!config.hideLoader && !store.getState().globalStore?.isLoading) {
    store.dispatch(setLoader(true));
  }
  return config;
});
api.interceptors.response.use((response) => {
  if (!isAuthenticated()) {
    if (!getLocalStorage(SESSION_ID) && response?.headers?.[SESSION_ID]) {
      setLocalStorage(SESSION_ID, response.headers?.[SESSION_ID]);
    }
  }
  setTimeout(() => store.dispatch(setLoader(false)), 400);
  if (response.status === 403) {
    store.dispatch(updateFobiddenModel({ isOpen: true }))
  }
  if (response.status === 401) {
    store.dispatch(updateLogoutModel({ isOpen: true }))
    return
  }
  return response;
}, (error) => {
  setTimeout(() => store.dispatch(setLoader(false)), 400);
  if (error?.response?.status === 403) {
    store.dispatch(updateFobiddenModel({ isOpen: true }))
  }
  if (error?.response?.status === 401) {
    store.dispatch(updateLogoutModel({ isOpen: true }))
    return;
  }
  return error.response;
});

export default api;
