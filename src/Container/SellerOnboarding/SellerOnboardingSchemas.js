import { AGENCY, D2C, ED_TECH, FINTECH, GAMING, MARKET_PLACE, SAAS, SINGLEDROPDOWN } from "../../constants"

export let sectors = [
    {
        "optionValue": 'D2C',
        "optionText": 'Consumer Products'
    },
    {
        "optionValue": 'Edtech',
        "optionText": 'Edtech'
    },
    {
        "optionValue": 'Fintech',
        "optionText": 'Fintech'
    },
    {
        "optionValue": 'Gaming',
        "optionText": 'Gaming'
    },
    {
        "optionValue": 'Agency',
        "optionText": 'Agency/Media'
    },
    {
        "optionValue": 'Marketplace',
        "optionText": 'Marketplace'
    },
    {
        "optionValue": 'SaaS',
        "optionText": 'SaaS'
    },
    {
        "optionValue": 'Others',
        "optionText": 'Others'
    },
];

export const Objectives = [
    {
        "optionValue": 'acquisition',
        "optionText": 'Acquisition'
    },
    {
        "optionValue": 'funding',
        "optionText": 'Funding'
    },
    // {
    //     "optionValue": 'open_to_both',
    //     "optionText": 'Open to both'
    // },
]

export const subsectorsObj = {
    D2C: {
        subsectors: [
            {
                "optionValue": 'Apparel',
                "optionText": 'Apparel'
            },
            {
                "optionValue": 'B&P',
                "optionText": 'Beauty & Personal Care'
            },
            {
                "optionValue": 'Personal Care',
                "optionText": 'Personal Care'
            },
            {
                "optionValue": 'F&B',
                "optionText": 'Food & Beverage'
            },
            {
                "optionValue": 'Footwear',
                "optionText": 'Footwear'
            },
            {
                "optionValue": 'Healthcare',
                "optionText": 'Healthcare'
            },
            {
                "optionValue": 'H&H',
                "optionText": 'Home & Household Supplies'
            },
            {
                "optionValue": 'Jewellery',
                "optionText": 'Jewellery'
            },
        ]
    },
    Fintech: {
        subsectors: [
            {
                "optionValue": 'Insurance',
                "optionText": 'Insurance'
            },
            {
                "optionValue": 'Lending/Wealthtech',
                "optionText": 'Lending/Wealthtech'
            },
            {
                "optionValue": 'Payments',
                "optionText": 'Payments'
            },
            {
                "optionValue": 'Personal Finance',
                "optionText": 'Personal Finance'
            },
            {
                "optionValue": 'Regulation Tech',
                "optionText": 'Regulation Tech'
            },
            {
                "optionValue": 'Others',
                "optionText": 'Others'
            },
        ]
    },
    Others: {
        subsectors: [
            {
                "optionValue": 'Agritech',
                "optionText": 'Agritech'
            },
            {
                "optionValue": 'AI/Deeptech/IoT',
                "optionText": 'AI/Deeptech/IoT'
            },
            {
                "optionValue": 'Automobile',
                "optionText": 'Automobile'
            },
            {
                "optionValue": 'B2B Services',
                "optionText": 'B2B Services'
            },
            {
                "optionValue": 'Consumer Goods',
                "optionText": 'Consumer Goods'
            },
            {
                "optionValue": 'Crypto/Blockchain',
                "optionText": 'Crypto/Blockchain'
            },
            {
                "optionValue": 'Cybersecurity',
                "optionText": 'Cybersecurity'
            },
            {
                "optionValue": 'Healthcare',
                "optionText": 'Healthcare'
            },
            {
                "optionValue": 'Hospitality/Restaurants',
                "optionText": 'Hospitality/Restaurants'
            },
            {
                "optionValue": 'IT Services/Products',
                "optionText": 'IT Services/Products'
            },
            {
                "optionValue": 'Logistics',
                "optionText": 'Logistics'
            },
            {
                "optionValue": 'Manufacturing/Exports',
                "optionText": 'Manufacturing/Exports'
            },
            {
                "optionValue": 'Marketplace',
                "optionText": 'Marketplace'
            },
            {
                "optionValue": 'Media',
                "optionText": 'Media'
            },
            {
                "optionValue": 'Real Estate/Proptech',
                "optionText": 'Real Estate/Proptech'
            },
            {
                "optionValue": 'Renewables/EV',
                "optionText": 'Renewables/EV'
            },
            {
                "optionValue": 'Sports/Fitness-tech',
                "optionText": 'Sports/Fitness-tech'
            },
        ]
    },
}


