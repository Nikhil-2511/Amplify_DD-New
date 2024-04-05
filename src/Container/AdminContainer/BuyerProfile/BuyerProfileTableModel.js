import { CompanySectorArr, NotesType, OperationArr, PriorityArr } from "../../../CommonModels/CommonCollection"
import store from "../../../Redux"
import { HelpIcon } from "../../../assets/icons"
import { DROPDOWN, TEXTAREA } from "../../../constants"
import { getValueFromArr } from "../../../helper/commonHelper"


export function BuyerInformationModel () {
    return (
        {
            label: 'Internal Information',
            description: 'This is a short description to inform the admin team that this is confidential information.',
            fields: {
                "owner":{
                    getValue: getValueFromArr,
                    label: 'Buy-side owner',
                    optionData: (store.getState()?.authorizationStore?.adminUsersList || [])
                },
                "priority": {
                    getValue: getValueFromArr,
                    label: 'Buyer Priorty',
                    optionData: PriorityArr
                }
            }
        }
    )
}


export function BuyerCreateNoteModel(dataResponse) {
    return (
        {
            "title": {
                "fieldType": TEXTAREA,
                "label": 'Note Title',
                "value": '',
                "required": true,
                "placeholder": 'Enter your Note Title here',
                "hideMultiLine": true
            },
            "type": {
                "fieldType": DROPDOWN,
                "label": 'Note Type',
                "value": 'call',
                "required": true,
                "placeholder": 'Select Owner',
                "optionData": NotesType
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


export function AdminBuyerMandateModel() {
    return (
        {
            "name": {
                value: '',
                required: true,
                error: false,
                helperText: 'Please enter a name for your Mandate',
                placeholder: 'Name your mandate (max 30 characters)'
            },
            "preferences": [
                {
                    "sector": {
                        value: '',
                        required: true,
                        helperText: 'Please select a sector',
                        options: CompanySectorArr,
                        placeholder: 'Sector'
                    },
                    "subsector": {
                        value: '',
                        helperText: 'Please select a sub-sector',
                        placeholder: 'Sub-sector'
                    }
                }
            ],
            "revenueMin": {
                value: 0,
            },
            "revenueMax": {
                value: 10
            },
            "ebidta": {
                value: false
            },
            "operation": {
                value: '',
                options: OperationArr,
                placeholder: 'Select age of operations'
            },
            "operational": {
                value: false,
        
            },
            "others": {
                value: '',
                placeholder: 'Specify your criteria'
            },
            "dealConstruct": {
                value: '',
                placeholder: 'Enter preferred deal structure (e.g., cash, cash + stock, acquihire etc.,)'
            },
            "targets": {
                value: [],
                placeholder: "Enter company names you're considering for this mandate"
            },
            "status":{
                value: false
            }
        }
    )
}

export function AdminBuyerMandateModelNew() {
    return (
        { 
            "id":{
                value: '',
                required: true,
                error: false,
            },
            "buyerid": {
                value :'',
                required:true,
                error: false,
            },
            "uid":{
                    value:'',
                    required:true,
                    error: false,
            },
            "name": {
                value: '',
                required: true,
                error: false,
                helperText: 'Please enter a name for your Mandate',
                placeholder: 'Name your mandate (max 30 characters)'
            },
            "preferences": [
                {
                    "id": "",
                    "sector": {
                        value: '',
                        required: true,
                        helperText: 'Please select a sector',
                        options: CompanySectorArr,
                        placeholder: 'Sector'
                    },
                    "subsector": {
                        value: '',
                        helperText: 'Please select a sub-sector',
                        placeholder: 'Sub-sector'
                    }
                }
            ],
            "revenueMin": {
                value: 0,
            },
            "revenueMax": {
                value: 10
            },
            "ebidta": {
                value: true
            },
            "operation": {
                value: '',
                options: OperationArr,
                placeholder: 'Select age of operations'
            },
            "operational": {
                value: true,
            },
            "others": {
                value: '',
                placeholder: 'Specify your criteria'
            },
            "dealConstruct": {
                value: '',
                placeholder: 'Enter preferred deal structure (e.g., cash, cash + stock, acquihire etc.,)'
            },
            "targets": {
                value: [],
                placeholder: "Enter company names you're considering for this mandate"
            },
            // "dealMin": {
            //     value: 0,
            // },
            // "dealMax": {
            //     value: 10
            // },
        }
    )
}