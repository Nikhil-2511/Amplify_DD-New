// import { customerIcon, financialIcon, teamIcon } from "../../assets/icons/svgIcons";

import { EbitdaPositiveArr } from "../../CommonModels/CommonCollection"
import { newCuecardCustomerIcon, newCuecardFinancialIcon, newCuecardTeamIcon } from "../../assets/icons/svgIcons"
import { ARRAY } from "../../constants"

export const newCuecardD2C = {
    "financialData": {
        "label": "Financial Data",
        "type": "four_col",
        "icon": newCuecardFinancialIcon,
        "subSection": {
            "colData": [
                {
                    "label": "TTM Revenue (₹)",
                    "key": "ttmNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Monthly Revenue (₹)",
                    "key": "currentNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Gross Margin(%)",
                    "key": "grossMargins"
                },
                // {
                //     "label": "EBITDA (+)",
                //     "key": "ebitda",
                //     "field_type": ARRAY,
                //     "options": EbitdaPositiveArr
                // },
                {
                    "label": "EBITDA (₹)",
                    "key": "ttmEbitda"
                },
            ],
            "rowData": []
        }
    },
    "customerData": {
        "label": "Customer Data",
        "type": "three_col",
        "icon": newCuecardCustomerIcon,
        "subSection": {
            "colData": [
                {
                    'label': 'Total Paying Customers',
                    'key': "totalPaying"
                },
                {
                    "label": "Repeat Customer Rate (%)",
                    "key": "repeatCustomers"
                },
                {
                    "label": "RoAS",
                    "key": "roas"
                },
                {
                    "label": "Amazon Review",
                    "key": "amazonRating"
                },
            ],
            "rowData": []
        },
    },
    "teamData": {
        "label": "Team Data",
        "type": "two_col",
        "icon": newCuecardTeamIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Team Size",
                    "key": "teamSize"

                }
            ],
            "rowData": [
                {
                    "label": "Founder Pedigree",
                    "key": "founderPedigree"
                },
            ]
        },
    }
}

export const newCuecardSaaS = {
    "financialData": {
        "label": "Financial Data",
        "type": "four_col",
        "icon": newCuecardFinancialIcon,
        "subSection": {
            "colData": [
                {
                    "label": "TTM Revenue (₹)",
                    "key": "ttmRevenue",
                    "field_type": 'currency'
                },
                {
                    "label": "Monthly Net Revenue (₹)",
                    "key": "currentRevenue",
                    "field_type": 'currency'
                },
                {
                    "label": "EBITDA (₹)",
                    "key": "ttmEbitda"
                },
                {
                    "label": "YoY Growth (%)",
                    "key": "yoyGrowth"
                }
            ],
            "rowData": []
        }
    },
    "customerData": {
        "label": "Customer Data",
        "type": "three_col",
        "icon": newCuecardCustomerIcon,
        "subSection": {
            "colData": [
                {
                    'label': 'Total Customers',
                    'key': "totalCustomers"
                },
                {
                    "label": "CAC Payback (months)",
                    "key": "cacPayback"
                },
                {
                    "label": "Net Promoter Score (NPS)",
                    "key": "nps"
                },
                {
                    "label": "RoAS",
                    "key": "roas"
                }
            ],
            "rowData": []
        },
    },
    "teamData": {
        "label": "Team Data",
        "type": "two_col",
        "icon": newCuecardTeamIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Team Size",
                    "key": "teamSize"

                }
            ],
            "rowData": [
                {
                    "label": "Founder Pedigree",
                    "key": "founderPedigree"
                },
            ]
        },
    }
}


