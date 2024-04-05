import { TOKEN_KEY } from "../constants";
import history from "../history";
import store from "../Redux";
import { getLocalStorage } from "../utils";

export const checkUserType = () => store.getState().authorizationStore?.loginResponse?.userType;
export const checkSeesionId = () => getLocalStorage(TOKEN_KEY) && getLocalStorage(TOKEN_KEY) !== null;
export const isAuthenticated = () => checkSeesionId() && checkUserType();
export const isAdminUser = () => store.getState().authorizationStore?.loginResponse?.userType === 2;
export const isBuyerUser = () => store.getState().authorizationStore?.loginResponse?.userType === 3;
export const isSellerUser = () => store.getState().authorizationStore?.loginResponse?.userType === 1;

export const reRouteUser = (navigate, defaultPath = '/login') => {
  let url = defaultPath, userType = checkUserType();
  if (userType === 2) {
    url = '/admin/seller';
  } else if (userType === 1) {
    url = '/dashboard';
  }
  else if(userType === 3) {
    url = '/buyer/browse'
  }
  navigate(url);
};

export const logoutUserRedirectionPath = () => {
 let userType = checkUserType();
 switch(userType) {
  case 1: 
    return '/login';
  case 2: 
    return '/admin/login';
  case 3:
    return '/buyer/login';
  default:
    return checkbasedOnUrl();
 } 
}

function checkbasedOnUrl() {
  let pathname = window.location.pathname;
  if(pathname.indexOf('/buyer') > -1) {
    return '/buyer/login';
  }
  else if (pathname.indexOf('/admin') > -1) {
    return '/admin/login';
  }
  else {
    return '/login';
  }
}