export const ttm_year = {
    label: 'What is your net revenue ? - for last 12 months (TTM)',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'ttmNet',
    isEditable: true
}

export const ttm_net = {
    label: 'What is your TTM revenue (trailing twelve months) ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'ttmRevenue',
    isEditable: true
}

export const ttm_month = {
    label: 'What is your net revenue for last month ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'currentNet',
    isEditable: true
}

export const recurringRev = {
    label: 'What is your Recurring revenue (in %) ?',
    error: false,
    showField: true,
    field_type: 'slider',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: '',
    key: 'recurringRevenue',
    isEditable: true
}

export const aov = {
    label: 'What is your average order value ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'aov',
    isEditable: true
}

export const ttmAdsSpend = {
    label: 'What was your ads and marketing spend during the trailing 12 months (TTM) ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'ttmAdsSpend',
    isEditable: true
}

export const ebitdaPercentage = {
    label: 'What is your EBITDA (in %) ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40',
    key: 'ebitdaPercentage',
    isEditable: true
}

export const customerGrowth = {
    label: 'What is your current customer growth rate (in %) ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40',
    key: 'customerGrowth',
    isEditable: true
}

export const amazonRating = {
    label: 'What is your product review rating ? (on a scale 0-5)',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 5',
    key: 'amazonRating',
    isEditable: true
}

export const currentRevenue = {
    label: 'What is your current MRR (monthly recurring revenue) ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'currentRevenue',
    isEditable: true
}

export const quarterSmSpend = {
    label: 'What is your last quarter sales and marketing expense ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'quarterSmSpend',
    isEditable: true
}

export const grossMargins = {
    label: 'What are your gross margins (in %) ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'grossMargins',
    isEditable: true
}

export const tillDateCustomerCount = {
    label: 'How many total paying customers do you have till date ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'totalPaying',
    isEditable: true
}

export const revContributionByTop5 = {
    label: 'What is your Revenue contribution by top 5 Clients (in %) ?',
    error: false,
    showField: true,
    field_type: 'slider',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: '',
    key: 'revenueContributionTop5',
    isEditable: true
}
export const prRatio = {
    label: 'What is your Projects : Retainer ratio ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'projectbyretainer',
    isEditable: true
}

export const largestClientAge = {
    label: 'What is your largest client age (in years) ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: false,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'clientAge',
    isEditable: true
}

export const netRevenueLastMonth = {
    label: 'What is your net revenue last month ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'currentNet',
    isEditable: true
}

export const isEbitdaPositive = {
    label: 'Are you EBITDA positive ?',
    error: false,
    showField: true,
    field_type: 'boolean',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: '',
    key: 'ebitda',
    isEditable: true
}

export const repeatCustomerRate = {
    label: 'What is your repeat customer rate ?',
    error: false,
    showField: true,
    field_type: 'slider',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: '',
    key: 'repeatCustomers',
    isEditable: true
}

export const programCompletionRate = {
    label: 'What is your program completion rate (in %) ?',
    error: false,
    showField: true,
    field_type: 'slider',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: '',
    key: 'programCompletion',
    isEditable: true
}

export const CAC = {
    label: 'What is your customer acquisition cost (CAC) ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'cac',
    isEditable: true
}
export const GMV = {
    label: 'What is your gross merchandise value (GMV) for last 12 months ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'currency',
    isEditable: true
}

export const retentionRate = {
    label: 'What is your retention rate (in %) ?',
    error: false,
    showField: true,
    field_type: 'slider',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: '',
    key: 'nrr',
    isEditable: true
}

export const numberOfDownloads = {
    label: 'How many people have downloaded your game till date ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'downloads',
    isEditable: true
}
export const monthlyActiveUsers = {
    label: 'What are your monthly active users ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'mau',
    isEditable: true
}