export const newCuecardMarketPlace = {
    "financialData": {
        "label": "Financial Data",
        "type": "four_col",
        "icon": newCuecardFinancialIcon,
        "subSection": {
            "colData": [
                {
                    "label": "TTM Revenue (₹)",
                    "key": "ttmNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Monthly Revenue (₹)",
                    "key": "currentNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Gross Margin (%)",
                    "key": "grossMargins"
                },
                // {
                //     "label": "EBITDA (+)",
                //     "key": "ebitda",
                //     "field_type": ARRAY,
                //     "options": EbitdaPositiveArr
                // },
                {
                    "label": "EBITDA (₹)",
                    "key": "ttmEbitda"
                },
            ],
            "rowData": [],
        }
    },
    "customerData": {
        "label": "Customer Data",
        "type": "three_col",
        "icon": newCuecardCustomerIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Repeat Customer (%)",
                    "key": "repeatCustomers"
                },
                {
                    "label": "RoAS",
                    "key": "roas"

                },
            ],
            "rowData": []
        }
    },
    "teamData": {
        "label": "Team Data",
        "type": "two_col",
        "icon": newCuecardTeamIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Team Size",
                    "key": "teamSize"

                },
            ],
            "rowData": [
                {
                    "label": "Founder Pedigree",
                    "key": "founderPedigree"
                },
            ]
        }
    }
}

export const newCuecardFintech = {
    "financialData": {
        "label": "Financial Data",
        "type": "three_col",
        "icon": newCuecardFinancialIcon,
        "subSection": {
            "colData": [
                {
                    "label": "TTM Revenue (₹)",
                    "key": "ttmRevenue",
                    "field_type": 'currency'
                },
                {
                    "label": "Monthly Revenue (₹)",
                    "key": "currentRevenue",
                    "field_type": 'currency'
                },
                {
                    "label": "Gross Margin (%)",
                    "key": "grossMargins"
                },
                // {
                //     "label": "EBITDA (+)",
                //     "key": "ebitda",
                //     "field_type": ARRAY,
                //     "options": EbitdaPositiveArr
                // },
                {
                    "label": "EBITDA (₹)",
                    "key": "ttmEbitda"
                },
            ],
            "rowData": []
        }
    },
    "customerData": {
        "label": "Customer Data",
        "type": "four_col",
        "icon": newCuecardCustomerIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Total Customers",
                    "key": "totalCustomers"
                },
                {
                    "label": "CAC (₹)",
                    "key": "cac",
                    "field_type": 'currency'
                },
                {
                    "label": "Customers Retention (%)",
                    "key": "customerRetention"

                },
                {
                    "label": "RoAS",
                    "key": "roas"
                }
            ],
            "rowData": []
        }
    },
    "teamData": {
        "label": "Team Data",
        "type": "two_col",
        "icon": newCuecardTeamIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Team Size",
                    "key": "teamSize"

                },
            ],
            "rowData": [
                {
                    "label": "Founder Pedigree",
                    "key": "founderPedigree"
                },
            ]
        }
    }
}

export const newCuecardGaming = {
    "financialData": {
        "label": "Financial Data",
        "type": "four_col",
        "icon": newCuecardFinancialIcon,
        "subSection": {
            "colData": [
                {
                    "label": "TTM Revenue (₹)",
                    "key": "ttmNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Monthly Revenue (₹)",
                    "key": "currentNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Gross Margin (%)",
                    "key": "grossMargins"
                },
                // {
                //     "label": "EBITDA (+)",
                //     "key": "ebitda",
                //     "field_type": ARRAY,
                //     "options": EbitdaPositiveArr
                // },
                {
                    "label": "EBITDA (₹)",
                    "key": "ttmEbitda"
                },
            ],
            "rowData": []
        }
    },
    "customerData": {
        "label": "Customer Data",
        "type": "three_col",
        "icon": newCuecardCustomerIcon,
        "subSection": {
            "colData": [
                {
                    "label": "No. of Downloads",
                    "key": "downloads"
                },
                {
                    "label": "DAU",
                    "key": "dau"

                },
                {
                    "label": "MAU",
                    "key": "mau"

                },
                {
                    "label": "RoAS",
                    "key": "roas"
                }
            ]
        }
    },
    "teamData": {
        "label": "Team Data",
        "type": "two_col",
        "icon": newCuecardTeamIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Team Size",
                    "key": "teamSize"

                },
            ],
            "rowData": [
                {
                    "label": "Founder Pedigree",
                    "key": "founderPedigree"
                },
            ]
        }
    }
}


