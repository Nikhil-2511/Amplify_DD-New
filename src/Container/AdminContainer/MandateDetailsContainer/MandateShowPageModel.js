import store from "../../../Redux"
import { getAppBaseUrl, getValueFromArr } from "../../../helper/commonHelper"

import VerifiedBuyerBlue from '../../../assets/images/verifiedBuyerBlue.svg'
import VerifiedBuyerGrey from '../../../assets/images/verifiedBuyerGrey.svg'
import RecommendedBlueIcon from '../../../assets/images/RecommendStarBlue.svg';
import RecommendedGreyIcon from '../../../assets/images/RecommendStarGrey.svg';
import InterestSentBlueIcon from '../../../assets/images/messageSquareBlue.svg';
import InterestSentGreyIcon from '../../../assets/images/messageSquareGrey.svg';
import PaperclipBlueIcon from '../../../assets/images/paperclipBlueIcon.svg';
import PaperclipGreyIcon from '../../../assets/images/paperclipGreyIcon.svg';

export function AdminMandateShowPageTabModel() {
    return (
        [
            {
                label: 'Information',
                activeIcon: VerifiedBuyerBlue,
                inActiveIcon: VerifiedBuyerGrey,
            },
            {
                activeIcon: RecommendedBlueIcon,
                inActiveIcon: RecommendedGreyIcon,
                label: 'Recommendation',
            },
            {
                activeIcon: InterestSentBlueIcon,
                inActiveIcon: InterestSentGreyIcon,
                label: 'Active Deals',
            },
            {
                activeIcon: PaperclipBlueIcon,
                inActiveIcon: PaperclipGreyIcon,
                label: 'Notes',
            },
        ]
    )
}

export function MandateShowPageTabModel() {
    return (
        [
            {
                label: 'Information',
                activeIcon: VerifiedBuyerBlue,
                inActiveIcon: VerifiedBuyerGrey,
            },
            {
                activeIcon: RecommendedBlueIcon,
                inActiveIcon: RecommendedGreyIcon,
                label: 'Recommendation',
            },
            {
                activeIcon: InterestSentBlueIcon,
                inActiveIcon: InterestSentGreyIcon,
                label: 'Active Deals',
            }
        ]
    )
}

function renderCustomValue(value) {
    return (
        <div className={`custom-chip bg-ECFDF3`}>
            <span className="text-12 font-500 text-green">{value}</span>
        </div>
    )
}

function renderNavigationValue(data) {
    return (
        <div className="text-14">
        <a href={getAppBaseUrl() + `admin/buyer/profile-page/${data?.buyerUid}`} target="_blank" className="text-2E90FA font-500 cursor-pointer">{'B' + (data?.buyerid || '')}</a>
        </div>
       )
}

export function MandateInformationModel() {
    return (
        {
            label: 'Internal Information',
            description: 'This is a short description to inform the admin team that this is confidential information.',
            fields: {
                "status":{
                    label: 'Mandate Status',
                    getCustomValue: renderCustomValue,
                    customValue: true
                },
                "owner": {
                    getValue: getValueFromArr,
                    label: 'Deal Partner',
                    optionData: (store.getState()?.authorizationStore?.adminUsersList || [])
                },
                "buyer": {
                    label: 'Buyer',
                    customLink: true,
                    getCustomValue: renderNavigationValue
                }
            }
        }
    )
}