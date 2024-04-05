import { aboutIcon, customerIcon, debtAndEquityIcon, dtocAdditionalIcon, financialIcon } from "../../assets/icons/svgIcons"
import { formatCurrencyNumber } from "../../helper/commonHelper";
import { getFieldObjData } from "./CommonModel";
import { GADashBoardField } from "./DashboardCustomFields";

export class D2cSchema {
    constructor(company, customFieldsData) {
        this.companyCategory = {
            "aboutCompany": {
                "label": "About the Company",
                "type": "two_col",
                "icon": aboutIcon,
                "subSection": [
                    {
                        "label": "Type of Startup",
                        "qk_key": "category",
                        "answer": company["category"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "About your Company",
                        "qk_key": "about",
                        "answer": company["about"] || '',
                        "placeholder": "About company: Briefly outline your company's main functions or services",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Company Age (Years)",
                        "qk_key": "ageOfOps",
                        "answer": company["ageOfOps"] || '',
                        "placeholder": 'Years in operation',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Website",
                        "qk_key": "website",
                        "answer": company["website"] || '',
                        "placeholder": "Enter your company's website URL (e.g., www.yourcompany.com)",
                        "isEditable": true,
                        "field_type": 'text',
                        "field_validate" : 'website',
                        "validation": '',
                        "optionsData": [],
                        "error": ''
                    },
                    {
                        "label": "Operational Status",
                        "qk_key": "operational",
                        "answer": company["operational"] || false,
                        "placeholder": "Select your company’s operational status",
                        "isEditable": true,
                        "field_type": 'checkbox',
                        "validation": '',
                        "selectedAnswer": 'Operational',
                        "nonSelectedAnswer" : 'Non-operational',
                        "optionText" : 'Operational',
                        "error": ''
                    },
                ]
            },
            "financialData": {
                "label": "Financial Data",
                "type": "four_col",
                "icon": financialIcon,
                "subSection": [
                    {
                        "label": "TTM Revenue (₹)",
                        "qk_key": "ttmNet",
                        "answer": formatCurrencyNumber(company["ttmNet"]) || '',
                        "placeholder": 'Net revenue last 12 months',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Monthly Revenue (₹)",
                        "qk_key": "currentNet",
                        "answer": formatCurrencyNumber(company["currentNet"]) || '',
                        "placeholder": 'Net revenue last month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    // {
                    //     "label": "MoM Growth %",
                    //     "qk_key": "momGrowth",
                    //     "answer": company["momGrowth"] || '',
                    //     "placeholder": '',
                    //     "isEditable": true,
                    //     "field_type": 'percentage',
                    //     "validation": '',
                    // "dashboardVisbile": true
                    // },
                    {
                        "label": "Are you EBITDA positive ?",
                        "qk_key": "ebitda",
                        "answer": company["ebitda"] || '',
                        "placeholder": 'EBITDA',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    {
                        "label": "EBITDA (₹)",
                        "qk_key": "ttmEbitda",
                        "answer": Math.floor(company["ttmEbitda"]) || '',
                        "placeholder": 'EBITDA (in ₹) irrespective of + or -',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    },
                    {
                        "label": "Gross Margins (%)",
                        "qk_key": "grossMargins",
                        "answer": company["grossMargins"] || '',
                        "placeholder": 'Gross margins',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "AOV (₹)",
                        "qk_key": "aov",
                        "answer": formatCurrencyNumber(company["aov"]) || '',
                        "placeholder": 'Average order value',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "FY25 Projected Revenue (₹)",
                        "qk_key": "projectedRevenue",
                        "answer": formatCurrencyNumber(company["projectedRevenue"]) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "debtAndEquity": {
                "label": "Debt & Equity",
                "type": "object_pair",
                "icon": debtAndEquityIcon,
                "subSection": [
                    {
                        "label": "Total External Debt (₹)",
                        "qk_key": "debtAndEquity.externalDebt",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.externalDebt', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amount Raised So Far (₹)",
                        "qk_key": "debtAndEquity.amountRaised",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.amountRaised', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Founder Share",
                        "qk_key": "debtAndEquity.founderShareholding",
                        "answer": getFieldObjData('debtAndEquity.founderShareholding', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "dtocAdditional": {
                "label": "Additional Information",
                "type": "object_pair",
                "icon": dtocAdditionalIcon,
                "error": '',
                "helperText": '',
                "hasPercentCalc": true,
                "subSection": [
                    {
                        "label": "Direct Online Sales Share (%)",
                        "qk_key": "dtocAdditional.revenueDtoc",
                        "answer": getFieldObjData('dtocAdditional.revenueDtoc', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "hasContribution": true,
                        "required": true
                    },
                    {
                        "label": "Offline Sales Share (%)",
                        "qk_key": "dtocAdditional.offlineDtoc",
                        "answer": getFieldObjData('dtocAdditional.offlineDtoc', company),
                        "placeholder": '35',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "hasContribution": true,
                        "required": true
                    },
                    {
                        "label": "Third-Party Marketplace Share (%)",
                        "qk_key": "dtocAdditional.marketplaceDtoc",
                        "answer": getFieldObjData('dtocAdditional.marketplaceDtoc', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "hasContribution": true,
                        "required": true
                    },
                    {
                        "label": "Type of Manufacturing",
                        "qk_key": "dtocAdditional.manufacturingType",
                        "answer": getFieldObjData('dtocAdditional.manufacturingType', company),
                        "placeholder": 'Select your type of manufacturing',
                        "isEditable": true,
                        "field_type": 'dropdown',
                        "validation": '',
                        "error": '',
                        "required": true,
                        "options": [
                            {
                                "optionValue": 'in_house',
                                "optionText": 'In-house/Owned'
                            },
                            {
                                "optionValue": 'outsourced',
                                "optionText": 'Outsourced/Contract/Third Party'
                            },
                            {
                                "optionValue": 'hybrid',
                                "optionText": 'Hybrid'
                            }
                        ] 
                    },
                ]
            },
            "customerData": {
                "label": "Customer Data",
                "type": "four_col",
                "icon": customerIcon,
                'customFields': [
                    GADashBoardField(customFieldsData?.customerFieldsData),
                  ],
                "subSection": [
                    {
                        "label": "Total Paying Customers",
                        "qk_key": "totalPaying",
                        "answer": company["totalPaying"] || '',
                        "placeholder": 'Total paying customers',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "TTM Ads Spend (₹)",
                        "qk_key": "ttmAdsSpend",
                        "answer": formatCurrencyNumber(company["ttmAdsSpend"]) || '',
                        "placeholder": 'TTM Ads Spend (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Repeat Customer Rate (%)",
                        "qk_key": "repeatCustomers",
                        "answer": company["repeatCustomers"] || '',
                        "placeholder": 'Repeat Customer rate',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "CAC (₹)",
                        "qk_key": "cac",
                        "answer": formatCurrencyNumber(company["cac"]) || '',
                        "placeholder": 'Customer acquisition cost (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amazon Review",
                        "qk_key": "amazonRating",
                        "answer": company["amazonRating"] || '',
                        "placeholder": 'Product review rating on Amazon',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    {
                        "label": "IP/Patent",
                        "qk_key": "brandIp",
                        "answer": company["brandIp"] || '',
                        "placeholder": 'IP / Patent',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Customer Profile",
                        "qk_key": "customerProfileDescription",
                        "answer": company["customerProfileDescription"] || '',
                        "placeholder": "Describe your clients/customers and key geographies you cater to. If retail, include details such as age, demographics, etc. If B2B, describe the nature of your clients (e.g., enterprise, corporates).",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    }
                ]
            }
        }

    }
}


export class MarketplaceSchema {
    constructor(company, customFieldsData) {
        this.companyCategory = {
            "aboutCompany": {
                "label": "About the Company",
                "type": "two_col",
                "icon": aboutIcon,
                "subSection": [
                    {
                        "label": "Type of Startup",
                        "qk_key": "category",
                        "answer": company["category"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "About your Company",
                        "qk_key": "about",
                        "answer": company["about"] || '',
                        "placeholder": "About company: Briefly outline your company's main functions or services",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Years in Operation",
                        "qk_key": "ageOfOps",
                        "answer": company["ageOfOps"] || '',
                        "placeholder": 'Years in operation',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": ''

                    },
                    {
                        "label": "Website",
                        "qk_key": "website",
                        "answer": company["website"] || '',
                        "placeholder": "Enter your company's website URL (e.g., www.yourcompany.com)",
                        "isEditable": true,
                        "field_type": 'text',
                        "validation": '',
                        "field_validate" : 'website',
                        "optionsData": [],
                        "error": ''
                    },
                    {
                        "label": "Operational Status",
                        "qk_key": "operational",
                        "answer": company["operational"] || false,
                        "placeholder": "Select your company’s operational status",
                        "isEditable": true,
                        "field_type": 'checkbox',
                        "validation": '',
                        "selectedAnswer": 'Operational',
                        "nonSelectedAnswer" : 'Non-operational',
                        "optionText" : 'Operational',
                        "error": ''
                    },
                ]
            },
            "financialData": {
                "label": "Financial Data",
                "type": "four_col",
                "icon": financialIcon,
                "subSection": [
                    {
                        "label": "TTM Revenue (₹)",
                        "qk_key": "ttmNet",
                        "answer": formatCurrencyNumber(company["ttmNet"]) || '',
                        "placeholder": 'Net revenue last 12 months',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "TTM GMV (₹)",
                        "qk_key": "ttmGmv",
                        "answer": formatCurrencyNumber(company["ttmGmv"]) || '',
                        "placeholder": 'GMV revenue last 12 month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Monthly Revenue (₹)",
                        "qk_key": "currentNet",
                        "answer": formatCurrencyNumber(company["currentNet"]) || '',
                        "placeholder": 'Net revenue last month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Gross Margins (%)",
                        "qk_key": "grossMargins",
                        "answer": company["grossMargins"] || '',
                        "placeholder": 'Gross margins',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Are you EBITDA positive ?",
                        "qk_key": "ebitda",
                        "answer": company["ebitda"] || '',
                        "placeholder": 'EBITDA',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    {
                        "label": "EBITDA (₹)",
                        "qk_key": "ttmEbitda",
                        "answer": Math.floor(company["ttmEbitda"]) || '',
                        "placeholder": 'EBITDA (in ₹) irrespective of + or -',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    },
                    {
                        "label": "AOV (₹)",
                        "qk_key": "aov",
                        "answer": formatCurrencyNumber(company["aov"]) || '',
                        "placeholder": 'Average order value',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Take Rate (%)",
                        "qk_key": "takeRate",
                        "answer": company["takeRate"] || '',
                        "placeholder": 'Take Rate',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },  
                    {
                        "label": "FY25 Projected Revenue (₹)",
                        "qk_key": "projectedRevenue",
                        "answer": formatCurrencyNumber(company["projectedRevenue"]) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "debtAndEquity": {
                "label": "Debt & Equity",
                "type": "object_pair",
                "icon": debtAndEquityIcon,
                "subSection": [
                    {
                        "label": "Total External Debt (₹)",
                        "qk_key": "debtAndEquity.externalDebt",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.externalDebt', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amount Raised So Far (₹)",
                        "qk_key": "debtAndEquity.amountRaised",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.amountRaised', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Founder Share",
                        "qk_key": "debtAndEquity.founderShareholding",
                        "answer": getFieldObjData('debtAndEquity.founderShareholding', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "customerData": {
                "label": "Customer Data",
                "type": "three_col",
                "icon": customerIcon,
                'customFields': [
                    GADashBoardField(customFieldsData?.customerFieldsData),
                  ],
                "subSection": [
                    {
                        "label": "TTM Ads Spend (₹)",
                        "qk_key": "ttmAdsSpend",
                        "answer": formatCurrencyNumber(company["ttmAdsSpend"]) || '',
                        "placeholder": 'TTM Ads Spend (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Repeat Customer (%)",
                        "qk_key": "repeatCustomers",
                        "answer": company["repeatCustomers"] || '',
                        "placeholder": 'Repeat Customer rate',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "CAC (₹)",
                        "qk_key": "cac",
                        "answer": formatCurrencyNumber(company["cac"]) || '',
                        "placeholder": 'Customer acquisition cost (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Net Promoter Score (NPS)",
                        "qk_key": "nps",
                        "answer": company["nps"] || '',
                        "placeholder": 'Net Promoter Score (NPS)',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "IP/Patent",
                        "qk_key": "brandIp",
                        "answer": company["brandIp"] || '',
                        "placeholder": 'IP / Patent',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Customer Profile",
                        "qk_key": "customerProfileDescription",
                        "answer": company["customerProfileDescription"] || '',
                        "placeholder": "Describe your clients/customers and key geographies you cater to. If retail, include details such as age, demographics, etc. If B2B, describe the nature of your clients (e.g., enterprise, corporates).",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    }
                ]
            }
        }

    }
}


export class SaaSSchema {
    constructor(company, customFieldsData) {
        this.companyCategory = {
            "aboutCompany": {
                "label": "About the Company",
                "type": "two_col",
                "icon": aboutIcon,
                "subSection": [
                    {
                        "label": "Type of Startup",
                        "qk_key": "category",
                        "answer": company["category"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "About your Company",
                        "qk_key": "about",
                        "answer": company["about"] || '',
                        "placeholder": "About company: Briefly outline your company's main functions or services",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "required": true

                    },  
                    {
                        "label": "Company Age (Years)",
                        "qk_key": "ageOfOps",
                        "answer": company["ageOfOps"] || '',
                        "placeholder": 'Years in operation',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Website",
                        "qk_key": "website",
                        "answer": company["website"] || '',
                        "placeholder": "Enter your company's website URL (e.g., www.yourcompany.com)",
                        "isEditable": true,
                        "field_type": 'text',
                        "validation": '',
                        "field_validate" : 'website',
                        "optionsData": [],
                        "error": ''
                    },
                    {
                        "label": "Operational Status",
                        "qk_key": "operational",
                        "answer": company["operational"] || false,
                        "placeholder": "Select your company’s operational status",
                        "isEditable": true,
                        "field_type": 'checkbox',
                        "validation": '',
                        "selectedAnswer": 'Operational',
                        "nonSelectedAnswer" : 'Non-operational',
                        "optionText" : 'Operational',
                        "error": ''
                    },
                ]
            },
            "financialData": {
                "label": "Financial Data",
                "type": "four_col",
                "icon": financialIcon,
                "subSection": [
                    {
                        "label": "TTM Revenue (₹)",
                        "qk_key": "ttmRevenue",
                        "answer": formatCurrencyNumber(company["ttmRevenue"]) || '',
                        "placeholder": 'Net revenue last 12 months',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Monthly Revenue (₹)",
                        "qk_key": "currentRevenue",
                        "answer": formatCurrencyNumber(company["currentRevenue"]) || '',
                        "placeholder": 'Net revenue last month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    //   {
                    //       "label": "MoM Growth (%)",
                    //       "qk_key": "momGrowth",
                    //       "answer": company["momGrowth"] || '',
                    //       "placeholder": '',
                    //       "isEditable": true,
                    //       "field_type": 'percentage',
                    //       "validation": '',
                    //   },
                    {
                        "label": "Gross Margins (%)",
                        "qk_key": "grossMargins",
                        "answer": company["grossMargins"] || '',
                        "placeholder": 'Gross margins',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Net Revenue Retention (%)",
                        "qk_key": "nrr",
                        "answer": company["nrr"] || '',
                        "placeholder": 'Net Revenue Retention',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "FY25 Projected Revenue (₹)",
                        "qk_key": "projectedRevenue",
                        "answer": formatCurrencyNumber(company["projectedRevenue"]) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    // {
                    //     "label": "EBITDA (%)",
                    //     "qk_key": "ebitdaPercentage",
                    //     "answer": company["ebitdaPercentage"] || '',
                    //     "placeholder": 'EBITDA',
                    //     "isEditable": true,
                    //     "field_type": 'percentage',
                    //     "validation": '',
                    //     "error": '',
                    //     "required": true
                    // },
                    {
                        "label": "Are you EBITDA positive ?",
                        "qk_key": "ebitda",
                        "answer": company["ebitda"] || '',
                        "placeholder": 'EBITDA',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    {
                        "label": "EBITDA (₹)",
                        "qk_key": "ttmEbitda",
                        "answer": Math.floor(company["ttmEbitda"]) || '',
                        "placeholder": 'EBITDA (in ₹) irrespective of + or -',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    },
                ]
            },
            "debtAndEquity": {
                "label": "Debt & Equity",
                "type": "object_pair",
                "icon": debtAndEquityIcon,
                "subSection": [
                    {
                        "label": "Total External Debt (₹)",
                        "qk_key": "debtAndEquity.externalDebt",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.externalDebt', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amount Raised So Far (₹)",
                        "qk_key": "debtAndEquity.amountRaised",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.amountRaised', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Founder Share",
                        "qk_key": "debtAndEquity.founderShareholding",
                        "answer": getFieldObjData('debtAndEquity.founderShareholding', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "customerData": {
                "label": "Customer Data",
                "type": "three_col",
                "icon": customerIcon,
                'customFields': [
                    GADashBoardField(customFieldsData?.customerFieldsData),
                  ],
                "subSection": [
                    {
                        "label": "Total Customers",
                        "qk_key": "totalCustomers",
                        "answer": company["totalCustomers"] || '',
                        "placeholder": 'Total paying customers',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "CAC Payback (Months)",
                        "qk_key": "cacPayback",
                        "answer": company["cacPayback"] || '',
                        "placeholder": 'CAC payback',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Quarterly S&M Spend (₹)",
                        "qk_key": "quarterSmSpend",
                        "answer": formatCurrencyNumber(company["quarterSmSpend"]) || '',
                        "placeholder": 'Quarterly Sales & Marketing Spend',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "IP/Patent",
                        "qk_key": "brandIp",
                        "answer": company["brandIp"] || '',
                        "placeholder": 'IP/Patent',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Net Promoter Score (NPS)",
                        "qk_key": "nps",
                        "answer": company["nps"] || '',
                        "placeholder": 'Net Promoter Score (NPS)',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    {
                        "label": "Customer Profile",
                        "qk_key": "customerProfileDescription",
                        "answer": company["customerProfileDescription"] || '',
                        "placeholder": "Describe your clients/customers and key geographies you cater to. If retail, include details such as age, demographics, etc. If B2B, describe the nature of your clients (e.g., enterprise, corporates).",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    }
                ]
            }
        }

    }
}

export class FintechSchema {
    constructor(company, customFieldsData) {
        this.companyCategory = {
            "aboutCompany": {
                "label": "About the Company",
                "type": "two_col",
                "icon": aboutIcon,
                "subSection": [
                    {
                        "label": "Type of Startup",
                        "qk_key": "category",
                        "answer": company["category"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "About your Company",
                        "qk_key": "about",
                        "answer": company["about"] || '',
                        "placeholder": "About company: Briefly outline your company's main functions or services",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Category Segment",
                        "qk_key": "subCategory",
                        "answer": company["subCategory"] || '',
                        "placeholder": 'Category segment',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Company Age (Years)",
                        "qk_key": "ageOfOps",
                        "answer": company["ageOfOps"] || '',
                        "placeholder": 'Years in operation',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Operational Status",
                        "qk_key": "operational",
                        "answer": company["operational"] || false,
                        "placeholder": "Select your company’s operational status",
                        "isEditable": true,
                        "field_type": 'checkbox',
                        "validation": '',
                        "selectedAnswer": 'Operational',
                        "nonSelectedAnswer" : 'Non-operational',
                        "optionText" : 'Operational',
                        "error": ''
                    },
                    {
                        "label": "Website",
                        "qk_key": "website",
                        "answer": company["website"] || '',
                        "placeholder": "Enter your company's website URL (e.g., www.yourcompany.com)",
                        "isEditable": true,
                        "field_type": 'text',
                        "validation": '',
                        "field_validate" : 'website',
                        "optionsData": [],
                        "error": ''
                    },
                ]
            },
            "financialData": {
                "label": "Financial Data",
                "type": "three_col",
                "icon": financialIcon,
                "subSection": [
                    {
                        "label": "TTM Revenue (₹)",
                        "qk_key": "ttmRevenue",
                        "answer": formatCurrencyNumber(company["ttmRevenue"]) || '',
                        "placeholder": 'Net revenue last 12 months',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Monthly Revenue (₹)",
                        "qk_key": "currentRevenue",
                        "answer": formatCurrencyNumber(company["currentRevenue"]) || '',
                        "placeholder": 'Net revenue last month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    //   {
                    //       "label": "MoM Growth (%)",
                    //       "qk_key": "momGrowth",
                    //       "answer": company["momGrowth"] || '',
                    //       "placeholder": '',
                    //       "isEditable": true,
                    //       "field_type": 'percentage',
                    //       "validation": '',
                    //   },
                    {
                        "label": "Gross Margins (%)",
                        "qk_key": "grossMargins",
                        "answer": company["grossMargins"] || '',
                        "placeholder": 'Gross margins',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Are you EBITDA positive ?",
                        "qk_key": "ebitda",
                        "answer": company["ebitda"] || '',
                        "placeholder": 'EBITDA',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    {
                        "label": "EBITDA (₹)",
                        "qk_key": "ttmEbitda",
                        "answer": Math.floor(company["ttmEbitda"]) || '',
                        "placeholder": 'EBITDA (in ₹) irrespective of + or -',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    },
                    {
                        "label": "FY25 Projected Revenue (₹)",
                        "qk_key": "projectedRevenue",
                        "answer": formatCurrencyNumber(company["projectedRevenue"]) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "debtAndEquity": {
                "label": "Debt & Equity",
                "type": "object_pair",
                "icon": debtAndEquityIcon,
                "subSection": [
                    {
                        "label": "Total External Debt (₹)",
                        "qk_key": "debtAndEquity.externalDebt",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.externalDebt', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amount Raised So Far (₹)",
                        "qk_key": "debtAndEquity.amountRaised",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.amountRaised', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Founder Share",
                        "qk_key": "debtAndEquity.founderShareholding",
                        "answer": getFieldObjData('debtAndEquity.founderShareholding', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "customerData": {
                "label": "Customer Data",
                "type": "four_col",
                "icon": customerIcon,
                'customFields': [
                    GADashBoardField(customFieldsData?.customerFieldsData),
                  ],
                "subSection": [
                    {
                        "label": "Total Customers",
                        "qk_key": "totalCustomers",
                        "answer": company["totalCustomers"] || '',
                        "placeholder": 'Total paying customers',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "TTM Ads Spend (₹)",
                        "qk_key": "ttmAdsSpend",
                        "answer": formatCurrencyNumber(company["ttmAdsSpend"]) || '',
                        "placeholder": 'TTM Ads Spend (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "CAC (₹)",
                        "qk_key": "cac",
                        "answer": formatCurrencyNumber(company["cac"]) || '',
                        "placeholder": 'Customer acquisition cost (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Customers Retention (%)",
                        "qk_key": "customerRetention",
                        "answer": company["customerRetention"] || '',
                        "placeholder": 'Customers Retention',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Customers Growth (%)",
                        "qk_key": "customerGrowth",
                        "answer": company["customerGrowth"] || '',
                        "placeholder": 'Customers Growth',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Books Growth (%)",
                        "qk_key": "bookSizeGrowth",
                        "answer": company["bookSizeGrowth"] || '',
                        "placeholder": 'Books Growth',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Books Size (₹)",
                        "qk_key": "bookSize",
                        "answer": formatCurrencyNumber(company["bookSize"]) || '',
                        "placeholder": 'Books Size (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Customer Rating",
                        "qk_key": "amazonRating",
                        "answer": company["amazonRating"] || '',
                        "placeholder": 'Product review rating on Amazon',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "IP/Patent",
                        "qk_key": "brandIp",
                        "answer": company["brandIp"] || '',
                        "placeholder": 'IP / Patent',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Customer Profile",
                        "qk_key": "customerProfileDescription",
                        "answer": company["customerProfileDescription"] || '',
                        "placeholder": "Describe your clients/customers and key geographies you cater to. If retail, include details such as age, demographics, etc. If B2B, describe the nature of your clients (e.g., enterprise, corporates).",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    }
                ]
            }
        }

    }
}

export class GamingSchema {
    constructor(company, customFieldsData) {
        this.companyCategory = {
            "aboutCompany": {
                "label": "About the Company",
                "type": "two_col",
                "icon": aboutIcon,
                "subSection": [
                    {
                        "label": "Type of Startup",
                        "qk_key": "category",
                        "answer": company["category"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "About your Company",
                        "qk_key": "about",
                        "answer": company["about"] || '',
                        "placeholder": "About company: Briefly outline your company's main functions or services",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Company Age (Years)",
                        "qk_key": "ageOfOps",
                        "answer": company["ageOfOps"] || '',
                        "placeholder": 'Years in operation',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Website",
                        "qk_key": "website",
                        "answer": company["website"] || '',
                        "placeholder": "Enter your company's website URL (e.g., www.yourcompany.com)",
                        "isEditable": true,
                        "field_type": 'text',
                        "validation": '',
                        "field_validate" : 'website',
                        "optionsData": [],
                        "error": ''
                    },
                    {
                        "label": "Operational Status",
                        "qk_key": "operational",
                        "answer": company["operational"] || false,
                        "placeholder": "Select your company’s operational status",
                        "isEditable": true,
                        "field_type": 'checkbox',
                        "validation": '',
                        "selectedAnswer": 'Operational',
                        "nonSelectedAnswer" : 'Non-operational',
                        "optionText" : 'Operational',
                        "error": ''
                    },
                ]
            },
            "financialData": {
                "label": "Financial Data",
                "type": "four_col",
                "icon": financialIcon,
                "subSection": [
                    {
                        "label": "TTM Revenue (₹)",
                        "qk_key": "ttmNet",
                        "answer": formatCurrencyNumber(company["ttmNet"]) || '',
                        "placeholder": 'Net revenue last 12 months',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Monthly Revenue (₹)",
                        "qk_key": "currentNet",
                        "answer": formatCurrencyNumber(company["currentNet"]) || '',
                        "placeholder": 'Net revenue last month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Gross Margins (%)",
                        "qk_key": "grossMargins",
                        "answer": company["grossMargins"] || '',
                        "placeholder": 'Gross margins',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Are you EBITDA positive ?",
                        "qk_key": "ebitda",
                        "answer": company["ebitda"] || '',
                        "placeholder": 'EBITDA',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "required": true,
                        "hideOnDashboard": true,
                    },
                    {
                        "label": "EBITDA (₹)",
                        "qk_key": "ttmEbitda",
                        "answer": Math.floor(company["ttmEbitda"]) || '',
                        "placeholder": 'EBITDA (in ₹) irrespective of + or -',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    },
                    {
                        "label": "FY25 Projected Revenue (₹)",
                        "qk_key": "projectedRevenue",
                        "answer": formatCurrencyNumber(company["projectedRevenue"]) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "debtAndEquity": {
                "label": "Debt & Equity",
                "type": "object_pair",
                "icon": debtAndEquityIcon,
                "subSection": [
                    {
                        "label": "Total External Debt (₹)",
                        "qk_key": "debtAndEquity.externalDebt",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.externalDebt', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amount Raised So Far (₹)",
                        "qk_key": "debtAndEquity.amountRaised",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.amountRaised', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Founder Share",
                        "qk_key": "debtAndEquity.founderShareholding",
                        "answer": getFieldObjData('debtAndEquity.founderShareholding', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "customerData": {
                "label": "Customer Data",
                "type": "four_col",
                "icon": customerIcon,
                'customFields': [
                    GADashBoardField(customFieldsData?.customerFieldsData),
                  ],
                "subSection": [
                    {
                        "label": "No. of Downloads",
                        "qk_key": "downloads",
                        "answer": company["downloads"] || '',
                        "placeholder": 'No. of Downloads',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "DAU",
                        "qk_key": "dau",
                        "answer": company["dau"] || '',
                        "placeholder": 'Daily active users',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "MAU",
                        "qk_key": "mau",
                        "answer": company["mau"] || '',
                        "placeholder": 'Monthly active users',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "ARPU (₹)",
                        "qk_key": "arpu",
                        "answer": formatCurrencyNumber(company["arpu"]) || '',
                        "placeholder": 'TTM Ads Spend (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "TTM Ads Spend (₹)",
                        "qk_key": "ttmAdsSpend",
                        "answer": formatCurrencyNumber(company["ttmAdsSpend"]) || '',
                        "placeholder": 'TTM Ads Spend (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "CAC (₹)",
                        "qk_key": "cac",
                        "answer": formatCurrencyNumber(company["cac"]) || '',
                        "placeholder": 'Customer acquisition cost (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Rating",
                        "qk_key": "amazonRating",
                        "answer": company["amazonRating"] || '',
                        "placeholder": 'Product review rating on Amazon',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "IP/Patent",
                        "qk_key": "brandIp",
                        "answer": company["brandIp"] || '',
                        "placeholder": 'IP / Patent',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Customer Profile",
                        "qk_key": "customerProfileDescription",
                        "answer": company["customerProfileDescription"] || '',
                        "placeholder": "Describe your clients/customers and key geographies you cater to. If retail, include details such as age, demographics, etc. If B2B, describe the nature of your clients (e.g., enterprise, corporates).",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    }
                ]
            }
        }

    }
}

export class GenericSchema {
    constructor(company, customFieldsData) {
        this.companyCategory = {
            "aboutCompany": {
                "label": "About the Company",
                "type": "two_col",
                "icon": aboutIcon,
                "subSection": [
                    {
                        "label": "Type of Startup",
                        "qk_key": "category",
                        "answer": company["category"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "About your Company",
                        "qk_key": "about",
                        "answer": company["about"] || '',
                        "placeholder": "About company: Briefly outline your company's main functions or services",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Your Sector",
                        "qk_key": "othersSubCategory",
                        "answer": company["othersSubCategory"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Years in Operation",
                        "qk_key": "ageOfOps",
                        "answer": company["ageOfOps"] || '',
                        "placeholder": 'Years in operation',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": ''

                    },
                    {
                        "label": "Operational Status",
                        "qk_key": "operational",
                        "answer": company["operational"] || false,
                        "placeholder": "Select your company’s operational status",
                        "isEditable": true,
                        "field_type": 'checkbox',
                        "validation": '',
                        "selectedAnswer": 'Operational',
                        "nonSelectedAnswer" : 'Non-operational',
                        "optionText" : 'Operational',
                        "error": ''
                    },
                    {
                        "label": "Website",
                        "qk_key": "website",
                        "answer": company["website"] || '',
                        "placeholder": "Enter your company's website URL (e.g., www.yourcompany.com)",
                        "isEditable": true,
                        "field_type": 'text',
                        "validation": '',
                        "field_validate" : 'website',
                        "optionsData": [],
                        "error": ''
                    }
                ]
            },
            "financialData": {
                "label": "Financial Data",
                "type": "four_col",
                "icon": financialIcon,
                "subSection": [
                    {
                        "label": "TTM Revenue (₹)",
                        "qk_key": "ttmNet",
                        "answer": formatCurrencyNumber(company["ttmNet"]) || '',
                        "placeholder": 'Net revenue last 12 months',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Monthly Revenue (₹)",
                        "qk_key": "currentNet",
                        "answer": formatCurrencyNumber(company["currentNet"]) || '',
                        "placeholder": 'Net revenue last month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    //   {
                    //       "label": "MoM Growth (%)",
                    //       "qk_key": "momGrowth",
                    //       "answer": company["momGrowth"] || '',
                    //       "placeholder": '',
                    //       "isEditable": true,
                    //       "field_type": 'percentage',
                    //       "validation": '',
                    //   },
                    {
                        "label": "Gross Margins (%)",
                        "qk_key": "grossMargins",
                        "answer": company["grossMargins"] || '',
                        "placeholder": 'Gross Margins',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Are you EBITDA positive ?",
                        "qk_key": "ebitda",
                        "answer": company["ebitda"] || '',
                        "placeholder": 'EBITDA',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                    },
                    {
                        "label": "EBITDA (₹)",
                        "qk_key": "ttmEbitda",
                        "answer": Math.floor(company["ttmEbitda"]) || '',
                        "placeholder": 'EBITDA (in ₹) irrespective of + or -',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    },
                    {
                        "label": "FY25 Projected revenue (₹)",
                        "qk_key": "projectedRevenue",
                        "answer": formatCurrencyNumber(company["projectedRevenue"]) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "debtAndEquity": {
                "label": "Debt & Equity",
                "type": "object_pair",
                "icon": debtAndEquityIcon,
                "subSection": [
                    {
                        "label": "Total External Debt (₹)",
                        "qk_key": "debtAndEquity.externalDebt",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.externalDebt', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amount Raised So Far (₹)",
                        "qk_key": "debtAndEquity.amountRaised",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.amountRaised', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Founder Share",
                        "qk_key": "debtAndEquity.founderShareholding",
                        "answer": getFieldObjData('debtAndEquity.founderShareholding', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "customerData": {
                "label": "Customer Data",
                "type": "four_col",
                "icon": customerIcon,
                'customFields': [
                    GADashBoardField(customFieldsData?.customerFieldsData),
                  ],
                "subSection": [
                    {
                        "label": "Total Customers",
                        "qk_key": "totalCustomers",
                        "answer": company["totalCustomers"] || '',
                        "placeholder": 'Total paying customers',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "RoAS",
                        "qk_key": "roas",
                        "answer": company["roas"] || '',
                        "placeholder": 'Return on ads spend',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Repeat Customers (%)",
                        "qk_key": "repeatCustomers",
                        "answer": company["repeatCustomers"] || '',
                        "placeholder": 'Repeat Retention',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "LTV/CAC",
                        "qk_key": "ltvbycac",
                        "answer": company["ltvbycac"] || '',
                        "placeholder": 'LTV/CAC ratio',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "IP/Patent",
                        "qk_key": "brandIp",
                        "answer": company["brandIp"] || '',
                        "placeholder": 'IP / Patent',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Customer Profile",
                        "qk_key": "customerProfileDescription",
                        "answer": company["customerProfileDescription"] || '',
                        "placeholder": "Describe your clients/customers and key geographies you cater to. If retail, include details such as age, demographics, etc. If B2B, describe the nature of your clients (e.g., enterprise, corporates).",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    }
                ]
            }
        }

    }
}

export class EdTechSchema {
    constructor(company, customFieldsData) {
        this.companyCategory = {
            "aboutCompany": {
                "label": "About the Company",
                "type": "two_col",
                "icon": aboutIcon,
                "subSection": [
                    {
                        "label": "Type of Startup",
                        "qk_key": "category",
                        "answer": company["category"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "About your Company",
                        "qk_key": "about",
                        "answer": company["about"] || '',
                        "placeholder": "About company: Briefly outline your company's main functions or services",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Years in Operation",
                        "qk_key": "ageOfOps",
                        "answer": company["ageOfOps"] || '',
                        "placeholder": 'Years in operation',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": ''

                    },
                    {
                        "label": "Website",
                        "qk_key": "website",
                        "answer": company["website"] || '',
                        "placeholder": "Enter your company's website URL (e.g., www.yourcompany.com)",
                        "isEditable": true,
                        "field_type": 'text',
                        "validation": '',
                        "field_validate" : 'website',
                        "optionsData": [],
                        "error": ''
                    },
                    {
                        "label": "Operational Status",
                        "qk_key": "operational",
                        "answer": company["operational"] || false,
                        "placeholder": "Select your company’s operational status",
                        "isEditable": true,
                        "field_type": 'checkbox',
                        "validation": '',
                        "selectedAnswer": 'Operational',
                        "nonSelectedAnswer" : 'Non-operational',
                        "optionText" : 'Operational',
                        "error": ''
                    },
                ]
            },
            "financialData": {
                "label": "Financial Data",
                "type": "four_col",
                "icon": financialIcon,
                "subSection": [
                    {
                        "label": "TTM Revenue (₹)",
                        "qk_key": "ttmNet",
                        "answer": formatCurrencyNumber(company["ttmNet"]) || '',
                        "placeholder": 'Net revenue last 12 months',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Monthly Revenue (₹)",
                        "qk_key": "currentNet",
                        "answer": formatCurrencyNumber(company["currentNet"]) || '',
                        "placeholder": 'Net revenue last month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    //   {
                    //       "label": "MoM Growth (%)",
                    //       "qk_key": "momGrowth",
                    //       "answer": company["momGrowth"] || '',
                    //       "placeholder": '',
                    //       "isEditable": true,
                    //       "field_type": 'percentage',
                    //       "validation": '',
                    //   },
                    {
                        "label": "Gross Margins (%)",
                        "qk_key": "grossMargins",
                        "answer": company["grossMargins"] || '',
                        "placeholder": 'Gross Margins',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Are you EBITDA positive ?",
                        "qk_key": "ebitda",
                        "answer": company["ebitda"] || '',
                        "placeholder": 'EBITDA',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "required": true,
                        "hideOnDashboard": true,
                    },
                    {
                        "label": "EBITDA (₹)",
                        "qk_key": "ttmEbitda",
                        "answer": Math.floor(company["ttmEbitda"]) || '',
                        "placeholder": 'EBITDA (in ₹) irrespective of + or -',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    },
                    {
                        "label": "FY25 Projected Revenue (₹)",
                        "qk_key": "projectedRevenue",
                        "answer": formatCurrencyNumber(company["projectedRevenue"]) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "debtAndEquity": {
                "label": "Debt & Equity",
                "type": "object_pair",
                "icon": debtAndEquityIcon,
                "subSection": [
                    {
                        "label": "Total External Debt (₹)",
                        "qk_key": "debtAndEquity.externalDebt",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.externalDebt', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amount Raised So Far (₹)",
                        "qk_key": "debtAndEquity.amountRaised",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.amountRaised', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Founder Share",
                        "qk_key": "debtAndEquity.founderShareholding",
                        "answer": getFieldObjData('debtAndEquity.founderShareholding', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "customerData": {
                "label": "Customer Data",
                "type": "four_col",
                "icon": customerIcon,
                'customFields': [
                    GADashBoardField(customFieldsData?.customerFieldsData),
                  ],
                "subSection": [
                    {
                        "label": "Total Customers",
                        "qk_key": "totalCustomers",
                        "answer": company["totalCustomers"] || '',
                        "placeholder": 'Total paying customers',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Program Completion (%)",
                        "qk_key": "programCompletion",
                        "answer": company["programCompletion"] || '',
                        "placeholder": 'Program completion',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "TTM Ads Spend (₹)",
                        "qk_key": "ttmAdsSpend",
                        "answer": formatCurrencyNumber(company["ttmAdsSpend"]) || '',
                        "placeholder": 'TTM Ads Spend (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "CAC (₹)",
                        "qk_key": "cac",
                        "answer": formatCurrencyNumber(company["cac"]) || '',
                        "placeholder": 'Customer acquisition cost (₹)',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "IP/Patent",
                        "qk_key": "brandIp",
                        "answer": company["brandIp"] || '',
                        "placeholder": 'IP / Patent',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Rating",
                        "qk_key": "amazonRating",
                        "answer": company["amazonRating"] || '',
                        "placeholder": 'Product review rating on Amazon',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Customer Profile",
                        "qk_key": "customerProfileDescription",
                        "answer": company["customerProfileDescription"] || '',
                        "placeholder": "Describe your clients/customers and key geographies you cater to. If retail, include details such as age, demographics, etc. If B2B, describe the nature of your clients (e.g., enterprise, corporates).",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    }
                ]
            }
        }

    }
}

export class AgencySchema {
    constructor(company, customFieldsData) {
        this.companyCategory = {
            "aboutCompany": {
                "label": "About the Company",
                "type": "two_col",
                "icon": aboutIcon,
                "subSection": [
                    {
                        "label": "Type of Startup",
                        "qk_key": "category",
                        "answer": company["category"] || '',
                        "placeholder": '',
                        "isEditable": false,
                        "field_type": 'text',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "About your Company",
                        "qk_key": "about",
                        "answer": company["about"] || '',
                        "placeholder": "About company: Briefly outline your company's main functions or services",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "required": true

                    },
                    {
                        "label": "Years in Operation",
                        "qk_key": "ageOfOps",
                        "answer": company["ageOfOps"] || '',
                        "placeholder": 'Years in operation',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": ''

                    },
                    {
                        "label": "Website",
                        "qk_key": "website",
                        "answer": company["website"] || '',
                        "placeholder": "Enter your company's website URL (e.g., www.yourcompany.com)",
                        "isEditable": true,
                        "field_type": 'text',
                        "validation": '',
                        "field_validate" : 'website',
                        "optionsData": [],
                        "error": ''
                    },
                    {
                        "label": "Operational Status",
                        "qk_key": "operational",
                        "answer": company["operational"] || false,
                        "placeholder": "Select your company’s operational status",
                        "isEditable": true,
                        "field_type": 'checkbox',
                        "validation": '',
                        "selectedAnswer": 'Operational',
                        "nonSelectedAnswer" : 'Non-operational',
                        "optionText" : 'Operational',
                        "error": ''
                    },
                ]
            },
            "financialData": {
                "label": "Financial Data",
                "type": "four_col",
                "icon": financialIcon,
                "subSection": [
                    {
                        "label": "TTM Revenue (₹)",
                        "qk_key": "ttmNet",
                        "answer": formatCurrencyNumber(company["ttmNet"]) || '',
                        "placeholder": 'Net revenue last 12 months',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Monthly Revenue (₹)",
                        "qk_key": "currentNet",
                        "answer": formatCurrencyNumber(company["currentNet"]) || '',
                        "placeholder": 'Net revenue last month',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    //   {
                    //       "label": "MoM Growth (%)",
                    //       "qk_key": "momGrowth",
                    //       "answer": company["momGrowth"] || '',
                    //       "placeholder": '',
                    //       "isEditable": true,
                    //       "field_type": 'percentage',
                    //       "validation": '',
                    //   },
                    {
                        "label": "Recurring Revenue (%)",
                        "qk_key": "recurringRevenue",
                        "answer": company["recurringRevenue"] || '',
                        "placeholder": 'Recurring Revenue',
                        "isEditable": true,
                        "field_type": 'percentage', // Will convert it into slider
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Gross Margins (%)",
                        "qk_key": "grossMargins",
                        "answer": company["grossMargins"] || '',
                        "placeholder": 'Gross Margins',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    // {
                    //     "label": "EBITDA (%)",
                    //     "qk_key": "ebitdaPercentage",
                    //     "answer": company["ebitdaPercentage"] || '',
                    //     "placeholder": 'EBITDA',
                    //     "isEditable": true,
                    //     "field_type": 'percentage',
                    //     "validation": '',
                    //     "error": '',
                    //     "required": true
                    // },
                    {
                        "label": "Are you EBITDA positive ?",
                        "qk_key": "ebitda",
                        "answer": company["ebitda"] || '',
                        "placeholder": 'EBITDA',
                        "isEditable": true,
                        "field_type": 'boolean',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    {
                        "label": "EBITDA (₹)",
                        "qk_key": "ttmEbitda",
                        "answer": Math.floor(company["ttmEbitda"]) || '',
                        "placeholder": 'EBITDA (in ₹) irrespective of + or -',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    },
                    {
                        "label": "FY25 Projected Revenue (₹)",
                        "qk_key": "projectedRevenue",
                        "answer": formatCurrencyNumber(company["projectedRevenue"]) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "debtAndEquity": {
                "label": "Debt & Equity",
                "type": "object_pair",
                "icon": debtAndEquityIcon,
                "subSection": [
                    {
                        "label": "Total External Debt (₹)",
                        "qk_key": "debtAndEquity.externalDebt",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.externalDebt', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Amount Raised So Far (₹)",
                        "qk_key": "debtAndEquity.amountRaised",
                        "answer": formatCurrencyNumber(getFieldObjData('debtAndEquity.amountRaised', company)) || '',
                        "placeholder": '50,000',
                        "isEditable": true,
                        "field_type": 'currency',
                        "validation": '',
                        "error": ''
                    },
                    {
                        "label": "Founder Share",
                        "qk_key": "debtAndEquity.founderShareholding",
                        "answer": getFieldObjData('debtAndEquity.founderShareholding', company),
                        "placeholder": '100',
                        "isEditable": true,
                        "field_type": 'percentage',
                        "validation": '',
                        "error": ''
                    },
                ]
            },
            "customerData": {
                "label": "Customer Data",
                "type": "four_col",
                "icon": customerIcon,
                'customFields': [
                    GADashBoardField(customFieldsData?.customerFieldsData),
                  ],
                "subSection": [
                    {
                        "label": "Total Customers",
                        "qk_key": "totalCustomers",
                        "answer": company["totalCustomers"] || '',
                        "placeholder": 'Total paying customers',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Revenue Contribution Top 5 Clients (%)",
                        "qk_key": "revenueContributionTop5",
                        "answer": company["revenueContributionTop5"] || '',
                        "placeholder": 'Revenue Contribution top 5 clients',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Project:Retainer",
                        "qk_key": "projectbyretainer",
                        "answer": company["projectbyretainer"] || '',
                        "placeholder": 'Project:Retainer',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "required": true
                    },
                    {
                        "label": "Awards & Recognition",
                        "qk_key": "awards",
                        "answer": formatCurrencyNumber(company["awards"]) || '',
                        "placeholder": 'Awards & Recognition',
                        "isEditable": true,
                        "field_type": 'text',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true
                    },
                    {
                        "label": "Largest Client Age",
                        "qk_key": "clientAge",
                        "answer": company["clientAge"] || '',
                        "placeholder": 'Largest Client Age',
                        "isEditable": true,
                        "field_type": 'number',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": true,
                        "required": true
                    },
                    {
                        "label": "Customer Profile",
                        "qk_key": "customerProfileDescription",
                        "answer": company["customerProfileDescription"] || '',
                        "placeholder": "Describe your clients/customers and key geographies you cater to. If retail, include details such as age, demographics, etc. If B2B, describe the nature of your clients (e.g., enterprise, corporates).",
                        "isEditable": true,
                        "field_type": 'textarea',
                        "validation": '',
                        "error": '',
                        "hideOnDashboard": false,
                        "required": true
                    }
                ]
            }
        }

    }
}

export const openToConversationInfo = "Being open to conversation allows interested buyers to reach out if they are interested in acquiring you. You can decide whether to share more information or not";
export const listMeInfo = "Listing makes you discoverable by potential acquirers and tells them you are a serious seller. You need to complete your profile to enable this option";