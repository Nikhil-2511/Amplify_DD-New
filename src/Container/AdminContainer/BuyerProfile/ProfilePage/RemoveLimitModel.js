import { TEXTAREA } from "../../../../constants";

export const RemoveLimitDataModel = {
    "totalInterestDealCount": {
        "fieldType": TEXTAREA,
        "label": 'Set Maximum Limit',
        "value": '',
        "required": true,
        "placeholder": "eg. 100",
        "minRow": 4,
        "helperText": "Please enter a confirmation note",
        "hideMultiLine": true,
        "isNumberOnly": true
    },
    "dealLimitBypassNotes": {
        "fieldType": TEXTAREA,
        "label": 'Confirmation Note',
        "value": '',
        'maxLength': 250,
        "required": true,
        "placeholder": "Enter your reasons for removing usage limits for this buyer",
        "minRow": 4,
        "helperText": "Please enter a confirmation note"
    },

}