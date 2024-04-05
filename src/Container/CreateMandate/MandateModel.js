import { CompanySectorArr, OperationArr } from "../../CommonModels/CommonCollection";

export const CreateMandateModel = {
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
    }
}