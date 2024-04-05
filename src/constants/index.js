import { makeid } from "../helper/commonHelper";

export const IS_VALID_COMPANY = 'isValidCompany';
export const TOKEN_KEY = 'authToken';
export const SESSION_ID = 'sessionid';
export const COMPANY_NOT_FOUND = 'company_not_found';
export const COMPANY_FOUND = 'company_found';
export const CHAR_COUNT_VALUE = 255;

// Rupee Symbol
export const RUPEE_SYMBOL = '₹';

// Business Type
export const FINTECH = 'Fintech';
export const SAAS = 'SaaS';
export const MARKET_PLACE = 'Marketplace';
export const GAMING = 'Gaming';
export const OTHERS = 'Others';
export const ED_TECH = 'Edtech';
export const AGENCY = 'Agency';
export const D2C = 'D2C';

// Fields constants

export const NUMBER = 'number';
export const TEXTAREA = 'textarea';
export const CHIP_INPUT = 'chip_input';
export const SLIDER = 'slider';
export const BOOLEAN = 'boolean';
export const PERCENTAGE = 'percentage';
export const CURRENCY = 'currency';
export const DROPDOWN = 'dropdown';
export const TOGGLE = 'toggle';
export const SEARCH_KEY = 'search';
export const RADIO_KEY = 'radio';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const ALL = 'all';
export const DELETE = 'DELETE';
export const LIGHT_THEME = 'lightTheme';
export const DARK_THEME = 'darkTheme';
export const SINGLEDROPDOWN = 'singleDropdown'
export const DATEPICKER = 'datePicker'

// admin tabs variable
export const INTEREST_SENT = 'Interest sent';
export const HIGH = 'High';
export const NORMAL = 'Normal';
export const LOW = 'Low';
export const AWAITING_RESPONSE = 'Awaiting Approval';
export const ALL_BUYERS = 'All Buyers';
export const REJECTED_BUYERS = 'Rejected Buyers';
export const REJECTED_SELLERS = 'Rejected Sellers'
export const REJECTED = 'rejected';
export const ALL_SELLERS = 'All Sellers'

// Buyer Profile tabs variables
export const PROFILE = 'Profile';
export const NOTES = 'Notes';
export const MANDATES = 'Mandates';
export const COMPANIES_INTERESTED  = 'Companies Interested';
export const INTERESTED_BUYERS = 'Interested buyers';
export const ACTIVE_DEALS = 'Active Deals';
export const SCHEDULED_CALLS = 'Scheduled Calls';
export const ACTIVITY = 'Activity';
export const NEGOTIATION = {key: 'negotiation', value: 'Negotiation'};
export const CLOSING = {key: 'closing', value: 'Closing'};
export const DONE_DEAL = {key: 'done_deal', value: 'Done Deal'};
export const DEAL_DROPPED = {key:'deal_dropped', value: 'Deal Dropped'};
export const ON_HOLD = {key:'on_hold', value: 'On hold'};

export const COMPANY_LABEL = 'Company Sector';
export const REVENUE_RANGE = 'Revenue Range';
export const EBITDA_RANGE = 'Ebitda Range';
export const AGE_OF_COMPANY = 'Age of Company';
export const COMPANY_KEY = 'company';
export const RANGE_KEY = 'range';
export const EBITDA_KEY = 'ebitda';
export const AGE_OF_COMPANY_KEY = 'ageOfCompany';
export const MULTISELECT = 'multiselect';
export const MOST_RECENT = 'Most recent';
export const SORT_BY_KEY = 'sortBy';
export const TAB_FILTER = 'tabFilter';
export const LOW_TO_HIGH = `TTM Rev \u2191`;
export const HIGH_TO_LOW = `TTM Rev \u2193`;
export const BUYER_ALREADY_REGISTERED= 'buyer_already_registered';
export const BUYER_ID = 'buyerId';
export const EBITDA_POSITIVE = 'EBITDA Positive';
export const EBIDTA_NEGATIVE = 'EBITDA Negative'
export const EBITDA_STATUS = 'EBITDA Status'
export const VERIFIED = 'verified';
export const DELIST = 'delist';
export const REVENUE_WITH_CR = 'Revenue (CR)';
export const EBITDA_POSITIVE_KEY = 'ebitdaPositive';
export const EXPRESS_INTEREST_KEY = 'express_interest';
export const INTRODUCTION_PENDING_KEY = 'introduction_pending';
export const SHORTLIST = 'shortlist';
export const PASS = 'pass';
export const INCORRECT_OTP_HELPER = 'The OTP you entered is incorrect. Please try again.'
export const SOMETHING_WENT_BAD = 'Something went bad!!';
export const INCORRECT_EMAIL_HELPERTEXT = 'Please register using your professional email ID.'
export const APPROVE = 'approve';
export const REJECT = 'reject';
export const ARRAY = 'array';
export const DiSCOVERY_KEY = 'discovery';
export const RECOMMENDED = 'Recommended';
export const ONBOARDING_STAGE = 'Onboarding Stage'

// Status codes
export const API_SUCCESS_CODE = '200';
export const API_CODE_202 = '202';

// Range multiplication value
export const RANGE_MULTIPLICATION = 10000000;


// Filters component key
export const SECTOR = 'Sector';
export const BUY_SIDE_OWNER = 'buySideOwner';
export const STATUS = 'status';
export const OWNER = 'owner';
export const VERIFICATION_STATUS = 'verificationStatus';

// Previous path key

export const PREVIOUS_PATH_KEY = 'previousPath';
export const STATE = makeid(8);


export const VIEWED_COMPANIES = 'Viewed Companies';


export const SEARCH_FILTER_PLACEHOLDER = `Type keywords to search and hit ‘Enter’`

export const RECOMMENDED_COMPANIES = `Recommended Companies`;

export const INVALID_LINK = 'The cue card link is invalid. Please verify the link or reach out to your Deal Partner for a new one.';
export const EXPIRED_LINK = 'The cue card link has expired; please request a new one from your Deal Partner.';

// State of El sign Status on seller page of Admin
export const STATE_KEY = 'tncState';
export const STATE_KEY_CHIP = 'EL state'
export const SIGNED_KEY = 'signed';

// State of seller status on seller page of Admin
export const SELLER_STATUS = 'seller_status';
export const SELLER_STATUS_CHIP = 'seller status'

// upload extensions

export const UPLOAD_EXTENSIONS = '.pdf, .ppt, .pptx, .xlsx, .xls, .doc, .docx';
export const USERS = 'Users'

// export const BUYER_LOGIN = 'buyer_logged_in';
// export const BUYER_LOGIN = 'buyer_logged_in';
// export const BUYER_LOGIN = 'buyer_logged_in';
// export const BUYER_LOGIN = 'buyer_logged_in';
// export const BUYER_LOGIN = 'buyer_logged_in';
// export const BUYER_LOGIN = 'buyer_logged_in';
