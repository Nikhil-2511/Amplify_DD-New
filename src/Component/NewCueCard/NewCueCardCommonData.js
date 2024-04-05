import { newCuecardAskPriceIcon, newCuecardProfileIcon } from "../../assets/icons/svgIcons";
import { RUPEE_SYMBOL } from "../../constants";
import { isMobileView } from "../../helper/commonHelper";

export const NewCueCardCommonModel = {
    "companyOverview": {
        "label": "Company Overview",
        'icon': newCuecardProfileIcon,
        'subSection': {
            "rowData": [
                {
                    "label": "Description",
                    "key": "about",
                },
                {
                    "label": "Why Invest in Us?",
                    // "icon": reasonToBuyIcon,
                    "type": "single_col",
                    "key": "reasonToBuy",
                    "placeholder": '',
                    "isEditable": true,
                    "field_type": 'text',
                    "validation": '',
                },
                {
                    "label": "Reason for Acquisition/Raise Capital",
                    // "icon": reasonToSellIcon,
                    "type" : "single_col",
                    "key": "reasonToSell",
                    "placeholder": '',
                    "isEditable": true,
                    "field_type": 'text',
                    "validation": '',
                  },
            ],
            "colData": [
                {
                    "label": 'Age of Operations',
                    "key": 'ageOfOps',
                    "suffix": " years"
                },
                {
                    "label": 'Operational Status',
                    "key": 'operational',
                    "type": 'chip',
                    "field_type": "boolean"
                }
            ]
        }
    },
    "askPrice": {
        "label": "Expected Valuation",
        "icon": newCuecardAskPriceIcon,
        "subSection": {
            "colData": [
                {
                    "key": 'askPrice',
                    "hasCustomLabel": "To Be Discussed",
                    "prefix": `${RUPEE_SYMBOL}`,
                    "className": `text-1D2939 font-600 ${isMobileView() ? 'text-22' : 'text-30'}`,
                    "field_type": 'currency'
                }
            ]
        }
    }

}
