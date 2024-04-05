import { API_SUCCESS_CODE, COMPANY_NOT_FOUND, EBITDA_KEY, IS_VALID_COMPANY, RANGE_KEY, RANGE_MULTIPLICATION, RUPEE_SYMBOL, SORT_BY_KEY } from "../constants";
import { APP_BASE_URL } from "../config";
import store from "../Redux";
import { globalAlert, updateSnackbar } from "../Redux/slice/CommonSlice";
import { getMetricData, getCompanyData } from "../Redux/slice/ValuationSlice";
import { isAdminUser, isAuthenticated, isBuyerUser, logoutUserRedirectionPath, reRouteUser } from "../Services";
import { getLocalStorage } from "../utils";
import { AGENCY, ED_TECH, FINTECH, GAMING, MARKET_PLACE, OTHERS, SAAS } from '../constants';
import D2CIcon from  '../assets/images/d2cIcon.svg';
import FintechIcon from  '../assets/images/fintechIcon.svg';
import SassIcon from  '../assets/images/saasIcon.svg';
import GamingIcon from  '../assets/images/gamingIcon.svg';
import OtherIcon from  '../assets/images/othersIcon.svg';
import EdTechIcon from  '../assets/images/edTechIcon.svg';
import MarketPlaceIcon from '../assets/images/marketplaceIcon.svg';
import AgencyIcon from '../assets/images/agencyIcon.svg';
import moment from 'moment';
import { getCueCardData } from "../Redux/slice/CuecardSlice";
import { UserBasedProtectedRoutes } from "../constants/RouteConstants";
import { ACQUISITION_KEY, FUNDING_KEY, NEW_RECOMMENDATIONS_KEY, OPEN_ALL_KEY } from "../constants/keyVariableConstants";
import dayjs from "dayjs";
import { fetchAvailableSlots } from "../Redux/slice/BuyerSlice";
import openToBothIcon from '../assets/images/openToBothIcon.svg'
import acqisitionIcon from '../assets/images/acqisitionIcon.svg'
import fundingIcon from '../assets/images/fundingIcon.svg'
import { BootstrapTooltip } from "../CommonComponent/BootstrapToolTip";

export const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// export const isPhoneNumberValid = (number) => {
//   return /^\d{10}$/.test(number);
// }

export const isObjectEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

export const getCompanyProfile = (cb, id, hideLoader) => {
  let dataToSend = {};
  if (id) {
    dataToSend.companyId = id;
  }
  if (cb) {
    dataToSend.callback = cb;
  }
  dataToSend.hideLoader = hideLoader;
  store.dispatch(getCompanyData(dataToSend))
}

export const globalMessage = (message, title) => {
  store.dispatch(globalAlert({ isOpen: true, message: message, title }));
}

export const getMetric = (cb, id, hideLoader) => {
  let dataToSend = {};
  if (id) {
    dataToSend.companyId = id;
  }
  if (cb) {
    dataToSend.callback = cb;
  }
  dataToSend.hideLoader = hideLoader;
  store.dispatch(getMetricData(dataToSend))
}

export function deepClone(obj = {}) {
  return JSON.parse(JSON.stringify(obj));
}

export const numberIsValid = (number) => {
  return /^[0-9]{10}$|^[0-9]{11}$|^[0-9]{12}$/.test(number);
}

export function numbersOnly(value = '') {
  // let regex = /^\d+$/, isValid = false;
  // isValid = regex.test(value) ? true : false;
  return /^\d+$/.test(value)
}

export function numbersRangeOnly(value = '') {
  // let regex = /^\d+$/, isValid = false;
  // isValid = regex.test(value) ? true : false;
  return /^[\d +\-]+$/.test(value);
}

export function isMobileView() {
  return window.innerWidth <= 768;
}

export function isDecimalValue(value = 0) {
  let regex = /^\d*\.?\d*$/, isValid = false;
  isValid = regex.test(value) ? true : false;
  return isValid;
}

