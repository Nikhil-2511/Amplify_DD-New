import { NotesType } from "../../CommonModels/CommonCollection";
import { DROPDOWN, TEXTAREA } from "../../constants";

export function DealCreateNoteModel(dataResponse) {
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
        }
    )
}