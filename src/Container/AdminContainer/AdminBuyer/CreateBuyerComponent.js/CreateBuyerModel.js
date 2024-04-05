import { AcquisitionSizeArr, AcquisitionTimeLineArr, BuyerOnboardingTypeArr, CompanySectorArr, OperationArr, RevenueRangeArr } from "../../../../CommonModels/CommonCollection";

export function CreateBuyerModel() { 
    return (
        {
            "companyName": {
                value: '',
                required: true,
                error: false,
                helperText: 'Please enter the buyer’s full company name (Eg: ABC Private Limited)',
                placeholder: 'Enter the buyer’s full company name'
            },
            "pocName": {
                value: '',
                required: true,
                error: false,
                helperText: 'Please enter the buyer’s POC’s full name',
                placeholder: 'Enter the buyer’s POC name'
            },
            "phone": {
                value: '',
                error: false,
                helperText: 'Please input your 10-digit number only.',
                placeholder: 'Enter the buyer’s POC’s phone number'
            },
            "email": {
                value: '',
                required: true,
                error: false,
                helperText: 'Please enter the buyer’s POC’s official email ID',
                placeholder: 'Enter the buyer’s POC’s official email ID'
            },
            "type": {
                value: 'corporate',
                required: true,
                helperText: 'Please choose the buyer type from the options above',
                options: BuyerOnboardingTypeArr,
            },
            "preferences": [
                {
                    "sector": {
                        value: '',
                        required: true,
                        error: false,
                        helperText: 'Please select a sector',
                        options: CompanySectorArr,
                        placeholder: 'Sector'
                    },
                    "subsector": {
                        value: [],
                        helperText: 'Please select a sub-sector',
                        placeholder: 'Sub-sector'
                    }
                }
            ],
            "dealsize": {
                value: '',
                options: AcquisitionSizeArr,
                placeholder: 'Preferred acquisition size',
                value: [0,10],
            },
            "revenue": {
                value: '',
                options: RevenueRangeArr,
                placeholder: 'Preferred revenue range',
                value: [0,10],
            },
            "intent": {
                value: '',
                options: AcquisitionTimeLineArr,
                placeholder: 'Enter acquisition timeline'
            },
            // "operation": {
            //     value: '',
            //     options: OperationArr,
            //     placeholder: 'Select age of operations'
            // },
            // "operational": {
            //     value: false,
            // },
            "revenueGenerating": {
                value: false,
            },
            'requirement': {
                value: '',
                required: false,
                helperText: 'Please enter a valid value.',
                placeholder: 'E.g. Looking for AI companies with transformers and vector databases that have revenue > INR 50 crores'
                },
            'openToLeadRound': {
                    value: false,
                    required: true,
                    helperText: 'Please choose from the options above',
                    options: [{key: true, value:'Yes'}, {key: false, value: 'No'}],
                },
            'openToAcquisition': {
                value: false,
                },
            'openToFunding': {
                value: false,
                },
            // "ebitdaPositive": {
            //     value: false
            // },
        }
    )
}