export const getQueryParamFromUrl = (key) => {
  var query = "";
  var searchStr = window.location.search;
  if (searchStr) {
    var queryArr = searchStr.split(`${key}=`);
    if (queryArr.length > 0) {
      query = queryArr[queryArr.length - 1];
    }
  }
  return query;
}

export function getValuationValue(value) {
  let amount = 0.1, divisionValue = 10000000;
  if (value && parseFloat(value)) {
    amount = parseFloat(value / divisionValue).toFixed(1);
  }
  amount = commaSeperatedNumbers(amount);
  return amount;
}

export function getCurrencyValueForTable(value) {
  let amount = value, divisionValue = 10000000;
  if (value && parseFloat(value)) {
    amount = parseFloat(value / divisionValue).toFixed(1);
    amount = commaSeperatedNumbers(amount);
  }
  return amount || '-';
}

export function handleLogoCLick() {
  let path = '/login';
  if (isAuthenticated()) {
    if (isAdminUser()) {
      path = '/admin/seller';
    }
    else {
      path = '/dashboard';
    }
  }
  return path;
}

export function isValidAnswer(value, type) {
  if (type === 'text' || type === 'textarea') return true;
  else if (type === 'number') {
    if (isDecimalValue(value) || value === '' || value === 0) return true;
  }
  else if (type === 'percentage') {
    if (value >= 0 && value <= 100) return true;
  }
  else if (type === 'currency') return true;
  return false;
}

export function isCurrencyRegex(value = '') {
  let regex = /^(\d{1,2})(,\d{2})*(,\d{1,3}){1}(\.\d{1,})?$/g, isValid = false;
  isValid = regex.test(value) ? true : false;
  return isValid;
}


export function formatCurrencyNumber(number = '', prefix, thousand_separator, decimal_separator) {
  // thousand_separator = thousand_separator || ',';
  // decimal_separator = decimal_separator || '.';
  // const regex = new RegExp('[^' + decimal_separator + '\\d]', 'g');
  // let number_string = number.toString().replace(regex, '').toString();
  // let split = number_string.split(decimal_separator);
  // const thousands = split[0].toString()
  //   .split('')  // split the integer portion into individual characters
  //   .reverse()  // reverse the order
  //   .map((digit, index) => {
  //     // add a comma after every 3rd character
  //     return (index > 0 && index % 3 === 0) ? digit + thousand_separator : digit;
  //   })
  //   .reverse()  // put it back into the original order
  //   .join('');  // and make it a string again

  // let result = split[1] !== undefined ? thousands + decimal_separator + split[1] : thousands;
  // return prefix === undefined ? result : (result ? prefix + result : '');

  number=number.toString();
  let [nonDecimal, decimal] = number.split('.');
  nonDecimal = filterCurrencyValue(nonDecimal);
  let lastThree = nonDecimal.substring(nonDecimal.length-3);
  let otherNumbers = nonDecimal.substring(0,nonDecimal.length-3);
  if(otherNumbers !== '')
      lastThree = ',' + lastThree;
  let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + (decimal? `.${decimal}` : '');
  return res  ? res : '';
}

export function currencyValidator(value = '') {
  let regex = /^[0-9]+(,[0-9]+)*\.?(\.\d{1,2})?$/, isValid = false;
  isValid = regex.test(value) ? true : false;
  return isValid;
}

export function filterCurrencyValue(value) {
  return value.replaceAll(',', '');
}

export function isCompanyExists(navigate) {
  if (getLocalStorage(IS_VALID_COMPANY) === COMPANY_NOT_FOUND) {
    navigate('/valq');
  }
}

export function filterValue(element) {
  return element.field_type === 'currency' ? filterCurrencyValue(element.answer) : element.answer
}

