import BuildingBlueIcon from '../../assets/images/buildingBlue.svg';
import BuildingGreyIcon from '../../assets/images/buildingGrey.svg';
import VerifiedBuyerBlue from '../../assets/images/verifiedBuyerBlue.svg';
import VerifiedBuyerGrey from '../../assets/images/verifiedBuyerGrey.svg';
import UserUpIcon from '../../assets/images/userUpIcon.svg';
import UserUpBlueIcon from '../../assets/images/userUpBlueIcon.svg';
import NoteIcon from '../../assets/images/noteIcon.svg';
import NoteBlueIcon from '../../assets/images/noteBlueIcon.svg';
import rejectedNoteBlueIcon from '../../assets/images/rejectedNoteBlueIcon.svg';
import rejectedNoteIcon from '../../assets/images/rejectedNoteIcon.svg';
import AwaitingIcon from '../../assets/images/awaitingIcon.svg';
import AwaitingBlueIcon from '../../assets/images/awaitingBlueIcon.svg';
import { ALL_BUYERS, ALL_SELLERS, AWAITING_RESPONSE, HIGH, NORMAL, REJECTED, REJECTED_BUYERS, REJECTED_SELLERS, VERIFICATION_STATUS } from '../../constants';
import { BuyerFilterModel, AdminSellerFilterModel, AdminSellerFilterModelWithStatus, AdminSellerFilterModeAwaitingApproval, AdminBuyerOtherFilterModel, AdminBuyerAwaitingFilterModel } from '../FilterModel';
import { AllSellerTableModel, SellerAwaitingTableModel, SellerPriorityTableModel, SellerRejectedTableModel, SellerUnregisteredTableModel } from '../../Container/AdminContainer/AdminSeller/TableModel';
import { AllBuyerTableModel, BuyerAwaitingTableModel, BuyerPriorityTableModel, BuyerRejectedTableModel } from '../../Container/AdminContainer/AdminBuyer/TableModel';
import { ENDPOINT } from '../../config/endpoint';
import UnregisteredBlueIcon from '../../assets/images/unregisteredBlueIcon.svg';
import UnregisteredGreyIcon from '../../assets/images/unregisteredGreyIcon.svg';
import { SellerOthersSortByArr } from '../CommonCollection';
import { BuyerOthersSortByArr } from '../CommonCollection';

export function SellerTabData () {
   
    return (
        [
            {
                activeIcon: BuildingBlueIcon,
                inActiveIcon: BuildingGreyIcon,
                label: 'Verified Sellers',
                filterModel: AdminSellerFilterModel(),
                tableModel: AllSellerTableModel(),
                value: ['verified'] ,
                key: VERIFICATION_STATUS,
                // getRequest: true
            },
            {
                activeIcon: UserUpBlueIcon,
                inActiveIcon: UserUpIcon,
                label: HIGH,
                value: 'high',
                key: 'priority',
                multiPayload: {
                    [VERIFICATION_STATUS]: {
                        value: ['verified']
                    }
                },
                filterModel: AdminSellerFilterModel(),
                tableModel: SellerPriorityTableModel(),
            },
            {
                activeIcon: NoteBlueIcon,
                inActiveIcon: NoteIcon,
                label: NORMAL,
                value: 'normal',
                key: 'priority',
                multiPayload: {
                    [VERIFICATION_STATUS]: {
                        value: ['verified']
                    }
                },
                filterModel: AdminSellerFilterModel(),
                tableModel: SellerPriorityTableModel(),
                hasDivider: true,
            },
            {
                activeIcon: rejectedNoteBlueIcon,
                inActiveIcon: rejectedNoteIcon,
                label: REJECTED_SELLERS,
                value: [REJECTED, 'junk', 'delist'] ,
                key: VERIFICATION_STATUS,
                filterModel: AdminSellerFilterModelWithStatus(),
                tableModel: SellerRejectedTableModel(),
                sortByArr: SellerOthersSortByArr
            },
            {
                activeIcon: AwaitingBlueIcon,
                inActiveIcon: AwaitingIcon,
                label: AWAITING_RESPONSE,
                value: ['not_verified', 'verification_in_progress'],
                key: VERIFICATION_STATUS,
                filterModel: AdminSellerFilterModeAwaitingApproval(),
                tableModel: SellerAwaitingTableModel(),
                sortByArr: SellerOthersSortByArr
            },
            {
                activeIcon: UnregisteredBlueIcon,
                inActiveIcon: UnregisteredGreyIcon,
                label: 'Unregistered Sellers',
                // value: ['not_verified', 'verification_in_progress'],
                // key: VERIFICATION_STATUS,
                tableModel: SellerUnregisteredTableModel(),
                url: ENDPOINT.DASHBOARD.unregisteredCompany,
                disableFilter: true,
                sortByArr: SellerOthersSortByArr
            }
        ]
    )
}

export  function BuyerTabData () {
    return (
        [
            {
                activeIcon: VerifiedBuyerBlue,
                inActiveIcon: VerifiedBuyerGrey,
                label: 'Verified Buyers',
                filterModel: BuyerFilterModel(),
                tableModel: AllBuyerTableModel(),
                value: ['verified'],
                key: 'status',
            },
            {
                activeIcon: UserUpBlueIcon,
                inActiveIcon: UserUpIcon,
                label: HIGH,
                value: 'high',
                key: 'priority',
                filterModel: BuyerFilterModel(),
                tableModel: BuyerPriorityTableModel(),
            },
            {
                activeIcon: NoteBlueIcon,
                inActiveIcon: NoteIcon,
                label: NORMAL,
                value: 'normal',
                key: 'priority',
                filterModel: BuyerFilterModel(),
                tableModel: BuyerPriorityTableModel(),
                hasDivider: true
            },
            {
                activeIcon: rejectedNoteBlueIcon,
                inActiveIcon: rejectedNoteIcon,
                label: REJECTED_BUYERS,
                value: ['rejected','delist'],
                key: 'status',
                filterModel: AdminBuyerOtherFilterModel(),
                tableModel: BuyerRejectedTableModel(),
                sortByArr: BuyerOthersSortByArr
            },
            {
                activeIcon: AwaitingBlueIcon,
                inActiveIcon: AwaitingIcon,
                label: AWAITING_RESPONSE,
                value: 'not_verified',
                key: 'status',
                filterModel: AdminBuyerAwaitingFilterModel(),
                tableModel: BuyerAwaitingTableModel(),
                sortByArr: BuyerOthersSortByArr
            },
        ]
    )
}
