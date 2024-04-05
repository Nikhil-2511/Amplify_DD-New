let  ApiUrl = 'http://13.234.142.155:8080/api/company-service/v1/';
let AppUrl = 'http://ec2-65-1-125-121.ap-south-1.compute.amazonaws.com:3000/';
let development = false;
let ga_id = '';
let assets_url = 'https://dd-app-assets.s3.ap-south-1.amazonaws.com/img/';

let ga_cl_id = '1086275954467-upginoic55b0abc398mb4bkd12g0u153.apps.googleusercontent.com';
const HostName = window?.location?.hostname || '';

if(HostName.includes('app.done.deals')) {
    ApiUrl = 'https://app.done.deals/api/company-service/v1';
    AppUrl = 'https://app.done.deals/';
    development = false;
    ga_id = 'G-2XRY1302P5';
    ga_cl_id = '460596746777-0d44hhkdbpjqmhk77fv33rpkfh0h4cgr.apps.googleusercontent.com';
}

else if(HostName.includes('65.1.125.121')) {
    ApiUrl = 'http://13.234.142.155:8080/api/company-service/v1/';
    AppUrl = 'http://65.1.125.121:3000/';
    development = true;
    ga_id = "G-D7BTL74C32";
}


else if(HostName.includes('localhost')) {
    ApiUrl = 'http://13.234.142.155:8080/api/company-service/v1/';
    AppUrl = 'http://localhost:3000/';
    development = true;
}

export const API_BASE_URL  = ApiUrl;
export const APP_BASE_URL = AppUrl
export const GA_ID = ga_id;
export const TEST_ENVIRONMENT = development;
export const ASSETS_URL = assets_url;
export const GA_CL_ID = ga_cl_id;