export function getDetails(listItem, valuation, groupData = '') {
  if (valuation && listItem.qk_key && valuation[listItem.qk_key] && listItem.field_type !== 'checkbox' && listItem.qk_key !== 'ttmEbitda') {
    return (listItem.field_type === 'currency' || listItem.field_type === 'number') ? (`${listItem.field_type === 'currency' ? RUPEE_SYMBOL : ''}${formatCurrencyNumber(valuation[listItem.qk_key])}`) : valuation[listItem.qk_key];
  }
  else if(listItem?.qk_key === 'ttmEbitda' && groupData){
    return getEbitdaStatus({ebitda: groupData?.[findIndexByKey(groupData,'ebitda')]?.answer, ttmEbitda: listItem?.answer}, RUPEE_SYMBOL)
  }
  return listItem.field_type === 'checkbox' ? (valuation[listItem.qk_key] ? listItem.selectedAnswer : listItem.nonSelectedAnswer) : '-';
}

export function getEbitdaStatus(companyData, showRupeeSymbol) {
  let label = '';
  if (!!companyData?.ttmEbitda) {
    label = companyData?.ebitda === 'yes' ? `+ ${showRupeeSymbol ? showRupeeSymbol : ''}${formatCurrency(String(Math.floor(companyData?.ttmEbitda)))}` : `- ${showRupeeSymbol ? showRupeeSymbol : ''}${formatCurrency(String(Math.floor(companyData?.ttmEbitda)))}`;
  } else if (!!companyData?.ebitda) {
    label = companyData?.ebitda === 'yes' ? 'Positive' : 'Negative';
  }
  return label || '-';
}

export function findIndexByKey(array, qkKey) {
  for (let i = 0; i < array.length; i++) {
      if (array[i].qk_key === qkKey) {
          return i;
      }
  }
  return -1; // Return -1 if the element with the qk_key is not found
}

export function getBgColor(type) {
  switch(type) {
      case 'high':
          return 'ECFDF3';
      case 'low':
          return 'ECFDF3';
      default:
          return 'ECFDF3';
  }
}

export function getColor(type) {
  switch(type) {
      case 'high':
          return '#027A48';
      case 'low':
          return '#027A48';
      default:
          return '#027A48';
  }
}

export function renderIcon(type='') {
  switch(type) {
      case FINTECH:
          return FintechIcon;
      case SAAS:
          return SassIcon;
      case MARKET_PLACE:
          return MarketPlaceIcon;
      case GAMING:
          return GamingIcon;
      case OTHERS:
          return OtherIcon;
      case ED_TECH:
          return EdTechIcon;
      case AGENCY:
          return AgencyIcon;
      default:
          return D2CIcon
  }
}

export const categoryIconWithColors = (type='') => {

  switch(type) {
    case FINTECH:
      return {
        icon: FintechIcon,
        lightColor: '#F0FDF9',
        darkColor: '#15B79E'
      }
    case SAAS:
      return {
        icon: SassIcon,
        lightColor: '#EFF4FF',
        darkColor: '#2E90FA'
      }
    case MARKET_PLACE:
      return {
        icon: MarketPlaceIcon,
        lightColor: '#FFF1F3',
        darkColor: '#F63D68'
      };
    case GAMING:
      return {
        icon: GamingIcon,
        lightColor: '#F8FAFC',
        darkColor: '#697586'
      };
    case OTHERS:
      return {
        icon: OtherIcon,
        lightColor: '#F8FAFC',
        darkColor: '#697586'
      };
    case ED_TECH:
      return {
        icon: EdTechIcon,
        lightColor: '#F8F9FC',
        darkColor: '#4E5BA6'
      };
    case AGENCY:
      return {
        icon: AgencyIcon,
        lightColor: '#FEFBE8',
        darkColor: '#EAAA08'
      };
    default:
      return {
        icon: D2CIcon,
        lightColor: '#FDF4FF',
        darkColor: '#E478FA'
      };
  }
}

