import InterestSentBlueIcon from '../../../assets/images/messageSquareBlue.svg';
import InterestSentGreyIcon from '../../../assets/images/messageSquareGrey.svg';
import ActiveDealsGreyIcon from '../../../assets/images/check-circle-broken-grey.svg';
import ActiveDealsBlueIcon from '../../../assets/images/check-circle-broken-blue.svg';
import calendarCheckActive from '../../../assets/images/calendarCheckActive.svg'
import calendarCheckInActive from '../../../assets/images/calendarCheckInactive.svg'

import { ACTIVE_DEALS, ALL, CLOSING, DONE_DEAL, EXPRESS_INTEREST_KEY, INTEREST_SENT, INTRODUCTION_PENDING_KEY, NEGOTIATION, SCHEDULED_CALLS } from '../../../constants';
import { AdminDefaultDealsTableModel, AdminReminderTableModel, AdminScheduledCallsTableModel, AdminUpdateReminderModel, AdminUpdateScheduledCallsModel } from './AdminDealsTableModel';
import { AdminDealsFilterModel, DealsFilterModel } from '../../../CommonModels/FilterModel';
import { ENDPOINT } from '../../../config/endpoint';
import { AdminPendingActionsSortByArr, AdminScheduledCallsSortByArr, SortByArr } from '../../../CommonModels/CommonCollection';

export function AdminDealsTabData() {
    return (
        [
            {
                activeIcon: InterestSentBlueIcon,
                inActiveIcon: InterestSentGreyIcon,
                label: 'All Deals',
                tableModel: AdminDefaultDealsTableModel(),
                filterModel: AdminDealsFilterModel(),
                preSelectedFilters: {
                    dealStatus: [INTRODUCTION_PENDING_KEY, EXPRESS_INTEREST_KEY, NEGOTIATION.key]
                },
            },
            // {
            //     activeIcon: ActiveDealsBlueIcon,
            //     inActiveIcon: ActiveDealsGreyIcon,
            //     label: ACTIVE_DEALS,
            //     key: ACTIVE_DEALS,
            //     // tableModel: NegotiationDealsTableModel,
            //     preSelectedFilters: {
            //         dealStatus: [DONE_DEAL.key, NEGOTIATION.key, CLOSING.key]
            //     },
            //     // filterModel: DealsFilterModel,
            // },
            {
                activeIcon: ActiveDealsBlueIcon,
                inActiveIcon: ActiveDealsGreyIcon,
                label: 'Pending Actions',
                key: ACTIVE_DEALS,
                tableModel: AdminReminderTableModel,
                url: ENDPOINT.REMINDER.query,
                disableFilter: true,
                modifyTableModel: AdminUpdateReminderModel,
                defaultSortBy: {
                    direction: 'ASC',
                    fieldName: 'reminderDate',
                },
                sortByArr: AdminPendingActionsSortByArr,
                criteriaMap: {"noteIdType":"deal","reminderState":"on"}
            },
            {
                activeIcon: calendarCheckActive,
                inActiveIcon: calendarCheckInActive,
                label: 'Scheduled Calls',
                key: SCHEDULED_CALLS,
                tableModel: AdminScheduledCallsTableModel,
                url: ENDPOINT.SCHEDULED_CALLS.getScheduledCalls, 
                disableFilter: true,
                modifyTableModel: AdminUpdateScheduledCallsModel,
                defaultSortBy: {
                    direction: 'ASC',
                    fieldName: 'dateTime',
                    value: 'Upcoming'
                },
                sortByArr: AdminScheduledCallsSortByArr,
            },
        ]
    )
}