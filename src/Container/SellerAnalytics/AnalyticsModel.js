import { SINGLEDROPDOWN } from "../../constants";

export const AccountsModel = {
    'accounts': {
        label: `Please select your Google Analytics account`,
        error: false,
        showField: true,
        field_type: SINGLEDROPDOWN,
        options:  [],
        value: '',
        required: true,
        helperText: 'Please choose an account',
        placeholder: 'Choose your account',
        key: 'objective',
        isEditable: true
    },
   properties : {
        label: `Please select property`,
        error: false,
        showField: false,
        field_type: SINGLEDROPDOWN,
        options: [],
        value: '',
        required: true,
        helperText: 'Please choose a property',
        placeholder: 'Choose your property',
        key: 'objective',
        isEditable: true
    }
}

export const AnalyticsOptionsModel = {
    'audience': {
        label: 'Audience',
        key: 'audience',
        
    },
    // 'acquisition': {
    //     label: 'Acquisition',
    //     key: 'acquisition',
    // },
}

export const AnalyticsSubsections = {
    'audience': {
        'users': {
            label: 'Users',
            key: 'users',
            title: 'Users',
            helperKey: 'totalUsers'
        },
        'sessions': {
            label: 'Sessions',
            key: 'sessions',
            title: 'Sessions',
            helperKey: 'totalSessions'
        },
        'bounceRate': {
            label: 'Bounce Rate',
            key: 'bounceRate',
            title: 'Bounce Rate',
            helperKey: 'totalBounceRate'
        },
        'avgSessionDuration': {
            label: 'Avg. session duration',
            key: 'avgSessionDuration',
            title: 'Avg. session duration',
            helperKey: 'avgSessionDuration'
        },
    }
    ,
    'acquisition': {
        'topChannels': {
            label: 'Top channels',
            key: 'topChannels',
            title: 'Top channels',
        },
    },
}