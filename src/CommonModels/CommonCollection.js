import React from 'react';

import { AGE_OF_COMPANY_KEY, CLOSING, DEAL_DROPPED, DONE_DEAL, EBITDA_POSITIVE_KEY, EXPRESS_INTEREST_KEY, HIGH, HIGH_TO_LOW, INTRODUCTION_PENDING_KEY, LOW_TO_HIGH, MOST_RECENT, NEGOTIATION, NORMAL, RANGE_KEY, SECTOR, ON_HOLD } from "../constants"
import { AUDIT_KEY, CAPTABLE_KEY, CORPORATE_KEY, CORPORATE_VC_KEY, CREDIT_RATING, FAMILY_OFFICE_KEY, GST_FILING_KEY, INDIVIDUAL_KEY, ITR_KEY, MIS_KEY, PITCHDECK_KEY, REGISTRATIONS_AND_LICENSES_KEY, VC_PE_KEY } from '../constants/keyVariableConstants';

export const CompanySectorArr = [
    {
        key: 'D2C',
        value: 'D2C'
    },
    {
        key: 'Marketplace',
        value: 'Marketplace'
    },
    {
        key: 'Agency',
        value: 'Agency'
    },
    {
        key: 'Edtech',
        value: 'EdTech'
    },
    {
        key: 'Fintech',
        value: 'FinTech'
    },
    {
        key: 'Gaming',
        value: 'Gaming'
    },
    {
        key: 'SaaS',
        value: 'SaaS'
    },
    {
        key: 'Others',
        value: 'Others'
    }
]

export const SortByArr = [
    {
        direction: 'DESC',
        fieldName: 'id',
        value: MOST_RECENT
    },
    {
        direction: 'DESC',
        fieldName: 'ttmCalculated',
        value: HIGH_TO_LOW
    },
    {
        direction: 'ASC',
        fieldName: 'ttmCalculated',
        value: LOW_TO_HIGH
    },
]

export const SellerSortByArr = [
    {
        direction: 'DESC',
        fieldName: 'id',
        value: 'Recently created'
    },
    {
        direction: 'DESC',
        fieldName: 'updatedAt',
        value: 'Recently updated'
    },
    {
        direction: 'DESC',
        fieldName: 'ttmCalculated',
        value: HIGH_TO_LOW
    },
    {
        direction: 'ASC',
        fieldName: 'ttmCalculated',
        value: LOW_TO_HIGH
    },
    {
        direction: 'ASC',
        fieldName: 'viewCount',
        value: 'Prospect \u2191'
    },
    {
        direction: 'DESC',
        fieldName: 'activeCount',
        value: 'Deals \u2193'
    },
]


export const SellerOthersSortByArr = [
    {
        direction: 'DESC',
        fieldName: 'id',
        value: 'Recently created'
    },
    {
        direction: 'DESC',
        fieldName: 'updatedAt',
        value: 'Recently updated'
    },
    {
        direction: 'DESC',
        fieldName: 'ttmCalculated',
        value: HIGH_TO_LOW
    },
    {
        direction: 'ASC',
        fieldName: 'ttmCalculated',
        value: LOW_TO_HIGH
    },
]

export const BuyerOthersSortByArr =[
    {
        direction: 'DESC',
        fieldName: 'id',
        value: 'Recently created'
    },
    {
        direction: 'DESC',
        fieldName: 'updatedAt',
        value: 'Recently updated'
    }
]
export const AdminDealsSortByArr = [
    {
        direction: 'DESC',
        fieldName: 'id',
        value: 'Recently created'
    },
    {
        direction: 'DESC',
        fieldName: 'updatedAt',
        value: 'Recently updated'
    }
]

export const BuyerTypeArr = [
    {
        key: CORPORATE_KEY,
        value: 'Corporate'
    },
    {
        key: FAMILY_OFFICE_KEY,
        value: 'Family Office'
    },
    {
        key: VC_PE_KEY,
        value: 'VC/PE'
    },
    {
        key: CORPORATE_VC_KEY,
        value: 'Corporate VC'
    },
    {
        key: INDIVIDUAL_KEY,
        value: 'Individual'
    },
    {
        key: 'investment_bank',
        value: 'Investment Bank'
    },
]

export const BuyerStatusArr = [
    {
        key: 'rejected',
        value: 'Rejected'
    },
    {
        key: 'delist',
        value: 'De-listed'
    },
]

export const BuyerOnboardingTypeArr = [
    {
        key: CORPORATE_KEY,
        value: 'Corporate'
    },
    {
        key: FAMILY_OFFICE_KEY,
        value: 'Family Office'
    },
    {
        key: VC_PE_KEY,
        value: 'VC/PE'
    },
    {
        key: CORPORATE_VC_KEY,
        value: 'Corporate VC'
    },
]

