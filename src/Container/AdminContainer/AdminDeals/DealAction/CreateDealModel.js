import moment from "moment";
import { NotesType } from "../../../../CommonModels/CommonCollection";
import { DROPDOWN, TEXTAREA } from "../../../../constants";
import { getDate } from "../../../../helper/commonHelper";

export function noteActionModal(dataResponse) {
    return (
        {
            "title": {
                "fieldType": TEXTAREA,
                "label": 'Note Title',
                "value": '',
                "required": true,
                "placeholder": 'Enter your Note Title here',
                "maxRow": 1,
                "hideMultiLine": true
            },
            "type": {
                "fieldType": DROPDOWN,
                "label": 'Note Type',
                "value": 'call',
                "required": true,
                "placeholder": 'Select Owner',
                "optionData": NotesType,
            },
            "description": {
                "fieldType": TEXTAREA,
                "label": 'Note Body',
                "value": '',
                "required": true,
                "placeholder": 'Write your note here',
                "maxLength": 'auto'
            },
            'reminderDate': {
                "fieldType": 'calender',
                "label": 'Remind me on',
                "value": null,
                "placeholder": 'Select Date',
            },
            'meetSlots': {
                "fieldType": 'datePicker',
                "label": 'Schedule a call',
                "value": null,
                "placeholder": 'Select Date',
            }
        }
    )
}