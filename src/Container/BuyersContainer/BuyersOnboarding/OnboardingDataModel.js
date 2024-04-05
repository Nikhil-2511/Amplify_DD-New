import { BuyerOnboardingTypeArr } from "../../../CommonModels/CommonCollection"

export const OnboardingInitialData = {
    'pocName': {
         value: '',
         required: true,
         helperText: 'Please fill in',
         step: 1,
         placeholder: 'Enter your name'
     },
     'companyName': {
         value: '',
         required: true,
         helperText: 'Please fill in',
         step: 1,
         placeholder: 'Enter company’s name'
     },
     'email': {
         value: '',
         required: true,
         helperText: 'Please register using your professional email ID.',
         apiError: '',
         step: 1,
         placeholder: 'Enter your work email'
        },
    'description': {
        value: '',
        required: true,
        helperText: 'Please enter a valid description of your company.',
        step: 1,
        placeholder: 'Give a brief description of your company (max 300 characters)'
        },
    'phone': {
        value: '',
        required: true,
        helperText: 'Please input your 10-digit number only.',
        step: 1,
        placeholder: 'Enter your phone number'
     },
     'type': {
        value: '',
        required: true,
        helperText: 'Please choose the buyer type from the options above',
        options: BuyerOnboardingTypeArr,
        step: 1,
     },
     'sector': {
         value: [],
         required: true,
         helperText: 'Please fill in',
         step: 2,
         placeholder: 'Select sectors you are interested in'
     },
     'subsector': {
         value: [],
         step: 2,
         placeholder: 'Enter your interested sub-sectors'
     },
     'dealsize': {
         value: [0,10],
         required: true,
         step: 2,
     },
     'revenue': {
        value: [0,10],
        required: true,
        step: 2,
    },
     'intent': {
         value: '',
         required: true,
         helperText: 'Please fill in',
         step: 2,
         placeholder: 'Enter your acquisition timeline'
     },
     'operation': {
         value: '',
         step: 2,
         placeholder: 'Enter your acquisition timeline'
     },
     'operational': {
         value: false,
         step: 3
     },
    //  'revenueGenerating': {
    //     value: false,
    //     step: 3
    //  },
     'ebitdaPositive': {
         value: false,
         step: 3
     },
     'openToLeadRound': {
        value: false,
        required: true,
        helperText: 'Please choose from the options above',
        options: [{key: true, value:'Yes'}, {key: false, value: 'No'}],
        step: 2,
        showFiled : false
     },
     'requirement': {
        value: '',
        required: false,
        helperText: 'Please enter a valid value.',
        step: 2,
        placeholder: 'E.g. Looking for AI companies with transformers and vector databases that have revenue > INR 50 crores'
        },
    //  'openToAcquisition': {
    //     value: false,
    //     step: 2
    //     },
    //  'openToFunding': {
    //     value: false,
    //     step: 2
    //     },
 }

 export const StepTitle = {
    1: 'Identification',
    2: 'Acquisition Preferences',
    // 3: 'Specific Criteria'
 }