export const getRangeValue = (value = 0) => {
  return value * RANGE_MULTIPLICATION;
}

export function prepareQueryFilter(filters) {
  let url = '';
  if(Object.keys(filters)?.length) {
    Object.keys(filters).forEach((keyName) => {
      let filterField = filters[keyName];
      if(keyName === RANGE_KEY) {
        if(filterField?.hasChanged) {
            url+= `&min_ttm_Revenue=${getRangeValue(filters[RANGE_KEY].value[0])}&max_ttm_Revenue=${getRangeValue(filters[RANGE_KEY].value[1])}`;
        }
      }
      else if(Array.isArray(filterField)) {
        if(filterField?.length > 0) {
          let arrayValues = filters[keyName].join(',') || '';
          url+= `&${keyName}=${arrayValues}`;
        }
      }
      else if(filterField){
        url += `&${keyName}=${filterField}`
      }
    })
  }
  return url;
}

export function prepareFilterBody(filters={}) {
  let dataMap = [];
  Object.keys(filters).forEach((filterKey) => {
    if(filterKey === RANGE_KEY) {
      if(filters[filterKey]?.hasChanged) {
        dataMap.push({
          filterKey: 'ttmCalculated',
          operation: 'ge',
          value: getRangeValue(filters[filterKey]?.value[0])
        })
        dataMap.push({
          filterKey: 'ttmCalculated',
          operation: 'lt',
          value: getRangeValue(filters[filterKey]?.value[1])
        })
      }
    }
    else if(filters[filterKey]?.operation) {
      let obj = {
        filterKey,
        operation: filters[filterKey]?.operation,
      }
      if(Array.isArray(filters[filterKey]?.value)) {
        obj['valueList'] = filters[filterKey]?.value;
      }
      else {
        obj['value'] = filters[filterKey]?.value;
      }
      dataMap.push(obj);
    }
    else if (filterKey === 'rangeCalender'){
      let [startDate,endDate] = filters[filterKey]
      if(startDate) {
        dataMap.push({
          filterKey: 'createdAt',
          operation: 'ge',
          value: startDate
        })
      }
      if(endDate) {
        dataMap.push({
          filterKey: 'createdAt',
          operation: 'le',
          value: endDate
        })
      }
    }
    else if(Array.isArray(filters[filterKey])) {
      if(filters[filterKey]?.length > 0) {
        dataMap.push({
          filterKey: filterKey,
          operation: 'in',
          valueList: filters[filterKey]
        })
      }
    }
    else if(filterKey === SORT_BY_KEY) {
      // if(filters[filterKey]) {
      //   dataMap.push({
      //     filterKey: filterKey,
      //     operation: 'eq',
      //     value: filters[filterKey]
      //   })
      // }
    }
    else if(filterKey === EBITDA_KEY) {
      if(filters[filterKey] && filters[filterKey] !== 'open') {
        dataMap.push({
          filterKey: filterKey,
          operation: 'eq',
          value: filters[filterKey]
        })
      }
    }
    else if(filterKey === 'searchString') {}

    else if(filterKey === NEW_RECOMMENDATIONS_KEY) {
      if(filters[filterKey]) {
        dataMap.push({
          filterKey: filterKey,
          operation: 'eq',
          value: filters[filterKey] === 'yes' ? true : false
        })
      }
    }
    
    else if(filters[filterKey]){
      dataMap.push({
        filterKey: filterKey,
        operation: 'eq',
        value: filters[filterKey]
      })
    }
   
  })
  return dataMap;
}

export const isPhoneNumberValid = (number) => {
  return /^[6789]\d{9}$/.test(number)
  // return /^\d{10}$/.test(number);
}

export function getDate(value, format="DD-MM-YYYY") {
  return moment(value).format(format); 
}

  export function getValueFromArr(value, arr=[]) {
    let label = '';
    arr.forEach(element => {
        if(element.key === value) label = element.value
    });
    return label;
  }

