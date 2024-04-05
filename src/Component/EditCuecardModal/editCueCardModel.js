export const CuecardModel = {
    'title': {
        value: '',
        // helperText: 'Please fill in',
        placeholder: 'Provide an anonymous cue card title for this seller to enhance buyer discovery within 32 characters.',
        label: `Cue Card Anonymous Title`,
        maxLength: 32
    },
    'about': {
        value: '',
        // helperText: 'Please fill in',
        placeholder: "Provide an anonymous description of the seller's business, offerings, and model within 240 characters.",
        label: `Seller Anonymous Description `,
        supportiveText: `Describe seller’s business offering and model.`,
        maxLength: 400
    },
    'reasonToBuy': {
        value: '',
        // helperText: 'Please fill in',
        placeholder: 'Describe your company’s key assets / products / USP',
        label: `Why invest in us? `,
        supportiveText: `Highlight the key reasons why a buyer should consider acquiring this company.`,
        maxLength: 2000
       },
   'reasonToSell': {
       value: '',
    //    helperText: 'Please fill in',
       placeholder: `Summarize the seller's motivation for selling the company.`,
       label: `Reason for Acquisition / Raise capital`,
       supportiveText: `Summarize the seller's motivation for selling the company`,
       maxLength: 2000
    },
    'founderPedigree': {
        value: '',
        // helperText: 'Please fill in',
        placeholder: `Provide a brief overview of the founder's background and achievements within 240 characters.`,
        label: `Founder pedigree `,
        supportiveText: `Provide a brief overview of the founder's background and achievements`,
        maxLength: 240
    },
}