export const dailyActiveUsers = {
    label: 'What are your daily active users ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'dau',
    isEditable: true
}

export const roas = {
    label: 'What is your Return on Ads Spend (RoAS) ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'roas',
    isEditable: true
}
export const arpu = {
    label: 'What is the average revenue per user on the app ?',
    error: false,
    showField: true,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 50,000',
    key: 'arpu',
    isEditable: true
}

export const lcRatio = {
    label: 'What is your LTV : CAC ratio ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'ltvbycac',
    isEditable: true
}

export const cacPayback = {
    label: 'What is your CAC payback (in months) ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'cacPayback',
    isEditable: true
}

export const customerCount = {
    label: 'How many customers do you have ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'totalCustomers',
    isEditable: true
}
export const operatingYears = {
    label: 'How many years have you been operating ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'ageOfOps',
    isEditable: true
}
export const revenueGenerating = {
    label: 'Are you revenue generating ?',
    error: false,
    showField: true,
    field_type: 'boolean',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: 'Please select a value',
    key: 'revenueGenerating',
    isEditable: true
}

export const brandIp = {
    label: 'Do you have a patent or any IP related to the product ?',
    error: false,
    showField: true,
    field_type: 'boolean',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: 'Please select a value',
    key: 'brandIp',
    isEditable: true
}

export const customerRetention = {
    label: 'What is your retention rate (in %) ?',
    error: false,
    showField: true,
    field_type: 'slider',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: 'Please select a value',
    key: 'customerRetention',
    isEditable: true
}

export const takeRate = {
    label: 'What is your average take rate (in %) ?',
    error: false,
    showField: true,
    field_type: 'slider',
    value: '',
    required: true,
    helperText: 'Please select a value',
    placeholder: 'Please select a value',
    key: 'takeRate',
    isEditable: true
}

export const nps = {
    label: 'What is your Net Promoter Score (on a scale 0-100) ?',
    error: false,
    showField: true,
    field_type: 'number',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'nps',
    isEditable: true
}

export const awardsYesNo = {
    label: 'Do you have any awards and recognition ?',
    error: false,
    showField: true,
    field_type: 'boolean',
    value: '',
    required: false,
    helperText: 'Please fill in',
    placeholder: 'eg. 40.0',
    key: 'awardsYesNo',
    isEditable: true
}

export const awards = {
    label: 'Mention your awards and recognition',
    error: false,
    showField: true,
    field_type: 'text',
    value: '',
    required: false,
    helperText: 'Please fill in',
    placeholder: 'Type your answer here...',
    key: 'awards',
    isEditable: true
}

export const ttmEbitda = {
    label: `What’s your EBITDA (in ₹) - for last 12 months (TTM)?`,
    error: false,
    showField: false,
    field_type: 'currency',
    value: '',
    required: true,
    helperText: 'Please fill in',
    placeholder: 'EBITDA (in ₹) irrespective of + or -',
    key: 'ttmEbitda',
    isEditable: true
}


