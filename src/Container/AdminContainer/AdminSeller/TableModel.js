import { HelpIcon } from '../../../assets/icons';
import { RUPEE_SYMBOL } from '../../../constants';

export function AllSellerTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Seller',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Priority',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EBITDA Positive',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Onboarded at`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Last Activity`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EL Signed',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Deals',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Prospects',
                    sx: {},
                    className: '',
                    style: {},
                    // icon: HelpIcon
                },
                {
                    label: 'Actions',
                    sx: {},
                    className: '',
                    style: {},
                }
            ],
            tableContent: [
                {
                    key: 'name',
                    hasCustomData: true
                },
                { 
                    key: 'priorties',
                    hasCustomData: true
                },
                { 
                    key: 'ttmCalculated',
                    hasCurrency: true
                },
                { 
                    key: 'ebitda',
                },
                { 
                    key: 'createdAt',
                },
                { 
                    key: 'updatedAt',
                },
                { 
                    key: 'tncState',
                },
                { 
                    key: 'deals',
                },
                { 
                    key: 'viewedDealCount'
                },
                {
                    key: 'notes'
                }
            ]
        }
    )
}


export function SellerPriorityTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Seller',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EBITDA Positive',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Onboarded at`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Last Activity`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EL Signed',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Deals',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Prospects',
                    sx: {},
                    className: '',
                    style: {},
                    // icon: HelpIcon
                },
                {
                    label: 'Actions',
                    sx: {},
                    className: '',
                    style: {},
                }
            ],
            tableContent: [
                {
                    key: 'name',
                    hasCustomData: true
                },
                { 
                    key: 'ttmCalculated',
                    hasCurrency: true
                },
                { 
                    key: 'ebitda',
                },
                { 
                    key: 'createdAt',
                },
                { 
                    key: 'updatedAt',
                },
                { 
                    key: 'tncState',
                },
                { 
                    key: 'deals',
                },
                { 
                    key: 'viewedDealCount'
                },
                {
                    key: 'notes'
                }
            ]
        }
    )
}


export function SellerRejectedTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Seller',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EBITDA Positive',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Onboarded at`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Last Activity`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Seller Status',
                    sx: {},
                    className: '',
                    style: {},
                    // icon: HelpIcon
                },
                {
                    label: 'Actions',
                    sx: {},
                    className: '',
                    style: {},
                    // icon: HelpIcon
                },
            ],
            tableContent: [
                {
                    key: 'name',
                    hasCustomData: true
                },
                { 
                    key: 'ttmCalculated',
                    hasCurrency: true
                },
                { 
                    key: 'ebitda',
                },
                { 
                    key: 'createdAt',
                },
                { 
                    key: 'updatedAt',
                },
                {
                    key: 'verificationStatus'
                },
                {
                    key: 'notes'
                }
            ]
        }
    )
}

export function SellerAwaitingTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Seller',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Onboarding Stage',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Founder Name',
                    sx: {width: '15%'},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EBITDA Positive',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Onboarded at`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Last Activity`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Action',
                    sx: {},
                    className: '',
                    style: {},
                }
            ],
            tableContent: [
                {
                    key: 'name',
                    hasCustomData: true
                },
                { 
                    key: 'onboardingStage',
                },
                { 
                    key: 'founderName',
                },
                { 
                    key: 'ttmCalculated',
                    hasCurrency: true
                },
                { 
                    key: 'ebitda',
                },
                { 
                    key: 'createdAt',
                },
                { 
                    key: 'updatedAt',
                },
                { 
                    key: 'awaitingAction',
                }
            ]
        }
    )
}


export function SellerUnregisteredTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Seller',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Description',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EBITDA Positive',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Onboarded at`,
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'name',
                    hasCustomData: true
                },
                { 
                    key: 'description',
                },
                { 
                    key: 'ttmCalculated',
                    hasCurrency: true
                },
                { 
                    key: 'ebitda',
                },
                { 
                    key: 'createdAt',
                }
            ]
        }
    )
}