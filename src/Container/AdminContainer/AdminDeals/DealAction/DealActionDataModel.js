import { StatusBasedSubStatus, SellerDealsAcitonArr, UserTypesCollection } from "../../../../CommonModels/CommonCollection";
import { DROPDOWN, TEXTAREA } from "../../../../constants";

export const DealApprovalModel = {
    "dealStatus": {
        "fieldType": DROPDOWN,
        "label": 'Deal stage',
        "value": '',
        "required": true,
        "placeholder": 'Input desired deal status',
        "optionData": SellerDealsAcitonArr,
        "helperText": 'Please enter a valid deal state'
    },
    'subStatus': {
        "fieldType": DROPDOWN,
        "label": 'Deal sub-status',
        "value": '',
        "required": true,
        "placeholder": 'Input desired deal sub-status',
        "optionData": SellerDealsAcitonArr,
        "helperText": 'Please enter a valid sub-status',
        'dependentOn': 'dealStatus',
        "allOptions": StatusBasedSubStatus
    },

    'waitingOn': {
        "fieldType": DROPDOWN,
        "label": 'Dependent on',
        "value": 'admin',
        "required": true,
        "optionData": UserTypesCollection,
        "helperText": 'Please fill this in'
    },

    "interactionNotes": {
        "fieldType": TEXTAREA,
        "label": 'Deal Note',
        "value": '',
        'maxLength': 'auto',
        "required": true,
        "placeholder": "Enter your reasons for changing the deal state.",
        "defaultHelpingText": 'This note will be added to the Notes tab',
        "helperText": 'Please enter a deal note'
    },
    'reminderDate': {
        "fieldType": 'calender',
        "label": 'Remind me on',
        "value": null,
        "placeholder": 'Select Date',
    }
}