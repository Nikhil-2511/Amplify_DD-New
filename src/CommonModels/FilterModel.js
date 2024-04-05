import store from "../Redux";
import { ENDPOINT } from "../config/endpoint";
import { AGE_OF_COMPANY, ARRAY, BUY_SIDE_OWNER, COMPANY_LABEL, DROPDOWN, EBITDA_KEY,STATE_KEY, EBITDA_POSITIVE, MULTISELECT, RANGE_KEY, REVENUE_RANGE, SEARCH_FILTER_PLACEHOLDER, SEARCH_KEY, SECTOR, STATUS, STATE_KEY_CHIP, SELLER_STATUS_CHIP, SELLER_STATUS, BOOLEAN, ONBOARDING_STAGE } from "../constants";
import { NEW_RECOMMENDATIONS_KEY } from "../constants/keyVariableConstants";
import { AdminDealsStatusArr, BuyerStatusArr, BuyerTypeArr, CompanySectorArr, EbitdaPositiveArr, EbitdaPositiveArrHeader,elSignStateArr, OnboardingStageFilterOptions, OperationArr, sellerStatusArr, StatusArr, SubsectorMapping, UserObjectives } from "./CommonCollection";

export const DefaultFilterModels = {
    'preferences.sector': {
        sectorOptions: CompanySectorArr,
        // fieldType: MULTISELECT,
        fieldType: 'preferences.sector',
        placeholder: COMPANY_LABEL,
        subSectorOptions: SubsectorMapping,
        chipPlaceholder: SECTOR,
        type: ARRAY
    },
    [RANGE_KEY]: {
        fieldType: RANGE_KEY,
        placeholder: REVENUE_RANGE,
        maxRange: 100,
        minRange: 0,
        step: 0.5,
        chipPlaceholder: REVENUE_RANGE,
        type: RANGE_KEY
    },
    [EBITDA_KEY]: {
        optionsData: EbitdaPositiveArrHeader,
        fieldType: DROPDOWN,
        placeholder: EBITDA_POSITIVE,
        chipPlaceholder: EBITDA_POSITIVE,
        type: ''
    },
    'ageOfOpsRange': {
        optionsData: OperationArr,
        fieldType: DROPDOWN,
        placeholder: AGE_OF_COMPANY,
        chipPlaceholder: AGE_OF_COMPANY,
        type: ''
    }
}

export function AdminSellerFilterModel() {
    return (
        {
            'searchString': {
                fieldType: SEARCH_KEY,
                placeholder: SEARCH_FILTER_PLACEHOLDER,
                chipPlaceholder: 'Search',
                type: 'search'
            },
            'preferences.sector': {
                sectorOptions: CompanySectorArr,
                // fieldType: MULTISELECT,
                fieldType: 'preferences.sector',
                placeholder: COMPANY_LABEL,
                subSectorOptions: SubsectorMapping,
                chipPlaceholder: SECTOR,
                type: ARRAY
            },
            [RANGE_KEY]: {
                fieldType: RANGE_KEY,
                placeholder: REVENUE_RANGE,
                maxRange: 50,
                minRange: 0,
                step: 0.5,
                chipPlaceholder: REVENUE_RANGE,
                type: RANGE_KEY
            },
            [EBITDA_KEY]: {
                optionsData: EbitdaPositiveArrHeader,
                fieldType: DROPDOWN,
                placeholder: EBITDA_POSITIVE,
                chipPlaceholder: EBITDA_POSITIVE,
                type: ''
            },
            [STATE_KEY]: {
                optionsData: elSignStateArr,
                fieldType: DROPDOWN,
                placeholder: "EL signed",
                chipPlaceholder: STATE_KEY_CHIP,
                type: ''
            },
            'objective': {
                optionsData: UserObjectives,
                fieldType: MULTISELECT,
                placeholder: 'Primary Purpose',
                chipPlaceholder: 'Primary Purpose',
                type: ARRAY,
            }
        }
    )
}