export const AcquisitionSizeArr = [
    {
        key: 'zero_to_five',
        value: '0 - 5 CR'
    },
    {
        key: 'five_to_twentyFive',
        value: '5 - 25 CR'
    },
    {
        key: 'twentyFive_to_seventyFive',
        value: '25 - 75 CR'
    },
    {
        key: 'more_than_seventyFive',
        value: '75+ CR'
    }
]
export const OperationArr = [
    {
        key: 'zero_to_two',
        value: '0 - 2 years'
    },
    {
        key: 'two_to_five',
        value: '2 - 5 years'
    },
    {
        key: 'five_to_eight',
        value: '5 - 8 years'
    },
    {
        key: 'more_than_eight',
        value: '8+ years'
    }
]

export const RevenueRangeArr = [
    // {
    //     key: 'pre_revenue',
    //     value: 'Pre revenue'
    // },
    {
        key: 'zero_to_ten',
        value: '0 - 10 CR'
    },
    {
        key: 'ten_to_twentyFive',
        value: '10 - 25 CR'
    },
    {
        key: 'more_than_twentyFive',
        value: '25+ CR'
    }
]

export const AcquisitionTimeLineArr = [
    {
        key: 'less_than_three',
        value: '< 3 months'
    },
    {
        key: 'three_to_six',
        value: '3 - 6 months'
    },
    {
        key: 'six_to_nine',
        value: '6 - 9 months'
    },
    {
        key: 'nine_to_twelve',
        value: '9 - 12 months'
    },
    {
        key: 'more_than_twelve',
        value: '> 12 months'
    },
]

export const SubsectorMapping = {
    'D2C': [
        {
            key: 'Apparel',
            value: 'Apparel'
        },
        {
            key: 'B&P',
            value: 'Beauty & Personal Care'
        },
        {
            key: 'F&B',
            value: 'Food & Beverage'
        },
        {
            key: 'Footwear',
            value: 'Footwear'
        },
        {
            key: 'Healthcare',
            value: 'Healthcare'
        },
        {
            key: 'H&H',
            value: 'Home & Household Supplies'
        },
        {
            key: 'Jewellery',
            value: 'Jewellery'
        },
        {
            key: 'Personal Care',
            value: 'Personal Care'
        }
    ],
    'Fintech': [
        {
            key: 'Insurance',
            value: 'Insurance'
        },
        {
            key: 'Lending/Wealthtech',
            value: 'Lending/Wealthtech'
        },
        {
            key: 'Others',
            value: 'Others'
        },
        {
            key: 'Payments',
            value: 'Payments'
        },
        {
            key: 'Personal Finance',
            value: 'Personal Finance'
        },
        {
            key: 'Regulation Tech',
            value: 'Regulation Tech'
        }
    ],
    'Others': [
        {
            key: 'Agritech',
            value: 'Agritech'
        },
        {
            key: 'AI/Deeptech/IoT',
            value: 'AI/Deeptech/IoT'
        },
        {
            key: 'Automobile',
            value: 'Automobile'
        },
        {
            key: 'B2B Services',
            value: 'B2B Services'
        },
        {
            key: 'Consumer Goods',
            value: 'Consumer Goods'
        },
        {
            key: 'Crypto/Blockchain',
            value: 'Crypto/Blockchain'
        },
        {
            key: 'Cybersecurity',
            value: 'Cybersecurity'
        },
        {
            key: 'Healthcare',
            value: 'Healthcare'
        },
        {
            key: 'Hospitality/Restaurants',
            value: 'Hospitality/Restaurants'
        },
        {
            key: 'IT Services/Products',
            value: 'IT Services/Products'
        },
        {
            key: 'Logistics',
            value: 'Logistics'
        },
        {
            key: 'Manufacturing/Exports',
            value: 'Manufacturing/Exports'
        },
        {
            key: 'Marketplace',
            value: 'Marketplace'
        },
        {
            key: 'Media',
            value: 'Media'
        },
        {
            key: 'Real Estate/Proptech',
            value: 'Real Estate/Proptech'
        },
        {
            key: 'Renewables/EV',
            value: 'Renewables/EV'
        },
        {
            key: 'Sports/Fitness-tech',
            value: 'Sports/Fitness-tech'
        },
    ]
}

export const EbitdaPositiveArr = [
    {
        key: 'yes',
        value: 'Yes'
    },
    {
        key: 'no',
        value: 'No'
    }
]

