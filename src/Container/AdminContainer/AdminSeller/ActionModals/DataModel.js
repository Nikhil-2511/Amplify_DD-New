import { NotesType, PriorityArr } from "../../../../CommonModels/CommonCollection";
import store from "../../../../Redux";
import { CHIP_INPUT, DROPDOWN, TEXTAREA,TOGGLE } from "../../../../constants";

export function SellerApprovalModel() {
    return (
        {
            "owner": {
                "fieldType": DROPDOWN,
                "label": 'Sell-side Owner',
                "value": '',
                "required": true,
                "placeholder": 'Select Owner',
                "optionData": store.getState()?.authorizationStore?.adminUsersList || []
            },
            "priority": {
                "fieldType": DROPDOWN,
                "label": 'Seller Priority',
                "value": '',
                "required": true,
                "optionData": PriorityArr,
                "placeholder": 'Select Priority'
            },
            "verificationNotes": {
                "fieldType": TEXTAREA,
                "label": 'Verification Note',
                "value": '',
                'maxLength': 'auto',
                "required": true,
                "placeholder": "Enter your reasons for accepting this buyer here",
                "defaultHelpingText": 'This note will be added to the Notes tab',
            },
            "discoverable": {
                "fieldType":TOGGLE ,
                "label": 'Seller Discoverability',
                "value": true,
                // "placeholder": "This seller is discoverable!!!!!!!! by all buyers",
                "activeText": 'This seller is discoverable by all buyers',
                "inactiveText": 'This seller is not discoverable'
            },
            "tags": {
                "fieldType": CHIP_INPUT,
                "label": 'Tags',
                "value": '',
                'maxLength': 'auto',
                "placeholder": "Enter tags relevant to this seller",
            }
        }
    )
}

export const SellerRejectModel = {
    "verificationNotes": {
        "fieldType": TEXTAREA,
        "label": 'Verification Note (will be sent to seller)',
        "value": '',
        'maxLength': 'auto',
        "required": true,
        "placeholder": "Enter your reasons for rejecting this buyer here",
        "minRow": 4
    },
}
export const SellerELAcceptReasonModel = {
    "rectificationNote": {
        "fieldType": TEXTAREA,
        "label": 'Confirmation Note (will not be sent to seller) ',
        "value": '',
        'maxLength': 'auto',
        "required": true,
        "placeholder": "Enter your reasons for approving the Seller's EL",
        "minRow": 4,
        "helperText": "Please enter a valid note"
    },
}
export const AdminBuyerDelistReasonModel = {
    "verificationNotes": {
        "fieldType": TEXTAREA,
        "label": 'Verification Note',
        "value": '',
        'minLength': 30,
        'maxLength': 240,
        "required": true,
        "placeholder": "Enter your reasons for de-listing this buyer here.",
        "minRow": 4,
        "helperText": "Please enter at least 30 characters for the notes.",
    },
}

export const SellerDelistReasonModel= {
    "verificationNotes": {
        "fieldType": TEXTAREA,
        "label": 'Seller De-list Note ',
        "value": '',
        'minLength': 30,
        "required": true,
        "placeholder": "Enter your reasons for de-listing the seller (min. 30 characters)",
        "minRow": 4,
        "helperText": "Please enter at least 30 characters for the notes.",
    },
}

export const SellerELRejectReasonModel = {
    "rectificationNote": {
        "fieldType": TEXTAREA,
        "label": 'Confirmation Note (will be sent to seller) ',
        "value": '',
        'maxLength': 'auto',
        "required": true,
        "placeholder": "Enter your reasons for asking the seller to re-sign the EL. This will be sent to the seller.",
        "minRow": 4,
        "helperText": "Please enter a valid note"
    },
}

export const DeSelectReasonModel = {
    "verificationNotes": {
        "fieldType": TEXTAREA,
        "label": 'Confirmation Note',
        "value": '',
        'maxLength': 'auto',
        "required": true,
        "placeholder": "Enter your reasons",
        "minRow": 4,
        "helperText": "Please enter a valid note"
    },
}