export function AdminSellerFilterModelWithStatus() {
    return (
        {
            'searchString': {
                fieldType: SEARCH_KEY,
                placeholder: SEARCH_FILTER_PLACEHOLDER,
                chipPlaceholder: 'Search',
                type: 'search'
            },
            'preferences.sector': {
                sectorOptions: CompanySectorArr,
                // fieldType: MULTISELECT,
                fieldType: 'preferences.sector',
                placeholder: COMPANY_LABEL,
                subSectorOptions: SubsectorMapping,
                chipPlaceholder: SECTOR,
                type: ARRAY
            },
            [RANGE_KEY]: {
                fieldType: RANGE_KEY,
                placeholder: REVENUE_RANGE,
                maxRange: 50,
                minRange: 0,
                step: 0.5,
                chipPlaceholder: REVENUE_RANGE,
                type: RANGE_KEY
            },
            [EBITDA_KEY]: {
                optionsData: EbitdaPositiveArrHeader,
                fieldType: DROPDOWN,
                placeholder: EBITDA_POSITIVE,
                chipPlaceholder: EBITDA_POSITIVE,
                type: ''
            },
            [SELLER_STATUS]: {
                optionsData: sellerStatusArr,
                fieldType: DROPDOWN,
                placeholder: "Seller status",
                chipPlaceholder: SELLER_STATUS_CHIP,
                type: ''
            },
            'objective': {
                optionsData: UserObjectives,
                fieldType: MULTISELECT,
                placeholder: 'Primary Purpose',
                chipPlaceholder: 'Primary Purpose',
                type: ARRAY,
            }
        }
    )
}
export function AdminSellerFilterModeAwaitingApproval() {
    return (
        {
            'searchString': {
                fieldType: SEARCH_KEY,
                placeholder: SEARCH_FILTER_PLACEHOLDER,
                chipPlaceholder: 'Search',
                type: 'search'
            },
            'preferences.sector': {
                sectorOptions: CompanySectorArr,
                // fieldType: MULTISELECT,
                fieldType: 'preferences.sector',
                placeholder: COMPANY_LABEL,
                subSectorOptions: SubsectorMapping,
                chipPlaceholder: SECTOR,
                type: ARRAY
            },
            [RANGE_KEY]: {
                fieldType: RANGE_KEY,
                placeholder: REVENUE_RANGE,
                maxRange: 50,
                minRange: 0,
                step: 0.5,
                chipPlaceholder: REVENUE_RANGE,
                type: RANGE_KEY
            },
            [EBITDA_KEY]: {
                optionsData: EbitdaPositiveArrHeader,
                fieldType: DROPDOWN,
                placeholder: EBITDA_POSITIVE,
                chipPlaceholder: EBITDA_POSITIVE,
                type: ''
            },
            'onboardingStage': {
                optionsData: OnboardingStageFilterOptions,
                fieldType: DROPDOWN,
                placeholder: ONBOARDING_STAGE,
                chipPlaceholder: ONBOARDING_STAGE,
                type: ''
            },
            'objective': {
                optionsData: UserObjectives,
                fieldType: MULTISELECT,
                placeholder: 'Primary Purpose',
                chipPlaceholder: 'Primary Purpose',
                type: ARRAY,
            }
        }
    )
}

export const DealsFilterModel = {
    'dealStatus': {
        optionsData: StatusArr,
        fieldType: MULTISELECT,
        placeholder: STATUS,
        chipPlaceholder: 'Deal Status',
        type: ARRAY
    }
}

export function BuyerFilterModel() {
    return (
        {
            'searchString': {
                fieldType: SEARCH_KEY,
                placeholder: SEARCH_FILTER_PLACEHOLDER,
                chipPlaceholder: 'Search',
                type: 'search'
            },
            'preferences.sector': {
                optionsData: CompanySectorArr,
                fieldType: MULTISELECT,
                placeholder: COMPANY_LABEL,
                chipPlaceholder: SECTOR,
                type: ARRAY
            },
            [BUY_SIDE_OWNER]: {
                optionsData: store.getState()?.authorizationStore?.adminUsersList || [],
                fieldType: MULTISELECT,
                placeholder: 'Buy-side Owner',
                chipPlaceholder: 'Buy-side owner',
                type: ARRAY
            },
            [NEW_RECOMMENDATIONS_KEY]: {
                optionsData: EbitdaPositiveArr,
                fieldType: DROPDOWN,
                placeholder: 'Recommendations',
                chipPlaceholder: 'New recommendations'
            },
            'type': {
                optionsData: BuyerTypeArr,
                fieldType: DROPDOWN,
                placeholder: 'Buyer Type',
                chipPlaceholder: 'Buyer Type'
            }
        }
    )
}