export const EbitdaPositiveArrHeader = [
    {
        key: 'yes',
        value: 'Yes'
    },
    {
        key: 'open',
        value: 'Open to all'
    }
]

export const OnboardingStageFilterOptions = [
    {
        key: 1,
        value: 'Basic Information'
    },
    {
        key: 2,
        value: 'Financials'
    },
    {
        key: 3,
        value: 'Complete'
    },
]

export const elSignStateArr = [
    {
        key: "signed",
        value:'Yes'
    },
    {
        key: "resign",
        value:'Re-sign'
    },
    {
        key: "awaiting_approval",
        value:'Request resign'
    },
    {
        key: "not_signed",
        value:'No'
    }
]

export const sellerStatusArr = [
    {
        key:'rejected',
        value:'Rejected'
    },
    {
        key:'junk',
        value:'Junk'
    },
    {
        key:'delist',
        value:'Delisted'
    },

]

export const PriorityArr = [
    {
        key: 'high',
        value: HIGH
    },
    {
        key: 'normal',
        value: NORMAL
    }
]

export const StatusArr = [
    NEGOTIATION,
    CLOSING,
    DONE_DEAL,
    // DEAL_DROPPED
]

export const AdminDealsStatusArr = [
    {
        key: 'discovery',
        value: 'Discovery'
    },
    {
        key: "deal_shared",
        value: "Deal Shared"
    },
    {
        key: 'pass',
        value: 'Passed'
    },
    {
        key: 'shortlist',
        value: 'Shortlisted'
    },
    {
        key: 'seller_rejected',
        value: 'Seller Rejected',
    },
    {
        key: EXPRESS_INTEREST_KEY,
        value: 'Expressed Interest'
    },
    {
        key: INTRODUCTION_PENDING_KEY,
        value: 'Introduction Pending',
    },
    NEGOTIATION,
    CLOSING,
    DONE_DEAL,
    DEAL_DROPPED,
    ON_HOLD
]

export const AllDealsArr = [
    NEGOTIATION,
    CLOSING,
    DONE_DEAL,
    DEAL_DROPPED,
    {
        key: EXPRESS_INTEREST_KEY,
        value: 'Expressed Interest'
    },
    {
        key: 'shortlist',
        value: 'Shortlisted'
    },
    {
        key: 'pass',
        value: 'Passed'
    },
    
    {
        key: 'rejected',
        value: 'Rejected'
    },
    {
        key: 'verification_in_progress',
        value: 'Verification in progress'
    },
    {
        key: 'junk',
        value: 'Junk'
    },
    {
        key: 'archived',
        value: 'Archived'
    },
    {
        key: 'discovery',
        value: 'Discovery'
    },
    {
        key: 'seller_rejected',
        value: 'Seller Rejected',
    },
    {
        key: "not_relevant",
        value: 'Not Relevant',
    },
    {
        key: "deal_shared",
        value: "Deal Shared"
    },
    {
        key: INTRODUCTION_PENDING_KEY,
        value: 'Introduction Pending',
    },
    ON_HOLD
]

export const defaultFilters = [
    SECTOR,
    RANGE_KEY,
    EBITDA_POSITIVE_KEY,
    AGE_OF_COMPANY_KEY
]

export const SellerVerificationStatusArr = [
    {
        key: 'Active',
        value: 'Active'
    },
    {
        key: 'Passive',
        value: 'Passive'
    },
    {
        key: 'Inactive',
        value: 'Inactive'
    },
    {
        key: 'Incomplete',
        value: 'Incomplete'
    },
    {
        key: 'verified',
        value: 'Verified'
    },
    {
        key: 'not_verified',
        value: 'Not verified'
    },
    {
        key: 'rejected',
        value: 'Rejected'
    },
    {
        key: 'verification_in_progress',
        value: 'Verification in progress'
    },
    {
        key: 'junk',
        value: 'Junk'
    },
    {
        key: 'archived',
        value: 'Archived'
    },
    {
        key: 'delist',
        value: 'Delisted'
    }
]

export const BuyerDealsAcitonArr = [
    {
        key: 'rejected',
        value: 'Seller rejects interest',
        className: 'text-D92D20'
    },
    NEGOTIATION,
    CLOSING,
    DONE_DEAL,
    {
        ...DEAL_DROPPED,
        className: 'text-D92D20'
    }
]


export const SellerDealsAcitonArr = [
    {
        key: 'seller_rejected',
        value: 'Seller rejects interest',
        className: 'text-D92D20'
    },
    {
        key: INTRODUCTION_PENDING_KEY,
        value: 'Introduction Pending',
    },
    NEGOTIATION,
    CLOSING,
    DONE_DEAL,
    {
        ...DEAL_DROPPED,
        className: 'text-D92D20'
    },
    ON_HOLD
]