export const sellerOnboardingStep1 = {
    label: 'Company Details',
    fields: {
        'firstName': {
            label: 'First Name',
            error: false,
            showField: true,
            field_type: 'text',
            value: '',
            required: true,
            helperText: 'Please fill in',
            placeholder: 'Enter your first name',
            key: 'firstName',
            isEditable: true
        },
        'lastName': {
            label: 'Last Name',
            error: false,
            showField: true,
            field_type: 'text',
            value: '',
            required: true,
            helperText: 'Please fill in',
            placeholder: 'Enter your last name',
            key: 'lastName',
            isEditable: true
        },
        'companyName': {
            label: 'Registered Company Name',
            error: false,
            showField: true,
            field_type: 'text',
            value: '',
            required: true,
            helperText: 'Please fill in',
            placeholder: 'For e.g : XYZ Pvt Ltd',
            key: 'name',
            isEditable: true
        },
        'about': {
            label: 'Describe your company in a line',
            error: false,
            showField: true,
            field_type: 'textarea',
            value: '',
            required: true,
            helperText: 'Please fill in',
            placeholder: 'Please keep the description short and anonymous; For e.g - D2C pickle brand with strong Southern presence',
            key: 'about',
            isEditable: true
        },
        'sector': {
            label: 'Which sector do you operate in ?',
            error: false,
            showField: true,
            field_type: SINGLEDROPDOWN,
            options: sectors || [],
            value: '',
            required: true,
            helperText: 'Please select a sector',
            placeholder: 'Please select a sector',
            key: 'category',
            isEditable: true
        },
        'subsector': {
            label: 'Which sub-sector do you operate in ?',
            error: false,
            showField: false,
            field_type: SINGLEDROPDOWN,
            options: [],
            value: '',
            required: true,
            helperText: 'Please select a sub-sector',
            placeholder: 'Please select a sub-sector',
            key: 'subCategory',
            isEditable: true
        },
        'ageOfOps': operatingYears,
        'objective': {
            label: `What's your primary objective ?`,
            error: false,
            showField: true,
            field_type: SINGLEDROPDOWN,
            options: Objectives || [],
            value: '',
            required: true,
            helperText: 'Please select an objective',
            placeholder: 'Please select an objective',
            key: 'objective',
            isEditable: true
        },
        'openToOtherObjective': {
            label: 'Objective',
            showField: true,
            value: false,
            key: 'openToOtherObjective',
            isEditable: true,
            dependentOn: 'objective'
        }
    }
}

export function D2CSchema(step) { //done1
    switch (step) {
        case 2:
            return {
                label: 'Financials',
                fields: {
                    'revenueGenerating' : revenueGenerating,
                    'ttmNet': ttm_year,
                    'currentNet': ttm_month,
                    'grossMargins': grossMargins,
                    'aov': aov,
                    'ebitda': isEbitdaPositive,
                    'ttmEbitda': ttmEbitda
                }
            }
        case 3:
            return {
                label: 'Customer Metrics',
                fields: {
                    'ttmAdsSpend': ttmAdsSpend,
                    'cac': CAC,
                    'totalPaying': tillDateCustomerCount,
                    'repeatCustomers': repeatCustomerRate,
                    'amazonRating' : amazonRating,
                    'brandIp': brandIp
                }
            }
    }
}

export function AgencySchema(step) {
    switch (step) {
        case 2:
            return {
                label: 'Financials',
                fields: {
                    'revenueGenerating' : revenueGenerating,
                    'ttmNet': ttm_year,
                    'currentNet': ttm_month,
                    'grossMargins': grossMargins,
                    'recurringRevenue': recurringRev,
                    // 'ebitdaPercentage': ebitdaPercentage,
                    'ebitda': isEbitdaPositive,
                    'ttmEbitda': ttmEbitda
                }
            }
        case 3:
            return {
                label: 'Customer Metrics',
                fields: {
                    'totalCustomers': customerCount,
                    'revenueContributionTop5': revContributionByTop5,
                    'projectbyretainer': prRatio,
                    'awardsYesNo': awardsYesNo,
                    'awards': awards,
                    'clientAge': largestClientAge
                }
            }
    }
}

export function EdtechSchema(step) {
    switch (step) {
        case 2:
            return {
                label: 'Financials',
                fields: {
                    'revenueGenerating' : revenueGenerating,
                    'ttmNet': ttm_year,
                    'currentNet': ttm_month,
                    'grossMargins': grossMargins,
                    'ebitda': isEbitdaPositive,
                    'ttmEbitda': ttmEbitda
                }
            }
        case 3:
            return {
                label: 'Customer Metrics',
                fields: {
                    'totalCustomers': customerCount,
                    'programCompletion': programCompletionRate,
                    'ttmAdsSpend': ttmAdsSpend,
                    'cac': CAC,
                    'amazonRating' : amazonRating,
                    'brandIp' : brandIp
                }
            }
    }
}

