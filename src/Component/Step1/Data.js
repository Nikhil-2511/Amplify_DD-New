import { aboutIcon, clientRosterIcon, customerIcon, financialIcon, reasonToBuyIcon, reasonToSellIcon, teamIcon } from "../../assets/icons/svgIcons"

export const apiResponse = {
    "status": "200",
    "message": "Success",
    "data": {
        "questionKey": "qk_category",
        "questionText": "What is your company business model ?",
        "questionHint": "B2C/D2C",
        "questionSection": "about",
        "questionType": "multi_select",
        "nextQuestionKey": "qk_monthly_revenue",
        "options": [
            {
                "optionKey": "D2C",
                "optionValue": "D2C",
                "optionText": "Direct to consumer"
            },
            {
                "optionKey": "B2C",
                "optionValue": "B2C",
                "optionText": "Business to consumer"
            },
            {
                "optionKey": "B2B",
                "optionValue": "B2B",
                "optionText": "Business to business"
            }
        ]
    }
}
// field_type=  ['text', 'text_area', 'number', 'dropdown'];
// END

export const newData = {
    "aboutCompany" : {
        "label": "About the company",
        "type": "two_col",
        "icon": aboutIcon,
        "subSection": [
            {
                "label": "Sector",
                "qk_key": "category",
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            },
            {
                "label": "About your company",
                "qk_key": "about",
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
                
            }
        ]
    },
    "financialData" : {
        "label": "Financial Data",
        "type": "four_col",
        "icon": financialIcon,
        "subSection": [
            {
                "label": "Monthly revenue",
                "qk_key": "currentNet",
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            },
            {
                "label": "TTM Revenue",
                "qk_key": "ttmNet",
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            },
            {
                "label": "EBIDTA",
                "qk_key": "",
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            },
            {
                "label": "Recurring revenue percentage",
                "qk_key": "",
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            }
        ]
    },
    "customerData": {
        "label": "Customer Data",
        "type": "three_col",
        "icon": customerIcon,
        "subSection": [
            {
                "label": "Revenue contribution by biggest customer",
                "qk_key": "" ,
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            },
            {
                "label": "Revenue contribution by top 5 customer",
                "qk_key": "" ,
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            },
            {
                "label": "IP",
                "qk_key": "" ,
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            }
        ]
    },
    "clientRoster": {
        "label":  "Client roaster",
        "type": "chip",
        "icon": clientRosterIcon,
        "placeholder": '',
        "isEditable": true,
        "field_type": 'text',
        "validation": '',
        "subSection": [
            "Dabour",
            "Zeetv",
            "Paytm",
            "Reckitt"
        ]
    },
    "teamData": {
        "label": "Team data",
        "type": "two_col",
        "icon": teamIcon,
        "subSection": [
            {
                "label": "Team size",
                "qk_key": "",
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
                 
            },
            {
                "label": "Founder pedigree",
                "qk_key": "",
                "placeholder": '',
                "isEditable": true,
                "field_type": 'text',
                "validation": '',
            },
        ]
    },
    "sellReason": {
        "label": "Reason to sell",
        "icon": reasonToSellIcon,
        "type" : "single_col",
        "qk_key": "",
        "placeholder": '',
        "isEditable": true,
        "field_type": 'text',
        "validation": '',
    },
    "buyReason": {
        "label": "Reason to buy",
        "icon": reasonToBuyIcon,
        "type": "single_col",
        "qk_key": "",
        "placeholder": '',
        "isEditable": true,
        "field_type": 'text',
        "validation": '',
    }
}