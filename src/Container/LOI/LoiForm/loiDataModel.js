// acquisition,acquihire,open_to_all,upfront,majority_and_earnout,cash,cash_stock,continue_earnout,not_continue_earnout;

import { RADIO_KEY } from "../../../constants";

function DefaultModelData({label, type, value, supportiveText, options, keyName}) {
    this.label = label;
    this.type = type;
    this.value = value;
    this.supportiveText = supportiveText;
    this.options = options;
    this.keyName = keyName;
}

export function formSaleModel(dataResponse) {
    return (
        new DefaultModelData({
            label: 'Form of Sale',
            supportiveText: "Please select all that apply for how you'd like to sell your company. Acquisition involves selling your business as a whole, while Acquihire is a buy-out specifically to take over the employees.",
            value: dataResponse['formOfSale'] || 'open_to_all',
            type: RADIO_KEY,
            keyName: "formOfSale",
            options: [
                {
                    key: 'acquisition',
                    displayText: 'Acquisition'
                },
                {
                    key: 'acquihire',
                    displayText: 'Acquihire'
                },
                {
                    key: 'open_to_all',
                    displayText: 'Open to all'
                }
            ]
        })
    )
}

export function acquisitionModel(dataResponse) {
    return [
        new DefaultModelData({
            label: 'Payment Terms',
            supportiveText: "Please indicate your preferred payment terms. You can opt for '100% Upfront’, where you would receive the entire payment at the time of the sale. Alternatively, you may choose 'Majority Now + Earn-out’ which allows you to receive part of the payment upfront, with the rest tied to future business performance.",
            value: dataResponse['paymentTerms'] || 'open_to_all',
            type: RADIO_KEY,
            keyName: 'paymentTerms',
            options: [
                {
                    key: 'upfront',
                    displayText: '100% Upfront'
                },
                {
                    key: 'majority_and_earnout',
                    displayText: 'Majority Now + Earn-out'
                },
                {
                    key: 'open_to_all',
                    displayText: 'Open to all'
                }
            ],
        }),
        new DefaultModelData({
            label: 'Payment Mode',
            supportiveText: "Please indicate your preferred form of payment. You can choose ‘Cash Only' if you wish to receive the entire payment in cash. Alternatively, you may opt for 'Cash + Stock’ which would allow you to receive a combination of cash and the acquiring company's stock.",
            value:  dataResponse['paymentMode'] || 'open_to_all',
            type: RADIO_KEY,
            keyName: 'paymentMode',
            options: [
                {
                    key: 'cash',
                    displayText: 'Cash only'
                },
                {
                    key: 'cash_stock',
                    displayText: 'Cash + Stock'
                },
                {
                    key: 'open_to_all',
                    displayText: 'Open to all'
                }
            ],
        }),
        new DefaultModelData({
            label: 'Founder Continuity',
            supportiveText: "Please indicate your continuity plan after the transaction is complete. You can choose 'Will Continue for Earn-out Period' if you plan to stay with the company to help meet performance goals during the earn-out period. Alternatively, you may select 'Will Not Continue' if you intend to exit the company immediately after the sale.",
            value: dataResponse['founderContinuity'] || '',
            type: RADIO_KEY,
            keyName: 'founderContinuity',
            options: [
                {
                    key: 'continue_earnout',
                    displayText: 'Will Continue for Earn-out Period'
                },
                {
                    key: 'not_continue_earnout',
                    displayText: 'Will Not Continue for Earn-out Period'
                },
            ],
        }),
    ]
}

export function acquihireModel(dataResponse) {
    return new DefaultModelData({
        label: 'Acquihire - Team Details',
        supportiveText: "Please outline your offer by providing details of only the team members who will be available for the proposed acquihire in the respective function boxes below for Founders and Team on Offer.",
        type: 'multi_text_field',
        options: {
            "founder": {
                keyName: 'founders',
                label: "Founders",
                type: 'text',
                value: dataResponse['founders'] || '',
                placeholder: 'Eg: Founder A - 15 years running Edtech startups, Founder B - 9 years experience as Fintech CTO'
            },
            "team": {
                keyName: 'coreTeam',
                label: "Team on Offer",
                type: 'text',
                value: dataResponse['coreTeam'] || '',
                placeholder: 'Eg: 5 backend devs avg. 6 years exp, 1 sales head 20 years exp, 3 creatives avg. 3 years exp, 2 PMs'
            }
        }
    })
}