export function AdminBuyerOtherFilterModel() {
    return (
        {
            'searchString': {
                fieldType: SEARCH_KEY,
                placeholder: SEARCH_FILTER_PLACEHOLDER,
                chipPlaceholder: 'Search',
                type: 'search'
            },
            'preferences.sector': {
                optionsData: CompanySectorArr,
                fieldType: MULTISELECT,
                placeholder: COMPANY_LABEL,
                chipPlaceholder: SECTOR,
                type: ARRAY
            },
            [BUY_SIDE_OWNER]: {
                optionsData: store.getState()?.authorizationStore?.adminUsersList || [],
                fieldType: MULTISELECT,
                placeholder: 'Buy-side Owner',
                chipPlaceholder: 'Buy-side owner',
                type: ARRAY
            },
            'type': {
                optionsData: BuyerTypeArr,
                fieldType: DROPDOWN,
                placeholder: 'Buyer Type',
                chipPlaceholder: 'Buyer Type'
            },
            // 'status': {
            //     optionsData: BuyerStatusArr,
            //     fieldType: DROPDOWN,
            //     placeholder: 'Buyer Status',
            //     chipPlaceholder: 'Buyer Status'
            // }
        }
    )
}


export function AdminDealsFilterModel() {
    
    function prepareUrl(apiPathFucntion, extraParam) {
        return function (page, size, searchString) {
            return apiPathFucntion(page, size, searchString) + (extraParam || '');
        }
    }

    return (
        {
            "buyerId": {
                fieldType: 'textSearch',
                placeholder: 'Buyer Company Name',
                chipPlaceholder: 'Buyer ID',
                type: 'textSearch',
                apiUrl: prepareUrl(ENDPOINT.BUYERS.getBuyerListApi, '&onlyName=true'),
                selectedElementKey: 'id',
                displayKey: 'companyName'
            },
            "sellerId": {
                fieldType: 'textSearch',
                placeholder: 'Seller Company Name',
                chipPlaceholder: 'Seller ID',
                type: 'textSearch',
                apiUrl: prepareUrl(ENDPOINT.BUYERS.buyerListing, '&onlyName=true'),
                selectedElementKey: 'id',
                displayKey: 'name'
            },
            'dealStatus': {
                optionsData: AdminDealsStatusArr,
                fieldType: MULTISELECT,
                placeholder: 'Deal Status',
                chipPlaceholder: 'Deal Status',
                type: ARRAY,
                bodyClassName: 'max-scroll-dropdown'
            },
            [BUY_SIDE_OWNER]: {
                optionsData: store.getState()?.authorizationStore?.adminUsersList || [],
                fieldType: MULTISELECT,
                placeholder: 'Buy-side Owner',
                chipPlaceholder: 'Buy-side owner',
                type: ARRAY
            } ,
            "rangeCalender":  { 
                optionsData: [],
                fieldType: "rangeCalender",
                placeholder: 'Deal Created Date',
                chipPlaceholder: 'Deal Created',
                type: 'rangeCalender'
            },
            'objective': {
                optionsData: UserObjectives,
                fieldType: MULTISELECT,
                placeholder: 'Deal Type',
                chipPlaceholder: 'Deal type',
                type: ARRAY,
            }
        }
    )
}


export function AdminBuyerAwaitingFilterModel() {
    return (
        {
            'searchString': {
                fieldType: SEARCH_KEY,
                placeholder: SEARCH_FILTER_PLACEHOLDER,
                chipPlaceholder: 'Search',
                type: 'search'
            },
            'preferences.sector': {
                optionsData: CompanySectorArr,
                fieldType: MULTISELECT,
                placeholder: COMPANY_LABEL,
                chipPlaceholder: SECTOR,
                type: ARRAY
            },
            [BUY_SIDE_OWNER]: {
                optionsData: store.getState()?.authorizationStore?.adminUsersList || [],
                fieldType: MULTISELECT,
                placeholder: 'Buy-side Owner',
                chipPlaceholder: 'Buy-side owner',
                type: ARRAY
            },
            'type': {
                optionsData: BuyerTypeArr,
                fieldType: DROPDOWN,
                placeholder: 'Buyer Type',
                chipPlaceholder: 'Buyer Type'
            }
        }
    )
}