export function getFieldValue(data, key) {
  return data[key] || '';
}

export function getCueCardDetails(id, callback, dealId) {
  let dataToSend = {
    companyId: id,
    dealId,
    callback
  }
  store.dispatch(getCueCardData(dataToSend));
}

export function getFieldLabelData(formData, key, label) {
  return  formData?.[key]?.[label] || '';
}

export function isAlphabetOnly(value) {
  return /^[a-z A-Z]+$/.test(value);
}

export function isVerifiedBuyer() {
  let verifiedBuyer = store.getState()?.buyerVerificationStore?.buyerVerificationState?.status;
  return isAuthenticated() && verifiedBuyer === 'verified';
}

export function getAppBaseUrl() {
  return APP_BASE_URL;
}

export function makeid(length) {
  let result = '';
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = CHARACTERS.length;
  let counter = 0;
  while (counter < length) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function isValidWebsite(userInput) {
  var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if(res == null)
      return false;
  else
      return true;
}

export function getValueFromOptions(selectedValue, valueArr) {
  if(valueArr?.length) {
      let filterData = valueArr.filter((listItem) => listItem.optionValue === selectedValue);
      return filterData[0]?.optionText;
  }
  return selectedValue
}

export function handleNavigation(navigate) {
  if(isAuthenticated()) {
    reRouteUser(navigate);
  }
  else {
    navigate(logoutUserRedirectionPath());
  }
}

export function prepareFilterModel(filters = {}) {
  let searchCriteriaList = []
  searchCriteriaList = prepareFilterBody(filters);
  return {
      searchCriteriaList,
      dataOption: "all"
  }
}


export function commaSeperatedNumbers(number = '', prefix, thousand_separator, decimal_separator) {
  number=number.toString();
  let [nonDecimal, decimal] = number.split('.');
  nonDecimal = filterCurrencyValue(nonDecimal);
  let lastThree = nonDecimal.substring(nonDecimal.length-3);
  let otherNumbers = nonDecimal.substring(0,nonDecimal.length-3);
  if(otherNumbers !== '')
      lastThree = ',' + lastThree;
  let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + (decimal? `.${decimal}` : '');
  return res  ? res : '';
}

export function formatCurrency(number) {
  number = filterCurrencyValue(number);
  const formattedNumber = number.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  if (number < 1000000) {
      return `${formattedNumber}`;
  } else if (number >= 10000000 && number < 10000000) {
      return `${(number / 1000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} lakhs`;
  } else {
      return `${(number / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} crores`;
  }
}

export function statusMap(reminderState, reminderDate) {
  if(reminderState === 'resolved') {
      return {bg: 'white', color: '#027A48', label: 'Completed'}
  }
  else if(reminderState === 'on' && reminderDate) {
      let isOverdue = isOverDue(reminderDate);
      if(isOverdue) return {bg: '#D92D20', color: 'white', label: 'Overdue'}
      else return {bg: '#2E90FA', color: 'white', label: 'Pending'}
  }
}

export function isOverDue(apiDate) {
  let existingDate = apiDate ? moment(apiDate) : moment(), currentDate = moment();
  if(existingDate.isAfter(currentDate, 'day')) return false;
  return true;
}

export const downloadFileUsingBlob = (blob, fileName) => {
  const link = document.createElement('a');
  // create a blobURI pointing to our Blob
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  // some browser needs the anchor to be in the doc
  document.body.append(link);
  link.click();
  link.remove();
  // in case the Blob uses a lot of memory
  setTimeout(() => URL.revokeObjectURL(link.href), 7000);
};

export function dowanloadPdfUsingBase64(pdf, fileName) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

export function handleLoggedInNavigation(userType, navigate) {
  let userRoutes = UserBasedProtectedRoutes[userType];
  let commonStore = store.getState()?.commonStore;
  if((commonStore?.previousPath && userRoutes?.length && userRoutes.includes(commonStore?.previousPath)) || ((!isAdminUser && (commonStore?.previousPath.indexOf('/buyer/cue-card') > -1)) || ((isAdminUser && commonStore?.previousPath.indexOf('/admin/cue-card') > -1)) || ((!isAdminUser && commonStore?.previousPath.indexOf('/buyer/view-cue-card') > -1)))) {
      navigate(commonStore?.previousPath);
  }
  else {
      reRouteUser(navigate);
  }
}


export const truncateFileName = (fileName, maxLength) => {
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const firstPartLength = Math.floor((maxLength - 3) / 2);
  const lastPartLength = maxLength - firstPartLength - 3;

  const firstPart = fileName.substring(0, firstPartLength);
  const lastPart = fileName.substring(fileName.length - lastPartLength);
  
  return `${firstPart}...${lastPart}`;
};

export function getCalculatedValue(key, apiData) {
  let minValue = apiData?.[key]?.min ? apiData?.[key]?.min / RANGE_MULTIPLICATION : 0;
  let maxValue = apiData?.[key]?.max ? apiData?.[key]?.max / RANGE_MULTIPLICATION : 10;
  return {
    min: minValue,
    max: maxValue
  }
}

export function getFileExtnsion(fileName='') {
  let splitExtention = fileName.split('.');
  return splitExtention[splitExtention.length - 1];
}


export function addMonths(date, months) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

export function getAuthBasedUrl() {
  let url = '';
  if(isAdminUser()) url += 'admin/';
  else if(isBuyerUser()) url = 'buyer/';
  return `${getAppBaseUrl()}${url}`;
}

export function fetchAvailableTimeSlots(date, companyId, dealId, cb){
  let dataToSend = {
      payload: {
        meetingDate: dayjs(date)?.format("YYYY-MM-DD"),
        companyUid: companyId,
        dealId : dealId
      },
      callback: (res) => res?.status === API_SUCCESS_CODE && cb(res?.data?.timeSlots),
    };
    store.dispatch(fetchAvailableSlots(dataToSend));
}

export function handleCopyContent(content, type='Link') {
  if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content)
      .then(() => {
          store.dispatch(updateSnackbar({
              message: `${type} copied to clipboard.`,
              isOpen: true,
          }));
      })
      .catch(() => {
          store.dispatch(updateSnackbar({
              message: "Please try again",
              isOpen: true,
          }));
      });
  }
}

