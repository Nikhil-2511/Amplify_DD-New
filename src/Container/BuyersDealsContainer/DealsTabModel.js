import InterestSentBlueIcon from '../../assets/images/interestSentBlueIcon.svg';
import InterestSentGreyIcon from '../../assets/images/interestSentGreyIcon.svg';
import ActiveDealsGreyIcon from '../../assets/images/activeDealsGreyIcon.svg';
import ActiveDealsBlueIcon from '../../assets/images/activeDealsBlueIcon.svg';
import HeartGreyIcon from '../../assets/images/heartGreyIcon.svg';
import HeartBlueIcon from '../../assets/images/heartBlueIcon.svg';

import { ACTIVE_DEALS, ALL, CLOSING, DONE_DEAL, EXPRESS_INTEREST_KEY, INTEREST_SENT, INTRODUCTION_PENDING_KEY, NEGOTIATION, ON_HOLD, SHORTLIST } from '../../constants';
import { ClosingDealsTableModel, DefaultDealsTableModel, InterestSentDealsTableModel, NegotiationDealsTableModel, ShortlistedDealsTableModel } from './DealsTableModel';
import { DealsFilterModel } from '../../CommonModels/FilterModel';
import { SHORTLISTED_KEY } from '../../constants/keyVariableConstants';

export function DealsTabData() {
    return (
        [
            // {
            //     activeIcon: HeartBlueIcon,
            //     inActiveIcon: HeartGreyIcon,
            //     label: 'Shortlisted',
            //     tableModel: ShortlistedDealsTableModel(),
            //     preSelectedFilters: {
            //         [SHORTLISTED_KEY]: true
            //     },
            //     hideOnMobile: true,
            //     noResultHeading: "No shortlists yet",
            //     norResultSubheading: "To add a company to your shortlist for future reference, simply click on the heart icon next to the company's name while browsing companies. Alternatively, you can click the 'Shortlist' button when viewing a seller's listing."
            // },
            {
                activeIcon: InterestSentBlueIcon,
                inActiveIcon: InterestSentGreyIcon,
                label: INTEREST_SENT,
                tableModel: InterestSentDealsTableModel(),
                preSelectedFilters: {
                    dealStatus: [EXPRESS_INTEREST_KEY]
                },
                noResultHeading: "No pending interest sent",
                norResultSubheading: "To convey your interest and initiate a conversation with a seller, just click 'Express Interest' within their listing. If the seller accepts your interest, you'll find it under the 'Active Deals' tab."
            },
            {
                activeIcon: ActiveDealsBlueIcon,
                inActiveIcon: ActiveDealsGreyIcon,
                label: ACTIVE_DEALS,
                key: ACTIVE_DEALS,
                tableModel: DefaultDealsTableModel(),
                preSelectedFilters: {
                    dealStatus: [DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, INTRODUCTION_PENDING_KEY, ON_HOLD.key]
                },
                // filterModel: DealsFilterModel,
                disableFilter: true,
                noResultHeading: "No Active Deals",
                norResultSubheading: "No active deals at the moment. Once a seller accepts your interest, the deal will appear here as an active deal."
            },
        ]
    )
}


export function MobileDealsTabData() {
    return (
        [
            {
                activeIcon: InterestSentBlueIcon,
                inActiveIcon: InterestSentGreyIcon,
                label: INTEREST_SENT,
                tableModel: InterestSentDealsTableModel(),
                preSelectedFilters: {
                    dealStatus: [EXPRESS_INTEREST_KEY]
                },
                noResultHeading: "No pending interest sent",
                norResultSubheading: "To convey your interest and initiate a conversation with a seller, just click 'Express Interest' within their listing. If the seller accepts your interest, you'll find it under the 'Active Deals' tab."
            },
            {
                activeIcon: ActiveDealsBlueIcon,
                inActiveIcon: ActiveDealsGreyIcon,
                label: ACTIVE_DEALS,
                key: ACTIVE_DEALS,
                tableModel: DefaultDealsTableModel(),
                preSelectedFilters: {
                    dealStatus: [DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, INTRODUCTION_PENDING_KEY, ON_HOLD.key]
                },
                // filterModel: DealsFilterModel,
                disableFilter: true,
                noResultHeading: "No Active Deals",
                norResultSubheading: "No active deals at the moment. Once a seller accepts your interest, the deal will appear here as an active deal."
            },
        ]
    )
}