export function FintechSchema(step) {
    switch (step) {
        case 2:
            return {
                label: 'Financials',
                fields: {
                    'revenueGenerating' : revenueGenerating,
                    'ttmRevenue': ttm_net,
                    'grossMargins': grossMargins,
                    'currentRevenue' : currentRevenue,
                    'ebitda': isEbitdaPositive,
                    'ttmEbitda': ttmEbitda
                }
            }
        case 3:
            return {
                label: 'Customer Metrics',
                fields: {
                    'totalCustomers': customerCount,
                    'customerGrowth' : customerGrowth,
                    'customerRetention': customerRetention,
                    'ttmAdsSpend': ttmAdsSpend,
                    'cac': CAC,
                    'amazonRating': amazonRating,
                    'brandIp': brandIp
                }
            }
    }
}

export function GamingSchema(step) {
    switch (step) {
        case 2:
            return {
                label: 'Financials',
                fields: {
                    'revenueGenerating' : revenueGenerating,
                    'ttmNet': ttm_year,
                    'currentNet': ttm_month,
                    'grossMargins': grossMargins,
                    'ebitda': isEbitdaPositive,
                    'ttmEbitda': ttmEbitda
                }
            }
        case 3:
            return {
                label: 'Customer Metrics',
                fields: {
                    'downloads': numberOfDownloads,
                    'arpu': arpu,
                    'dau': dailyActiveUsers,
                    'mau': monthlyActiveUsers,
                    'ttmAdsSpend': ttmAdsSpend,
                    'cac': CAC,
                    'amazonRating': amazonRating,
                    'brandIp': brandIp
                }
            }
    }
}

export function MarketPlaceSchema(step) {
    switch (step) {
        case 2:
            return {
                label: 'Financials',
                fields: {
                    'revenueGenerating' : revenueGenerating,
                    'ttmGmv': GMV,
                    'takeRate': takeRate,
                    'currentNet': ttm_month,
                    'ttmNet': ttm_year,
                    'grossMargins': grossMargins,
                    'aov': aov,
                    'ebitda': isEbitdaPositive,
                    'ttmEbitda': ttmEbitda,
                }
            }
        case 3:
            return {
                label: 'Customer Metrics',
                fields: {
                    'ttmAdsSpend': ttmAdsSpend,
                    'repeatCustomers': repeatCustomerRate,
                    'cac': CAC,
                    'nps': nps,
                    'brandIp': brandIp
                }
            }
    }
}

export function SaaSSchema(step) {
    switch (step) {
        case 2:
            return {
                label: 'Financials',
                fields: {
                    'revenueGenerating' : revenueGenerating,
                    'ttmRevenue': ttm_net,
                    'currentRevenue': currentRevenue,
                    'nrr': retentionRate,
                    'grossMargins': grossMargins,
                    'ebitda': isEbitdaPositive,
                    'ttmEbitda': ttmEbitda,
                }
            }
        case 3:
            return {
                label: 'Customer Metrics',
                fields: {
                    'quarterSmSpend':quarterSmSpend,
                    'totalCustomers': customerCount,
                    'cacPayback': cacPayback,
                    'nps': nps,
                    'brandIp': brandIp
                }
            }
    }
}

export function GenericSchema(step) {
    switch (step) {
        case 2:
            return {
                label: 'Financials',
                fields: {
                    'revenueGenerating' : revenueGenerating,
                    'ttmNet': ttm_year,
                    'currentNet': ttm_month,
                    'grossMargins': grossMargins,
                    'ebitda': isEbitdaPositive,
                    'ttmEbitda': ttmEbitda,
                }
            }
        case 3:
            return {
                label: 'Customer Metrics',
                fields: {
                    'totalCustomers': customerCount,
                    'roas': roas,
                    'repeatCustomers': repeatCustomerRate,
                    'ltvbycac': lcRatio,
                    'brandIp': brandIp
                }
            }
    }
}

export function renderDependentSteps(type, step) {
    switch (type) {
        case D2C:
            return D2CSchema(step);
        case FINTECH:
            return FintechSchema(step);
        case SAAS:
            return SaaSSchema(step);
        case MARKET_PLACE:
            return MarketPlaceSchema(step);
        case GAMING:
            return GamingSchema(step);
        case ED_TECH:
            return EdtechSchema(step);
        case AGENCY:
            return AgencySchema(step);
        default:
            return GenericSchema(step);
    }
}

export const sellerStepTitle = {
    1: 'Company Details',
    2: 'Financials',
    3: 'Customer Metrics'
}
