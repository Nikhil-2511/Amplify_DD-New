import { ACTIVE_DEALS, ACTIVITY, CHIP_INPUT, DROPDOWN, MANDATES, NORMAL, NOTES, PROFILE, RECOMMENDED_COMPANIES, TEXTAREA, USERS } from "../../../constants";
import NoteBlueIcon from '../../../assets/images/noteBlueIcon.svg';
import NoteIcon from '../../../assets/images/noteIcon.svg';
import UserDownBlueIcon from '../../../assets/images/userDownBlueIcon.svg';
import UserDownIcon from '../../../assets/images/userDownIcon.svg';
import { PriorityArr } from "../../../CommonModels/CommonCollection";
import SentGreyIcon from "../../../assets/images/SentGreyIcon.svg";
import SentBlueIcon from "../../../assets/images/SentBlueIcon.svg";
import RecommendStarGrey from "../../../assets/images/RecommendStarGrey.svg";
import RecommendStarBlue from "../../../assets/images/RecommendStarBlue.svg";
import ProfileBlueIcon from '../../../assets/images/profileBlueIcon.svg';
import ProfileGreyIcon from '../../../assets/images/profileGreyIcon.svg';
import ActiveDealIcon from '../../../assets/images/activeDealIcon.svg';
import AdminActiveDealBlueIcon from '../../../assets/images/AdminActiveDealBlueIcon.svg';
import GreyEyeIcon from '../../../assets/images/eyeGreyIcon.svg';
import BlueEyeIcon from '../../../assets/images/eyeBlueIcon.svg';
import store from "../../../Redux";
import PaperclipBlueIcon from '../../../assets/images/paperclipBlueIcon.svg';
import PaperclipGreyIcon from '../../../assets/images/paperclipGreyIcon.svg';
import ActivityBlueIcon from '../../../assets/images/activityBlueIcon.svg';
import ActivityGreyIcon from '../../../assets/images/activityGreyIcon.svg';
import UserGreyIcon from '../../../assets/images/userGreyIcon.svg';
import UserBlueIcon from '../../../assets/images/userBlueIcon.svg';

export function BuyerProfileTabData() {
    return (
        [
            {
                activeIcon: ProfileBlueIcon,
                inActiveIcon: ProfileGreyIcon,
                label: PROFILE,
            },
            {
                activeIcon: PaperclipBlueIcon,
                inActiveIcon: PaperclipGreyIcon,
                label: NOTES,
            },
            // {
            //     activeIcon: NoteBlueIcon,
            //     inActiveIcon: NoteIcon,
            //     label: MANDATES,
            // },
            {
                activeIcon: SentBlueIcon,
                inActiveIcon: SentGreyIcon,
                label: 'Interested Companies',
            },
            {
                activeIcon: BlueEyeIcon,
                inActiveIcon: GreyEyeIcon,
                label: 'Viewed Companies',
                hasDivider: true
            },
            {
                activeIcon: RecommendStarBlue,
                inActiveIcon: RecommendStarGrey,
                label: RECOMMENDED_COMPANIES,
            },
            {
                activeIcon: AdminActiveDealBlueIcon,
                inActiveIcon: ActiveDealIcon,
                label: ACTIVE_DEALS,
            },
            {
                activeIcon: ActivityBlueIcon,
                inActiveIcon: ActivityGreyIcon,
                label: 'Activity',
            },
            // {
            //     activeIcon: BuildingBlueIcon,
            //     inActiveIcon: BuildingGreyIcon,
            //     label: ACTIVITY,
            //     value: 'not_verified',
            //     key: 'status',
            // },
            {
                activeIcon: UserBlueIcon,
                inActiveIcon: UserGreyIcon,
                label: USERS,
            }
        ]
    )
}


export function confirmPopUpModel(fieldObj={}) {
    let { disableField } = fieldObj;
    return (
        {
            "owner": {
                "fieldType": DROPDOWN,
                "label": 'Buy-side Owner',
                "value": '',
                "required": true,
                "placeholder": 'Select Owner',
                "optionData": store.getState()?.authorizationStore?.adminUsersList || [],
                "disabled": disableField
            },
            "priority": {
                "fieldType": DROPDOWN,
                "label": 'Buyer Priority',
                "value": 'normal',
                "required": true,
                "optionData": PriorityArr,
                "placeholder": 'Select Priority',
                "disabled": disableField
            },
            "description": {
                "fieldType": TEXTAREA,
                "label": 'Anonymous Buyer Description',
                "value": '',
                "required": true,
                "placeholder": "Enter a description... (max 60 character)",
                "maxLength": 400,
                "disabled": disableField
            },
            "verificationNotes": {
                "fieldType": TEXTAREA,
                "label": 'Buyer Verification Note',
                "value": '',
                'maxLength': 'auto',
                "required": true,
                "placeholder": "Enter your reasons for accepting this buyer here",
                "defaultHelpingText": 'This note will be added to the Notes tab',
            },
            "tags": {
                "fieldType": CHIP_INPUT,
                "label": 'Tags',
                "value": '',
                'maxLength': 'auto',
                "placeholder": "Enter tags relevant to this buyer",
            }
        }
    )
}

export function RejectModel() {
    return (
        {
            "verificationNotes": {
                "fieldType": TEXTAREA,
                "label": 'Buyer Verification Note',
                "value": '',
                'maxLength': 'auto',
                "required": true,
                "placeholder": "Enter your reasons for rejecting this buyer here",
                "minRow": 4
            },
        }
    )
}