export function findValueOfSiblingKey(array, key, value, targetKey) {
  for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
          if (array[i].hasOwnProperty(targetKey)) {
              return array[i][targetKey];
          } else {
              return -1;
          }
      }
  }
  return -1;
}

export function customTimeFromNow(timestamp) {
  const now = new Date();
  const timeDiff = now - timestamp;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}

export function formatNumberToTwoDecimalPlaces(number) {
  if (Number.isInteger(number)) {
      return number;
  } else {
      return parseFloat(number.toFixed(2));
  }
}

export function checkEditableFieldValue(company, key) {
  return !company[key];
}

export function findObjectValue(array = [], key) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].qk_key === key) {
        return array[i].answer;
    }
  }
  return'';
}

export function renderIconBasedOnDeals(objective, placement="top") {
  let hasIcon = '', title = "";
  switch(objective) {
    case ACQUISITION_KEY:
      hasIcon = acqisitionIcon;
      title = 'Acquisition Deal';
      break;
    case FUNDING_KEY:
      hasIcon = fundingIcon;
      title = 'Funding deal';
      break;
    case OPEN_ALL_KEY:
      hasIcon = openToBothIcon;
      title = 'Open to Acquisition or Investing';
      break;
    default: hasIcon = '';
  }
  return hasIcon ? <BootstrapTooltip title={title} placement={placement} ><img className="w-[25px]" src={hasIcon} alt='deal type' /></BootstrapTooltip> : ''
}
