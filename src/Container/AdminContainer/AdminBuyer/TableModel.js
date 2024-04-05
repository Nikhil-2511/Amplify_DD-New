import { HelpIcon } from '../../../assets/icons';

export function AllBuyerTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Buyer Details',
                    sx: {},
                    className: '',
                    style: {}
                },
                // {
                //     label: 'Buyer Contact',
                //     sx: {},
                //     className: '',
                //     style: {},
                //     icon: HelpIcon
                // },
                {
                    label: 'Priority',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Preference Sector',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buy-side Owner',
                    sx: {},
                    className: '',
                    style: {},
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
                    label: 'T&C Signed?',
                    sx: {},
                    className: '',
                    style: {},
                },
                {
                    label: 'Prospects',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Active Deals',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Users',
                    sx: {},
                    className: '',
                    style: {}
                }
            ],
            tableContent: [
                {
                    key: 'name',
                },
                // {
                //     key: 'phone',
                // },
                {
                    key: 'priorties',
                },
                {
                    key: 'preferences',
                },
                {
                    key: 'owner',
                },
                { 
                    key: 'createdAt',
                },
                {
                    key: 'updatedAt',
                },
                {
                    key: 'tncCompleted',
                },
                {
                    key: 'viewedDealCount',
                },
                {
                    key: 'activeDealCount'
                },
                {
                    key: 'buyerMemberCount'
                },
            ]
        }
    )
}

export function BuyerPriorityTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Buyer Details',
                    sx: {},
                    className: '',
                    style: {}
                },
                // {
                //     label: 'Buyer Contact',
                //     sx: {},
                //     className: '',
                //     style: {},
                //     icon: HelpIcon
                // },
                {
                    label: 'Preference Sector',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buy-side Owner',
                    sx: {},
                    className: '',
                    style: {},
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
                    label: 'T&C Signed?',
                    sx: {},
                    className: '',
                    style: {},
                },
                {
                    label: 'Prospects',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Active Deals',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Users',
                    sx: {},
                    className: '',
                    style: {}
                }
            ],
            tableContent: [
                {
                    key: 'name',
                },
                // {
                //     key: 'phone',
                // },
                {
                    key: 'preferences',
                },
                {
                    key: 'owner',
                },
                { 
                    key: 'createdAt',
                },
                {
                    key: 'updatedAt',
                },
                {
                    key: 'tncCompleted',
                },
                {
                    key: 'viewedDealCount',
                },
                {
                    key: 'activeDealCount'
                },
                {
                    key: 'buyerMemberCount'
                },
            ]
        }
    )
}

export function BuyerRejectedTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Buyer Details',
                    sx: {},
                    className: '',
                    style: {width: '40%'}
                },
                // {
                //     label: 'Buyer Contact',
                //     sx: {},
                //     className: '',
                //     style: {},
                //     icon: HelpIcon
                // },
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
                    label: 'Preference Sector',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buy-side Owner',
                    sx: {},
                    className: '',
                    style: {},
                    icon: HelpIcon
                },
                {
                    label: 'Buyer Status',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'name',
                },
                // {
                //     key: 'phone',
                // },
                { 
                    key: 'createdAt',
                },
                {
                    key: 'updatedAt',
                },
                {
                    key: 'preferences',
                },
                {
                    key: 'owner',
                },
                {
                    key: 'status',
                }
            ]
        }
    )
}


export function BuyerAwaitingTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Buyer Details',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buyer Type',
                    sx: {},
                    className: '',
                    style: {},
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
                    label: 'Preference Sector',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buy-side Owner',
                    sx: {},
                    className: '',
                    style: {},
                    icon: HelpIcon
                },
                /* Will pick this later */
                // {
                //     label: 'Action',
                //     sx: {},
                //     className: '',
                //     style: {} 
                // }
            ],
            tableContent: [
                {
                    key: 'name',
                },
                // {
                //     key: 'phone',
                // },
                { 
                    key: 'type',
                },
                { 
                    key: 'createdAt',
                },
                {
                    key: 'updatedAt',
                },
                {
                    key: 'preferences',
                },
                {
                    key: 'owner',
                },
                /* Will pick this later */
                // {
                //     key: 'awaitingAction'
                // }
            ]
        }
    )
}