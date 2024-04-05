import InterestSentWhiteIcon from '../../assets/images/interestSentWhiteIcon.svg';
import InterestSentGreyIcon from '../../assets/images/interestSentGreyIcon.svg';
import ActiveDealsGreyIcon from '../../assets/images/activeDealsGreyIcon.svg';
import ActiveDealsWhiteIcon from '../../assets/images/activeDealsWhiteIcon.svg';

import { ACTIVE_DEALS, CLOSING, DONE_DEAL, EXPRESS_INTEREST_KEY, INTRODUCTION_PENDING_KEY, NEGOTIATION, ON_HOLD } from '../../constants';
import { SellerActiveDealsModel, SellerInterestModel } from "./SellerDealsModel";

export function SellerDealsTabData() {
    return (
        [
            {
                activeIcon: InterestSentWhiteIcon,
                inActiveIcon: InterestSentGreyIcon,
                label: 'Interest Received',
                tableModel: SellerInterestModel(),
                preSelectedFilters: {
                    dealStatus: [EXPRESS_INTEREST_KEY]
                },
            },
            {
                activeIcon: ActiveDealsWhiteIcon,
                inActiveIcon: ActiveDealsGreyIcon,
                tableModel: SellerActiveDealsModel(),
                label: ACTIVE_DEALS,
                key: ACTIVE_DEALS,
                preSelectedFilters: {
                    dealStatus: [DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, INTRODUCTION_PENDING_KEY, ON_HOLD.key]
                },
            },
        ]
    )
}