export const newCuecardGenric = {
    "financialData": {
        "label": "Financial Data",
        "type": "four_col",
        "icon": newCuecardFinancialIcon,
        "subSection": {
            "colData": [
                {
                    "label": "TTM Revenue (₹)",
                    "key": "ttmNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Monthly Revenue (₹)",
                    "key": "currentNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Gross Margin (%)",
                    "key": "grossMargins"
                },
                // {
                //     "label": "EBITDA (+)",
                //     "key": "ebitda",
                //     "field_type": ARRAY,
                //     "options": EbitdaPositiveArr
                // }
                {
                    "label": "EBITDA (₹)",
                    "key": "ttmEbitda"
                },
            ],
            "rowData": [],
        }
    },
    "customerData": {
        "label": "Customer Data",
        "type": "four_col",
        "icon": newCuecardCustomerIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Total Customers",
                    "key": "totalCustomers"
                },
                {
                    "label": "Repeat Customers (%)",
                    "key": "repeatCustomers"

                },
                {
                    "label": "LTV/CAC",
                    "key": "ltvbycac"
                },
                {
                    "label": "RoAS",
                    "key": "roas"
                }
            ],
            "rowData": []
        }
    },
    "teamData": {
        "label": "Team Data",
        "type": "two_col",
        "icon": newCuecardTeamIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Team Size",
                    "key": "teamSize"
                },
            ],

            "rowData": [
                {
                    "label": "Founder Pedigree",
                    "key": "founderPedigree"
                },
            ]
        }
    }
}

export const newCuecardEdTech = {
    "financialData": {
        "label": "Financial Data",
        "type": "four_col",
        "icon": newCuecardFinancialIcon,
        "subSection": {
            "colData": [
                {
                    "label": "TTM Revenue (₹)",
                    "key": "ttmNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Monthly Revenue (₹)",
                    "key": "currentNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Gross Margin (%)",
                    "key": "grossMargins"
                },
                // {
                //     "label": "EBITDA (+)",
                //     "key": "ebitda",
                //     "field_type": ARRAY,
                //     "options": EbitdaPositiveArr
                // },
                {
                    "label": "EBITDA (₹)",
                    "key": "ttmEbitda"
                },
            ],
            "rowData": []
        }
    },
    "customerData": {
        "label": "Customer Data",
        "type": "four_col",
        "icon": newCuecardCustomerIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Total Customers",
                    "key": "totalCustomers"
                },
                {
                    "label": "Program Completion (%)",
                    "key": "programCompletion"
                },
                {
                    "label": "CAC (₹)",
                    "key": "cac",
                    "field_type": 'currency'
                },
                {
                    "label": "RoAS",
                    "key": "roas"
                }
            ],
            "rowData": [],
        }
    },
    "teamData": {
        "label": "Team Data",
        "type": "two_col",
        "icon": newCuecardTeamIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Team Size",
                    "key": "teamSize"

                },
            ],
            "rowData": [
                {
                    "label": "Founder Pedigree",
                    "key": "founderPedigree"
                },
            ]
        }
    }
}


export const newCuecardAgency = {
    "financialData": {
        "label": "Financial Data",
        "type": "three_col",
        "icon": newCuecardFinancialIcon,
        "subSection": {
            "colData": [
                {
                    "label": "TTM Revenue (₹)",
                    "key": "ttmNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Monthly Revenue (₹)",
                    "key": "currentNet",
                    "field_type": 'currency'
                },
                {
                    "label": "Gross Margin (%)",
                    "key": "grossMargins"
                },
                {
                    "label": "EBITDA (₹)",
                    "key": "ttmEbitda"
                },
            ],
            "rowData": [],
        }
    },
    "customerData": {
        "label": "Customer Data",
        "type": "four_col",
        "icon": newCuecardCustomerIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Total Customers",
                    "key": "totalCustomers"
                },
                {
                    "label": "Revenue Contribution Top 5 Clients (%)",
                    "key": "revenueContributionTop5"
                },
                {
                    "label": "Project:Retainer",
                    "key": "projectbyretainer"
                },
                {
                    "label": "Largest Client Age",
                    "key": "clientAge"
                }
            ],
            "rowData": []
        }
    },
    "teamData": {
        "label": "Team Data",
        "type": "two_col",
        "icon": newCuecardTeamIcon,
        "subSection": {
            "colData": [
                {
                    "label": "Team Size",
                    "key": "teamSize"

                },
            ],
            "rowData": [
                {
                    "label": "Founder Pedigree",
                    "key": "founderPedigree"
                },
            ]
        }
    }
}