export const NotesType = [
    // {
    //     key: 'verification',
    //     value: 'Verification'
    // },
    {
        key: 'call',
        value: '1-on-1 call'
    },
    {
        key: 'deal',
        value: 'Deal'
    },
    {
        key: 'other',
        value: 'Other'
    }
]


export const AllNotesArr = [
    {
        key: 'verification',
        value: 'Verification'
    },
    {
        key: 'el_verification',
        value: 'EL Verification'
    },
    {
        key: 'call',
        value: '1-on-1 call'
    },
    {
        key: 'deal',
        value: 'Deal'
    },
    {
        key: 'other',
        value: 'Other'
    },
    {
        key: 'deal_transition',
        value: 'Deal Transition'
    },
    {
        key: 'tnc_verification',
        value: 'Tnc Verification'
    }
]

export const AdminBuyerSortByArr = [
    {
        direction: 'DESC',
        fieldName: 'id',
        value: 'Recently created'
    },
    {
        direction: 'DESC',
        fieldName: 'updatedAt',
        value: 'Recently updated'
    },
    {
        direction: 'ASC',
        fieldName: 'viewCount',
        value: 'Prospects \u2191'
    },
    {
        direction: 'DESC',
        fieldName: 'activeCount',
        value: 'Deals \u2193'
    },
]

export const AdminPendingActionsSortByArr = [
    {
        direction: 'ASC',
        fieldName: 'reminderDate',
        value: 'Due date \u2191'
    },
    {
        direction: 'DESC',
        fieldName: 'reminderDate',
        value: 'Due date \u2193'
    }
]

export const AdminScheduledCallsSortByArr = [
    {
        direction: 'ASC',
        fieldName: 'dateTime',
        value: 'Upcoming'
    }
]

export const UserTypesCollection = [
    {
        key: 'admin',
        value: 'Admin'
    },
    {
        key: 'buyer',
        value: 'Buyer'
    },
    {
        key: 'seller',
        value: 'Seller'
    }
]

export const StatusBasedSubStatus = {
    [INTRODUCTION_PENDING_KEY]: [
        {
            key: 'in_email_connect',
            value: 'Seller & Buyer Connected Over Email'
        },
        {
            key: 'in_information',
            value: 'Initial Information Asked by Buyer'
        },
        {
            key: 'in_slot',
            value: 'Slots Shared by Seller'
        },
        {
            key: 'in_call_setup',
            value: 'Call Setup'
        }
    ],
    [NEGOTIATION.key]: [
        {
            key: 'neg_initial',
            value: 'Initial Information Shared + Follow-up Calls'
        },
        {
            key: 'neg_call',
            value: 'Call Done and MIS to be Shared'
        },
        {
            key: 'neg_mis',
            value: 'MIS Shared + Buyer to Get Back'
        },
        {
            key: 'neg_buyer',
            value: 'Buyer Queries and Sellers to Respond'
        }
    ]
}

export const SubStatuses = {
    'in_email_connect': 'Seller & Buyer Connected Over Email',
    'in_information': 'Initial Information Asked by Buyer',
    'in_slot': 'Slots Shared by Seller',
    'in_call_setup': 'Call Setup',
    'neg_initial': 'Initial Information Shared + Follow-up Calls',
    'neg_call': 'Call Done and MIS to be Shared',
    'neg_mis': 'MIS Shared + Buyer to Get Back',
    'neg_buyer': 'Buyer Queries and Sellers to Respond',
}

export const DataRoomFieldLabel = {
    [PITCHDECK_KEY]: 'Pitchdeck',
    [CAPTABLE_KEY]: 'Cap Table and Board Profile',
    [REGISTRATIONS_AND_LICENSES_KEY]: 'Registration & Licenses',
    [AUDIT_KEY]: 'Audited Financials',
    [MIS_KEY]: 'MIS',
    [ITR_KEY]: 'ITR',
    [GST_FILING_KEY]: 'GST Filing',
    [CREDIT_RATING]: 'Credit rating',
}

export const ActiveDealsStatus = {
    dealStatus: [DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, INTRODUCTION_PENDING_KEY, ON_HOLD.key]
}

export const UserObjectives = [
    {
        "key": 'acquisition',
        "value": 'Acquisition'
    },
    {
        "key": 'funding',
        "value": 'Funding'
    },
    {
        "key": 'open_al',
        "value": 'Open to All'
    },
]